from flask import Flask, jsonify, request

app = Flask(__name__)

users = []

@app.route("/")
def index():
    return "Hello, World!"

@app.route("/users")
def list_users():
    return jsonify(users)

@app.route("/users/create", methods=['POST'])
def create_user():
    data = request.json

    # Check if required fields are present
    if 'email' not in data or 'password' not in data or 'name' not in data:
        return jsonify({'error': 'name, email and password are required'}), 400

    name = data['name']
    email = data['email']
    password = data['password']

    # Check if the username is already taken
    for user in users:
        if user["email"] == email:
            return jsonify({'error': 'email already exists'}), 400

    # Store the user information in the database
    user = {
        "name" : name,
        "email" : email,
        "password" : password
    }  

    users.append(user)

    # You might want to perform additional actions here, such as sending a confirmation email

    return jsonify({'message': 'User signed up successfully'})

@app.route("/login", methods=['POST'])
def login():
    data = request.json
    for user in users:
        if data["email"] == user["email"] and data["password"] == user["password"]:
            return jsonify(user)       
    return jsonify({'error': 'user not found'}), 404




