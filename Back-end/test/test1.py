import pymongo

connection = pymongo.MongoClient(host='115.79.199.129', port=27017)
collection = connection["identify_human"]["embedding_face"]

import datetime


def insertdb(id, imagePath, name, listt, birthDay, gender, emb):
    document = {
        '_id': id,
        'image_path': imagePath,
        'create_time': datetime.datetime.now().__str__(),
        'name': name,
        'list': listt,
        'birth_day': birthDay,
        'gender': gender,
        'embedded_face': {'emb1': emb}

    }
    collection.insert_one(document)
    return 0


limagePath = ['images/192.168.1.47_01_20221019212211186_FACE_SNAP.jpg',
              'images/192.168.1.47_01_20221019212809304_FACE_SNAP.jpg',
              'images/192.168.1.47_01_20221019220840099_FACE_SNAP.jpg']
lname = ['dung', 'duy', 'hoang']
listt = 'icool'
lbirthDay = ['1999', '1998', '1997']
