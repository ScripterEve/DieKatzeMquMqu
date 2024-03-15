from flask import Blueprint, send_file, send_from_directory

frontend = Blueprint("frontend", __name__)

@frontend.route("/")
def home_page():
    return send_file("home-page.html")

@frontend.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)