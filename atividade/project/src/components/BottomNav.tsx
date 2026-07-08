import { Home, Users, Gamepad2, Bell, MoreHorizontal } from 'lucide-react';
import { Screen } from '../types';

interface Props {
  current: Screen;
  onNavigate: (screen: Screen) => void;
  alertCount?: number;
}

const tabs = [
  { id: 'home' as Screen, label: 'Início', Icon: Home },
  { id: 'students' as Screen, label: 'Alunos', Icon: Users },
  { id: 'games' as Screen, label: 'Jogos', Icon: Gamepad2 },
  { id: 'alerts' as Screen, label: 'Alertas', Icon: Bell },
  { id: 'profile' as Screen, label: 'Mais', Icon: MoreHorizontal },
];

export default function BottomNav({ current, onNavigate, alertCount = 0 }: Props) {
  const activeTab = ['home', 'students', 'games', 'alerts', 'profile'].includes(current)
    ? current
    : 'home';

  return (
    <nav className="flex items-center justify-around bg-white border-t border-gray-100 px-2 py-2 safe-bottom">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-0.5 min-w-0 flex-1 py-1 relative"
          >
            <div className="relative">
              <Icon
                size={22}
                className={isActive ? 'text-blue-600' : 'text-gray-400'}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              {id === 'alerts' && alertCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {alertCount > 9 ? '9+' : alertCount}
                </span>
              )}
            </div>
            <span
              className={`text-[10px] font-medium leading-none ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
