import schema as _schema
import fastapi
from fastapi import Depends
import db_model
from datetime import datetime
import passlib.hash
import os
import jwt
import io
import json
import fastapi.security
from sqlalchemy import *
from sqlalchemy.ext.declarative import *
from sqlalchemy.orm import *
oauth2schema=fastapi.security.OAuth2PasswordBearer(tokenUrl="/User/Login/")

JWT_SECRET="SteveWenJWTScrect"
def register_user(Register:_schema.Register,db_session=fastapi.Depends(db_model.connection_to_database)):
    register_user = db_model.User(Register.User_ID, passlib.hash.bcrypt.hash(Register.Password), "Student")
    db_session.add(register_user)
    db_session.commit()
    try:
        db_session.refresh(db_model.User)
    except:
        pass

async def create_token(para_user:db_model.User):
    userobj=_schema.User.from_orm(para_user)
    #userobj.DateExpire=str(userobj.DateExpire)
    token=jwt.encode(payload=userobj.dict(),key=JWT_SECRET)
    return dict(access_token=token,token_type="bearer")


async def get_current_user(db_session=fastapi.Depends(db_model.connection_to_database), token:str= fastapi.Depends(oauth2schema)):
    try:
        payload = jwt.decode(token,JWT_SECRET,algorithms=["HS256"])
        user= db_session.query(db_model.User).get(payload["User_ID"])
    except:
        raise fastapi.HTTPException(status_code=401,detail="Not authenticated")

    return _schema.User.from_orm(user)

async def add_item(db_session, item:_schema.CourseItem):
    Item = db_model.Course(CourseID=item.CourseID, ItemName=item.ItemName)
    db_session.add(Item)
    db_session.commit()
    try:
        db_session.refresh(db_model.Course)
    except:
        pass
    return _schema.CourseItem.from_orm(Item)

async def create_md(mdname,cid):
    f = open("./mds/"+cid+"/"+mdname + ".md", "a")
    f.close()


async def itemselector(db_session,Item:_schema.CourseItemUpdate):
    item=db_session.query(db_model.Course).filter(db_model.Course.ItemName==Item.ItemName).first()
    if item is None:
        raise fastapi.HTTPException(status_code=404,detail="Item does not exist")
    return item

async def itemupdate(db_session,Item:_schema.CourseItemUpdate):
    item=db_session.query(db_model.Course).filter(db_model.Course.ItemName==Item.ItemName).first()
    if item is None:
        raise fastapi.HTTPException(status_code=404, detail="Item does not exist")
    oldfilepath="./mds/"+ item.ItemName +".md"
    f = open(oldfilepath, "w")
    f.write(Item.MarkdownUpdate)
    f.close()
    newfilepath="./mds/"+ Item.NewItemName +".md"
    os.rename(oldfilepath,newfilepath)
    item.ItemName=Item.NewItemName
    db_session.commit()
    try:
        db_session.refresh(db_model.Course)
    except:
        pass

async def membership_init(CID,db_session,user:_schema.User):
    new_membership=db_model.Membership(User_ID=user.User_ID,CourseID=CID,DateExpire=datetime.now())
    try:
        db_session.add(new_membership)
        db_session.commit()
    except:
        fastapi.HTTPException(status_code=404,detail="Unknown error when creating membership record")
    try:
        db_session.refresh(db_model.Course)
    except:
        pass


async def itemcontent(CID,Itemname):
    f = io.open(file="./mds/" + CID + "/" + Itemname + ".md", mode="br+")
    content=f.read()
    f.close()
    return content
