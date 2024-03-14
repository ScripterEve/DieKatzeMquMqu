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
events = []


@app.route("/events")
def list_events():
    return jsonify(events)

@app.route("/events/create", methods=['POST'])
def create_events():
    data = request.json
    if 'name_event' not in data or 'description' not in data:
        return jsonify({'error': 'name and description are required'}), 400
    
    name_event = data["name_event"]
    description = data["description"]
    photo = data["photo"]

    # Check if the username is already taken
    for event in events:
        if event["name_event"] == name_event:
            return jsonify({'error': 'event already exists'}), 400
    for event in events:
        if event["description"] == description:
            return jsonify({'error': 'event already exists'}), 400

    # Store the user information in the database
    event = {
        "name_event" : name_event,
        "description" : description,
        "photo" : photo
    }  

    events.append(event)

    return jsonify({'message': 'Event created successfully'})
