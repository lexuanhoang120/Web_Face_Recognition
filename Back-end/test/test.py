import pymongo

connection = pymongo.MongoClient("mongodb://192.168.1.205:27017/")
#
collection = connection["identifyHuman"]["list_information"]
# value = {
#         'list_name': 'director',
#         'created_time': datetime.datetime.now().__str__() }
# collection.delete_many({'list': 'icool'})


# print(list(collection.find({})))

# myquery = { "list": "icool" }
# newvalues = { "$set": { "description": "Minnie" } }
#
# x = collection.update_many(myquery, newvalues)
# while True:
#     pass

import numpy as np

print(np.random.random((2048,)).shape)
