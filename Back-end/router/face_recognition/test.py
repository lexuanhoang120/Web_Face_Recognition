from main.packages.detecting_face import detect_one_face

PATH = 'D:/Documents/backendIdentifyHuman/main/'
import cv2

# dirname = os.path.dirname(__file__)
# print(dirname)
# filename = os.path.join(dirname, )
img = cv2.imread(PATH + '/image_from_frontend/context/01.15.44.754.jpg')
print((img).shape)

bboxes = detect_one_face(img)
print(bboxes)
image_face = img[max(bboxes[0][1] - 20, 0):
                 min(bboxes[0][3] + 20, img.shape[0]),
             max(bboxes[0][0] - 20, 0):
             min(bboxes[0][2] + 20, img.shape[1])].resize(224, 224)

# image_face = cv2.resize(image_face, (224, 224))
cv2.imshow('camera', image_face)
cv2.waitKey(0)
print(bboxes.shape)

# img = draw_bounding_boxes(img,bboxes, scores)
# cv2.imshow('camera', img)
# cv2.waitKey(0)
