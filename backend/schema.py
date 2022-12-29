from pydantic import BaseModel
from datetime import date, datetime, time, timedelta




class User(BaseModel):
    User_ID:str
    Password:str
    DateExpire:datetime
    Title:str

    class Config:
        orm_mode = True

class Register(BaseModel):
    User_ID:str
    Password:str

    class Config:
        orm_mode = True

class CourseItem(BaseModel):
    CourseID:str
    ItemName:str
    class Config:
        orm_mode = True
