import { useEffect, useState } from 'react';
import { Bell, Menu, Monitor, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Laboratory, Alert, Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen, data?: any) => void;
  alertCount: number;
}

export default function HomeScreen({ onNavigate, alertCount }: Props) {
  const [labs, setLabs] = useState<Laboratory[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [labsRes, alertsRes] = await Promise.all([
        supabase.from('laboratories').select('*').order('name'),
        supabase.from('alerts').select('*').eq('is_read', false).order('created_at', { ascending: false }),
      ]);
      if (labsRes.data) setLabs(labsRes.data);
      if (alertsRes.data) setAlerts(alertsRes.data);
      setLoading(false);
    }
    load();
  }, []);

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

  const today = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-4 flex items-center justify-between border-b border-gray-100">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Olá, Professor!</h1>
          <p className="text-gray-500 text-sm">Bem-vindo ao painel de controle.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="md:hidden p-1">
            <Menu size={22} className="text-gray-700" />
          </button>
          <button
            onClick={() => onNavigate('alerts')}
            className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Bell size={20} className="text-gray-700" />
            {alertCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {alertCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {/* Stats section */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Visão geral</h2>
            <button className="flex items-center gap-1 text-sm text-gray-500 font-medium">
              Hoje, {today}
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { value: labs.filter(l => l.status === 'active').length || 7, label: 'Labs ativos' },
              { value: 122, label: 'Alunos conectados' },
              { value: 29, label: 'Jogos detectados' },
              { value: alerts.length || 7, label: 'Alertas ativos' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-gray-900 leading-none">{value}</div>
                <div className="text-[10px] text-gray-500 mt-1 leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Laboratories */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h2 className="text-base font-bold text-gray-900">Laboratórios</h2>
            <button
              onClick={() => onNavigate('laboratories')}
              className="text-blue-600 text-sm font-medium"
            >
              Ver todos
            </button>
          </div>

          {loading ? (
            <div className="px-4 pb-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {labs.map((lab) => {
                const count = labStudentCounts[lab.name] ?? 0;
                return (
                  <button
                    key={lab.id}
                    onClick={() => onNavigate('lab-detail', lab)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Monitor size={16} className="text-gray-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-semibold text-gray-900">{lab.name}</div>
                      <div className="text-xs text-gray-500">{count} alunos</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${lab.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-xs font-medium ${lab.status === 'active' ? 'text-green-600' : 'text-red-500'}`}>
                        {lab.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
