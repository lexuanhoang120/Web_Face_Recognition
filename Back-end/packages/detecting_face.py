import cv2
import numpy as np
from PIL import Image
from torch_mtcnn import detect_faces

SIZE = 2
PATH = 'D:/Documents/backendIdentifyHuman/main/'


def detect_one_face(image):
    # standarize detector input from cv2 image to PIL Image
    image = cv2.resize(image, (image.shape[1] // SIZE, image.shape[0] // SIZE))
    # if isinstance(image, (np.ndarray, np.generic)):
    #     image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # cv2.imshow("camera", image)
    # cv2.waitKey(0)
    image = Image.fromarray(image)

    # for some reason, detector randomly throws an error
    try:
        bounding_boxes = detect_faces(image)
        bounding_boxes = bounding_boxes[:, :-1].astype("int")
        return bounding_boxes * SIZE
    except:
        return np.array([])


def fetch_centroids(bounding_boxes):
    if len(bounding_boxes) == 0:
        return []
    return np.c_[
        (bounding_boxes[:, 0] + bounding_boxes[:, 2]) / 2,
        (bounding_boxes[:, 1] + bounding_boxes[:, 3]) / 2,
    ].astype("int")


def draw_bounding_boxes(frame, bounding_boxes, scores):
    for score, (x1, y1, x2, y2) in zip(scores, bounding_boxes):
        text = f"({score:0.2%})"
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(
            frame, text, (x1, y1 - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2
        )
    return frame
