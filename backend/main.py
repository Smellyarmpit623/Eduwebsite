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
CourseList=['CAB-201','CAB-202','MXB-100']

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
    if user.Title in WritePermission:
        if Item.CourseID in CourseList:
            await create_md(Item.ItemName,Item.CourseID)
            return await add_item(item=Item,db_session=db_session)
        else:
            raise fastapi.HTTPException(status_code=404,detail="Course not found")
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

@app.get("/Course/GetContent/{Course_ID}/{ItemName}")
async def GetContent(Course_ID:str ,ItemName:str ,user:schema.User=fastapi.Depends(get_current_user),db_session=fastapi.Depends(connection_to_database)):
    if user.Title not in WritePermission:
        result = db_session.query(Membership).filter(user.User_ID == Membership.User_ID,Course_ID==Membership.CourseID).first()
        if type(result) != Membership:
            await membership_init(CID=Course_ID,db_session=db_session,user=user)
            raise fastapi.HTTPException(status_code=403,detail="Membership does not exist")
        elif result.DateExpire>datetime.now():
            return {"Path":"../../backend/mds/" + Course_ID + "/" + ItemName + ".md"}
        else:
            raise fastapi.HTTPException(status_code=403, detail="Membership has expired")













