# Door Bell Service : A Web Service to run from a smart door bell with a camera.
# Author :  Korhan Akcura

import json
import requests
import requests
import cv2
import base64
import logging

from logging.handlers import RotatingFileHandler

from flask import Flask, jsonify

app = Flask(__name__, static_url_path='')

@app.route("/")
def root(): 
	return app.send_static_file('index.html')

@app.route("/api/ring", methods=['GET', 'POST'])
def take_and_send_picture():
	# initialize the camera
	cam = cv2.VideoCapture(0)
	ret, image = cam.read()
	if ret:
		cv2.imwrite('./static/images/send_image.jpg',image)
		retval, buffer = cv2.imencode('.jpg', image)
		jpg_as_text = base64.b64encode(buffer)
	cam.release()
	imageJSON = json.dumps({'picture' : jpg_as_text.encode('base64')})
	json_object = json.loads(imageJSON)
	try:
		res = requests.post('http://localhost:3000/api/image', json=json_object)
	except Exception:
		pass
	return jsonify({"result" : "SUCCESS"})

#if __name__ == '__main__':
#	handler = RotatingFileHandler('flask.log', maxBytes=10000, backupCount=1)
#	handler.setLevel(logging.INFO)
#	app.logger.addHandler(handler)
#app.run(host="0.0.0.0",port=5000)