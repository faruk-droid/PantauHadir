import React, { useState } from 'react';
import { 
  UserCheck, 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Search, 
  Filter, 
  FileEdit,
  Building,
  User,
  Plus
} from 'lucide-react';
import { EmployeeProfile, InvestigationNote } from '../types/attendance';

interface HumanEvaluationConsoleProps {
  employees: EmployeeProfile[];
  onSelectEmployee: (employee: EmployeeProfile) => void;
  onAddNote: (employeeId: string, note: Omit<InvestigationNote, 'id' | 'timestamp'>) => void;
  onOpenDSSConcept: () => void;
}

export const HumanEvaluationConsole: React.FC<HumanEvaluationConsoleProps> = ({
  employees,
  onSelectEmployee,
  onAddNote,
  onOpenDSSConcept
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  // Flagged employees with DSS cases
  const flaggedEmployees = employees.filter(e => e.dssFlag !== undefined);

  const filtered = flaggedEmployees.filter((emp) => {
    const matchesSearch = 
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.includes(search) ||
      emp.division.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = 
      filterStatus === 'ALL' || emp.dssFlag?.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4" />
            <span>Human-in-the-Loop Evaluation Console (DSS)</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Konsol Evaluasi Human & Keputusan Supervisor / HR
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sesuai etika DSS: Sistem mendeteksi anomali dan menyajikan fakta tanpa menghakimi.
            Supervisor dan HR menggunakan konsol ini untuk memvalidasi konteks lapangan dan mengambil solusi yang manusiawi serta produktif.
          </p>
        </div>

        <button
          onClick={onOpenDSSConcept}
          className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Etika & Prinsip Output Aman</span>
        </button>
      </div>

      {/* Filter and Status Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari karyawan dalam pengawasan DSS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="ALL">Semua Status Investigasi</option>
            <option value="PERLU_KLARIFIKASI">Perlu Klarifikasi Lapangan</option>
            <option value="DALAM_INVESTIGASI">Dalam Proses Supervisi</option>
            <option value="TINDAKAN_SELESAI">Tindakan / Solusi Selesai</option>
          </select>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {filtered.length} Kasus Memerlukan Perhatian Human
        </span>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filtered.map((emp) => {
          const flag = emp.dssFlag!;
          const isHigh = flag.level === 'HIGH_PRIORITY';
          const notesCount = flag.investigationNotes.length;

          return (
            <div
              key={emp.id}
              className={`p-5 rounded-2xl border transition ${
                isHigh 
                  ? 'bg-slate-900/90 border-amber-500/40 hover:border-amber-500/60' 
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Employee info */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{emp.name}</h3>
                      <span className="text-xs font-mono text-slate-400">ID #{emp.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        flag.status === 'PERLU_KLARIFIKASI'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : flag.status === 'DALAM_INVESTIGASI'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {flag.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-0.5">
                      {emp.role} • {emp.division} • {emp.defaultShift}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="text-amber-400 font-semibold">
                        Terlambat: {emp.stats.lateCount}x dari {emp.stats.totalWorkDays} hari ({emp.stats.lateRate}%)
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300">
                        Rata-rata: +{emp.stats.avgDelayMinutes} menit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectEmployee(emp)}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Buka Lembar Verifikasi Lapangan</span>
                  </button>
                </div>
              </div>

              {/* DSS Diagnosis & Safe Recommendation Block */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Findings */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="font-semibold text-slate-400 block text-[11px] mb-1">
                    📊 Temuan Pola Sistem:
                  </span>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {flag.patternDescription}
                  </p>
                </div>

                {/* Safe non-penal recommendation */}
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                  <span className="font-semibold text-emerald-400 block text-[11px] mb-1">
                    💡 Rekomendasi Investigasi Human (Bukan Sanksi):
                  </span>
                  <p className="text-emerald-200 text-xs leading-relaxed">
                    {flag.safeRecommendation}
                  </p>
                </div>
              </div>

              {/* Latest Field Note Preview */}
              {flag.investigationNotes.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 text-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span className="font-semibold text-slate-200">
                      Catatan Terakhir: {flag.investigationNotes[0].author} ({flag.investigationNotes[0].role})
                    </span>
                    <span>{flag.investigationNotes[0].timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-xs">{flag.investigationNotes[0].note}</p>
                  {flag.investigationNotes[0].decisionOutcome && (
                    <p className="mt-1 text-emerald-400 font-medium text-[11px]">
                      ↳ <strong>Keputusan Lapangan:</strong> {flag.investigationNotes[0].decisionOutcome}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
