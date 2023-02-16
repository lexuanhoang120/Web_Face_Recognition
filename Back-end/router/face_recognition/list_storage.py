import datetime

import pymongo
from fastapi import APIRouter, status, Form, HTTPException

router = APIRouter(prefix="/face_recognition/list_storage", tags=["list tab api"])
collection = pymongo.MongoClient(host='localhost', port=27017)["identify_human"]["list_storage"]


@router.get("/", status_code=status.HTTP_200_OK)
async def all_list_storage():
    try:
        if collection.count_documents({}) == 0:
            return {
                'data': {
                    'data': []
                },
                'errorCode': 0,
                'message': "NO CONTENT",
                'errors': [],
            }
        else:
            cursor = collection.find(
                filter={},
                sort=list({'create_time': -1}.items())
            )
            return {
                'data': {
                    'data': list(cursor)
                },
                'errorCode': 0,
                'message': "SUCCESS",
                'errors': [],
            }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.get("/{uid}", status_code=status.HTTP_200_OK)
async def get_list_name(uid: int, ):
    try:
        if collection.count_documents({'_id': uid}) == 0:
            return {
                'data': [],
                'errorCode': 0,
                'message': "NO CONTENT",
                'errors': [],
            }
        else:
            return {
                'data': list(collection.find({'_id': uid}))[0],
                'errorCode': 0,
                'message': "SUCCESS",
                'errors': [],
            }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.post("/", status_code=201)
async def create_list_name(list_name: str = Form()):
    try:
        if collection.count_documents(filter={"list_name": list_name}) != 0:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="EXISTED"
            )
        id_list_storage = open('more/id_list_storage.txt').read()
        id_list_storage = int(id_list_storage) + 1
        open('more/id_list_storage.txt', 'w').write(str(id_list_storage))
        document = {
            '_id': id_list_storage,
            'list_name': list_name,
            'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        collection.insert_one(document)
        return {
            "data": document,
            "errorCode": 0,
            "message": "CREATED",
            "errors": []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.put("/{uid}", status_code=status.HTTP_202_ACCEPTED)
async def update_list_name(uid: int, list_name: str = Form()):
    try:
        collection.update_one(
            {'_id': uid},
            {"$set": {"list_name": list_name,
                      "created_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}})
        return {
            "data": list(collection.find({'_id': uid}))[0],
            "errorCode": 0,
            "message": "UPDATED",
            "errors": []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.delete("/{uid}", status_code=status.HTTP_202_ACCEPTED)
async def delete_list_name(uid: int):
    try:
        collection.delete_one({"_id": uid})
        return {
            'data': [],
            "errorCode": 0,
            "message": "DELETED",
            "errors": []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )
