import { BarChart2 } from 'lucide-react';
import { sections } from '../data/tasks';
import { SectionDonut } from '../components/SectionDonut';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { OverallRadar } from '../components/OverallRadar';
import { CriticalTasks } from '../components/CriticalTasks';

function avgCompletion(sectionId: string): number {
  const sec = sections.find(s => s.id === sectionId);
  if (!sec) return 0;
  return Math.round(sec.tasks.reduce((sum, t) => sum + t.peratusan, 0) / sec.tasks.length);
}

export default function Dashboard() {
  const overall = Math.round(
    sections.reduce((sum, s) => sum + avgCompletion(s.id), 0) / sections.length
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Top Header Bar */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <BarChart2 className="size-5 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-white font-black text-base leading-tight">Sistem Pemantauan Prestasi SKU</h1>
              <p className="text-gray-500 text-xs">Bahagian Pentadbiran • 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-500 text-xs">Purata Keseluruhan</p>
              <p className="text-2xl font-black text-cyan-400">{overall}%</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              overall >= 80 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
              overall >= 60 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              {overall >= 80 ? '● Prestasi Baik' : overall >= 60 ? '● Sederhana' : '● Perlu Perhatian'}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6">

          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gray-800" />
              <span className="text-gray-500 text-xs uppercase tracking-widest font-semibold px-3">
                Pencapaian Seksyen — Klik Untuk Butiran
              </span>
              <div className="h-px flex-1 bg-gray-800" />
            </div>

            {/* 5 Section Donut Charts — 3 top, 2 bottom centered */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {sections.slice(0, 3).map(sec => (
                <SectionDonut key={sec.id} section={sec} completion={avgCompletion(sec.id)} />
              ))}
            </div>
            {/* Row 2: S4, S5 + Critical Tasks card */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {sections.slice(3, 5).map(sec => (
                <SectionDonut key={sec.id} section={sec} completion={avgCompletion(sec.id)} />
              ))}
              <CriticalTasks />
            </div>

            {/* Bottom: Radar + Summary Stats */}
            <div className="grid grid-cols-3 gap-4">
              {/* Radar spans 2 cols */}
              <div className="col-span-2">
                <OverallRadar />
              </div>

              {/* Quick stats */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-gray-700/60">
                <h3 className="text-white font-bold text-sm mb-4">Ringkasan Tugasan</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Jumlah Tugasan', value: 165, color: 'text-white' },
                    {
                      label: 'Selesai',
                      value: sections.reduce((sum, s) => sum + s.tasks.filter(t => t.status === 'Selesai').length, 0),
                      color: 'text-emerald-400'
                    },
                    {
                      label: 'Dalam Proses',
                      value: sections.reduce((sum, s) => sum + s.tasks.filter(t => t.status === 'Dalam Proses').length, 0),
                      color: 'text-amber-400'
                    },
                    {
                      label: 'Belum Mula',
                      value: sections.reduce((sum, s) => sum + s.tasks.filter(t => t.status === 'Belum Mula').length, 0),
                      color: 'text-red-400'
                    },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{item.label}</span>
                      <span className={`font-black text-xl ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-gray-500 text-xs mb-1.5">Kadar Penyiapan</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                        style={{ width: `${overall}%` }} />
                    </div>
                    <p className="text-cyan-400 text-xs font-bold mt-1">{overall}% daripada sasaran 100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
