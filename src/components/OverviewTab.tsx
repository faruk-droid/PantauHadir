import React from 'react';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  HelpCircle
} from 'lucide-react';
import { 
  EmployeeProfile, 
  EarlyWarningAlert, 
  DayPatternStat 
} from '../types/attendance';

interface OverviewTabProps {
  employees: EmployeeProfile[];
  alerts: EarlyWarningAlert[];
  dayStats: DayPatternStat[];
  onSelectEmployee: (employee: EmployeeProfile) => void;
  onOpenDSSConcept: () => void;
  onNavigateTab: (tab: string) => void;
  onResolveAlert: (alertId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  employees,
  alerts,
  dayStats,
  onSelectEmployee,
  onOpenDSSConcept,
  onNavigateTab,
  onResolveAlert
}) => {
  // Key metric calculations
  const totalEmployees = employees.length;
  const chronicLatenessCount = employees.filter(e => e.stats.lateCount >= 4).length;

  // Identify worst day
  const highestLateDay = [...dayStats].sort((a, b) => b.lateRate - a.lateRate)[0];

  return (
    <div className="space-y-6">
      {/* Top DSS Philosophy Callout Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-sky-950/80 border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Pondasi Decision Support System (DSS)
              </span>
              <span className="text-xs text-slate-400">
                Data Mentah → Analisis Pola → Insight & Alert → Evaluasi Human → Keputusan Bijak
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Kecerdasan Absensi Logistik: Mengubah Log Mesin Sidik Jari Menjadi Keputusan Terukur
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sistem tidak menggantikan mesin absensi dan <strong>tidak mengambil tindakan disipliner otomatis</strong>. 
              Sistem mendeteksi tren keterlambatan, anomali, dan konsentrasi hari agar HR & Supervisor dapat memvalidasi faktor logistik lapangan (kemacetan arteri, kendala mesin) sebelum menentukan solusi yang adil.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenDSSConcept}
              className="px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-300" />
              <span>Lihat Detail Alur DSS</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: On-Time vs Lateness Rate */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Rata-rata Ketepatan Waktu</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">82.4%</span>
            <span className="text-xs font-medium text-emerald-400">On-Time</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Tingkat Keterlambatan:</span>
            <span className="font-semibold text-amber-400">17.6% (Avg +21.4m)</span>
          </div>
        </div>

        {/* Card 2: Chronic Tardiness Detected */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Pola Keterlambatan Berulang</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-400">{chronicLatenessCount} Orang</span>
            <span className="text-[11px] text-amber-300/80">&gt;3x dalam 14 hari</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Kasus Utama:</span>
            <span className="font-semibold text-slate-200">Budi Santoso (7x terlambat)</span>
          </div>
        </div>

        {/* Card 3: Active DSS Human Evaluation Cases */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Kasus Evaluasi DSS Aktif</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-indigo-300">{alerts.length} Kasus</span>
            <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
              Human-in-the-Loop
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Prioritas Validasi:</span>
            <span className="font-semibold text-slate-200">Klarifikasi Supervisor</span>
          </div>
        </div>

        {/* Card 4: Day Concentration Pattern */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Hari Keterlambatan Tertinggi</span>
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">Hari {highestLateDay.day}</span>
            <span className="text-xs font-semibold text-amber-400">{highestLateDay.lateRate}%</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Perbandingan Hari Rabu:</span>
            <span className="font-semibold text-emerald-400">Hanya 9.1% (3.1x lebih tertib)</span>
          </div>
        </div>
      </div>

      {/* Early Warning Alerts & Recommended Investigations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">
              Early Warning & Deteksi Pola Kritis (DSS Alerts)
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('lateness')}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition cursor-pointer font-medium"
          >
            Lihat Pola Keterlambatan →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition ${
                  isCritical 
                    ? 'bg-slate-900/90 border-rose-500/40 hover:border-rose-500/60' 
                    : 'bg-slate-900/90 border-amber-500/30 hover:border-amber-500/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider ${
                        isCritical 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {alert.severity}
                      </span>
                      <h4 className="text-xs font-bold text-white">{alert.title}</h4>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono shrink-0 whitespace-nowrap">
                      {alert.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {alert.description}
                  </p>

                  {/* Recommendation Box */}
                  <div className="mt-2 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Rekomendasi Investigasi Human DSS:
                    </span>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {alert.safeRecommendation}
                    </p>
                  </div>
                </div>

                {/* Actions & Target info */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Target: <strong className="text-indigo-300">{alert.targetEntity}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {alert.targetEntity.includes('Budi Santoso') ? (
                      <button
                        onClick={() => {
                          const emp = employees.find(e => e.id === '1025');
                          if (emp) onSelectEmployee(emp);
                        }}
                        className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer flex items-center gap-1"
                      >
                        <span>Klarifikasi Karyawan</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigateTab('lateness')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition cursor-pointer flex items-center gap-1"
                      >
                        <span>Lihat Detail Keterlambatan</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary: Top Flagged Employees for Quick Check */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              Daftar Personel dengan Pola Keterlambatan Tertinggi (14 Hari)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Klik profil karyawan untuk melihat kartu evaluasi DSS, riwayat log fingerprint, dan hasil klarifikasi human.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('lateness')}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition cursor-pointer font-medium"
          >
            Lihat Semua Personel →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {employees
            .filter(e => e.stats.lateCount > 1)
            .sort((a, b) => b.stats.lateCount - a.stats.lateCount)
            .slice(0, 4)
            .map((emp) => (
              <div
                key={emp.id}
                onClick={() => onSelectEmployee(emp)}
                className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/70 hover:border-indigo-500/50 hover:bg-slate-800/80 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-300 transition">
                      {emp.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block truncate">
                      {emp.role}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] border-t border-slate-700/50 pt-2">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Terlambat</span>
                    <span className="font-bold text-amber-400">{emp.stats.lateCount}x ({emp.stats.lateRate}%)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Rata-rata</span>
                    <span className="font-semibold text-slate-200">+{emp.stats.avgDelayMinutes}m</span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-indigo-400 flex items-center justify-between">
                  <span>{emp.division}</span>
                  <span className="group-hover:translate-x-0.5 transition font-semibold">Evaluasi →</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
