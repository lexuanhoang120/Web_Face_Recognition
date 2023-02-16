import numpy as np
from keras_vggface.utils import preprocess_input
from keras_vggface.vggface import VGGFace
from numpy import asarray


class EmbeddingFace():
    def __init__(self):
        self.model = VGGFace(model='resnet50', include_top=False, input_shape=(224, 224, 3), pooling='avg')
        self.required_size = (224, 224)

    def embedding_face(self, image_face):
        processed_image = preprocess_input(np.expand_dims(asarray(image_face, 'float32'), axis=0), version=2)
        embedding = self.model.predict(processed_image)[0]
        return embedding.tolist()

