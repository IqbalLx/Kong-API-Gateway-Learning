from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def helloworld(methods=["GET"]):
    return jsonify({
        "message": "Hello from Flask!"
    })

@app.route("/<uname>")
def helloname(uname, methods=["GET"]):
    return jsonify({
        "message": f"Hello {uname}! from Flask!"
    })

