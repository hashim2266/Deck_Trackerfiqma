import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router';
import type { Section } from '../data/tasks';

interface Props {
  section: Section;
  completion: number;
}

export function SectionDonut({ section, completion }: Props) {
  const navigate = useNavigate();
  const done = section.tasks.filter(t => t.status === 'Selesai').length;
  const inProgress = section.tasks.filter(t => t.status === 'Dalam Proses').length;
  const notStarted = section.tasks.filter(t => t.status === 'Belum Mula').length;
  const total = section.tasks.length;

  const donutData = [
    { value: completion },
    { value: Math.max(0, 100 - completion) },
  ];

  const ringColor = completion >= 80 ? '#10b981' : completion >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div
      onClick={() => navigate(`/section/${section.id}`)}
      className={`bg-gradient-to-br ${section.gradient} border rounded-2xl p-5 cursor-pointer
        hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl group`}
      style={{ borderColor: section.color + '40' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: section.color }}>
            {section.name}
          </p>
          <h3 className="text-white font-bold text-sm leading-tight">{section.fullName}</h3>
        </div>
        <span className="text-xs px-2 py-1 rounded-full text-white font-medium"
          style={{ backgroundColor: ringColor + '30', color: ringColor, border: `1px solid ${ringColor}40` }}>
          {completion >= 80 ? 'Baik' : completion >= 60 ? 'Sederhana' : 'Perlu Tindakan'}
        </span>
      </div>

      {/* Donut Chart — explicit px height to avoid 0x0 warning */}
      <div className="relative" style={{ height: 176 }}>
        <ResponsiveContainer width="100%" height={176}>
          <PieChart>
            <Pie
              data={donutData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={78}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <Cell key={`${section.id}-fill`} fill={ringColor} />
              <Cell key={`${section.id}-empty`} fill="rgba(255,255,255,0.05)" />
            </Pie>
            <Pie
              data={[{ value: 1 }]}
              cx="50%"
              cy="50%"
              innerRadius={82}
              outerRadius={84}
              dataKey="value"
              strokeWidth={0}
              isAnimationActive={false}
            >
              <Cell key={`${section.id}-ring`} fill={section.color + '30'} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black" style={{ color: ringColor }}>{completion}%</span>
          <span className="text-gray-400 text-xs mt-1">Pencapaian</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center bg-black/20 rounded-lg py-2">
          <p className="text-emerald-400 font-bold text-lg">{done}</p>
          <p className="text-gray-500 text-xs">Selesai</p>
        </div>
        <div className="text-center bg-black/20 rounded-lg py-2">
          <p className="text-amber-400 font-bold text-lg">{inProgress}</p>
          <p className="text-gray-500 text-xs">Berjalan</p>
        </div>
        <div className="text-center bg-black/20 rounded-lg py-2">
          <p className="text-red-400 font-bold text-lg">{notStarted}</p>
          <p className="text-gray-500 text-xs">Belum Mula</p>
        </div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-gray-500 text-xs">{total} tugasan jumlah</p>
        <p className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: section.color }}>
          Klik untuk butiran →
        </p>
      </div>
    </div>
  );
}
