import { useNavigate } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import { sections } from '../data/tasks';

export function CriticalTasks() {
  const navigate = useNavigate();

  // Collect all tasks with 0% (Belum Mula) across sections
  const critical = sections.flatMap(s =>
    s.tasks
      .filter(t => t.status === 'Belum Mula')
      .map(t => ({ ...t, sectionId: s.id, sectionName: s.name, sectionColor: s.color }))
  ).slice(0, 8);

  // Count by section
  const sectionCounts = sections.map(s => ({
    id: s.id,
    name: s.name,
    fullName: s.fullName,
    color: s.color,
    count: s.tasks.filter(t => t.status === 'Belum Mula').length,
    total: s.tasks.length,
  }));

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-red-900/30 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
          <AlertTriangle className="size-4 text-red-400" />
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">Tugasan Belum Mula</h3>
          <p className="text-gray-500 text-xs">Memerlukan tindakan segera</p>
        </div>
        <span className="ml-auto text-red-400 font-black text-lg">
          {sectionCounts.reduce((s, c) => s + c.count, 0)}
        </span>
      </div>

      {/* Per-section bar */}
      <div className="space-y-2.5 mb-4">
        {sectionCounts.map(sec => (
          <button
            key={sec.id}
            onClick={() => navigate(`/section/${sec.id}`)}
            className="w-full text-left hover:bg-white/5 rounded-lg px-2 py-1.5 transition-colors group"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold" style={{ color: sec.color }}>{sec.name}</span>
              <span className="text-xs text-red-400 font-bold">{sec.count} tugasan</span>
            </div>
            <div className="w-full bg-gray-700/60 rounded-full h-1.5">
              <div
                className="h-1.5 rounded-full bg-red-500/60"
                style={{ width: `${(sec.count / sec.total) * 100}%` }}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700/60 pt-3 flex-1">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold mb-2">Contoh Tugasan</p>
        <div className="space-y-1.5 overflow-hidden">
          {critical.slice(0, 5).map(task => (
            <button
              key={task.id}
              onClick={() => navigate(`/section/${task.sectionId}`)}
              className="w-full text-left flex items-start gap-2 hover:bg-white/5 rounded px-1.5 py-1 transition-colors"
            >
              <span className="mt-0.5 size-1.5 rounded-full flex-shrink-0 bg-red-400 mt-1.5" />
              <span className="text-gray-400 text-[11px] leading-tight line-clamp-1">{task.aktiviti}</span>
              <span className="ml-auto text-[10px] flex-shrink-0" style={{ color: task.sectionColor }}>
                {task.sectionName.replace('Seksyen ', 'S')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
