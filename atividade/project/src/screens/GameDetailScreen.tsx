import { ArrowLeft, Square, ShieldOff, MessageSquare, ClipboardList, Gamepad2 } from 'lucide-react';
import { Laboratory, Computer } from '../types';

interface GameDetailData {
  game: string;
  student: string;
  lab: Laboratory;
  computer: Computer;
  startTime: string;
  elapsed: string;
}

interface Props {
  data: GameDetailData;
  onBack: () => void;
}

const gameColors: Record<string, string> = {
  Valorant: '#ef4444',
  'GTA V': '#111827',
  Roblox: '#22c55e',
  CS2: '#f97316',
  LoL: '#3b82f6',
};

export default function GameDetailScreen({ data, onBack }: Props) {
  const { game, student, lab, computer, startTime, elapsed } = data;
  const color = gameColors[game] || '#6b7280';
  const isPermitted = false;

  const actions = [
    { icon: ShieldOff, label: 'Bloquear jogo', color: 'text-gray-700' },
    { icon: MessageSquare, label: 'Enviar aviso ao aluno', color: 'text-gray-700' },
    { icon: ClipboardList, label: 'Ver histórico do aluno', color: 'text-gray-700' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-4 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-6">
          Detalhes do jogo
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-2 pb-4 space-y-3">
        {/* Game hero */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              <Gamepad2 size={32} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">{game}</h2>
              <span
                className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mt-1 ${
                  isPermitted
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {isPermitted ? 'Permitido' : 'Não permitido'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Aluno</div>
              <div className="text-sm font-bold text-gray-900">{student}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Laboratório</div>
              <div className="text-sm font-bold text-gray-900">{lab.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Computador</div>
              <div className="text-sm font-bold text-gray-900">{computer.name}</div>
            </div>
            <div />
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Início</div>
              <div className="text-sm font-bold text-gray-900">{startTime}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-0.5">Tempo em jogo</div>
              <div className="text-sm font-bold text-gray-900">{elapsed}</div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-0.5">Status</div>
            <div className="text-sm font-bold text-red-500">Não permitido</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900">Ações</h3>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-4 flex items-center justify-center gap-2.5 transition-colors">
            <Square size={18} fill="white" />
            <span className="text-base">Encerrar jogo</span>
          </button>

          <div className="divide-y divide-gray-50">
            {actions.map(({ icon: Icon, label, color: iconColor }) => (
              <button
                key={label}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <Icon size={18} className={iconColor} />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
