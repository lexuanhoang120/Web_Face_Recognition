import pymongo

collection = pymongo.MongoClient(host='115.79.199.129', port=27017)["identify_human"]["login_accounts"]

# result = list(collection.find({'id':10},projection = {'_id':0,'embedding_face':0,'target_embedding',id}))
# collection.update_many({},{"$unset":{'target_embedding':1}})
# # db.example.update({}, {$unset: {words:1}}, false, true);
# result = collection.find(filter={
#     'id': 10
# }, projection={
#     '_id': 0,
#     'id': 0,
#     'embedding_face': 0
# })
# for i in result:
#     print(i['image_path'])
# imagepaths = ["xuanhoang","xuandsd","sdasdasdas"]
# collection.insert_many([{'_id': uuid.uuid4().__str__(),
#                     'id': 10,
#                     'image_path': image,} for image in imagepaths ])

# collection.insert_one({
#     'username':'xuanhoang',
#     'password': hashlib.sha256("xuanhoang".encode()).hexdigest(),
#     'access': 1


# })
