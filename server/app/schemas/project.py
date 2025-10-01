from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from ..models.project import ProjectStatus, ProjectPriority

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    status: Optional[ProjectStatus] = ProjectStatus.EN_ATTENTE
    priority: Optional[ProjectPriority] = ProjectPriority.MOYENNE
    due_date: Optional[datetime] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    name: Optional[str] = None

class ProjectInDB(ProjectBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class Project(ProjectInDB):
    tasks: List["Task"] = []
    
    class Config:
        from_attributes = True

# Import Task here to avoid circular imports
from .task import Task
Project.model_rebuild()