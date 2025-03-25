import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Initialize Firebase Admin SDK (replace 'path/to/serviceAccountKey.json' with your key)
cred = credentials.Certificate("firebase\i_vibhava-61886-firebase-adminsdk-fbsvc-1b375b805a.json")
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()


def create_user(username, email):
    user_ref = db.collection("users").document()  # Auto-generate ID
    user_ref.set({
        "username": username,
        "email": email,
        "created_at": firestore.SERVER_TIMESTAMP
    })
    print(f"User created with ID: {user_ref.id}")  # Access the auto-generated ID
    return user_ref.id  # Return the ID for later use

# Generate a new Project with auto-ID
def create_project(name, description, location_id, team_details):
    project_ref = db.collection("projects").document()  # Auto-generate ID
    project_ref.set({
        "project_name": name,
        "project_description": description,
        "location_id": location_id,
        "team_details": team_details
    })
    print(f"Project created with ID: {project_ref.id}")
    return project_ref.id


def add_scan_log(user_id, project_id, order_index):
    scan_ref = db.collection("scanLogs").document()  # Auto-generate ID
    scan_ref.set({
        "user_id": f"users/{user_id}",  # Reference to user
        "project_id": f"projects/{project_id}",  # Reference to project
        "scanned_time": firestore.SERVER_TIMESTAMP,
        "order_index": order_index
    })
    print(f"Scan log added for User {user_id} and Project {project_id}")
