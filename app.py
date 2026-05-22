from flask import Flask, render_template, request, jsonify
#from flask_cors import CORS
import urllib.request
import urllib.parse
import os
import json

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "*", "allow_headers": "*", "methods": ["GET", "POST", "OPTIONS"]}})


# Define the route for your home page
@app.route('/')
def home():
    # Flask automatically looks inside the /templates folder for this file
    return render_template('index.html')

@app.route('/api/shorten', methods=['POST'])
def proxy_shortener():
    try:
        data = request.json or {}
        long_url = data.get('url')
        
        if not long_url:
            return jsonify({"success": False, "error": "No URL provided"}), 400
            
        # 1. Safely encode parameters
        encoded_url = urllib.parse.quote(long_url)
        api_url = f"https://is.gd/create.php?format=simple&url={encoded_url}"
        
        # 2. Package request with a clean Chrome browser User-Agent
        req = urllib.request.Request(
            api_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        
        # 3. Talk to the server
        with urllib.request.urlopen(req, timeout=10) as response:
            short_url = response.read().decode('utf-8').strip()
        
        # 4. SAFETY CHECK: If the service returned an error string, treat it as a failure
        if "Error" in short_url or "failed" in short_url:
            raise Exception(f"External API returned an anomaly: {short_url}")
            
        return jsonify({"success": True, "shortUrl": short_url})
        
    except Exception as e:
        print(f"!!! SHORTENER PROXY EXCEPTION: {e}")
        # Explicitly tell JS that this was a failure!
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    # Runs the app locally on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
