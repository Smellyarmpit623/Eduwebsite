from pydantic import BaseModel
from datetime import date, datetime, time, timedelta




class User(BaseModel):
    User_ID:str
    Password:str
    Title:str

    class Config:
        orm_mode = True

class Register(BaseModel):
    User_ID:str
    Password:str
    Ref:str
    class Config:
        orm_mode = True

class CourseItem(BaseModel):
    CourseID:str
    ItemName:str
    class Config:
        orm_mode = True

class CourseItemUpdate(BaseModel):
    CourseID:str
    ItemName:str
    MarkdownUpdate:str
    NewItemName:str
    class Config:
        orm_mode = True

class Membership(BaseModel):
    CourseID:str
    DateExpire: datetime
    class Config:
        orm_mode=True

class Content(BaseModel):
    Content:str

    class Config:
        orm_mode = True

class UpdateEntry(BaseModel):
    EntryName:str
    UpdateContent:str

    class Config:
        orm_mode = True


class UpdateMembership(BaseModel):
    CourseID:str
    User_ID:str
    Time:str

    class Config:
        orm_mode = True



