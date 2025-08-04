from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import uuid
import os
from google import genai
from google.genai import types
import httpx
from youtube_transcript_api import YouTubeTranscriptApi
import re
# import pymongo
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import markdown
from bs4 import BeautifulSoup

load_dotenv()
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)

CORS(app, supports_credentials=True, origins=["https://notes-bot-nine.vercel.app"])  # Allow cross-origin requests from React


genaiClient = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))
mongoClient = MongoClient(os.getenv("uri"))
db = mongoClient["notesbot_db"]
users = db["users"]
searchData = db["searchData"]

# Cloudinary config
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

prompts = {
    "Summary": """Assume the role of an AI tutor helping a student quickly revise their class notes. The PDF file contains their personal notes. Generate a clear, concise, and accurate summary of all the important points, concepts, definitions, and explanations covered in the document. Ensure that your summary follows the order of the original notes and is easy to read and understand. Avoid generic responses—focus only on what's inside the PDF.""",

    "Questions": """You are an expert academic assistant. Analyze the attached PDF which contains class notes taken by a student. Based on the content, generate a set of relevant questions, each followed by a brief but accurate answer. Focus on important definitions, key concepts, formulas, and explanations. Structure your output as: Q1: ... A1: ... Ensure questions are fact-based, appropriate for revision or exam preparation, and only derived from the actual content in the PDF.""",

    "Organize": """You are a document formatting assistant. The uploaded PDF contains handwritten or typed student notes. Your task is to reconstruct the content into a well-organized, clean, and properly formatted text. Use clear headings, subheadings, bullet points, and paragraphs where necessary. Ensure the content flow is logical and the output resembles a neat, readable textbook-style version of the original notes. Do not add any new information—only rephrase or structure what's already in the PDF.""",
    
    "Youtube": """You are an expert note-taker. Read the following text and create well-organized, concise notes that capture the key points, subpoints, and important examples or definitions. Use headings, bullet points, and indentation for clarity. Avoid repeating sentences; instead, summarize them in your own words. Ensure the notes are easy to read and structured logically for studying or review purposes. Here is the Text to process: """
}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get("name")
    username = data.get("username")
    password = data.get("password")

    if users.find_one({"username": username}):
        return jsonify({"msg": "User already exists"}), 400

    hashed_pw = generate_password_hash(password)
    users.insert_one({"name": name, "username": username, "password": hashed_pw})
    return jsonify({"msg": "Registration successful"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = users.find_one({"username": username})
    if user and check_password_hash(user["password"], password):
        token = create_access_token(identity=str(user["_id"]))
        return jsonify(access_token=token)
    return jsonify({"msg": "Invalid credentials"}), 401

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user_id = get_jwt_identity()
    user = users.find_one({"_id": ObjectId(user_id)})
    return jsonify({
        "message": f"Welcome {user['username']}!",
        "user_id": user_id
    })

@app.route('/pdfrequest', methods=['POST'])
def handle_pdf_request():
    try:
        
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
        
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

        print(f"Uploaded to: {file_url}")
        doc_url = file_url
        # Retrieve and encode the PDF byte
        doc_data = httpx.get(doc_url).content

        Summary = genaiClient.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
             types.Part.from_bytes(
            data=doc_data,
            mime_type='application/pdf',
        ), 
        prompts.get("Summary")])
        
        Questions = genaiClient.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
             types.Part.from_bytes(
            data=doc_data,
            mime_type='application/pdf',
        ), 
        prompts.get("Questions")])
        
        Organize = genaiClient.models.generate_content(
        model="gemini-2.5-flash",
        contents=[
             types.Part.from_bytes(
            data=doc_data,
            mime_type='application/pdf',
        ), 
        prompts.get("Organize")])
        # Print the response
        
        
        # Save the response to MongoDB
        if user_id:
            searchData.insert_one({
                "user_id": user_id,
                "title": request.files.get('title'),
                "file_url": file_url,
                "summary": Summary.text,
                "questions": Questions.text,
                "organize": Organize.text
            })
            
        return jsonify({
            'message': 'Form submitted successfully!',
            'file_url': file_url,
            'response': Summary.text,
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


@app.route('/ytrequest', methods=['POST'])
def handle_youtube_request():
    try:
        
        verify_jwt_in_request(optional=True)
        user_id = get_jwt_identity()
    
        # Get file
        url = request.form.get('url')
        message = ' ' 
        if not url:
            return jsonify({'error': 'No URL provided'}), 400

        pattern = r"(?:v=|\/|embed\/|youtu\.be\/)([0-9A-Za-z_-]{11})"
        match = re.search(pattern, url)
        if not match:
            return jsonify({'error': 'Invalid YouTube URL'}), 400
        video_id = match.group(1)
        print(video_id)
        try:
            transcript = YouTubeTranscriptApi.get_transcript(video_id)
        except Exception as e:
            return jsonify({'error': f'Could not retrieve transcript: {str(e)}'}), 400
        for entry in transcript:
            message += entry['text']
            
        response = genaiClient.models.generate_content(
        model="gemini-2.5-flash",
        contents= prompts.get("Youtube") + message)
        # Print the response
        
        # Save the response to MongoDB
        if user_id:
            searchData.insert_one({
                "user_id": user_id,
                "title": request.files.get('title'),
                "file_url": url,
                "response": response.text
            })
            
        return jsonify({
            'message': 'Form submitted successfully!',
            'file_url': url,
            'response': response.text,
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500
    
@app.route('/recent', methods=['GET'])
@jwt_required()
def get_recent_results():
    try:
        user_id = get_jwt_identity()

        # Get last 10 results for this user, sorted by most recent
        recent_entries = searchData.find(
            {"user_id": user_id}
        ).sort("_id", -1).limit(10)

        results = []
        for entry in recent_entries:
            results.append({
                "user_id": user_id,
                "title": entry.get("title", "Untitled"),
                "selected_option": entry.get("selected_option"),
                "file_url": entry.get("file_url"),
                "response": entry.get("response")
            })

        return jsonify(results), 200

    except Exception as e:
        print("Error fetching recent results:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
