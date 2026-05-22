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
        data = request.json
        long_url = data.get('url')
        
        # 1. Safely encode the parameters
        encoded_url = urllib.parse.quote(long_url)
        api_url = f"https://is.gd/create.php?format=simple&url={encoded_url}"
        
        # 2. Create a Request object and add a real browser User-Agent header
        req = urllib.request.Request(
            api_url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
        )
        
        # 3. Execute the spoofed request
        with urllib.request.urlopen(req, timeout=5) as response:
            short_url = response.read().decode('utf-8')
            
        return jsonify({"success": True, "shortUrl": short_url})
        
    except Exception as e:
        # This print statement will stream the exact error straight to your terminal or Render logs
        print(f"!!! CRITICAL BACKEND ERROR: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == '__main__':
    # Runs the app locally on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
