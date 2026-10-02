import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';
import { EmployeeProfile } from '../types/attendance';

interface LatenessPatternsTabProps {
  employees: EmployeeProfile[];
  onSelectEmployee: (employee: EmployeeProfile) => void;
}

export const LatenessPatternsTab: React.FC<LatenessPatternsTabProps> = ({
  employees,
  onSelectEmployee
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'LATE_COUNT' | 'LATE_RATE' | 'AVG_DELAY'>('LATE_COUNT');

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.includes(searchQuery) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDiv = selectedDivision === 'ALL' || emp.division === selectedDivision;

    return matchesSearch && matchesDiv;
  });

  // Sort
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === 'LATE_COUNT') return b.stats.lateCount - a.stats.lateCount;
    if (sortBy === 'LATE_RATE') return b.stats.lateRate - a.stats.lateRate;
    return b.stats.avgDelayMinutes - a.stats.avgDelayMinutes;
  });

  // Key stats
  const totalLateCases = employees.reduce((sum, e) => sum + e.stats.lateCount, 0);
  const avgOverallDelay = Math.round(
    employees.reduce((sum, e) => sum + (e.stats.avgDelayMinutes * e.stats.lateCount), 0) / (totalLateCases || 1)
  );
  const chronicEmployees = employees.filter(e => e.stats.lateCount >= 4);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Clock className="w-4 h-4" />
            <span>Dimensi Analitik Pola Keterlambatan</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Analisis Pola Keterlambatan Personel Logistik
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Melacak frekuensi keterlambatan berulang (chronic tardiness), durasi deviasi waktu, 
            dan konsentrasi kejadian untuk rekomendasi evaluasi human supervisor.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">Total Terlambat</span>
            <span className="text-base font-extrabold text-white">{totalLateCases}x Kasus</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
            <span className="text-[10px] text-amber-300 uppercase block font-medium">Pola Berulang (&gt;3x)</span>
            <span className="text-base font-extrabold text-amber-400">{chronicEmployees.length} Orang</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-medium">Rata-rata Deviasi</span>
            <span className="text-base font-extrabold text-sky-400">+{avgOverallDelay} Menit</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama karyawan, ID (#1025), jabatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Division Filter */}
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Divisi</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Sorting Hub">Sorting Hub</option>
            <option value="Fleet & Driver">Fleet & Driver</option>
            <option value="Operasional Dock">Operasional Dock</option>
            <option value="Admin & Dispatch">Admin & Dispatch</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Urutkan:</span>
          <div className="flex bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setSortBy('LATE_COUNT')}
              className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                sortBy === 'LATE_COUNT' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Frekuensi
            </button>
            <button
              onClick={() => setSortBy('LATE_RATE')}
              className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                sortBy === 'LATE_RATE' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Persentase
            </button>
            <button
              onClick={() => setSortBy('AVG_DELAY')}
              className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                sortBy === 'AVG_DELAY' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Menit Terlambat
            </button>
          </div>
        </div>
      </div>

      {/* Main Table / Grid of Employees */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Karyawan & Posisi</th>
                <th className="py-3 px-4">Divisi & Hub</th>
                <th className="py-3 px-4 text-center">Frekuensi Keterlambatan</th>
                <th className="py-3 px-4 text-center">Rata-rata Menit</th>
                <th className="py-3 px-4">Distribusi Hari (Sen-Sab)</th>
                <th className="py-3 px-4">Status Diagnostik DSS</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {sortedEmployees.map((emp) => {
                const isChronic = emp.stats.lateCount >= 4;
                const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;

                return (
                  <tr 
                    key={emp.id} 
                    className="hover:bg-slate-800/40 transition cursor-pointer group"
                    onClick={() => onSelectEmployee(emp)}
                  >
                    {/* Employee Profile */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-700 group-hover:ring-indigo-500 transition"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white group-hover:text-indigo-300 transition">
                              {emp.name}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              #{emp.id}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">
                            {emp.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Division & Hub */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-200 block">{emp.division}</span>
                      <span className="text-[11px] text-slate-400">{emp.hub}</span>
                    </td>

                    {/* Frequency */}
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`text-xs font-bold ${
                          isChronic ? 'text-amber-400' : 'text-slate-200'
                        }`}>
                          {emp.stats.lateCount} kali ({emp.stats.lateRate}%)
                        </span>
                        <span className="text-[10px] text-slate-400">
                          dari {emp.stats.totalWorkDays} hari kerja
                        </span>
                      </div>
                    </td>

                    {/* Delay Minutes */}
                    <td className="py-3 px-4 text-center font-mono">
                      <span className={`font-semibold ${
                        emp.stats.avgDelayMinutes > 20 ? 'text-rose-400' : 'text-amber-300'
                      }`}>
                        +{emp.stats.avgDelayMinutes} mnt
                      </span>
                    </td>

                    {/* Weekly mini heatmap */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {days.map((d) => {
                          const cnt = emp.weeklyPatterns[d] || 0;
                          return (
                            <div
                              key={d}
                              title={`${d}: ${cnt}x terlambat`}
                              className={`w-5 h-6 rounded flex flex-col items-center justify-center text-[9px] font-mono ${
                                cnt >= 2
                                  ? 'bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold'
                                  : cnt === 1
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800/40 text-slate-600'
                              }`}
                            >
                              <span>{d[0]}</span>
                              <span className="text-[8px]">{cnt > 0 ? cnt : ''}</span>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* DSS Status */}
                    <td className="py-3 px-4">
                      {emp.dssFlag ? (
                        <div className="space-y-1">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-block ${
                            emp.dssFlag.status === 'PERLU_KLARIFIKASI'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {emp.dssFlag.status.replace('_', ' ')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Pola Normal</span>
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEmployee(emp);
                        }}
                        className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white text-xs font-medium border border-indigo-500/30 transition cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Detail</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
