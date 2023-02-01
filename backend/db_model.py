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
    Title=Column("Title",String,nullable=False)
    Ref = Column("Ref", String, nullable=False)

    def __init__(self, User_ID, Password, Title ,Ref):
        self.User_ID=User_ID
        self.Password=Password
        self.Title=Title
        self.Ref=Ref


class Course(Base):
    __tablename__ = "Course"
    ItemID=Column("ItemID", Integer,primary_key=True)
    CourseID = Column("CourseID", String)
    ItemName = Column("ItemName", String)
    def __init__(self,CourseID, ItemName):
        self.ItemID=None
        self.CourseID=CourseID
        self.ItemName=ItemName

class Membership(Base):
    __tablename__ = "Membership"
    MembershipID = Column("MembershipID", Integer,primary_key=True)
    User_ID = Column("User_ID", String)
    CourseID = Column("CourseID", String)
    DateExpire = Column("DateExpire", DateTime, nullable=False)

    def __init__(self, User_ID, CourseID, DateExpire):
        self.MembershipID=None
        self.User_ID=User_ID
        self.CourseID=CourseID
        self.DateExpire=DateExpire


class Word(Base):
    __tablename__ = "Word"
    WordID=Column("WordID", Integer,primary_key=True)
    Word = Column("Word", String)
    def __init__(self,Word):
        self.WordID=None
        self.Word=Word


def connection_to_database():
    engine=create_engine("sqlite:///DB.db",echo=True)
    #Base.metadata.create_all(bind=engine)
    Session=sessionmaker(autocommit=False, autoflush=False, bind=engine)
    try:
        session=Session()
        return session
    finally:
        session.close()




db=connection_to_database()
# student=User("Steve","123123",datetime.datetime(2023, 6, 23),"Student")
# admin=User("admin","admin",datetime.datetime(2222,12,12),"Admin")
# db.add(student)
# db.add(admin)
# db.commit()

