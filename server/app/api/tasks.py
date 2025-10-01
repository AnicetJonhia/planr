from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.task import Task
from ..models.project import Project
from ..models.user import User
from ..schemas.task import Task as TaskSchema, TaskCreate, TaskUpdate
from .auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[TaskSchema])
def get_tasks(
    project_id: int = None,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Task).join(Project).filter(Project.owner_id == current_user.id)
    
    if project_id:
        query = query.filter(Task.project_id == project_id)
    
    tasks = query.offset(skip).limit(limit).all()
    return tasks

@router.post("/", response_model=TaskSchema)
def create_task(
    task: TaskCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Vérifier que le projet appartient à l'utilisateur
    project = db.query(Project).filter(
        Project.id == task.project_id,
        Project.owner_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db_task = Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/{task_id}", response_model=TaskSchema)
def get_task(
    task_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).join(Project).filter(
        Task.id == task_id,
        Project.owner_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskSchema)
def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).join(Project).filter(
        Task.id == task_id,
        Project.owner_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    update_data = task_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)
    
    # Mettre à jour is_completed basé sur le statut
    if hasattr(task_update, 'status') and task_update.status:
        task.is_completed = task_update.status.value == "Terminé"
    
    db.commit()
    db.refresh(task)
    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = db.query(Task).join(Project).filter(
        Task.id == task_id,
        Project.owner_id == current_user.id
    ).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db.delete(task)
    db.commit()
    return {"message": "Task deleted successfully"}

@router.get("/kanban/{project_id}")
def get_kanban_tasks(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Vérifier que le projet appartient à l'utilisateur
    project = db.query(Project).filter(
        Project.id == project_id,
        Project.owner_id == current_user.id
    ).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    tasks = db.query(Task).filter(Task.project_id == project_id).all()
    
    # Organiser les tâches par statut
    kanban_data = {
        "À faire": [],
        "En cours": [],
        "En révision": [],
        "Terminé": []
    }
    
    for task in tasks:
        status_key = task.status.value
        if status_key in kanban_data:
            kanban_data[status_key].append({
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "priority": task.priority.value,
                "assignee": task.assignee.full_name if task.assignee else "Non assigné",
                "tags": []  # À implémenter plus tard
            })
    
    return kanban_data