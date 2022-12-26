from typing import Union
from typing import List

import fastapi
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from db_model import *
import fastapi.security as _security
import schema

db_session = connection_to_database()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/GetCourseItem",response_model=List[schema.Course])
async def GetCourseItem(db_session=fastapi.Depends(connection_to_database)):
    result=db_session.query(Course).all()
    return result

@app.post("/Login/")
async def Login(Login:schema.Login,db_session=fastapi.Depends(connection_to_database)):

    result=db_session.query(User).filter(User.User_ID==Login.User_ID,User.Password==Login.Password)
    result=list(result)
    if len(result) == 0:
        return {"result":"AuthFailed"}
    else:
        return {"result":"AuthSuccessed"}

@app.post("/Register/")
async def Register(Register:schema.Login,db_session=fastapi.Depends(connection_to_database)):

    result=db_session.query(User).filter(User.User_ID==Login.User_ID,User.Password==Login.Password)
    result=list(result)
    if len(result) == 0:
        return {"result":"AuthFailed"}
    else:
        return {"result":"AuthSuccessed"}




