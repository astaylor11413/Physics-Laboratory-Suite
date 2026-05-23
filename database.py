import secrets
import firebase_admin
from firebase_admin import credentials, firestore

# 1. Initialize Firebase Admin utilizing your service account key file
# Replace 'firebase-credentials.json' with the actual filename you downloaded
cred = credentials.Certificate("firebase-credentials.json")
firebase_admin.initialize_app(cred)

# 2. Spin up the Firestore Client
db = firestore.client()

def save_state_to_db(state_data):
    """
    Receives the lab state dictionary, generates a short 6-character 
    hex token, and commits it securely to Firestore.
    """
    # Generates a random, secure 6-character hex token (e.g., 'f3b8c2')
    share_id = secrets.token_hex(3) 
    
    # Target the 'labStates' collection using the share_id as the Document ID
    doc_ref = db.collection("labStates").document(share_id)
    doc_ref.set({
        "stateData": state_data,
        "createdAt": firestore.SERVER_TIMESTAMP # Tracks when the student saved it
    })
    
    return share_id

def load_state_from_db(share_id):
    """
    Looks up the document via the 6-character ID and extracts 
    the laboratory state payload dictionary.
    """
    doc_ref = db.collection("labStates").document(share_id)
    doc = doc_ref.get()
    
    if doc.exists:
        # Returns the nested state object exactly how your JS script expects it
        return doc.to_dict().get("stateData")
        
    return None