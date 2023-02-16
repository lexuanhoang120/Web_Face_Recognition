import numpy as np
import pymongo
import tensorflow as tf

connection = pymongo.MongoClient(host='115.79.199.129', port=27017)
collection = connection["identify_human"]["embedding_face"]

# t1 = time.time()
# result = connection['identify_human']['embedding_face'].find(
#     filter={},
#     projection={
#     '_id': 0,
#         'id':0,
#         'image_path':0
# }
# )

# a = 0
# for i in result:
#     print(a)
#     a = a+1
#
#
# print(time.time()-t1)


# t1 = time.time()
# arr = np.array([])
# for i in result:
#     if arr.size == 0:
#         arr = np.array(i['embedding_face'])
#     else:
#         # pass
#         arr = np.append(arr,i["embedding_face"], axis=0)
#     print(i)
#     # break
# print(time.time() - t1)


arr = np.load("D:/Documents/backendIdentifyHuman/main/test/save.npy")
arr = np.reshape(arr, (-1, 2048))
target_embedding = np.load("D:/Documents/backendIdentifyHuman/main/test/target.npy")
arr = tf.constant(arr)
target_embedding = tf.constant(target_embedding)
a = tf.concat([arr, [target_embedding]], axis=0)
print(a)

# file = tf.constant(['xuanhoang'])
# tf.io.write_file(file, arr)

# arr.assign(target_embedding.numpy().reshape((2048,1)))
# print(arr)
# ti = []
# # for i in range(10):
# t1 = time.time()
# a = tf.keras.losses.cosine_similarity(target_embedding,arr)
#
# # print(np.argmin(a))
# print(a[5].numpy())
# print('time on tf: ',time.time() - t1)
# t2 = time.time() - t1
# ti.append(t2)
#
# ti = np.array(ti)
# print(ti.mean())

# arr = np.load("D:/Documents/backendIdentifyHuman/main/test/save.npy")
# arr = np.reshape(arr,(-1,2048))
# target_embedding = np.load("D:/Documents/backendIdentifyHuman/main/test/target.npy")
# tempDistance = np.array([])
# t1 = time.time()
# for i in arr:
#     if tempDistance.size == 0:
#         tempDistance = np.array(cosine(target_embedding,i ))
#     else:
#         tempDistance = np.append(tempDistance, cosine(target_embedding,i ),)
#
#     # print(np.argmin(tempDistance))
#
# print('time on numpy: ', time.time() - t1)
# print(np.argmin(tempDistance))
# print(tempDistance[5])
# ti = np.array(ti)
# # print("mean",ti.mean())
