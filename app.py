from flask import Flask, render_template
import urllib.request
import urllib.parse
import os
import json

app = Flask(__name__)

# Define the route for your home page
@app.route('/')
def home():
    # Flask automatically looks inside the /templates folder for this file
    return render_template('index.html')

@app.route('/api/shorten', methods=['POST'])
def proxy_shortener():
    try:
        # Get the massive URL sent by your JavaScript
        data = request.json
        long_url = data.get('url')
        
        # Safely encode the URL for the is.gd API query string
        encoded_url = urllib.parse.quote(long_url)
        api_url = f"https://is.gd/create.php?format=simple&url={encoded_url}"
        
        # Make a secure server-to-server request to is.gd (Bypasses CORS completely!)
        with urllib.request.urlopen(api_url, timeout=5) as response:
            short_url = response.read().decode('utf-8')
            
        return jsonify({"success": True, "shortUrl": short_url})
        
    except Exception as e:
        print(f"Backend shortener error: {e}")
        return jsonify({"success": False, "error": str(e)}), 500
        

if __name__ == '__main__':
    # Runs the app locally on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
