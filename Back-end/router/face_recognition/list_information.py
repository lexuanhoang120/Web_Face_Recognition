import datetime
import os
import uuid
from io import BytesIO
from typing import Union

import cv2
import numpy as np
import pymongo
from PIL import Image
from fastapi import APIRouter, UploadFile, File, Form, status, HTTPException
from fastapi import BackgroundTasks, Response
# noinspection PyUnresolvedReferences
from packages.detecting_face import detect_one_face
# noinspection PyUnresolvedReferences
from packages.embedding_face import EmbeddingFace
from pydantic import BaseModel

# "D:/Documents/backendIdentifyHuman/main/"

EMBEDDING_FACE = EmbeddingFace()

router = APIRouter(
    prefix="/face_recognition/list_information",
    tags=['list information'],
)

connection = pymongo.MongoClient(host='localhost', port=27017, )
collection_information = connection["identify_human"]["list_information"]
collection_embedding = connection["identify_human"]["embedding_face"]


# @router.get("/", status_code=status.HTTP_200_OK)
# async def all_list_information(page: int, rowsPerPage: int, ):
#     try:
#         if collection_information.count_documents({}) == 0:
#             return {
#                 'data': {'data': [],
#                          'nPages': 0,
#                          'nItems': 0
#                          },
#                 'errorCode': 0,
#                 'message': "NO CONTENT",
#                 'errors': []
#             }
#         else:
#             all_information = list(collection_information.find(filter={}, sort=list({'create_time': -1}.items())) \
#                                    .skip((page - 1) * rowsPerPage) \
#                                    .limit(rowsPerPage))
#             for information in all_information:
#                 uid = information['_id']
#                 image_face_path = list(collection_embedding.find(
#                     filter={'id': uid},
#                     projection={'_id': 0, 'embedding_face': 0, 'id': 0})
#                                        .limit(1))
#                 information.update(image_face_path[0])
#             return {
#                 'data': {'data': all_information,
#                          'nPages': int(collection_information.count_documents({}) / rowsPerPage) + 1,
#                          'nItems': collection_information.count_documents({})
#                          },
#                 'errorCode': 0,
#                 'message': "SUCCESS",
#                 'errors': []
#             }
#     except:
#         raise HTTPException(
#             status_code=400,
#             detail="ERROR"
#         )

@router.get("/", status_code=status.HTTP_200_OK)
async def all_list_information(page: int, rowsPerPage: int, ):
    try:
        if collection_information.count_documents({}) == 0:
            return {
                'data': {'data': [],
                         'nPages': 0,
                         'nItems': 0
                         },
                'errorCode': 0,
                'message': "NO CONTENT",
                'errors': []
            }
        else:
            all_list_information = collection_information.aggregate([
                {
                    '$lookup': {
                        'from': 'list_storage',
                        'localField': 'id_list_name',
                        'foreignField': '_id',
                        'as': 'list_name'
                    }
                }, {
                    '$project': {
                        'list_name': {
                            '$arrayElemAt': [
                                '$list_name', 0
                            ]
                        },
                        'created_time': 1,
                        'name': 1,
                        'id_list_name': 1,
                        'birth_day': 1,
                        'gender': 1,
                        'description': 1
                    }
                }, {
                    '$project': {
                        'list_name': '$list_name.list_name',
                        'created_time': 1,
                        'name': 1,
                        'id_list_name': 1,
                        'birth_day': 1,
                        'gender': 1,
                        'description': 1
                    }
                }, {
                    '$lookup': {
                        'from': 'embedding_face',
                        'localField': '_id',
                        'foreignField': 'id',
                        'as': 'image_path'
                    }
                }, {
                    '$project': {
                        'image_path': {
                            '$arrayElemAt': [
                                '$image_path', 0
                            ]
                        },
                        'created_time': 1,
                        'name': 1,
                        'id_list_name': 1,
                        'birth_day': 1,
                        'gender': 1,
                        'description': 1,
                        'list_name': 1,
                        '_id': 1
                    }
                }, {
                    '$project': {
                        'image_path': '$image_path.image_path',
                        'created_time': 1,
                        'name': 1,
                        'id_list_name': 1,
                        'birth_day': 1,
                        'gender': 1,
                        'description': 1,
                        'list_name': 1,
                        '_id': 1
                    }
                }, {
                    '$sort': {
                        'created_time': -1
                    }
                }, {
                    '$skip': (page - 1) * rowsPerPage
                }, {
                    '$limit': rowsPerPage
                }
            ]
            )
            return {
                'data': {'data': list(all_list_information),
                         'nPages': int(collection_information.count_documents({}) / rowsPerPage) + 1,
                         'nItems': collection_information.count_documents({})
                         },
                'errorCode': 0,
                'message': "SUCCESS",
                'errors': []
            }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


