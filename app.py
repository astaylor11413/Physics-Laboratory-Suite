from datetime import datetime
import pytz
from flask import Flask, render_template, request, jsonify
from database import save_state_to_db, load_state_from_db
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os
from datetime import datetime

app = Flask(__name__)

# Add an environment variable for the sheet name, defaulting to Production sheet if not set
GOOGLE_SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME", "Physics Lab Analytics")

def push_row_to_sheets(student_name, current_time, current_location, max_rig_phase, 
                        p1_part1_count, p1_part2_count, p1_part3_count, p1_part4_count, 
                        p2_answered_count, total_completed, completion_rate):
    try:
        cred_path = os.getenv("FIREBASE_KEY_PATH")
        if not cred_path:
            return
        
        scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
        sheet_creds = ServiceAccountCredentials.from_json_keyfile_name(cred_path, scope)
        client = gspread.authorize(sheet_creds)
        
        sheet = client.open(GOOGLE_SHEET_NAME).sheet1
        
        # Append all 11 parameters in column order
        sheet.append_row([
            student_name,         # Column A: Student Name
            current_time,         # Column B: Submission Time
            current_location,     # Column C: Current Lab Location (Inferred Module)
            max_rig_phase,        # Column D: Max Rig Phase (1-5 Assembly Track)
            p1_part1_count,       # Column E: Part 1 Completion Count ( /7 )
            p1_part2_count,       # Column F: Part 2 Completion Count ( /2 )
            p1_part3_count,       # Column G: Part 3 Completion Count ( /6 )
            p1_part4_count,       # Column H: Part 4 Completion Count ( /2 )
            p2_answered_count,    # Column I: Packet 2 Completion Count ( /7 )
            total_completed,      # Column J: Total Items Completed ( /24 )
            completion_rate       # Column K: Overall Completion Rate (%)
        ])
        print(f"Real-Time Sync to [{GOOGLE_SHEET_NAME}]: Comprehensive telemetry logged for {student_name}")
    except Exception as e:
        print(f"Real-Time Sync Error: {str(e)}")


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/api/save-state', methods=['POST'])
def save_state():
    data = request.get_json() or {}
    
    lab_state_payload = data.get('state') if 'state' in data else data
    if not lab_state_payload:
        return jsonify({"error": "No state provided"}), 400
        
    is_heartbeat = data.get('isHeartbeat', False)
    
    share_id = None
    if not is_heartbeat:
        share_id = save_state_to_db(lab_state_payload)
    
    text_fields = lab_state_payload.get('textFields', {})
    radio_fields = lab_state_payload.get('radioFields', {})
    signoffs = lab_state_payload.get('signoffs', {})

    # --- GROUP 1: CORE SESSION IDENTIFIERS (FIXED TIMEZONE BUG) ---
    student_name = lab_state_payload.get('studentName', 'Anonymous Student').strip() or 'Anonymous Student'
    
    # Force Python to read the specific local timezone of the classroom
    # Common US values: 'US/Eastern', 'US/Central', 'US/Mountain', 'US/Pacific'
    classroom_tz = pytz.timezone('US/Eastern') 
    current_time = datetime.now(classroom_tz).strftime('%Y-%m-%d %H:%M')

    # --- GROUP 2: PROGRESSION MILESTONES ---
    approved_parts_count = sum(1 for v in signoffs.values() if v is True)
    max_rig_phase = lab_state_payload.get('rigLevel', 0)

    # --- GROUP 3: GRANULAR QUESTION COUNTS (MODULE BY MODULE) ---
    p1_p1_keys = ['p1-q2', 'p1-q3', 'p1-q4', 'p1-q5', 'p1-q6', 'p1-q7', 'p1-q11']
    p1_part1_count = sum(1 for q in p1_p1_keys if text_fields.get(q, '').strip())

    p1_p2_keys = ['p1-q12', 'p1-q15']
    p1_part2_count = sum(1 for q in p1_p2_keys if text_fields.get(q, '').strip())

    p1_p3_keys = ['p1-q16', 'p1-q17', 'p1-q18', 'p1-q19', 'p1-q20', 'p1-q21']
    p1_part3_count = sum(1 for q in p1_p3_keys if text_fields.get(q, '').strip())

    p1_p4_keys = ['p1-q26', 'p1-q29']
    p1_part4_count = sum(1 for q in p1_p4_keys if text_fields.get(q, '').strip())

    p2_text_keys = ['p2-q1', 'p2-q2b', 'p2-q3', 'p2-q6', 'p2-q8a', 'p2-q8b']
    p2_text_count = sum(1 for q in p2_text_keys if text_fields.get(q, '').strip())
    p2_radio_count = 1 if radio_fields.get('p2q2a') else 0
    p2_answered_count = p2_text_count + p2_radio_count
    # --- GROUP 4: TOTAL COMPLETION METRICS ---
    total_completed = (p1_part1_count + p1_part2_count + p1_part3_count + 
                       p1_part4_count + p2_answered_count)
    
    total_max_questions = 24
    # Calculate percentage and format as a clean string (e.g., "75.0%")
    completion_rate = f"{(total_completed / total_max_questions) * 100:.1f}%"

    # --- INFER ACTIVE STUDENT LOCATION ---
    if p2_answered_count > 0:
        current_location = 'Module 2: Evaluation Packet'
    elif p1_part4_count > 0 or signoffs.get('3') or signoffs.get(3):
        current_location = 'Module 1: Part 4 (Helix Modifications)'
    elif p1_part3_count > 0 or signoffs.get('2') or signoffs.get(2):
        current_location = 'Module 1: Part 3 (Battery-Free Induction)'
    elif p1_part2_count > 0 or signoffs.get('1') or signoffs.get(1):
        current_location = 'Module 1: Part 2 (Setup Modifications)'
    else:
        current_location = 'Module 1: Part 1 (Investigation Design)'

    # --- HANDOFF TO GOOGLE SHEETS API ---
    push_row_to_sheets(
        student_name, current_time, current_location, max_rig_phase, 
        p1_part1_count, p1_part2_count, p1_part3_count, p1_part4_count,
        p2_answered_count,total_completed, completion_rate
    )   
    
    # Return response back cleanly
    if is_heartbeat:
        return jsonify({"status": "Heartbeat logged seamlessly"}), 200
    else:
        return jsonify({"shareId": share_id})


@app.route('/api/load-state/<share_id>', methods=['GET'])
def load_state(share_id):
    lab_state_payload = load_state_from_db(share_id)
    if not lab_state_payload:
        return jsonify({"error": "State not found"}), 404
    return jsonify({"state": lab_state_payload})

if __name__ == '__main__':
    app.run(debug=True)