import { useEffect, useState } from 'react';
import { Calendar, Leaf, Clock } from 'lucide-react';
import { paperlessProgram, eventsThisMonth } from '../data/tasks';

const eventTypeColors: Record<string, string> = {
  Mesyuarat: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Program: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Audit: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Majlis: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  Kursus: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Kewangan: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export function DashboardSidebar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  const months = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];

  const timeStr = now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const dateStr = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;

  return (
    <aside className="flex flex-col gap-4 w-full">

      {/* Real-time Clock */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700/60">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="size-4 text-cyan-400" />
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Masa Semasa</span>
        </div>
        <div className="text-center">
          <div className="text-4xl font-black text-white tracking-widest font-mono">{timeStr}</div>
          <div className="text-xs text-gray-400 mt-2">{dateStr}</div>
          <div className="text-xs text-cyan-400 mt-1 font-medium">Malaysia (MYT • UTC+8)</div>
        </div>
      </div>

      {/* Paperless Program */}
      <div className="bg-gradient-to-br from-emerald-900/40 to-gray-900 rounded-2xl p-5 border border-emerald-700/30">
        <div className="flex items-center gap-2 mb-4">
          <Leaf className="size-4 text-emerald-400" />
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Program Tanpa Kertas</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-4xl font-black text-emerald-400">{paperlessProgram.current}%</span>
          <span className="text-gray-500 text-xs mb-1">/ {paperlessProgram.target}% Sasaran</span>
        </div>
        <div className="w-full bg-gray-700/60 rounded-full h-2.5 mb-4">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all"
            style={{ width: `${paperlessProgram.current}%` }}
          />
        </div>

        {/* Milestones */}
        <div className="space-y-2">
          {paperlessProgram.milestones.map((m, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`size-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs
                ${m.done ? 'bg-emerald-500 text-white' : 'bg-gray-700 border border-gray-600'}`}>
                {m.done ? '✓' : ''}
              </div>
              <span className={`text-xs ${m.done ? 'text-emerald-300' : 'text-gray-500'}`}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Events This Month */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700/60 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="size-4 text-violet-400" />
          <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Acara Bulan Ini</span>
        </div>
        <div className="space-y-2.5">
          {eventsThisMonth.map((ev, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="text-center flex-shrink-0">
                <div className="bg-gray-700/60 rounded-lg px-2 py-1 min-w-[42px]">
                  <span className="text-white text-xs font-bold">{ev.date}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs leading-tight">{ev.title}</p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded border mt-1 inline-block ${eventTypeColors[ev.type] ?? 'bg-gray-700 text-gray-400'}`}>
                  {ev.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
