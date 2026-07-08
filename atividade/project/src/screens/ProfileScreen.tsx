import {
  ArrowLeft,
  Settings,
  Bell,
  SlidersHorizontal,
  Puzzle,
  Info,
  LogOut,
  ChevronRight,
  BarChart2,
} from 'lucide-react';
import { Screen } from '../types';

interface Props {
  onLogout: () => void;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export default function ProfileScreen({ onLogout, onBack, onNavigate }: Props) {
  const menuItems = [
    { icon: BarChart2, label: 'Relatórios', action: () => onNavigate('reports') },
    { icon: Settings, label: 'Configurações da conta', action: () => {} },
    { icon: Bell, label: 'Notificações', action: () => {} },
    { icon: SlidersHorizontal, label: 'Preferências de monitoramento', action: () => {} },
    { icon: Puzzle, label: 'Integrações', action: () => {} },
    { icon: Info, label: 'Sobre o sistema', action: () => {} },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-6">
          Meu perfil
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-3 pb-4 space-y-3">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm">
          <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xl font-black">PM</span>
            </div>
            <div className="flex-1 text-left">
              <h2 className="text-base font-bold text-gray-900">Prof. Marcelo</h2>
              <p className="text-sm text-gray-500">marcelo.souza@senai.br</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Menu items */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {menuItems.map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <Icon size={18} className="text-gray-600" strokeWidth={1.8} />
                <span className="flex-1 text-left text-sm font-medium text-gray-800">
                  {label}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="text-red-500" strokeWidth={1.8} />
            <span className="flex-1 text-left text-sm font-medium text-red-500">
              Sair da conta
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
