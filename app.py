from flask import Flask, jsonify, request

app = Flask(__name__)



# users create
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
        "password" : password,
        "my_events" : []
    }  

    users.append(user)

    return jsonify({'message': 'User signed up successfully'})



# users login
@app.route("/login", methods=['POST'])
def login():
    data = request.json
    for user in users:
        if data["email"] == user["email"] and data["password"] == user["password"]:
            return jsonify(user)       
    return jsonify({'error': 'user not found'}), 404



# http
@app.route("/events")
def list_events():
    return jsonify(events)



# events create
events = []

@app.route("/events/create", methods=['POST'])
def create_events():
    data = request.json
    if 'name_event' not in data or 'description' not in data:
        return jsonify({'error': 'name and description are required'}), 400
    
    name_event = data["name_event"]
    description = data["description"]
    photo = data.get("photo")
    places = data.get("places", 1000) 
    date = data.get("date", )

    if date is None:
        return jsonify({'error': 'date is required'}), 400

    for event in events:
        if event["name_event"] == name_event and event["description"] == description:
             return jsonify({'error': 'event already exists'}), 400

    event = {
        "name_event" : name_event,
        "description" : description,
        "photo" : photo,
        "places" : places,
        "date" : date,
        "attendees": []  
    }  

    events.append(event)

    return jsonify({'message': 'Event created successfully'})



# events description
@app.route("/events/<event_name>")
def get_event(event_name):
    for event in events:
        if event_name == event["name_event"]:
            return jsonify(event)
    return jsonify({'error': 'event not found'}), 404



# signup events
@app.route("/events/<event_name>/sign_up", methods=['POST'])
def sign_up(event_name):
    data = request.json
    user_email = data.get("email") 
    
    if not user_email:
        return jsonify({'error': 'email is required'}), 400

    user = get_user(user_email)

    if user is None:
        return jsonify({'error': f'User {user_email} does not exist'})

    for event in events:
        if event["name_event"] == event_name:
            if event["places"] > 0:
                if user_email not in event["attendees"]:
                    event["attendees"].append(user_email)
                    event["places"] -= 1 
                    user["my_events"].append(event_name)
                    return jsonify({'message': 'You have successfully signed up!'})
                else:
                    return jsonify({'error': 'You are already signed up for this event'}), 400
            else:
                return jsonify({'error': 'No more places available for this event'}), 400
              
    return jsonify({'error': 'Event not found'}), 404

    

# sign out events
@app.route("/events/<event_name>/sign_out", methods=['POST'])
def sign_out(event_name):
    data = request.json
    user_email = data.get("email") 
    
    if not user_email:
        return jsonify({'error': 'email is required'}), 400
    
    for event in events:
        if event["name_event"] == event_name:
            if user_email in event["attendees"]:  
                event["attendees"].remove(user_email)
                event["places"] += 1 
                return jsonify({'message': 'You have successfully signed out!'})
            else:
                return jsonify({'error': 'You are not signed up for this event'}), 400
    
    return jsonify({'error': 'Event not found'}), 404



# deleting events
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






def get_user(email):
    for user in users:
        if email == user["email"]:
            return user       
    return None 


if __name__ == "__main__":
    app.run(debug=True)
