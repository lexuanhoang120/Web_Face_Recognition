import hashlib
import secrets
import traceback

import pymongo
from fastapi import APIRouter, Response, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

router = APIRouter(
    prefix="/auth",
    tags=['auth tab'],
)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
collection = pymongo.MongoClient(host='localhost', port=27017)["identify_human"]["login_accounts"]


class Login(BaseModel):
    username: str
    password: str


@router.post("/login", status_code=200)
async def login(information_login: Login, response: Response):
    try:
        saved_hashed_password = list(collection.find(filter={'username': information_login.username},
                                                     projection={'_id': 0, 'username': 0, 'access': 0}))[0]['password']
        hashed_password = hashlib.sha256(information_login.password.encode()).hexdigest()
        if hashed_password == saved_hashed_password:
            response.status_code = status.HTTP_200_OK
            return {
                "data": {
                    "access_token": secrets.token_hex()
                },
                "errorCode": 0,
                "message": "Success",
                "errors": []
            }

        else:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {
                "data": [],
                "errorCode": 1,
                "message": "Failed",
                "errors": "Password is wrong"
            }

    except Exception as error:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "data": [],
            "errorCode": 3001,
            "message": "Not Success",
            "errors": {'error': error,
                       'trace_back': traceback.print_exc()}
        }


@router.get("/me", status_code=200)
async def get_profile():
    return {
        "data": {'username': 'xuanhoang'},
        'errorCode': 0,
        'message': [],
        'errors': []
    }

# from datetime import datetime, timedelta
# from typing import Union
# from fastapi import APIRouter
# from fastapi import Depends, FastAPI, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jose import JWTError, jwt
# from passlib.context import CryptContext
# from pydantic import BaseModel
#
# # to get a string like this run:
# # openssl rand -hex 32
# SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30
#
#
# fake_users_db = {
#     "johndoe": {
#         "username": "johndoe",
#         "full_name": "John Doe",
#         "email": "johndoe@example.com",
#         "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
#         "disabled": False,
#     }
# }
#
#
# class Token(BaseModel):
#     access_token: str
#     token_type: str
#
#
# class TokenData(BaseModel):
#     username: Union[str, None] = None
#
#
# class User(BaseModel):
#     username: str
#     email: Union[str, None] = None
#     full_name: Union[str, None] = None
#     disabled: Union[bool, None] = None
#
#
# class UserInDB(User):
#     hashed_password: str
#
#
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
#
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
#
# router = APIRouter(
#     prefix="/auth/login",
#     tags=['crud target tab'],
# )
#
#
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)
#
#
# def get_password_hash(password):
#     return pwd_context.hash(password)
#
#
# def get_user(db, username: str):
#     if username in db:
#         user_dict = db[username]
#         return UserInDB(**user_dict)
#
#
# def authenticate_user(fake_db, username: str, password: str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user
#
#
# def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt
#
#
# async def get_current_user(token: str = Depends(oauth2_scheme)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user
#
#
# async def get_current_active_user(current_user: User = Depends(get_current_user)):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user
#
#
# @router.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}
#
#
# @router.get("/users/me/", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
#     return current_user
#
#
# @router.get("/users/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]
