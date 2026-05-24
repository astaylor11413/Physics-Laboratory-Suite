from flask import Flask, render_template, request, jsonify
from database import save_state_to_db, load_state_from_db
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from datetime import datetime

app = Flask(__name__)

# Add an environment variable for the sheet name, defaulting to Production sheet if not set
GOOGLE_SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME", "Physics Lab Analytics")

def push_row_to_sheets(student_name, current_time, current_packet, current_part, max_rig_phase, approved_parts_count, p1_answered_count, p2_answered_count):
    try:
        cred_path = os.getenv("FIREBASE_KEY_PATH")
        if not cred_path:
            return
        
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        sheet_creds = ServiceAccountCredentials.from_json_keyfile_name(cred_path, scope)
        client = gspread.authorize(sheet_creds)
        
        sheet = client.open(GOOGLE_SHEET_NAME).sheet1
        
        # Append all 8 parameters in column order mapping to your Row 1 headers
        sheet.append_row([
            student_name, 
            current_time, 
            current_packet, 
            current_part, 
            max_rig_phase, 
            approved_parts_count, 
            p1_answered_count, 
            p2_answered_count
        ])
        print(f"Real-Time Sync to [{GOOGLE_SHEET_NAME}]: Comprehensive telemetry logged for {student_name}")
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
    
    # --- GROUP 1: CORE SESSION IDENTIFIERS ---
    student_name = lab_state_payload.get('studentName', 'Anonymous Student').strip() or 'Anonymous Student'
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M')

    # --- GROUP 2: PROGRESSION & VELOCITY MILESTONES ---
    # Detect which master view tab they are currently looking at (Packet 1 vs Packet 2)
    current_packet = lab_state_payload.get('activePacketTab', 'Packet 1') 

    # Detect which sub-tab part they are on within Packet 1 (Part 1, 2, 3, or 4)
    current_part = lab_state_payload.get('activePartTab', 'Part 1')

    # Extract their mechanical build status on the assembly track (Phase 1 to 5)
    max_rig_phase = lab_state_payload.get('rigLevel', 0)

    # Calculate how many total teacher sign-offs they have actually earned
    signoffs = lab_state_payload.get('signoffs', {})
    approved_parts_count = sum(1 for v in signoffs.values() if v is True)

    # --- GROUP 3: REAL-TIME QUESTION METRICS (COMPLETION COUNTS) ---

    # 1. Scan Packet 1 written inputs (9 total textareas)
    p1_questions = ['p1-q2', 'p1-q3', 'p1-q4', 'p1-q5', 'p1-q6', 'p1-q7', 'p1-q11', 'p1-q12', 'p1-q15']
    p1_answered_count = sum(1 for q in p1_questions if lab_state_payload.get(q, '').strip())

    # 2. Scan Packet 2 inputs (6 textareas + 1 radio button configuration = 7 total inputs)
    p2_questions = ['p2-q1', 'p2q2a', 'p2-q2b', 'p2-q3', 'p2-q6', 'p2-q8a', 'p2-q8b']
    p2_answered_count = sum(1 for q in p2_questions if str(lab_state_payload.get(q, '')).strip())

    # --- HANDOFF TO GOOGLE SHEETS API ---
    # Send all 8 cleanly aggregated analytics variables out to the spreadsheet rows
    push_row_to_sheets(
        student_name,          # Column A
        current_time,          # Column B
        current_packet,        # Column C
        current_part,          # Column D
        max_rig_phase,         # Column E
        approved_parts_count,  # Column F
        p1_answered_count,     # Column G
        p2_answered_count      # Column H
    )   
    
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