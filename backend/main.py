from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import uuid
import os

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

load_dotenv()
# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

@app.route('/sendrequest', methods=['POST'])
def handle_request():
    try:
        # Get text inputs
        message = request.form.get('message')
        selected_option = request.form.get('selectedOption')

        # Get file
        file = request.files.get('file')
        filename = str(uuid.uuid4())  # generates unique name like 98ad8c0e-...
        public_id = f"notesbot_uploads/{filename}.pdf"  # <-- forces .pdf in URL
        if not file:
            return jsonify({'error': 'No file provided'}), 400

        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            file,
            public_id=public_id,
            resource_type='raw',  # Important for PDFs 
            folder="notesbot_uploads",
            access_mode= "public"
        )

        file_url = result.get("secure_url")

        print(f"Message: {message}")
        print(f"Selected Option: {selected_option}")
        print(f"Uploaded to: {file_url}")

        return jsonify({
            'message': 'Form submitted successfully!',
            'file_url': file_url
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
