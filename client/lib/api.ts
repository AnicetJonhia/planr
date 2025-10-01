const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Types
export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'En attente' | 'En cours' | 'Terminé';
  priority: 'Basse' | 'Moyenne' | 'Haute';
  due_date?: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'À faire' | 'En cours' | 'En révision' | 'Terminé';
  priority: 'Basse' | 'Moyenne' | 'Haute';
  is_completed: boolean;
  due_date?: string;
  project_id: number;
  assignee_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  name: string;
  description?: string;
  status?: 'En attente' | 'En cours' | 'Terminé';
  priority?: 'Basse' | 'Moyenne' | 'Haute';
  due_date?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  status?: 'À faire' | 'En cours' | 'En révision' | 'Terminé';
  priority?: 'Basse' | 'Moyenne' | 'Haute';
  project_id: number;
  assignee_id?: number;
  due_date?: string;
}

// Auth functions
export async function login(username: string, password: string): Promise<{ access_token: string; token_type: string }> {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Erreur de connexion');
  }

  return response.json();
}

export async function register(userData: {
  email: string;
  username: string;
  full_name: string;
  password: string;
}): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'inscription');
  }

  return response.json();
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération de l\'utilisateur');
  }

  return response.json();
}

// Project functions
export async function fetchProjects(token: string): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des projets');
  }

  return response.json();
}

export async function createProject(projectData: ProjectCreate, token: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création du projet');
  }

  return response.json();
}

export async function updateProject(projectId: number, projectData: Partial<ProjectCreate>, token: string): Promise<Project> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour du projet');
  }

  return response.json();
}

export async function deleteProject(projectId: number, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression du projet');
  }
}

export async function getProjectStats(projectId: number, token: string): Promise<{
  total_tasks: number;
  completed_tasks: number;
  progress: number;
  team_members: number;
}> {
  const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des statistiques');
  }

  return response.json();
}

// Task functions
export async function fetchTasks(token: string, projectId?: number): Promise<Task[]> {
  const url = projectId 
    ? `${API_BASE_URL}/api/tasks/?project_id=${projectId}`
    : `${API_BASE_URL}/api/tasks/`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des tâches');
  }

  return response.json();
}

export async function createTask(taskData: TaskCreate, token: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la création de la tâche');
  }

  return response.json();
}

export async function updateTask(taskId: number, taskData: Partial<TaskCreate>, token: string): Promise<Task> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la mise à jour de la tâche');
  }

  return response.json();
}

export async function deleteTask(taskId: number, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la suppression de la tâche');
  }
}

export async function getKanbanTasks(projectId: number, token: string): Promise<{
  [key: string]: Array<{
    id: number;
    title: string;
    description?: string;
    priority: string;
    assignee: string;
    tags: string[];
  }>;
}> {
  const response = await fetch(`${API_BASE_URL}/api/tasks/kanban/${projectId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors du chargement du tableau Kanban');
  }

  return response.json();
}