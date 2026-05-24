from flask import Flask, render_template, request, jsonify
from database import save_state_to_db, load_state_from_db
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from datetime import datetime

app = Flask(__name__)

# Add an environment variable for the sheet name, defaulting to Production sheet if not set
GOOGLE_SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME", "Physics Lab Analytics")

def push_row_to_sheets(student_name, rig_level, completed_count):
    try:
        cred_path = os.getenv("FIREBASE_KEY_PATH")
        if not cred_path:
            return
        
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        sheet_creds = ServiceAccountCredentials.from_json_keyfile_name(cred_path, scope)
        client = gspread.authorize(sheet_creds)
        
        
        # DYNAMIC ROUTING: Opens "Physics Lab Analytics" on Prod
        # or "Physics Lab Analytics - QA01" on QA
        sheet = client.open(GOOGLE_SHEET_NAME).sheet1
        
        # Append a clean single row: [Name, Time, Rig Level, Total Steps Completed]
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M')
        sheet.append_row([student_name, current_time, rig_level, completed_count])
        print(f"Real-Time Sync: Successfully logged progress for {student_name}")
    except Exception as e:
        print(f"Real-Time Sync Error: {str(e)}")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/save-state', methods=['POST'])
def save_state():
    data = request.get_json()
    lab_state_payload = data.get('state') 
    
    if not lab_state_payload:
        return jsonify({"error": "No state provided"}), 400
        
    # Commit securely to Firestore and get the unique 6-character short code
    share_id = save_state_to_db(lab_state_payload)
    
    # REAL-TIME AUTOMATION EVENT
    # Extract the analytics metrics out of the current payload
    student_name = lab_state_payload.get('studentName', 'Anonymous Student').strip() or 'Anonymous Student'
    rig_level = lab_state_payload.get('rigLevel', 0)
    signoffs = lab_state_payload.get('signoffs', {})
    completed_count = sum(1 for v in signoffs.values() if v is True)
    
    # Fire the single-row update to Google Sheets instantly!
    push_row_to_sheets(student_name, rig_level, completed_count)
    
    # Return the response back to the student's browser layout
    return jsonify({"shareId": share_id})


@app.route('/api/load-state/<share_id>', methods=['GET'])
def load_state(share_id):
    lab_state_payload = load_state_from_db(share_id)
    if not lab_state_payload:
        return jsonify({"error": "State not found"}), 404
    return jsonify({"state": lab_state_payload})

if __name__ == '__main__':
    app.run(debug=True)