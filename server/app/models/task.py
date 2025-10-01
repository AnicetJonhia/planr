from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum

class TaskStatus(enum.Enum):
    A_FAIRE = "À faire"
    EN_COURS = "En cours"
    EN_REVISION = "En révision"
    TERMINE = "Terminé"

class TaskPriority(enum.Enum):
    BASSE = "Basse"
    MOYENNE = "Moyenne"
    HAUTE = "Haute"

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text)
    status = Column(Enum(TaskStatus), default=TaskStatus.A_FAIRE)
    priority = Column(Enum(TaskPriority), default=TaskPriority.MOYENNE)
    is_completed = Column(Boolean, default=False)
    due_date = Column(DateTime)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Foreign Keys
    project_id = Column(Integer, ForeignKey("projects.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relations
    project = relationship("Project", back_populates="tasks")
    assignee = relationship("User", back_populates="tasks")