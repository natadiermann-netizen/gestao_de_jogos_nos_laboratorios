import { Home, Users, Gamepad2, Bell, BarChart2, LogOut, Monitor } from 'lucide-react';
import { Screen } from '../types';

interface Props {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  alertCount: number;
}

const navItems = [
  { id: 'home' as Screen, label: 'Início', Icon: Home },
  { id: 'students' as Screen, label: 'Alunos', Icon: Users },
  { id: 'games' as Screen, label: 'Jogos', Icon: Gamepad2 },
  { id: 'laboratories' as Screen, label: 'Laboratórios', Icon: Monitor },
  { id: 'alerts' as Screen, label: 'Alertas', Icon: Bell },
  { id: 'reports' as Screen, label: 'Relatórios', Icon: BarChart2 },
];

const activeSet = new Set<Screen>(['home', 'students', 'games', 'laboratories', 'alerts', 'reports', 'profile', 'lab-detail', 'game-detail']);

function getActiveNav(screen: Screen): Screen {
  if (['lab-detail', 'game-detail'].includes(screen)) return 'laboratories';
  if (activeSet.has(screen)) return screen;
  return 'home';
}

export default function Sidebar({ current, onNavigate, onLogout, alertCount }: Props) {
  const activeNav = getActiveNav(current);

  return (
    <aside className="hidden md:flex flex-col w-60 bg-[#0d1b3e] text-white flex-shrink-0 h-screen">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-black tracking-tight text-white">SENAI</span>
          <div className="flex flex-col gap-0.5">
            <div className="w-4 h-0.5 bg-blue-400" />
            <div className="w-4 h-0.5 bg-blue-400" />
            <div className="w-4 h-0.5 bg-blue-400" />
          </div>
        </div>
        <p className="text-blue-300 text-xs font-medium leading-tight">
          Gestão de Jogos<br />nos Laboratórios
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 pt-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = activeNav === id;
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{label}</span>
              {id === 'alerts' && alertCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {alertCount > 9 ? '9+' : alertCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile + logout */}
      <div className="px-3 pb-5 pt-3 border-t border-white/10 space-y-1">
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
            activeNav === 'profile'
              ? 'bg-blue-600 text-white'
              : 'text-blue-200 hover:bg-white/10 hover:text-white'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-blue-900 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[10px] font-black">PM</span>
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-white leading-none">Prof. Marcelo</div>
            <div className="text-[10px] text-blue-300 mt-0.5">marcelo.souza@senai.br</div>
          </div>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all"
        >
          <LogOut size={16} strokeWidth={1.8} />
          <span>Sair da conta</span>
        </button>
      </div>
    </aside>
  );
}
