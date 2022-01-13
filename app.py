from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/getDefinition")
def getDefinition():
    try:
        word = request.args.get("word")
        a = requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        b = json.loads(a.text)
        return json.loads(json.dumps(b[0]))
    except Exception:
        return {"status": "error"}
