import { useState } from 'react';
import { ArrowLeft, Search, ShieldOff, ShieldCheck, Gamepad2, ChevronRight } from 'lucide-react';
import { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

interface GameEntry {
  name: string;
  category: string;
  color: string;
  detections: number;
  hoursPlayed: number;
  isBlocked: boolean;
  lastSeen: string;
  activeNow: number;
}

const GAMES: GameEntry[] = [
  { name: 'Valorant', category: 'FPS / Tático', color: '#ef4444', detections: 142, hoursPlayed: 31, isBlocked: true, lastSeen: 'Agora', activeNow: 3 },
  { name: 'GTA V', category: 'Mundo Aberto', color: '#1a1a1a', detections: 98, hoursPlayed: 24, isBlocked: true, lastSeen: '10 min', activeNow: 2 },
  { name: 'Fortnite', category: 'Battle Royale', color: '#8b5cf6', detections: 87, hoursPlayed: 19, isBlocked: true, lastSeen: '15 min', activeNow: 1 },
  { name: 'Free Fire', category: 'Battle Royale', color: '#f97316', detections: 76, hoursPlayed: 17, isBlocked: true, lastSeen: '22 min', activeNow: 2 },
  { name: 'Roblox', category: 'Sandbox', color: '#22c55e', detections: 65, hoursPlayed: 14, isBlocked: true, lastSeen: '30 min', activeNow: 1 },
  { name: 'Minecraft', category: 'Sandbox / Aventura', color: '#78350f', detections: 58, hoursPlayed: 13, isBlocked: true, lastSeen: '45 min', activeNow: 0 },
  { name: 'League of Legends', category: 'MOBA', color: '#3b82f6', detections: 54, hoursPlayed: 12, isBlocked: true, lastSeen: '1h', activeNow: 1 },
  { name: 'Counter-Strike 2', category: 'FPS', color: '#f59e0b', detections: 49, hoursPlayed: 11, isBlocked: true, lastSeen: '1h 20min', activeNow: 0 },
  { name: 'Apex Legends', category: 'Battle Royale', color: '#dc2626', detections: 38, hoursPlayed: 8, isBlocked: true, lastSeen: '2h', activeNow: 0 },
  { name: 'Overwatch 2', category: 'FPS / Hero Shooter', color: '#e67e22', detections: 31, hoursPlayed: 7, isBlocked: true, lastSeen: '3h', activeNow: 0 },
  { name: 'Warzone', category: 'Battle Royale', color: '#374151', detections: 27, hoursPlayed: 6, isBlocked: true, lastSeen: '4h', activeNow: 0 },
  { name: 'Among Us', category: 'Social Dedução', color: '#be185d', detections: 22, hoursPlayed: 5, isBlocked: true, lastSeen: '5h', activeNow: 0 },
  { name: 'FIFA 24', category: 'Esporte', color: '#16a34a', detections: 18, hoursPlayed: 4, isBlocked: true, lastSeen: '1 dia', activeNow: 0 },
  { name: 'Clash of Clans', category: 'Estratégia', color: '#d97706', detections: 14, hoursPlayed: 3, isBlocked: true, lastSeen: '1 dia', activeNow: 0 },
  { name: 'Steam', category: 'Plataforma', color: '#1e293b', detections: 11, hoursPlayed: 2, isBlocked: false, lastSeen: '2 dias', activeNow: 0 },
];

const categories = ['Todos', 'FPS', 'Battle Royale', 'MOBA', 'Sandbox', 'Esporte', 'Estratégia'];

function GameIcon({ color, name }: { color: string; name: string }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      <span className="text-white font-black text-sm">{name.charAt(0)}</span>
    </div>
  );
}

export default function GamesScreen({ onNavigate, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const [showBlocked, setShowBlocked] = useState<'all' | 'blocked' | 'allowed'>('all');

  const filtered = GAMES.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Todos' || g.category.includes(category);
    const matchBlocked =
      showBlocked === 'all' ||
      (showBlocked === 'blocked' && g.isBlocked) ||
      (showBlocked === 'allowed' && !g.isBlocked);
    return matchSearch && matchCat && matchBlocked;
  });

  const totalActive = GAMES.reduce((acc, g) => acc + g.activeNow, 0);
  const totalBlocked = GAMES.filter((g) => g.isBlocked).length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-900" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 flex-1">Jogos Detectados</h1>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-red-50 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-red-600">{totalActive}</div>
            <div className="text-[10px] text-red-500 font-medium">Ativos agora</div>
          </div>
          <div className="bg-orange-50 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-orange-600">{totalBlocked}</div>
            <div className="text-[10px] text-orange-500 font-medium">Bloqueados</div>
          </div>
          <div className="bg-blue-50 rounded-xl p-2.5 text-center">
            <div className="text-lg font-black text-blue-600">{GAMES.length}</div>
            <div className="text-[10px] text-blue-500 font-medium">Cadastrados</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-2.5">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar jogo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        {/* Filter pills */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
          {(['all', 'blocked', 'allowed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setShowBlocked(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                showBlocked === f
                  ? f === 'blocked'
                    ? 'bg-red-500 text-white'
                    : f === 'allowed'
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'blocked' ? 'Bloqueados' : 'Permitidos'}
            </button>
          ))}
          <div className="w-px h-5 bg-gray-200 self-center" />
          {categories.slice(1).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? 'Todos' : cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                category === cat ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games list */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-2.5 pb-4 space-y-2">
        {filtered.map((game) => (
          <button
            key={game.name}
            onClick={() =>
              onNavigate('game-detail', {
                game: game.name,
                student: 'Lucas F. Oliveira',
                lab: { id: '1', name: 'Lab. Informática 01', status: 'active' },
                computer: { id: '1', lab_id: '1', name: 'PC-12', is_online: true },
                startTime: '10:32',
                elapsed: '00:45:21',
              })
            }
            className="w-full bg-white rounded-2xl p-3.5 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow"
          >
            <GameIcon color={game.color} name={game.name} />

            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-900 truncate">{game.name}</span>
                {game.activeNow > 0 && (
                  <span className="flex-shrink-0 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    {game.activeNow} ativo{game.activeNow > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-gray-500 mt-0.5">{game.category}</div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-gray-400">{game.detections} detecções</span>
                <span className="text-[10px] text-gray-400">{game.hoursPlayed}h jogadas</span>
                <span className="text-[10px] text-gray-400">Últ.: {game.lastSeen}</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                  game.isBlocked
                    ? 'bg-red-100'
                    : 'bg-green-100'
                }`}
              >
                {game.isBlocked ? (
                  <ShieldOff size={10} className="text-red-500" />
                ) : (
                  <ShieldCheck size={10} className="text-green-600" />
                )}
                <span
                  className={`text-[10px] font-bold ${
                    game.isBlocked ? 'text-red-500' : 'text-green-600'
                  }`}
                >
                  {game.isBlocked ? 'Bloqueado' : 'Permitido'}
                </span>
              </div>
              <ChevronRight size={14} className="text-gray-300" />
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Gamepad2 size={40} className="mb-2 text-gray-200" />
            <p className="text-sm">Nenhum jogo encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
