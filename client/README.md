# ProjectPro - Application de Gestion de Projets

Une application moderne de gestion de projets construite avec **Next.js** pour le frontend et **FastAPI** pour le backend.

## 🚀 Fonctionnalités

### Interface Frontend (Next.js)
- **Dashboard moderne** avec vue d'ensemble des projets
- **Gestion de projets** complète (création, modification, suppression)
- **Tableau Kanban** pour le suivi des tâches
- **Interface responsive** pour mobile, tablette et desktop
- **Composants UI** avec shadcn/ui et Tailwind CSS
- **Authentification JWT** sécurisée
- **Gestion des utilisateurs** complète

### Backend FastAPI
- **API RESTful** pour la gestion des projets et tâches
- **Authentification JWT** pour sécuriser l'accès
- **Base de données SQLite/PostgreSQL** pour la persistance
- **Validation de données** avec Pydantic
- **Documentation automatique** avec Swagger/OpenAPI
- **CORS configuré** pour l'intégration frontend

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 13** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **shadcn/ui** - Composants UI modernes
- **Lucide React** - Icônes

### Backend
- **FastAPI** - Framework Python moderne
- **SQLAlchemy** - ORM pour Python
- **SQLite/PostgreSQL** - Base de données relationnelle
- **Pydantic** - Validation des données
- **JWT** - Authentification sécurisée
- **Uvicorn** - Serveur ASGI

## 📦 Installation et Configuration

### 1. Frontend (Next.js)
```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### 2. Backend FastAPI
```bash
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer le serveur
python run.py
```

### 3. Structure Backend
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application FastAPI principale
│   ├── models/              # Modèles SQLAlchemy
│   │   ├── __init__.py
│   │   ├── project.py
│   │   ├── task.py
│   │   └── user.py
│   ├── schemas/             # Schémas Pydantic
│   │   ├── __init__.py
│   │   ├── project.py
│   │   ├── task.py
│   │   ├── user.py
│   │   └── token.py
│   ├── api/                 # Endpoints API
│   │   ├── __init__.py
│   │   ├── projects.py
│   │   ├── tasks.py
│   │   └── auth.py
│   ├── core/                # Configuration
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── database.py
│   └── utils/               # Utilitaires
│       ├── __init__.py
│       └── security.py
├── requirements.txt
├── run.py                   # Script de démarrage
├── Dockerfile
└── docker-compose.yml
```

## 🔧 Utilisation avec Docker

```bash
# Démarrer avec Docker Compose
cd backend
docker-compose up -d
```

## 🔗 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/token` - Connexion
- `GET /api/auth/me` - Profil utilisateur

### Projets
- `GET /api/projects/` - Liste des projets
- `POST /api/projects/` - Créer un projet
- `GET /api/projects/{id}` - Détails d'un projet
- `PUT /api/projects/{id}` - Modifier un projet
- `DELETE /api/projects/{id}` - Supprimer un projet
- `GET /api/projects/{id}/stats` - Statistiques du projet

### Tâches
- `GET /api/tasks/` - Liste des tâches
- `POST /api/tasks/` - Créer une tâche
- `GET /api/tasks/{id}` - Détails d'une tâche
- `PUT /api/tasks/{id}` - Modifier une tâche
- `DELETE /api/tasks/{id}` - Supprimer une tâche
- `GET /api/tasks/kanban/{project_id}` - Données Kanban

## 🔐 Authentification

L'application utilise JWT pour l'authentification. Après connexion, le token est stocké dans le localStorage et utilisé pour toutes les requêtes API.

## 📱 Fonctionnalités Principales

1. **Inscription/Connexion** - Système d'authentification complet
2. **Dashboard** - Vue d'ensemble avec statistiques
3. **Gestion de Projets** - CRUD complet des projets
4. **Tableau Kanban** - Gestion visuelle des tâches
5. **Interface Responsive** - Optimisée pour tous les écrans

## 🔧 Configuration

### Variables d'environnement (Backend)
```env
DATABASE_URL=sqlite:///./projectpro.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:3000
```

### Variables d'environnement (Frontend)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🤝 Contribution

Pour contribuer au projet :
1. Fork le repository
2. Créer une branche feature
3. Commiter les changements
4. Pousser vers la branche
5. Créer une Pull Request

## 🐛 Dépannage

### Problèmes courants

1. **Erreur CORS** - Vérifiez que le frontend URL est configuré dans le backend
2. **Token expiré** - Reconnectez-vous à l'application
3. **Base de données** - Assurez-vous que le fichier SQLite est créé automatiquement

### Logs
```bash
# Backend logs
cd backend && python run.py

# Frontend logs
npm run dev
```

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.