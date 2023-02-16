import numpy as np
import pymongo

# target_embedding = np.random.random((2048,)).tolist()
connection = pymongo.MongoClient(host='115.79.199.129', port=27017)
collection = connection["identify_human"]["embedding_face"]
result = collection.find(filter={"id": 1057},
                         projection={
                             "_id": 0,
                             "image_path": 1
                         })[0]["image_path"]

print(type(result))


# import datetime


# collection.update_many({}, {"$set": {'target_embedding': target_embedding}})
# import time
# t1 = time.time()
# collection.delete_many({"list": 'icool'})
# print(time.time()-t1)
# # print(result)

# # print(list(collection.find({},)).__len__())
# collection.delete_many({'list':'icool'})


# username = 'admin'
# password = '41a98c127320b50b4475fedcf0e1c5198a185d2127ac59cac4a13ec04a703fbb'
# connection = pymongo.MongoClient('mongodb://%s:%s@127.0.0.1' % (username, password))
#
# collection = connection["identify_human"]["list_information"]
# uid = 1005
# a = collection.find({'_id': uid}, {'imagePath': 1, '_id': 0})
# print(list(collection.find({'_id': uid}, {'imagePath': 1, '_id': 0}))[0]['imagePath'])

# image_path = ['1','2','3']
# collection.update_one({'_id':uid}, {'$push':{'imagePath': image_path}})
# print(list(collection.find({})).__len__())
# cursor = collection.count_documents({})
# print(cursor)


# for dc in cursor:
#     print(dc)
# collection.delete_many({'list': 'icool'})
def insertdb(id, imagePath, ):
    document = {
        'id': id,
        'image_face_path': imagePath,
        'image_context_path': imagePath,
        'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f"),
        'camera_name': 'xuanhoang',
        'matched_1': imagePath,
        'percent_1': "10%",
        'matched_2': imagePath,
        'percent_2': "10%",
        'matched_3': imagePath,
        'percent_3': "10%",
        'x1': 10,
        'y1': 50,
        'x2': 100,
        'y2': 200,
        # 'name': name,
        # 'list': listt,
        # 'birth_day': birthDay,
        # 'gender': gender,
        # 'description': None
        # 'embedding_face': emb,

    }
    collection.insert_one(document)
    return 0


def inserface(id, imagepath):
    document = {
        'id': id,
        'image_path': imagepath,
        'embedding_face': np.random.random((2048,)).tolist()

    }
    collection.insert_one(document)

# for i in range(10000):
#     id = random.randint(1, 100)
#     imagepath = 'images/192.168.1.47_01_20221019212211186_FACE_SNAP.jpg'
#     inserface(id, imagepath)
#     print(i)

#
# #
# limagePath = ['images/192.168.1.47_01_20221019212211186_FACE_SNAP.jpg',
#               'images/192.168.1.47_01_20221019212809304_FACE_SNAP.jpg',
#               'images/192.168.1.47_01_20221019220840099_FACE_SNAP.jpg']
# lname = ['dung', 'duy', 'hoang']
# listt = 'icool'
# lbirthDay = ['1999', '1998', '1997']
# lgender = ['male', 'female']
# import random
# for i in range(20):
#     imagePath = limagePath[random.randint(0, 2)]
#     name = lname[random.randint(0, 2)]
#     birthDay = lbirthDay[random.randint(0, 2)]
#     gender = lgender[random.randint(0, 1)]
#     # emb = np.random.random((2048,)).tolist()
#     insertdb(None, imagePath, )
#     print(i)

# insertdb('images/192.168.1.47_01_20221019212211186_FACE_SNAP.jpg', 'dung', 'icool', '1989', 'male')
# insertdb('images/192.168.1.47_01_20221019212809304_FACE_SNAP.jpg', 'duy', 'icool', '1989', 'male')
# insertdb('images/192.168.1.47_01_20221019220840099_FACE_SNAP.jpg', 'hoang', 'icool', '1989', 'male')


# result = collection.insert_one(
# {"last_modified": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})

# a = collection.find({},{'last_modified':1}).sort('last_modified',-1)
# print(list(a))


# Requires the PyMongo package.
# https://api.mongodb.com/python/current

# client = MongoClient('mongodb://115.79.199.129:27017/')
# filter = {}
# project =
# sort = list({
#                 'created_time': -1
#             }.items())
# skip = 0
#
# sort = list({
#                 'created_time': -1
#             }.items())
#
# print(sort)
#
# limit = 10
#
# # collection = client['identify_human']['dashboard_storage']
#
# result = list(collection.find(
#     filter={},
#     projection={'_id': 0},
#     sort=list({
#                   'created_time': -1
#               }.items()),
#     skip=0,
#     limit=limit
# ))
#
# for i in result:
#     print(i)
