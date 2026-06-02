import os
import pandas as pd
from firebase_admin import credentials, firestore, initialize_app
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase with the safety try/except block
cred_path = os.getenv("FIREBASE_KEY_PATH")
if not cred_path:
    raise ValueError("Please ensure FIREBASE_KEY_PATH is set in your environment.")

try:
    cred = credentials.Certificate(cred_path)
    initialize_app(cred)
except ValueError:
    pass  # This prevents the crash if the app is already initialized

db = firestore.client()

def export_all_submissions():
    print("Connecting to Firestore 'labStates' collection...")
    docs = db.collection("labStates").stream()
    
    raw_records = []
    
    for doc in docs:
        data = doc.to_dict()
        share_id = doc.id
        
        # Extract metadata
        student_name = data.get("studentName", "Anonymous Student").strip()
        created_at = data.get("createdAt", None)
        
        # --- FIX: Convert Firestore Timestamp to naive datetime ---
        if created_at is not None:
            # If it's a Firestore Timestamp object, convert to Python datetime
            if hasattr(created_at, 'to_datetime'):
                created_at = created_at.to_datetime()
            # If it has timezone info, strip it for Excel compatibility
            if hasattr(created_at, 'tzinfo') and created_at.tzinfo is not None:
                created_at = created_at.replace(tzinfo=None)
        
        state_data = data.get("stateData", {})
        text_fields = state_data.get("textFields", {})
        radio_fields = state_data.get("radioFields", {})
        
        # Build the flat record dictionary
        record = {
            "Share ID Code": share_id,
            "Student Name": student_name,
            "Saved Timestamp": created_at,
            "Rig Level Assembly Phase": state_data.get("rigLevel", 0),
            "Turn Density Slider Value": state_data.get("turnDensity", ""),
            "Circuit Switch Closed": state_data.get("switchClosed", False),
        }
        
        # Dynamically append text fields
        for field_id, value in text_fields.items():
            record[f"Text_{field_id}"] = value
            
        # Dynamically append radio fields
        for field_name, value in radio_fields.items():
            record[f"Radio_{field_name}"] = value
            
        raw_records.append(record)

    if not raw_records:
        print("No records found.")
        return

    # Convert to a Pandas Dataframe
    df = pd.DataFrame(raw_records)

    # Export directly to Excel
    output_filename = "Physics_Lab_1_Full_Database_Export.xlsx"
    df.to_excel(output_filename, index=False)
    
    print(f"SUCCESS! Exported all {len(df)} records to:\n{os.path.abspath(output_filename)}")

if __name__ == "__main__":
    export_all_submissions()