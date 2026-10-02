import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle, 
  Plus, 
  MessageSquare
} from 'lucide-react';
import { EmployeeProfile, InvestigationNote } from '../types/attendance';

interface EmployeeDetailModalProps {
  employee: EmployeeProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (employeeId: string, note: Omit<InvestigationNote, 'id' | 'timestamp'>) => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  isOpen,
  onClose,
  onAddNote
}) => {
  const [showAddNoteForm, setShowAddNoteForm] = useState(false);
  const [authorName, setAuthorName] = useState('Siti Rahmawati (HR Lead)');
  const [evaluatorRole, setEvaluatorRole] = useState('HR Supervisor');
  const [category, setCategory] = useState<InvestigationNote['category']>('KENDALA_TRANSPORTASI');
  const [noteText, setNoteText] = useState('');
  const [decisionOutcome, setDecisionOutcome] = useState('');

  if (!isOpen || !employee) return null;

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    onAddNote(employee.id, {
      author: authorName,
      role: evaluatorRole,
      category,
      note: noteText,
      decisionOutcome: decisionOutcome || 'Dalam proses pengamatan lanjutan supervisor'
    });

    setNoteText('');
    setDecisionOutcome('');
    setShowAddNoteForm(false);
  };

  const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{employee.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                  ID: #{employee.id}
                </span>
                {employee.dssFlag?.level === 'HIGH_PRIORITY' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Perlu Klarifikasi DSS
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span className="text-indigo-300">{employee.role}</span>
                <span>•</span>
                <span>{employee.division}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-300">
          {/* Key Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Total Hari Kerja</span>
              <p className="text-lg font-bold text-white mt-0.5">{employee.stats.totalWorkDays} Hari</p>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Keterlambatan</span>
              <p className="text-lg font-bold text-amber-400 mt-0.5">
                {employee.stats.lateCount}x ({employee.stats.lateRate}%)
              </p>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Rata-rata Terlambat</span>
              <p className="text-lg font-bold text-slate-200 mt-0.5">
                +{employee.stats.avgDelayMinutes} menit
              </p>
            </div>
            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <span className="text-xs text-slate-400">Status Kehadiran</span>
              <p className="text-xs font-semibold text-emerald-400 mt-1">
                {employee.stats.presentDays} dari {employee.stats.totalWorkDays} Hari Hadir
              </p>
            </div>
          </div>

          {/* DSS Safe Diagnostic Insight */}
          {employee.dssFlag && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Analisis & Rekomendasi Investigasi DSS (Bukan Vonis)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-3">
                {employee.dssFlag.patternDescription}
              </p>
              <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-700/80">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  💡 Saran Investigasi Human / Supervisor:
                </span>
                <p className="text-xs text-emerald-200">
                  {employee.dssFlag.safeRecommendation}
                </p>
              </div>
            </div>
          )}

          {/* Day of Week Concentration Pattern */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              Frekuensi Keterlambatan Berdasarkan Hari Kerja (14 Hari Terakhir)
            </h3>
            <div className="grid grid-cols-6 gap-2">
              {dayNames.map((d) => {
                const count = employee.weeklyPatterns[d] || 0;
                const isHigh = count >= 2;
                return (
                  <div
                    key={d}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      count > 0 
                        ? isHigh
                          ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="text-[11px] block font-medium">{d}</span>
                    <span className="text-base font-bold mt-0.5 block">{count}x</span>
                    <span className="text-[10px] text-slate-400 block">terlambat</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Human Evaluation & Notes History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                Catatan Verifikasi Lapangan ({employee.dssFlag?.investigationNotes.length || 0})
              </h3>
              {!showAddNoteForm && (
                <button
                  onClick={() => setShowAddNoteForm(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Catatan Lapangan</span>
                </button>
              )}
            </div>

            {/* Add note inline form */}
            {showAddNoteForm && (
              <form onSubmit={handleSubmitNote} className="p-4 bg-slate-800/90 rounded-xl border border-slate-700 space-y-3 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Nama Penilai / Supervisor</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Kategori Faktor Penyebab</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="KENDALA_TRANSPORTASI">Kendala Transportasi / Kemacetan Rute</option>
                      <option value="KESEHATAN_DARURAT">Kondisi Kesehatan / Urusan Keluarga</option>
                      <option value="OVERTIME_SHIFT_SEBELUMNYA">Kelelahan Overtime Shift Sebelumnya</option>
                      <option value="GANGGUAN_MESIN_FINGERPRINT">Antrean / Gangguan Sensor Fingerprint</option>
                      <option value="LAINNYA">Lainnya (Perlu Pendalaman)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Hasil Klarifikasi & Temuan Lapangan</label>
                  <textarea
                    rows={2}
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Contoh: Karyawan tinggal di rute yang sedang ada proyek perbaikan jalan..."
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Tindakan / Solusi yang Disepakati</label>
                  <input
                    type="text"
                    value={decisionOutcome}
                    onChange={(e) => setDecisionOutcome(e.target.value)}
                    placeholder="Contoh: Disetujui penyesuaian jadwal check-in per 05 Oktober 2026."
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddNoteForm(false)}
                    className="px-3 py-1.5 text-xs rounded-lg text-slate-400 hover:text-white bg-slate-700/50 transition cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition cursor-pointer"
                  >
                    Simpan Evaluasi
                  </button>
                </div>
              </form>
            )}

            {/* List of existing notes */}
            {employee.dssFlag?.investigationNotes && employee.dssFlag.investigationNotes.length > 0 ? (
              <div className="space-y-2.5">
                {employee.dssFlag.investigationNotes.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 text-xs">
                    <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1.5">
                      <span className="font-semibold text-slate-300">{item.author} ({item.role})</span>
                      <span>{item.timestamp}</span>
                    </div>
                    <p className="text-slate-200 mb-2">{item.note}</p>
                    {item.decisionOutcome && (
                      <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-[11px] flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span><strong>Keputusan:</strong> {item.decisionOutcome}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic p-3 bg-slate-800/20 rounded-xl border border-dashed border-slate-800 text-center">
                Belum ada catatan investigasi. Klik tombol di atas untuk mencatat klarifikasi langsung dengan supervisor.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center">
          <span className="text-xs text-slate-400">
            Audit ID Pegawai: <strong className="text-slate-200">FP-EMP-{employee.id}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
