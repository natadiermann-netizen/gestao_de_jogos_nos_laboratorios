import { useEffect, useState } from 'react';
import { ArrowLeft, Wifi, WifiOff, Gamepad2, Globe } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Laboratory, Computer, Screen } from '../types';

interface Props {
  lab: Laboratory;
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

const studentNames = [
  'Lucas F. Oliveira', 'Rafael M. Santos', 'Gabriel A. Lima', 'Matheus R. Costa',
  'João V. Pereira', 'Ana C. R. Silva', 'Pedro H. Souza', 'Fernanda K. Alves',
  'Carlos E. Nunes', 'Beatriz M. Rocha', 'Diego S. Ferreira', 'Larissa P. Gomes',
  'Thiago B. Carvalho', 'Amanda C. Freitas', 'Bruno H. Medeiros', 'Camila R. Souza',
  'Isabela T. Ramos', 'Eduardo M. Pinto', 'Victor A. Nascimento', 'Priya S. Guimarães',
  'Felipe L. Araújo', 'Natalia V. Barbosa', 'Marcos T. Lopes', 'Juliana F. Cardoso',
];

const gameSlots: Array<{ name: string; color: string; permitted: boolean } | null> = [
  { name: 'Valorant', color: '#ef4444', permitted: false },
  { name: 'GTA V', color: '#111827', permitted: false },
  { name: 'Fortnite', color: '#8b5cf6', permitted: false },
  { name: 'Free Fire', color: '#f97316', permitted: false },
  { name: 'Roblox', color: '#22c55e', permitted: false },
  { name: 'Minecraft', color: '#78350f', permitted: false },
  { name: 'League of Legends', color: '#3b82f6', permitted: false },
  { name: 'Counter-Strike 2', color: '#f59e0b', permitted: false },
  { name: 'Apex Legends', color: '#dc2626', permitted: false },
  { name: 'Among Us', color: '#be185d', permitted: false },
  null, null, null, null,
  null, null, null, null,
];

export default function LabDetailScreen({ lab, onNavigate, onBack }: Props) {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('computers')
        .select('*')
        .eq('lab_id', lab.id)
        .order('name');
      if (data) setComputers(data);
      setLoading(false);
    }
    load();
  }, [lab.id]);

  const activeCount = computers.filter((c) => c.is_online).length;
  const gameCount = gameSlots.filter(Boolean).length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-900" />
          </button>
          <h1 className="text-base font-bold text-gray-900 flex-1 truncate">{lab.name}</h1>
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${
              lab.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {lab.status === 'active' ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-gray-50 rounded-xl p-3">
          <div className="text-center">
            <div className="text-xl font-black text-gray-900">{computers.length}</div>
            <div className="text-[10px] text-gray-500 leading-tight">Total PCs</div>
          </div>
          <div className="text-center border-x border-gray-200">
            <div className="text-xl font-black text-green-600">{activeCount}</div>
            <div className="text-[10px] text-gray-500 leading-tight">Online</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-orange-500">{gameCount}</div>
            <div className="text-[10px] text-gray-500 leading-tight">Jogos ativos</div>
          </div>
        </div>
      </div>

      {/* Computer grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-3 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-700">Computadores</h2>
          <div className="flex items-center gap-3 text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" /> Jogo ativo
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-blue-400" /> Navegando
            </span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
            ))}
          </div>
        ) : computers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <p className="text-sm">Nenhum computador encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {computers.map((pc, idx) => {
              const student = pc.is_online && idx < studentNames.length ? studentNames[idx] : null;
              const gameSlot = pc.is_online ? gameSlots[idx % gameSlots.length] : null;
              const isGameActive = gameSlot !== null;

              return (
                <button
                  key={pc.id}
                  onClick={() => {
                    if (isGameActive && gameSlot) {
                      onNavigate('game-detail', {
                        game: gameSlot.name,
                        student: student ?? 'Aluno',
                        lab,
                        computer: pc,
                        startTime: `${8 + (idx % 3)}:${String((idx * 7) % 60).padStart(2, '0')}`,
                        elapsed: `${String(Math.floor((idx * 13) % 60)).padStart(2, '0')}:${String((idx * 17) % 60).padStart(2, '0')}:${String((idx * 23) % 60).padStart(2, '0')}`,
                      });
                    }
                  }}
                  className={`bg-white rounded-xl p-3 text-left shadow-sm border transition-all ${
                    isGameActive
                      ? 'border-red-200 hover:border-red-300'
                      : student
                      ? 'border-blue-100 hover:border-blue-200'
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {pc.is_online ? (
                        <Wifi size={11} className="text-green-500" />
                      ) : (
                        <WifiOff size={11} className="text-gray-300" />
                      )}
                      <span className="text-xs font-bold text-gray-700">{pc.name}</span>
                    </div>
                    {isGameActive && gameSlot ? (
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: gameSlot.color }}
                      >
                        <Gamepad2 size={10} className="text-white" />
                      </div>
                    ) : student ? (
                      <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
                        <Globe size={10} className="text-white" />
                      </div>
                    ) : null}
                  </div>

                  {student ? (
                    <>
                      <div className="text-[11px] text-gray-700 font-semibold truncate leading-tight">
                        {student.split(' ').slice(0, 2).join(' ')}
                      </div>
                      {isGameActive && gameSlot ? (
                        <div className="text-[10px] text-red-500 font-medium mt-0.5 truncate">
                          {gameSlot.name}
                        </div>
                      ) : (
                        <div className="text-[10px] text-blue-500 font-medium mt-0.5">
                          Web
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-[11px] text-gray-400 mt-0.5">
                      {pc.is_online ? 'Online' : 'Offline'}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
