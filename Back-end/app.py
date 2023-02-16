import datetime
from io import BytesIO
from typing import Optional

import pymongo
import uvicorn
from PIL import Image
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

global connection, id_list_storage, id_list_information

app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )

# Mount images directory to /allImage/images in order to access from browser
app.mount("/face_recognition/list_information/images", StaticFiles(directory="images"), name="image_folder_local")
app.mount("/face_recognition/list_information/image_from_frontend", StaticFiles(directory="image_from_frontend"),
          name="image_from_frontend")


@app.on_event("startup")
async def startup_event():
    global connection, id_list_storage, id_list_information
    connection = pymongo.MongoClient(host='localhost', port=27017)
    id_list_storage = open('more/id_list_storage.txt').read()
    id_list_information = open('more/id_list_information.txt').read()


@app.on_event("shutdown")
def shutdown_event():
    connection.close()


# -----------------------------------------------------------------------------------------------
@app.get("/face_recognition/list_information/")
async def all_list_face_recognition(skip_number: int, limit_number: int):
    collection = connection["identifyHuman"]["list_information"]
    cursor = collection.find({}).skip(skip_number).limit(limit_number)
    return {'page': list(cursor), 'total_page': int(collection.count_documents({}) / 50) + 1}


@app.get("/face_recognition/list_information/search/")
async def search_list_face_recognition(list_name_search: str, skip_number: int, limit_number: int,
                                       ):
    collection = connection["identifyHuman"]["list_information"]
    cursor = collection.find({'list': list_name_search, }, {'_id': 0}).skip(skip_number).limit(limit_number)
    return {'page': list(cursor),
            'total_page': int(collection.count_documents({'list': list_name_search, }) / 50) + 1}


# -----------------------------------------------------------------------------------------------

@app.get("/face_recognition/list_storage/")
async def all_list_storage():
    collection = connection["identifyHuman"]["list_storage"]
    cursor = collection.find({})
    return list(cursor)


class ListStorage(BaseModel):
    list_name: str


@app.post("/face_recognition/list_storage/")
async def all_list_storage(list_name: ListStorage):
    global id_list_storage
    collection = connection["identifyHuman"]["list_storage"]
    id_list_storage = int(id_list_storage) + 1
    collection.insert_one(
        {'_id': id_list_storage, 'list_name': list_name.list_name,
         'created_time': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
    open('more/more/id_list_storage.txt', 'w').write(str(id_list_storage))
    return id_list_storage


@app.put("/face_recognition/list_storage/{uid}")
async def all_list_storage(uid, list_name_new: ListStorage):
    collection = connection["identifyHuman"]["list_storage"]
    collection.update_one({'_id': uid},
                          {"$set": {"list_name": list_name_new.list_name,
                                    "created_time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}})
    return 0


@app.delete("/face_recognition/list_storage/{uid}")
async def all_list_storage(uid):
    collection = connection["identifyHuman"]["list_storage"]
    collection.delete_one({'_id': uid})
    return 0


# --------------------------------------------------------------------------------------------


class InformationFrontendUpload(BaseModel):
    name: str
    list: str
    birth_day: Optional[str] = None
    gender: Optional[str] = None
    ID: Optional[str] = None


@app.post("/face_recognition/list_information/add_target/")
async def save_upload_file_fronted(file: UploadFile = File()):
    image = Image.open(BytesIO(await file.read()))
    image_path = f"image_from_frontend/image{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.jpg"
    image.save(image_path)
    collection = connection["identifyHuman"]["list_information"]
    global id_list_information
    id_list_information = id_list_information + 1
    collection.insert_one(
        {
            '_id': id_list_information,
            'imagePath': image_path

        }
    )

    open('more/more/id_list_information.txt', 'w').write(str(id_list_information))

    return 0


# --------------------------------------------------------------------------------------------


if __name__ == "__main__":
    uvicorn.run("app:app", host='0.0.0.0', port=9000, reload=True)
