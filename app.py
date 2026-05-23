from flask import Flask, render_template, request, jsonify
from database import save_state_to_db, load_state_from_db

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/save-state', methods=['POST'])
def save_state():
    data = request.get_json()
    # This is a full Python dictionary containing textFields, radioFields, etc.
    lab_state_payload = data.get('state') 
    
    if not lab_state_payload:
        return jsonify({"error": "No state provided"}), 400
        
    # Pass the object straight to the database handler
    share_id = save_state_to_db(lab_state_payload)
    return jsonify({"shareId": share_id})

@app.route('/api/load-state/<share_id>', methods=['GET'])
def load_state(share_id):
    lab_state_payload = load_state_from_db(share_id)
    
    if not lab_state_payload:
        return jsonify({"error": "State not found"}), 404
        
    return jsonify({"state": lab_state_payload})

if __name__ == '__main__':
    app.run(debug=True)