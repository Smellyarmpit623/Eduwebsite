from sqlalchemy import *
from sqlalchemy.ext.declarative import *
from sqlalchemy.orm import *
import json
from datetime import datetime
import datetime



Base = declarative_base()

class User(Base):
    __tablename__ = "User"
    User_ID=Column("User_ID",String,primary_key=True)
    Password=Column("Password",String)
    DateExpire=Column("DateExpire",DateTime,nullable=False)
    Title=Column("Title",String,nullable=False)

    def __init__(self, User_ID, Password, DateExpire, Title):
        self.User_ID=User_ID
        self.Password=Password
        self.DateExpire=DateExpire
        self.Title=Title

class Course(Base):
    __tablename__ = "Course"
    CourseID = Column("CourseID", String, primary_key=True)
    ItemName = Column("ItemName", String)
    def __init__(self, CourseID, ItemName):
        self.CourseID=CourseID
        self.ItemName=ItemName


def connection_to_database():
    engine=create_engine("sqlite:///DB.db",echo=True)
    # Base.metadata.create_all(bind=engine)
    Session=sessionmaker(autocommit=False, autoflush=False, bind=engine)
    try:
        session=Session()
        return session
    finally:
        session.close()




# db=connection_to_database(Base)
# student=User("Steve","123123",datetime.datetime(2023, 6, 23),"Student")
# admin=User("admin","admin",datetime.datetime(2222,12,12),"Admin")
# db.add(student)
# db.add(admin)
# db.commit()

