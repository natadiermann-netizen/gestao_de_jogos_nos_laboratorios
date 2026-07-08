import { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, Gamepad2, Globe } from 'lucide-react';
import { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

interface StudentRow {
  name: string;
  lab: string;
  computer: string;
  activity: string;
  activityType: 'game' | 'web';
  color: string;
  status: 'permitted' | 'not-permitted';
}

const students: StudentRow[] = [
  { name: 'Lucas F. Oliveira', lab: 'Lab. 01', computer: 'PC12', activity: 'Valorant', activityType: 'game', color: '#ef4444', status: 'not-permitted' },
  { name: 'Rafael M. Santos', lab: 'Lab. 01', computer: 'PC08', activity: 'Counter-Strike 2', activityType: 'game', color: '#f59e0b', status: 'not-permitted' },
  { name: 'Thiago B. Carvalho', lab: 'Lab. 01', computer: 'PC04', activity: 'Free Fire', activityType: 'game', color: '#f97316', status: 'not-permitted' },
  { name: 'Amanda C. Freitas', lab: 'Lab. 01', computer: 'PC17', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Bruno H. Medeiros', lab: 'Lab. 01', computer: 'PC21', activity: 'Fortnite', activityType: 'game', color: '#8b5cf6', status: 'not-permitted' },
  { name: 'Camila R. Souza', lab: 'Lab. 01', computer: 'PC06', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Gabriel A. Lima', lab: 'Lab. 02', computer: 'PC03', activity: 'League of Legends', activityType: 'game', color: '#3b82f6', status: 'not-permitted' },
  { name: 'Matheus R. Costa', lab: 'Lab. 02', computer: 'PC07', activity: 'Roblox', activityType: 'game', color: '#22c55e', status: 'not-permitted' },
  { name: 'Fernanda K. Alves', lab: 'Lab. 02', computer: 'PC05', activity: 'Minecraft', activityType: 'game', color: '#78350f', status: 'not-permitted' },
  { name: 'Diego S. Ferreira', lab: 'Lab. 02', computer: 'PC14', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Isabela T. Ramos', lab: 'Lab. 02', computer: 'PC09', activity: 'Apex Legends', activityType: 'game', color: '#dc2626', status: 'not-permitted' },
  { name: 'Eduardo M. Pinto', lab: 'Lab. 02', computer: 'PC18', activity: 'Warzone', activityType: 'game', color: '#374151', status: 'not-permitted' },
  { name: 'João V. Pereira', lab: 'Lab. 03', computer: 'PC15', activity: 'GTA V', activityType: 'game', color: '#111827', status: 'not-permitted' },
  { name: 'Ana C. R. Silva', lab: 'Lab. 03', computer: 'PC01', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Pedro H. Souza', lab: 'Lab. 03', computer: 'PC02', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Larissa P. Gomes', lab: 'Lab. 03', computer: 'PC10', activity: 'Among Us', activityType: 'game', color: '#be185d', status: 'not-permitted' },
  { name: 'Victor A. Nascimento', lab: 'Lab. 03', computer: 'PC13', activity: 'FIFA 24', activityType: 'game', color: '#16a34a', status: 'not-permitted' },
  { name: 'Beatriz M. Rocha', lab: 'Lab. 03', computer: 'PC07', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Carlos E. Nunes', lab: 'Lab. Auto', computer: 'PC11', activity: 'Free Fire', activityType: 'game', color: '#f97316', status: 'not-permitted' },
  { name: 'Priya S. Guimarães', lab: 'Lab. Auto', computer: 'PC03', activity: 'Roblox', activityType: 'game', color: '#22c55e', status: 'not-permitted' },
  { name: 'Felipe L. Araújo', lab: 'Lab. Auto', computer: 'PC08', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Natalia V. Barbosa', lab: 'Lab. Auto', computer: 'PC15', activity: 'Valorant', activityType: 'game', color: '#ef4444', status: 'not-permitted' },
  { name: 'Marcos T. Lopes', lab: 'Lab. Elet', computer: 'PC06', activity: 'Overwatch 2', activityType: 'game', color: '#e67e22', status: 'not-permitted' },
  { name: 'Juliana F. Cardoso', lab: 'Lab. Elet', computer: 'PC02', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Rodrigo A. Teixeira', lab: 'Lab. Elet', computer: 'PC14', activity: 'Minecraft', activityType: 'game', color: '#78350f', status: 'not-permitted' },
  { name: 'Aline C. Moreira', lab: 'Lab. Fis', computer: 'PC04', activity: 'Fortnite', activityType: 'game', color: '#8b5cf6', status: 'not-permitted' },
  { name: 'Henrique S. Duarte', lab: 'Lab. Fis', computer: 'PC09', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
  { name: 'Tatiane R. Vasconcelos', lab: 'Lab. Redes', computer: 'PC05', activity: 'GTA V', activityType: 'game', color: '#111827', status: 'not-permitted' },
  { name: 'Leonardo M. Castro', lab: 'Lab. Redes', computer: 'PC10', activity: 'Navegando na web', activityType: 'web', color: '#3b82f6', status: 'permitted' },
];

const labOptions = ['Todos os laboratórios', 'Lab. 01', 'Lab. 02', 'Lab. 03', 'Lab. Auto', 'Lab. Elet', 'Lab. Fis', 'Lab. Redes'];
const statusOptions = ['Todos os status', 'Não permitido', 'Permitido'];

export default function StudentsScreen({ onNavigate, onBack }: Props) {
  const [search, setSearch] = useState('');
  const [labFilter, setLabFilter] = useState(labOptions[0]);
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchLab = labFilter === labOptions[0] || s.lab === labFilter;
    const matchStatus =
      statusFilter === statusOptions[0] ||
      (statusFilter === 'Não permitido' && s.status === 'not-permitted') ||
      (statusFilter === 'Permitido' && s.status === 'permitted');
    return matchSearch && matchLab && matchStatus;
  });

  const notPermittedCount = students.filter((s) => s.status === 'not-permitted').length;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-900" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-6">
            Alunos em atividade
          </h1>
        </div>

        {/* Summary pills */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 bg-blue-50 rounded-xl p-2 text-center">
            <div className="text-base font-black text-blue-700">{students.length}</div>
            <div className="text-[10px] text-blue-500 font-medium">Total online</div>
          </div>
          <div className="flex-1 bg-red-50 rounded-xl p-2 text-center">
            <div className="text-base font-black text-red-600">{notPermittedCount}</div>
            <div className="text-[10px] text-red-500 font-medium">Não permitido</div>
          </div>
          <div className="flex-1 bg-green-50 rounded-xl p-2 text-center">
            <div className="text-base font-black text-green-700">{students.length - notPermittedCount}</div>
            <div className="text-[10px] text-green-500 font-medium">Permitido</div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar aluno..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <select
              value={labFilter}
              onChange={(e) => setLabFilter(e.target.value)}
              className="w-full appearance-none bg-gray-100 text-gray-700 text-xs font-medium rounded-xl px-3 py-2.5 pr-7 outline-none"
            >
              {labOptions.map((l) => <option key={l}>{l}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
          <div className="relative flex-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-gray-100 text-gray-700 text-xs font-medium rounded-xl px-3 py-2.5 pr-7 outline-none"
            >
              {statusOptions.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table header */}
      <div className="bg-white border-t border-gray-100 px-4 py-2 grid grid-cols-12 gap-1">
        <span className="col-span-4 text-xs font-semibold text-gray-500">Aluno</span>
        <span className="col-span-3 text-xs font-semibold text-gray-500">Lab / PC</span>
        <span className="col-span-3 text-xs font-semibold text-gray-500">Atividade</span>
        <span className="col-span-2 text-xs font-semibold text-gray-500">Status</span>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-white divide-y divide-gray-50">
        {filtered.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              if (s.activityType === 'game') {
                onNavigate('game-detail', {
                  game: s.activity,
                  student: s.name,
                  lab: { id: '1', name: `Lab. Informática ${s.lab.split('.')[1]?.trim() || '01'}`, status: 'active' },
                  computer: { id: '1', lab_id: '1', name: s.computer, is_online: true },
                  startTime: '10:32',
                  elapsed: '00:45:21',
                });
              }
            }}
            className="w-full px-4 py-2.5 grid grid-cols-12 gap-1 items-center hover:bg-gray-50 transition-colors"
          >
            <div className="col-span-4 text-left">
              <div className="text-xs font-semibold text-gray-900 leading-tight">
                {s.name.split(' ').slice(0, 2).join(' ')}
              </div>
            </div>
            <div className="col-span-3 text-left">
              <div className="text-[11px] text-gray-600 leading-tight">
                {s.lab}
              </div>
              <div className="text-[10px] text-gray-400">{s.computer}</div>
            </div>
            <div className="col-span-3">
              <div className="flex items-center gap-1">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.color }}
                >
                  {s.activityType === 'game' ? (
                    <Gamepad2 size={9} className="text-white" />
                  ) : (
                    <Globe size={9} className="text-white" />
                  )}
                </div>
                <span className="text-[11px] text-gray-700 truncate leading-tight">{s.activity.split(' ')[0]}</span>
              </div>
            </div>
            <div className="col-span-2">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                  s.status === 'permitted'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {s.status === 'permitted' ? 'OK' : 'Bloq.'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
