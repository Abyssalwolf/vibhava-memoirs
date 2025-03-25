from flask import Flask, request, jsonify, render_template
from firestore_init import db
from datetime import datetime
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# --- Helper Functions ---
def get_user_by_username_or_email(username_or_email):
    """Check if user exists by username or email."""
    users_ref = db.collection("users")
    # Check by username
    user = users_ref.where("username", "==", username_or_email).limit(1).get()
    if not user:
        # Check by email
        user = users_ref.where("email", "==", username_or_email).limit(1).get()
    return user[0] if user else None

def is_project_valid(project_id):
    """Check if ProjectID exists in Firestore."""
    project_ref = db.collection("projects").document(project_id)
    return project_ref.get().exists

def is_project_scanned_by_user(user_id, project_id):
    """Check if user already scanned this project."""
    scans_ref = db.collection("scanLogs")
    query = (
        scans_ref
        .where("user_id", "==", f"users/{user_id}")
        .where("project_id", "==", f"projects/{project_id}")
        .limit(1)
        .get()
    )
    return len(query) > 0

# --- API Endpoints ---
@app.route("/api/register", methods=["POST"])
def register_or_recognize_user():
    """Register new user or recognize existing one."""
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")

    if not (username or email):
        return jsonify({"error": "Username or email required"}), 400

    # Check if user exists
    user = get_user_by_username_or_email(username or email)
    if user:
        return jsonify({"user_id": user.id}), 200

    # Register new user
    if not (username and email):
        return jsonify({"error": "New users must provide both username and email"}), 400

    user_ref = db.collection("users").document()
    user_ref.set({
        "username": username,
        "email": email,
        "created_at": datetime.now()
    })
    return jsonify({"user_id": user_ref.id}), 201


@app.route("/api/scan", methods=["POST"])
def scan_project():
    """Validate QR scan and log it."""
    data = request.get_json()
    user_id = data.get("user_id")
    project_id = data.get("project_id")

    if not (user_id and project_id):
        return jsonify({"error": "user_id and project_id required"}), 400

    # Validate ProjectID
    if not is_project_valid(project_id):
        return jsonify({"error": "Invalid ProjectID"}), 404

    # Check if already scanned
    if is_project_scanned_by_user(user_id, project_id):
        return jsonify({"error": "Project already scanned"}), 409

    # Log the scan
    scan_ref = db.collection("scanLogs").document()
    scan_ref.set({
        "user_id": f"users/{user_id}",
        "project_id": f"projects/{project_id}",
        "scanned_time": datetime.now(),
        "order_index": 0  # Will update later
    })

    # Update order_index (count of user's scans)
    user_scans = (
        db.collection("scanLogs")
        .where("user_id", "==", f"users/{user_id}")
        .get()
    )
    scan_ref.update({"order_index": len(user_scans)})

    return jsonify({"success": True}), 200


@app.route("/api/metrics", methods=["GET"])
def get_project_metrics():
    """Fetch all projects with their scan counts."""
    try:
        # Get all projects
        projects = db.collection("projects").stream()
        metrics = []

        for project in projects:
            project_id = project.id
            project_name = project.get("project_name")
            
            # Count scans for this project
            scan_count = (
                db.collection("scanLogs")
                .where("project_id", "==", f"projects/{project_id}")
                .count()
                .get()[0]
                [0]
                .value
            )

            metrics.append({
                "project_name": project_name,
                "scan_count": scan_count
            })

        return jsonify(metrics), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/user/<string:user_id>/scans", methods=["GET"])
def get_user_scans(user_id):
    """Get all scan logs for a specific user with time formatted."""
    try:
        # Validate user exists
        user_ref = db.collection("users").document(user_id)
        if not user_ref.get().exists:
            return jsonify({"error": "User not found"}), 404

        # Query scan logs for this user
        scans_ref = db.collection("scanLogs")
        query = scans_ref.where("user_id", "==", f"users/{user_id}").stream()

        scans = []
        for doc in query:
            scan_data = doc.to_dict()
            
            # Extract project ID from reference string
            project_id = scan_data["project_id"].split("/")[-1]
            
            # Format timestamp to time-only string
            scanned_time = scan_data["scanned_time"].strftime("%H:%M:%S")
            
            scans.append({
                "order_index": scan_data["order_index"],
                "project_id": project_id,
                "scanned_time": scanned_time
            })

        return jsonify(scans), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/leaderboard")
def leaderboard():
    """Serve the leaderboard HTML page."""
    return render_template("leaderboard.html")

if __name__ == "__main__":
    app.run(debug=True)

