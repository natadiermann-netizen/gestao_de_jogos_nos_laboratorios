import { useEffect, useState } from 'react';
import { ArrowLeft, Monitor, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Laboratory, Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen, data?: any) => void;
  onBack: () => void;
}

type Filter = 'all' | 'active' | 'inactive';

const labStudentCounts: Record<string, number> = {
  'Lab. Informática 01': 24,
  'Lab. Informática 02': 20,
  'Lab. Informática 03': 18,
  'Lab. Automação': 16,
  'Lab. Eletrônica': 18,
  'Lab. CAD / CAM': 0,
  'Lab. Mecânica': 0,
  'Lab. Química': 0,
  'Lab. Física': 14,
  'Lab. Redes': 12,
};

export default function LaboratoriesScreen({ onNavigate, onBack }: Props) {
  const [labs, setLabs] = useState<Laboratory[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('laboratories').select('*').order('name');
      if (data) setLabs(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = labs.filter((l) => {
    if (filter === 'all') return true;
    if (filter === 'active') return l.status === 'active';
    return l.status === 'inactive';
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-6">
          Laboratórios
        </h1>
      </div>

      {/* Filter tabs */}
      <div className="bg-white px-4 pb-3 flex gap-2">
        {(['all', 'active', 'inactive'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : 'Inativos'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-2 pb-4 space-y-2.5">
        {loading ? (
          <div className="space-y-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          filtered.map((lab) => {
            const count = labStudentCounts[lab.name] ?? 0;
            return (
              <button
                key={lab.id}
                onClick={() => onNavigate('lab-detail', lab)}
                className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Monitor size={20} className="text-gray-500" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-bold text-gray-900">{lab.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{count} alunos conectados</div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      lab.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {lab.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
