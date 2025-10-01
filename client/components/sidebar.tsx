'use client';

import { useState } from 'react';
import { 
  Home, 
  FolderOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AuthService } from '@/lib/auth';

const menuItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: FolderOpen, label: 'Projets' },
  { icon: Users, label: 'Équipe' },
  { icon: Calendar, label: 'Calendrier' },
  { icon: BarChart3, label: 'Rapports' },
  { icon: Bell, label: 'Notifications' },
  { icon: Settings, label: 'Paramètres' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      'bg-white shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold text-gray-900">ProjectPro</h2>
              <p className="text-xs text-gray-500">Gestion de projets</p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                  item.active 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {AuthService.getUser()?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {AuthService.getUser()?.full_name || 'Utilisateur'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {AuthService.getUser()?.email || ''}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              AuthService.logout();
              window.location.reload();
            }}
            className="w-full text-xs"
          >
            Déconnexion
          </Button>
        </div>
      )}
    </div>
  );
}