#
# @router.get("/search/", status_code=status.HTTP_200_OK)
# async def search_list_face_recognition(
#         id_list_name_search: str,
#         page: int,
#         rowsPerPage: int,
# ):
#     try:
#         if collection_information.count_documents(filter={'id_list_name': id_list_name_search}) == 0:
#             return {
#                 'data': {'data': [],
#                          'nPages': 0,
#                          'nItems': 0
#                          },
#                 'errorCode': 0,
#                 'message': "NO CONTENT",
#                 'errors': []
#             }
#         else:
#             searched_information = list(collection_information.find(
#                 filter={'list_name': id_list_name_search},
#                 sort=list({'create_time': -1}.items())
#             ) \
#                                         .skip((page - 1) * rowsPerPage) \
#                                         .limit(rowsPerPage))
#             for information in searched_information:
#                 uid = information['_id']
#                 image_face_path = list(collection_embedding.find(
#                     filter={'id': uid},
#                     projection={'_id': 0, 'embedding_face': 0, 'id': 0})
#                                        .limit(1))
#                 information.update(image_face_path[0])
#             return {
#                 'data': {'data': searched_information,
#                          'nPages': int(
#                              collection_information.count_documents(
#                                  filter={'list_name': id_list_name_search}) / rowsPerPage) + 1,
#                          'nItems': collection_information.count_documents(filter={'list_name': id_list_name_search})
#                          },
#                 'errorCode': 0,
#                 'message': "SUCCESS",
#                 'errors': []
#             }
#
#     except:
#         raise HTTPException(
#             status_code=400,
#             detail="ERROR"
#         )


@router.get("/{uid}", status_code=200)
async def get_information_target(uid: int):
    try:
        target_information = list(collection_information.find(
            filter={
                "_id": uid
            },
            projection={}
        )
        )

        target_face_path = list(collection_embedding.find(
            filter={
                "id": uid
            },
            projection={
                'id': 0,
                'embedding_face': 0
            }
        )
        )
        target_information[0]["image_path"] = target_face_path
        return {
            'data': target_information[0],
            "errorCode": 0,
            "message": "SUCCESS",
            "errors": []
        }


    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


class TargetInformation(BaseModel):
    image_face_paths: list[str]
    name: str
    id_list_name: int
    birth_day: int
    gender: int
    description: Union[str, None] = None


def background_task_add_target_information(image_face_paths):
    for image_face_path in image_face_paths:
        collection_embedding.update_one(
            {
                'image_path': image_face_path
            },
            {
                "$set":
                    {
                        "embedding_face": EMBEDDING_FACE.embedding_face(
                            cv2.imread(image_face_path
                                       )
                        )
                    }
            },
        )


