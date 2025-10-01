from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum

class ProjectStatus(enum.Enum):
    EN_ATTENTE = "En attente"
    EN_COURS = "En cours"
    TERMINE = "Terminé"

class ProjectPriority(enum.Enum):
    BASSE = "Basse"
    MOYENNE = "Moyenne"
    HAUTE = "Haute"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(Text)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.EN_ATTENTE)
    priority = Column(Enum(ProjectPriority), default=ProjectPriority.MOYENNE)
    due_date = Column(DateTime)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    # Foreign Keys
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Relations
    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all, delete-orphan")