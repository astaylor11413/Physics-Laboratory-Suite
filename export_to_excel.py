import os
import pandas as pd
from firebase_admin import credentials, firestore, initialize_app
from dotenv import load_dotenv
load_dotenv()
# 1. Initialize Firestore connection using your existing key path
cred_path = os.getenv("FIREBASE_KEY_PATH")
if not cred_path:
    raise ValueError("Please ensure FIREBASE_KEY_PATH is set in your environment.")

try:
    cred = credentials.Certificate(cred_path)
    initialize_app(cred)
except ValueError:
    pass  # App already initialized

db = firestore.client()

def export_latest_student_submissions():
    print("Connecting to Firestore 'labStates' collection...")
    docs = db.collection("labStates").stream()
    
    raw_records = []
    
    for doc in docs:
        data = doc.to_dict()
        share_id = doc.id
        
        # Extract metadata
        student_name = data.get("studentName", "Anonymous Student").strip()
        created_at = data.get("createdAt", None)
        
        state_data = data.get("stateData", {})
        text_fields = state_data.get("textFields", {})
        radio_fields = state_data.get("radioFields", {})
        
        # Build the flat record dictionary
        record = {
            "Share ID Code": share_id,
            "Student Name": student_name,
            "Saved Timestamp": created_at,  # Left as a true datetime object for sorting
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
        print("No records found in 'labStates' collection.")
        return

    # 2. Convert to a Pandas Dataframe
    df = pd.DataFrame(raw_records)

    # 3. DEDUPLICATION
    # Step A: Ensure 'Saved Timestamp' is treated as a datetime, and sort oldest to newest
    df['Saved Timestamp'] = pd.to_datetime(df['Saved Timestamp'], errors='coerce')
    df = df.sort_values(by="Saved Timestamp", ascending=True)

    # Step B: Group by Student Name and keep ONLY the last entry (the most recent timestamp)
    # This automatically drops all older backup rows for that student!
    total_before = len(df)
    df = df.drop_duplicates(subset=["Student Name"], keep="last")
    total_after = len(df)
    
    print(f"Deduplication Complete: Removed {total_before - total_after} older backup entries.")

    # Convert timestamp back to string format for clean display in Excel
    df['Saved Timestamp'] = df['Saved Timestamp'].dt.strftime('%Y-%m-%d %H:%M')

    # Step C: Final cosmetic sort alphabetically by student name
    df = df.sort_values(by="Student Name")

    # 4. Export directly to Excel
    output_filename = "Physics_Lab_1_Clean_Latest_Submissions.xlsx"
    df.to_excel(output_filename, index=False)
    
    print(f"SUCCESS! Exported {total_after} unique, up-to-date student records to:\n👉 {os.path.abspath(output_filename)}")

if __name__ == "__main__":
    export_latest_student_submissions()