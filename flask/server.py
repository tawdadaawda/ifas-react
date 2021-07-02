import logging

from flask.app import Flask
from flask_socketio import SocketIO
from flask import Flask, render_template, request

app = Flask(__name__)
socketio = SocketIO(app, logger=False, cors_allowed_origins="*")
app.logger.disabled = True
log = logging.getLogger('werkzeug')
log.disabled = True


@app.route("/")
def connect_root():
    print("[INFO] client connected: {}".format(request.sid))

# Reactからの接続時出力メッセージ


@socketio.on("connect", namespace="/web")
def connect_web():
    print("[INFO] Web client connected: {}".format(request.sid))

# Reactからの切断時出力メッセージ


@socketio.on("disconnect", namespace="/web")
def disconnect_web():
    print("[INFO] Web client disconnected: {}".format(request.sid))

# Realsense動画出力からの接続時出力メッセージ


@socketio.on("connect", namespace="/cv")
def connect_cv():
    print("[INFO] CV client connected: {}".format(request.sid))

# Realsense動画出力からの切断時出力メッセージ


@socketio.on("disconnect", namespace="/cv")
def disconnect_cv():
    print("[INFO] CV client disconnected: {}".format(request.sid))


# Realsense動画出力からReacへの動画データ出力
@socketio.on("cv2server", namespace="/cv")
def handle_cv_message(message):
    socketio.emit("image", {"image": message["image"], "type": message["type"]}, namespace="/web")

    

# Realsense動画出力からReacへの動画データ出力

@socketio.on("message", namespace="/web")
def handle_web_message(message):
    socketio.emit("message", message, namespace="/cv")

# Realsense動画出力からReacへの動画データ出力

@socketio.on("clothes", namespace="/web")
def handle_web_clothes(clothes):
    print("Clothes!")
    socketio.emit("clothes", clothes, namespace="/cv")


@socketio.on("edge", namespace="/web")
def handle_web_edge(edge):
    print("Edge")
    socketio.emit("edge", edge, namespace="/cv")


# Realsense動画出力からReacへの動画データ出力
if __name__ == "__main__":
    print("[INFO] Starting server at http:localhost:5000")
    socketio.run(app=app,  host="0.0.0.0", port=5000)
