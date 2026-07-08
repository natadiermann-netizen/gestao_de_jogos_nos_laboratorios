import { useEffect, useState } from 'react';
import { ArrowLeft, AlertTriangle, Info, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Alert } from '../types';

interface Props {
  onBack: () => void;
  onAlertsChange: (count: number) => void;
}

type Filter = 'all' | 'unread' | 'info';

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function AlertsScreen({ onBack, onAlertsChange }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);

  async function loadAlerts() {
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) {
      setAlerts(data);
      onAlertsChange(data.filter((a) => !a.is_read).length);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadAlerts();
  }, []);

  async function markAllRead() {
    await supabase.from('alerts').update({ is_read: true }).eq('is_read', false);
    setAlerts((prev) => prev.map((a) => ({ ...a, is_read: true })));
    onAlertsChange(0);
  }

  const filtered = alerts.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !a.is_read;
    return a.type === 'info';
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onBack} className="p-1 -ml-1">
            <ArrowLeft size={22} className="text-gray-900" />
          </button>
          <h1 className="text-lg font-bold text-gray-900 flex-1">Alertas</h1>
          <button
            onClick={markAllRead}
            className="text-blue-600 text-xs font-semibold"
          >
            Marcar todos como lidos
          </button>
        </div>

        <div className="flex gap-2">
          {(['all', 'unread', 'info'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'unread' ? 'Não lidos' : 'Informativos'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-3 pb-4 space-y-2.5">
        {loading ? (
          <div className="space-y-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Check size={40} className="mb-2 text-green-400" />
            <p className="text-sm">Nenhum alerta</p>
          </div>
        ) : (
          filtered.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${
                alert.type === 'warning'
                  ? 'border-red-400'
                  : 'border-blue-400'
              } ${!alert.is_read ? 'opacity-100' : 'opacity-60'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.type === 'warning'
                      ? 'bg-red-100'
                      : 'bg-blue-100'
                  }`}
                >
                  {alert.type === 'warning' ? (
                    <AlertTriangle size={16} className="text-red-500" />
                  ) : (
                    <Info size={16} className="text-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-gray-900 leading-tight">
                      {alert.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {formatTime(alert.created_at)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {alert.description}
                  </p>
                  {alert.lab_name && (
                    <p className="text-xs text-gray-400 mt-1">
                      {alert.lab_name}
                      {alert.computer_name ? ` - ${alert.computer_name}` : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
