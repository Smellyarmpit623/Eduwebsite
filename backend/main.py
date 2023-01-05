from typing import Union
from typing import List
import passlib.hash
from services import *
import fastapi
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from starlette.responses import RedirectResponse
from db_model import *
import fastapi.security as _security
from datetime import datetime
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

WritePermission=['Admin','Teacher Assistant','Tutor','Teacher']

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/Course/GetCourseItem/{ID}",response_model=List[schema.CourseItem])
async def GetCourseItem(ID,db_session=fastapi.Depends(connection_to_database)):
    result=db_session.query(Course).filter(Course.CourseID==ID).all()
    return result


@app.post("/User/Login/")
async def Login(Login:fastapi.security.OAuth2PasswordRequestForm=fastapi.Depends(),db_session=fastapi.Depends(connection_to_database)):

    result=db_session.query(User).filter(User.User_ID==Login.username).first()
    if type(result)==db_model.User and passlib.hash.bcrypt.verify(Login.password,result.Password):
        token=await create_token(result)
        return token
    else:
        raise fastapi.HTTPException(status_code=401, detail="Invalid Credentials")

@app.post("/User/Register/")
async def Register(Register:schema.Register,db_session=fastapi.Depends(connection_to_database)):
    result=db_session.query(User).filter(User.User_ID==Register.User_ID).first()
    if type(result)!=User:
        register_user(Register,db_session)
        result = db_session.query(User).filter(User.User_ID == Register.User_ID).first()
        return await create_token(result)
    else:
        raise fastapi.HTTPException(status_code=400, detail="User name already in use")

@app.get("/User/Me/",response_model=schema.User)
async def get_user(user:schema.User=fastapi.Depends(get_current_user)):
    return user


@app.post("/Course/AddItem/",response_model=schema.CourseItem)
async def Add_Item(Item:schema.CourseItem,db_session=fastapi.Depends(connection_to_database),user:schema.User=fastapi.Depends(get_current_user)):
    print(user.Title)
    if user.Title in WritePermission:
        await create_md(Item.ItemName)
        return await add_item(item=Item,db_session=db_session)
    else:
        raise fastapi.HTTPException(status_code=401,detail="Not authenticated")


@app.delete("/Course/DeleteItem")
async def DeleteItem(Item:schema.CourseItemUpdate,db_session=fastapi.Depends(connection_to_database),user:schema.User=fastapi.Depends(get_current_user)):
    if user.Title in WritePermission:
        item=await itemselector(Item=Item,db_session=db_session)
        db_session.delete(item)
        db_session.commit()
        return {"Msg":"Item has been deleted"}
    else:
        raise fastapi.HTTPException(status_code=401, detail="Not authenticated")

@app.put("/Course/UpdateItem")
async def UpdateItem(Item:schema.CourseItemUpdate,db_session=fastapi.Depends(connection_to_database),user:schema.User=fastapi.Depends(get_current_user)):
    if user.Title in WritePermission:
        await itemupdate(Item=Item,db_session=db_session)
        return {"Msg":"Item has been Updated"}
    else:
        raise fastapi.HTTPException(status_code=401, detail="Not authenticated")

@app.get("/User/Auth/")
async def GetAuth(user:schema.User=fastapi.Depends(get_current_user)):
    pass








