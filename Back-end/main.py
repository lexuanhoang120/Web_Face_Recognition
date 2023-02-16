import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import login
from router.face_recognition import list_information, list_storage, dashboard

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )

# Mount images directory to /allImage/images in order to access from browser
# app.mount("/face_recognition/list_information/image_from_frontend", StaticFiles(directory="image_from_frontend"),
#           name="image_from_frontend")
app.mount("/face_recognition/list_information/images", StaticFiles(directory="images"), name="image_folder_local")

# @app.on_event("startup")
# async def startup_event():
#     global connection, id_list_storage, id_list_information
#     connection = pymongo.MongoClient(host='115.79.199.129', port=27017)
#     id_list_storage = open('more/id_list_storage.txt').read()
#     id_list_information = open('more/id_list_information.txt').read()
#
#
# @app.on_event("shutdown")
# def shutdown_event():
#     connection.close()


app.include_router(list_information.router)
app.include_router(list_storage.router)
app.include_router(dashboard.router)
app.include_router(login.router)

if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=9000, reload=True)
