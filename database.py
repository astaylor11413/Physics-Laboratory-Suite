import os
import secrets
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

# 1. Load the variables from the .env file into Python's environment
load_dotenv()

# 2. Grab the path string safely from the environment
cred_path = os.getenv("FIREBASE_KEY_PATH")

if not cred_path:
    raise ValueError("CRITICAL: FIREBASE_KEY_PATH is missing from your environment configuration!")

# 3. Initialize Firebase using the hidden path variable
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

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