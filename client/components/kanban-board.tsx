'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const mockTasks = {
  'À faire': [
    {
      id: 1,
      title: 'Configurer l\'environnement de développement',
      description: 'Installer FastAPI, PostgreSQL et configurer l\'API',
      priority: 'Haute',
      assignee: 'Marie Dubois',
      tags: ['Backend', 'Setup']
    },
    {
      id: 2,
      title: 'Créer les wireframes',
      description: 'Dessiner les maquettes pour toutes les pages principales',
      priority: 'Moyenne',
      assignee: 'Jean Martin',
      tags: ['Design', 'UX']
    }
  ],
  'En cours': [
    {
      id: 3,
      title: 'Développer l\'API utilisateur',
      description: 'Créer les endpoints pour l\'authentification et la gestion des utilisateurs',
      priority: 'Haute',
      assignee: 'Pierre Leroy',
      tags: ['Backend', 'API']
    },
    {
      id: 4,
      title: 'Interface de connexion',
      description: 'Intégrer le design de la page de connexion avec l\'API',
      priority: 'Moyenne',
      assignee: 'Sophie Bernard',
      tags: ['Frontend', 'Auth']
    }
  ],
  'En révision': [
    {
      id: 5,
      title: 'Tests unitaires API',
      description: 'Écrire les tests pour tous les endpoints utilisateur',
      priority: 'Moyenne',
      assignee: 'Antoine Moreau',
      tags: ['Testing', 'Backend']
    }
  ],
  'Terminé': [
    {
      id: 6,
      title: 'Configuration de la base de données',
      description: 'Mise en place de PostgreSQL avec les tables principales',
      priority: 'Haute',
      assignee: 'Marie Dubois',
      tags: ['Database', 'Setup']
    },
    {
      id: 7,
      title: 'Charte graphique',
      description: 'Définir les couleurs, typographies et composants de base',
      priority: 'Basse',
      assignee: 'Jean Martin',
      tags: ['Design', 'Branding']
    }
  ]
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Haute': return 'bg-red-100 text-red-800 border-red-200';
    case 'Moyenne': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Basse': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTagColor = (tag: string) => {
  const colors = {
    'Backend': 'bg-blue-100 text-blue-800',
    'Frontend': 'bg-purple-100 text-purple-800',
    'Design': 'bg-pink-100 text-pink-800',
    'Testing': 'bg-orange-100 text-orange-800',
    'Database': 'bg-indigo-100 text-indigo-800',
    'API': 'bg-teal-100 text-teal-800',
    'Auth': 'bg-red-100 text-red-800',
    'UX': 'bg-green-100 text-green-800',
    'Setup': 'bg-gray-100 text-gray-800',
    'Branding': 'bg-yellow-100 text-yellow-800'
  };
  return colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(mockTasks);

  const columns = Object.keys(tasks);

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tableau Kanban</h2>
        <p className="text-gray-600">Gérez vos tâches par statut</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {columns.map((column) => (
          <div key={column} className="flex flex-col">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-lg">{column}</h3>
                <Badge variant="secondary" className="ml-2">
                  {tasks[column as keyof typeof tasks].length}
                </Badge>
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-2">
                <div 
                  className={`h-1 rounded-full ${
                    column === 'À faire' ? 'bg-gray-400' :
                    column === 'En cours' ? 'bg-blue-500' :
                    column === 'En révision' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto">
              {tasks[column as keyof typeof tasks].map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Déplacer</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag) => (
                        <Badge key={tag} className={`text-xs ${getTagColor(tag)}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-xs text-gray-500 hidden sm:block">
                          {task.assignee.split(' ')[0]}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button 
                variant="ghost" 
                className="w-full border-2 border-dashed border-gray-300 h-12 text-gray-500 hover:border-blue-300 hover:text-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}