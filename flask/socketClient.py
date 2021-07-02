import time
import numpy as np

from flask.globals import current_app
import engineio
import socketio
import cv2
import base64
from datetime import datetime
from cv.realsense import Realsense
from inference.GAN_inference import InferenceEngine

from socketio import namespace

sio = socketio.Client()
#sio = socketio.Client(logger=True, engineio_logger=True)

flag = None
clothesImage = None
edgeImage = None

@sio.on("message", namespace="/cv")
def onMessage(data):
    global flag
    flag = data
    print(flag)

@sio.on("clothes", namespace="/cv")
def onClothes(data):
    global clothesImage
    clothesImage = "../public" + data


@sio.on("edge", namespace="/cv")
def onEdge(data):
    global edgeImage
    edgeImage = "../public" + data

class SocketioClient(object):
    def __init__(self, sio):
        self.sio = sio
        self.server_addr = "localhost"
        self.server_port = 5000
        self.stream_fps = 6
        self.last_update_time = time.time()
        self.wait_time = (1/self.stream_fps)

    def setup(self):
        print('[INFO] Connecting to server http://{}:{}...'.format(
            self.server_addr, self.server_port))
        self.sio.connect(
            'http://{}:{}'.format(self.server_addr, self.server_port),
            transports=['websocket'],
            namespaces=['/cv'])
        # self.sio.wait()
        return self

    def _convert_image_to_jpeg(self, image):
        # Encode frame as jpeg
        frame = cv2.imencode('.jpg', image)[1].tobytes()
        # Encode frame in base64 representation and remove
        # utf-8 encoding
        frame = base64.b64encode(frame).decode('utf-8')
        return "data:image/jpeg;base64,{}".format(frame)

    def _convert_image_to_png(self, image):
        # Encode frame as png
        frame = cv2.imencode('.png', image)[1].tobytes()
        # Encode frame in base64 representation and remove
        # utf-8 encoding
        
        frame = base64.b64encode(frame).decode('utf-8')
        return "data:image/png;base64,{}".format(frame)

    def send_data(self, image, type):
        current_time = time.time()
        if current_time - self.last_update_time > self.wait_time:
            self.last_update_time = current_time

            self.sio.emit(
                'cv2server',
                {
                    "image": self._convert_image_to_png(image),
                    "type": type
                }, namespace="/cv")


    def check_exit(self):
        pass

    def close(self):
        self.sio.disconnect()


def main():
    global flag
    client = SocketioClient(sio).setup()
    realsense = Realsense()
    realsense.configurePipeline()
    realsense.startStream()
    inferenceEngine = InferenceEngine()
    forInference = None
    try:
        # Allow Webcam to warm up
        time.sleep(2.0)
        # loop detection
        while True:

            if flag == "shutter":
                global clothesImage
                global edgeImage

                output = inferenceEngine.infer(cv2.cvtColor(forInference, cv2.COLOR_BGR2RGB), clothesImage, edgeImage)
                

                sendVideo =cv2.cvtColor(output, cv2.COLOR_RGB2BGR)
                sendVideo = realsense.convert2RGBA(sendVideo)
                client.send_data(sendVideo,"inferenced")

            elif flag == "videoON":
                color_img, bg_removed_img = realsense.getFrame()
                forInference = bg_removed_img

                sendVideo = realsense.convert2RGBA(bg_removed_img)
                client.send_data(sendVideo,"color")

            elif flag == "videoOFF":
                None

            if client.check_exit():
                break

    finally:
        if client is not None:
            client.close()
        print("Program Ending")


if __name__ == "__main__":
    main()
