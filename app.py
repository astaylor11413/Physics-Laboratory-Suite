from flask import Flask, render_template

app = Flask(__name__)

# Define the route for your home page
@app.route('/')
def home():
    # Flask automatically looks inside the /templates folder for this file
    return render_template('index.html')

if __name__ == '__main__':
    # Runs the app locally on port 5000
    app.run(debug=True, host='0.0.0.0', port=5000)