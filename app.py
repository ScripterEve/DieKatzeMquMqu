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

    if 'email' not in data or 'password' not in data or 'name' not in data:
        return jsonify({'error': 'name, email and password are required'}), 400

    name = data['name']
    email = data['email']
    password = data['password']

    for user in users:
        if user["email"] == email:
            return jsonify({'error': 'email already exists'}), 400

    user = {
        "name" : name,
        "email" : email,
        "password" : password
    }  

    users.append(user)

    return jsonify({'message': 'User signed up successfully'})

@app.route("/login", methods=['POST'])
def login():
    data = request.json
    for user in users:
        if data["email"] == user["email"] and data["password"] == user["password"]:
            return jsonify(user)       
    return jsonify({'error': 'user not found'}), 404

events = []

@app.route("/events/<event_name>")
def getevent(event_name):
    for event in events:
        if event_name == event["name_event"]:
            return jsonify(event)
    return jsonify({'error': 'event not found'}), 404

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

    for event in events:
        if event["name_event"] == name_event and event["description"] == description:
             return jsonify({'error': 'event already exists'}), 400

    event = {
        "name_event" : name_event,
        "description" : description,
        "photo" : photo
    }  

    events.append(event)

    return jsonify({'message': 'Event created successfully'})



@app.route("/events/delete", methods=['POST'])
def delete_events():
    data = request.json
    if 'name_event' not in data or 'description' not in data:
        return jsonify({'error': 'name_event and description are required'}), 400
    
    name_event = data.get("name_event")
    description = data.get("description")

    if name_event is None or description is None:
        return jsonify({'error': 'name_event and description cannot be None'}), 400

    events_to_delete = []
    
    for event in events:
        if event["name_event"] == name_event and event["description"] == description:
            events_to_delete.append(event)

    if not events_to_delete:
        return jsonify({'error': 'event not found'}), 404

    for event in events_to_delete:
        events.remove(event)

    return jsonify({'message': 'Event deleted successfully'})



