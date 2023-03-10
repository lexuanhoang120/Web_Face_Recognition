"""
author : Xuan Hoang
Data : 23/9/2022
Function : find matching face in faces


"""

import os

import cv2
import numpy as np


# from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import img_to_array


class detectFace():

    def __init__(self):

        # initiate path for several model
        self.prototxtPath = os.path.sep.join(["main/more/models/", "deploy.prototxt"])
        self.weightsPath = os.path.sep.join(["main/more/models/",
                                             "res10_300x300_ssd_iter_140000.caffemodel"])
        self.faceNet = cv2.dnn.readNet(self.prototxtPath, self.weightsPath)
        self.maskNet = load_model("main/more/models/mask_detector.model")

    def detectFace(self, frame):
        # grab the dimensions of the frame and then construct a blob
        # from it

        h, w = frame.shape[:2]

        blob = cv2.dnn.blobFromImage(frame, 1.0, (300, 300),
                                     (104.0, 177.0, 123.0))

        # pass the blob through the network and obtain the face detections
        self.faceNet.setInput(blob)
        detections = self.faceNet.forward()

        # initialize our list of faces, their corresponding locations,
        # and the list of predictions from our face mask network

        if detections.size == 0:
            return np.array([])
        else:
            # loop over the detections
            for i in range(0, detections.shape[2]):

                # extract the confidence (i.e., probability) associated with
                # the detection
                # confidence = detections[0, 0, i, 2]

                # filter out weak detections by ensuring the confidence is
                # greater than the minimum confidence
                if detections[0, 0, i, 2] > 0.2:
                    # logging.info(f'Detected: {detections[0, 0, i, 2]*100} %')
                    # compute the (x, y)-coordinates of the bounding box for
                    # the object
                    box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                    startX, startY, endX, endY = box.astype("int")
                    # ensure the bounding boxes fall within the dimensions of
                    # the frame
                    startX, startY, endX, endY = max(0, startX), max(0, startY), min(w - 1, endX), min(h - 1, endY)

                    # extract the face ROI, convert it from BGR to RGB channel
                    # ordering, resize it to 224x224, and preprocess it 

                    face = frame[startY:endY, startX:endX]
                    if face.any():
                        face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
                        face = cv2.resize(face, (224, 224))
                        face = img_to_array(face)
                        face = preprocess_input(face)
                        face = np.expand_dims(face, axis=0)
                        prediction = self.maskNet.predict(face, batch_size=64)
                        yield np.array([startX, startY, endX, endY, prediction[0][0]], dtype=float)

            return np.array([])


import imutils

detecter = detectFace()
img = cv2.imread("main/test/05.56.50.852.jpg")
results = detecter.detectFace(img)
for result in results:
    startX, startY, endX, endY = int(result[0]), int(result[1]), int(result[2]), int(result[3])
    cv2.rectangle(img, (startX, startY), (endX, endY), (0, 255, 0), 2)
img = imutils.resize(img, width=1000)
cv2.imshow('camera', img)
cv2.waitKey(0)

# import imutils
# detecter = detectFace()
# # src = r"rtsp://admin:space123@192.168.1.49:554"
# src = 0
# cap = cv2.VideoCapture(src)
# # img = cv2.imread('datatest/istockphoto-1264660231-612x612.jpg')
# while True:
#     ret,img = cap.read()
#     if not ret:
#         break

#     results = detecter.detectFace(img)
#     # if results.size ==0:
#     #     print('hi')

#     for result in results:
#         if result.size == 0:
#             print('hle')
#             break


#         startX, startY, endX, endY = int(result[0]),int(result[1]),int(result[2]),int(result[3])

#         mask = int(result[4])
#         # print(mask)
#         if mask < 0.5:
#             color = (0, 255, 0)
#         else:
#             color = (255, 0, 0)

#         cv2.rectangle(img, (startX, startY), (endX, endY), color, 2)


#     img = imutils.resize(img,width=1000)
#     cv2.imshow('img', img)
#     cv2.waitKey(1)


# print(type(preds))
# print(locs.shape)

# for i in range(locs.shape[0]):
#     
#     

# # cv2.rectangle(img, (0, 0), (200, 200), (0, 0, 0), -1)
# img = imutils.resize(img, width=480)
# img = imutils.resize(img , height=480)


# print(locs)
# print(preds)
# vs = VideoStream(0).start()
# time.sleep(2.0)
# ds = human_mask()
# while 1:

#     print('1')
# # loop over the frames from the video stream
# while True:
# 	# grab the frame from the threaded video stream and resize it
# 	# to have a maximum width of 400 pixels
# 	frame = vs.read()
# 	# frame = imutils.resize(frame, width=400)


# 	# detect faces in the frame and determine if they are wearing a
# 	# face mask or not
# 	(locs, preds) = ds.detect_and_predict_mask(frame)
#     # print("d")


# 	# loop over the detected face locations and their corresponding
# 	# locations
# 	for (box, pred) in zip(locs, preds):
# 		# unpack the bounding box and predictions
# 		(startX, startY, endX, endY) = box
# 		(mask, withoutMask) = pred

# 		# determine the class label and color we'll use to draw
# 		# the bounding box and text
# 		label = "Mask" if mask > withoutMask else "No Mask"
# 		color = (0, 255, 0) if label == "Mask" else (0, 0, 255)

# 		# include the probability in the label
# 		label = "{}: {:.2f}%".format(label, max(mask, withoutMask) * 100)

# 		# display the label and bounding box rectangle on the output
# 		# frame
# 		cv2.putText(frame, label, (startX, startY - 10),
# 			cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 2)
# 		cv2.rectangle(frame, (startX, startY), (endX, endY), color, 2)

# 	# show the output frame
# 	cv2.imshow("Frame", frame)
# 	key = cv2.waitKey(1) & 0xFF

# 	# if the `q` key was pressed, break from the loop
# 	if key == ord("a"):
# 		break

# # do a bit of cleanup
# cv2.destroyAllWindows()
# vs.stop()
