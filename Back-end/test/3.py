import random
import time

import numpy as np
from pymongo import MongoClient
from scipy.spatial.distance import cosine

random.seed(1)
# Requires the PyMongo package.
# https://api.mongodb.com/python/current
t1 = time.time()
client = MongoClient('mongodb://115.79.199.129:27017/')
filter = {}
project = {
    'embedding_face': 1,
    '_id': 0
}

result = client['identify_human']['embedding_face'].find(
    filter=filter,
    projection=project
)

target_embedding = np.random.random((2048,)).tolist()
print(sum(target_embedding))
tempDistance = np.array([])

for i in result:
    # print(np.array(i['embedding_face']).shape)

    if tempDistance.size == 0:
        tempDistance = np.array([cosine(target_embedding, np.array(i['embedding_face']))])
    else:
        # pass
        tempDistance = np.append(tempDistance, [cosine(target_embedding, np.array(i['embedding_face']))], axis=0)
print(np.argmin(tempDistance))
print(time.time() - t1)
# print(np.array(i['embedding_face']))
# print(np.array(list(result)).)
