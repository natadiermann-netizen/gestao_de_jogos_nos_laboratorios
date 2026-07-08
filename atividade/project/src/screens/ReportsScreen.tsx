import { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type Tab = 'geral' | 'jogos' | 'alunos' | 'labs';

const gameData = [
  { name: 'Valorant', hours: 31, pct: 32, color: '#ef4444' },
  { name: 'Counter Strike2', hours: 8, pct: 8, color: '#f97316' },
  { name: 'League of Legends', hours: 6, pct: 6, color: '#3b82f6' },
  { name: 'GTAIV', hours: 11, pct: 12, color: '#22c55e' },
  { name: 'Roblox', hours: 3, pct: 5, color: '#8b5cf6' },
  { name: 'Outtes', hours: 6, pct: 6, color: '#9ca3af' },
];

function DonutChart() {
  const total = gameData.reduce((acc, g) => acc + g.pct, 0);
  const cx = 70;
  const cy = 70;
  const r = 55;
  const innerR = 32;

  let cumulative = 0;
  const slices = gameData.map((g) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += g.pct;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + innerR * Math.cos(endAngle);
    const iy1 = cy + innerR * Math.sin(endAngle);
    const ix2 = cx + innerR * Math.cos(startAngle);
    const iy2 = cy + innerR * Math.sin(startAngle);

    const largeArc = g.pct / total > 0.5 ? 1 : 0;

    return {
      ...g,
      d: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2} Z`,
    };
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {slices.map((s, i) => (
            <path key={i} d={s.d} fill={s.color} />
          ))}
          <text x="70" y="67" textAnchor="middle" fontSize="10" fill="#6b7280" fontWeight="500">
            Total
          </text>
          <text x="70" y="80" textAnchor="middle" fontSize="14" fill="#111827" fontWeight="800">
            99h
          </text>
        </svg>
      </div>

      <div className="flex-1 space-y-1.5">
        {gameData.map((g) => (
          <div key={g.name} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-gray-700 truncate block">{g.name}</span>
            </div>
            <span className="text-xs font-semibold text-gray-500">{g.pct}%</span>
            <span className="text-xs text-gray-400">({g.hours}h)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'geral', label: 'Geral' },
  { id: 'jogos', label: 'Jogos' },
  { id: 'alunos', label: 'Alunos' },
  { id: 'labs', label: 'Laboratórios' },
];

export default function ReportsScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('geral');

  const stats = [
    { label: 'Total de horas de uso', value: '268h', trend: '+12%', up: true },
    { label: 'Jogos não permitidos', value: '98h', trend: '-9%', up: false },
    { label: 'Número de alertas', value: '56', trend: '+10%', up: false },
    { label: 'Alunos envolvidos', value: '34', trend: '', up: true },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-5 pb-3 flex items-center gap-3">
        <button onClick={onBack} className="p-1 -ml-1">
          <ArrowLeft size={22} className="text-gray-900" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 flex-1 text-center pr-6">
          Relatórios
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 pb-3">
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === t.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pt-1 pb-4 space-y-3">
        {/* Period */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-xs font-semibold text-gray-500 mb-2">Período</div>
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
            <span className="text-sm text-gray-700 font-medium">01/06/2024 - 23/09/2024</span>
            <Calendar size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-900 mb-3">Resumo geral</div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-[10px] text-gray-500 mb-1 leading-tight">{s.label}</div>
                <div className="flex items-end gap-1">
                  <div className="text-xl font-black text-gray-900">{s.value}</div>
                  {s.trend && (
                    <div className={`flex items-center gap-0.5 mb-0.5 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                      {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      <span className="text-[10px] font-bold">{s.trend}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-900 mb-3">
            Jogos mais utilizados (não permitidos)
          </div>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}
