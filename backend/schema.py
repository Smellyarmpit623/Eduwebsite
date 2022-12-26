from pydantic import BaseModel


class Course(BaseModel):
    CourseID:str
    ItemName:str
    class Config:
        orm_mode = True

class Login(BaseModel):
    User_ID:str
    Password:str

class Register(BaseModel):
    User_ID:str
    Password:str