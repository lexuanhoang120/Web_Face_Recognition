import hashlib
import uuid

import pymongo

collection = pymongo.MongoClient(host='localhost', port=27017)["identify_human"]["login_accounts"]
string = "xuanhoang"

document = {
    '_id': uuid.uuid4().__str__(),
    'username': string,
    'password': hashlib.sha256(string.encode()).hexdigest(),
    'access': 0

}
collection.insert_one(document)
