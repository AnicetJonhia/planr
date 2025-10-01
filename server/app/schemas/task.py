from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from ..models.task import TaskStatus, TaskPriority

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: Optional[TaskStatus] = TaskStatus.A_FAIRE
    priority: Optional[TaskPriority] = TaskPriority.MOYENNE
    is_completed: Optional[bool] = False
    due_date: Optional[datetime] = None

class TaskCreate(TaskBase):
    project_id: int
    assignee_id: Optional[int] = None

class TaskUpdate(TaskBase):
    title: Optional[str] = None
    project_id: Optional[int] = None
    assignee_id: Optional[int] = None

class TaskInDB(TaskBase):
    id: int
    project_id: int
    assignee_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class Task(TaskInDB):
    pass