@router.post("/", status_code=201)
async def add_target_information(information: TargetInformation, background_task: BackgroundTasks):
    try:
        id_list_information = int(open('more/id_list_information.txt').read()) + 1
        open('more/id_list_information.txt', 'w').write(str(id_list_information))
        # for image_face_path in information.image_face_paths:
        [
            collection_embedding.insert_one(
                {
                    '_id': uuid.uuid4().__str__(),
                    'id': id_list_information,
                    'image_path': image_face_path,
                }
            )
            for image_face_path in information.image_face_paths
        ]
        collection_information.insert_one(
            {
                '_id': id_list_information,
                'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                'name': information.name,
                'id_list_name': information.id_list_name,
                'birth_day': information.birth_day,
                'gender': information.gender,
                'description': information.description,
            }
        )
        background_task.add_task(background_task_add_target_information, information.image_face_paths)
        return {
            'data': {
                '_id': id_list_information,
            },
            'errorCode': 0,
            'message': "SUCCESS",
            'errors': []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.post("/detect/", status_code=201)
async def detect_image_target(response: Response, file: UploadFile = File(), ):
    try:
        image_context = Image.open(BytesIO(await file.read())).convert('RGB')
        # Transform image pillow to image opencv-python
        image_context = np.array(image_context)
        bounding_boxes = detect_one_face(image_context)
        if bounding_boxes.shape[0] == 1:
            # Convert RGB to BGR image_context = image_context[:, :, ::-1] image_context_path =
            # f"images/context/image_frontend_{datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')}.jpg" cv2.imwrite(
            # image_context_path, image_context)
            image_face = image_context[:, :, ::-1][
                         max(bounding_boxes[0][1] - 20, 0):
                         min(bounding_boxes[0][3] + 20, image_context.shape[0]),
                         max(bounding_boxes[0][0] - 20, 0):
                         min(bounding_boxes[0][2] + 20, image_context.shape[1])]
            image_face = cv2.resize(image_face, (224, 224))
            image_face_path = f"images/face/image_frontend_{datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')}.jpg"
            cv2.imwrite(image_face_path, image_face)
            return {
                'data': {
                    'face_detected': bounding_boxes.shape[0],
                    'image_face_path': image_face_path,
                },
                'errorCode': 0,
                'message': "SUCCESS",
                'errors': []
            }
        elif bounding_boxes.shape[0] > 1:
            response.status_code = status.HTTP_406_NOT_ACCEPTABLE
            return {
                'data': {},
                'errorCode': 0,
                'message': "OVER ONE PERSON",
                'errors': []
            }
        else:
            response.status_code = status.HTTP_406_NOT_ACCEPTABLE
            return {
                'data': {},
                'errorCode': 0,
                'message': "NO MATCHED",
                'errors': []
            }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


class TargetUpdateInformation(BaseModel):
    image_face_paths: list[str]
    id_delete_image_paths: list[str]
    name: str
    id_list_name: int
    birth_day: Union[int, None] = None
    gender: Union[int, None] = None
    description: Union[str, None] = None


def background_task_delete_image_path(id_delete_image_paths):
    for id_delete_image_path in id_delete_image_paths:
        try:
            os.remove(collection_embedding.find(filter={"_id": id_delete_image_path},
                                                                 projection={
                                                                     "_id": 0,
                                                                     "image_path": 1
                                                                 })[0]["image_path"])
            collection_embedding.delete_one({'_id': id_delete_image_path})
        except:
            pass


def background_task_add_embedding_face(uid, image_face_paths):
    for image_path in image_face_paths:
        try:
            if collection_embedding.count_documents({"image_path": image_path}) == 0:
                collection_embedding.insert_one(
                    {
                        "_id": uuid.uuid4().__str__(),
                        "id": uid,
                        "image_path": image_path,
                        "embedding_face": EMBEDDING_FACE.embedding_face(
                            cv2.imread(image_path)
                        )
                    }
                )
        except:
            pass


@router.put("/{uid}", status_code=status.HTTP_202_ACCEPTED)
async def update_information_target(uid: int, information: TargetUpdateInformation, background_task: BackgroundTasks):
    try:
        collection_information.update_one(
            {'_id': uid},
            {
                "$set":
                    {
                        'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                        'name': information.name,
                        'id_list_name': information.id_list_name,
                        'birth_day': information.birth_day,
                        'gender': information.gender,
                        'description': information.description,
                    }
            }
        )
        background_task.add_task(background_task_add_embedding_face, uid, information.image_face_paths)
        background_task.add_task(background_task_delete_image_path, information.id_delete_image_paths)
        #     for id_delete_image_path in information.id_delete_image_paths
        # ]
        return {
            'data': {},
            'errorCode': 0,
            'message': "UPDATED",
            'errors': []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


@router.post("/detect/delete/", status_code=status.HTTP_202_ACCEPTED)
async def delete_image_target(background_task: BackgroundTasks, image_face_path: str = Form(), ):
    try:
        background_task.add_task(background_task_delete_image_path, image_face_path)
        return {
            'data': {},
            'errorCode': 0,
            'message': "DELETED",
            'errors': []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )


def background_task_delete_information_target(uid):
    image_paths = collection_embedding.find(
        filter={
            'id': uid
        },
        projection={
            '_id': 0,
            'id': 0,
            'embedding_face': 0
        })
    for image_path in image_paths:
        try:
            os.remove(image_path["image_path"])
        except:
            continue
    collection_information.delete_one({'_id': uid})
    collection_embedding.delete_many({'id': uid})


@router.delete("/{uid}", status_code=status.HTTP_202_ACCEPTED)
async def delete_information_target(uid: int, background_task: BackgroundTasks):
    try:
        background_task.add_task(background_task_delete_information_target, uid)
        return {
            'data': {},
            'errorCode': 0,
            'message': "DELETED",
            'errors': []
        }
    except:
        raise HTTPException(
            status_code=400,
            detail="ERROR"
        )
