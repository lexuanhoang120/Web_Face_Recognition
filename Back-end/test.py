from fastapi import FastAPI

from router.face_recognition import add_target
from fastapi import FastAPI

from router.face_recognition import add_target

app = FastAPI()
app.include_router(add_target.router)









import uvicorn

if __name__ == "__main__":
    uvicorn.run("test:app", host='0.0.0.0', port=8000, reload=True)
