import pymongo
from fastapi import APIRouter

router = APIRouter(prefix="/face_recognition/dashboard", tags=["dashboard realtime face recognition"])
collection = pymongo.MongoClient(host='localhost', port=27017)["identify_human"]["dashboard_storage"]


@router.get("/realtime/{number_events}")
async def get_information_dashboard(number_events: int):
    return {
        'data': list(collection.find(
            filter={},
            projection={'_id': 0},
            sort=list({'created_time': -1}.items()),
            skip=0,
            limit=number_events,
        )),
        "errorCode": 0,
        "message": "SUCCESS",
        "errors": []
    }

# class ListStorage(BaseModel):
#     list_name: str
#
#
# @router.post("/")
# async def all_list_storage(list_name: ListStorage):
#     try:
#         id_list_storage = open('more/id_list_storage.txt').read()
#         id_list_storage = int(id_list_storage) + 1
#         collection.insert_one(
#             {'_id': id_list_storage, 'list_name': list_name.list_name,
#              'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
#         open('more/id_list_storage.txt', 'w').write(str(id_list_storage))
#         return id_list_storage
#     except Exception as error:
#         return {'error': error}
#
#
# @router.put("/{uid}")
# async def all_list_storage(uid: int, list_name_new: ListStorage):
#     try:
#         collection.update_one({'_id': uid},
#                               {"$set": {"list_name": list_name_new.list_name,
#                                         "created_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}})
#         return 0
#     except Exception as error:
#         return {'error': error}
#
#
# @router.delete("/{uid}")
# async def all_list_storage(uid: int):
#     try:
#         collection.delete_one({"_id": uid})
#         return 0
#     except Exception as error:
#         return {'error': error}
