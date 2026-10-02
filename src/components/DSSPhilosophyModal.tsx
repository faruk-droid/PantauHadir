import React from 'react';
import { 
  X, 
  Fingerprint, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  UserCheck, 
  TrendingUp, 
  FileSearch,
  Scale
} from 'lucide-react';

interface DSSPhilosophyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DSSPhilosophyModal: React.FC<DSSPhilosophyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Konsep & Arsitektur Decision Support System (DSS)</h2>
              <p className="text-xs text-slate-400">
                Landasan Desain Inovasi Absensi PantauHadir untuk Operasional Logistik
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
        <div className="p-6 space-y-8 text-sm text-slate-300">
          <div>
            <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
              Alur Transformasi Data: Dari Log Mentah Menuju Keputusan
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              PantauHadir tidak menggantikan mesin sidik jari yang ada, melainkan bertindak sebagai lapisan kecerdasan di atas basis data absensi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                <Fingerprint className="w-6 h-6 text-sky-400 mb-2" />
                <span className="font-semibold text-white">1. Sensor Log</span>
                <span className="text-[11px] text-slate-400 mt-1">Ekstraksi & Timestamp</span>
              </div>
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-400 mb-2" />
                <span className="font-semibold text-white">2. Intelligence Analitik</span>
                <span className="text-[11px] text-slate-400 mt-1">Frekuensi & Pola Hari</span>
              </div>
              <div className="hidden md:flex items-center justify-center text-slate-600">
                <ArrowRight className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col items-center justify-center">
                <FileSearch className="w-6 h-6 text-amber-400 mb-2" />
                <span className="font-semibold text-amber-200">3. Rekomendasi Investigasi</span>
                <span className="text-[11px] text-slate-400 mt-1">Alert Non-Penal</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald-400 mb-2" />
                <span className="font-semibold text-emerald-200">4. Evaluasi Human</span>
                <span className="text-[11px] text-slate-400 mt-1">HR & Supervisor Lapangan</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/80">
            <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Prinsip Output yang Aman (Safe Decision Support)
            </h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Sesuai kaidah DSS, sistem intelligence absensi bertugas menyajikan fakta objektif dan anomali tanpa pernah mengambil keputusan sanksi otomatis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50">
                <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2 text-xs">
                  <AlertCircle className="w-4 h-4" />
                  <span>Pendekatan Tradisional / Kaku (JANGAN)</span>
                </div>
                <blockquote className="p-3 bg-rose-950/50 rounded-lg text-rose-200 font-mono text-xs border-l-2 border-rose-500 italic mb-2">
                  "Budi Santoso terlambat 7 kali. Sistem merekomendasikan penerbitan Surat Peringatan (SP-1) dan pemotongan tunjangan."
                </blockquote>
                <p className="text-[11px] text-rose-300/80">
                  ⚠️ Mengabaikan konteks operasional logistik: kemacetan jalur pantura/arteri atau antrean sensor sidik jari.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/50">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pendekatan PantauHadir (DSS)</span>
                </div>
                <blockquote className="p-3 bg-emerald-950/50 rounded-lg text-emerald-200 font-mono text-xs border-l-2 border-emerald-500 italic mb-2">
                  "Budi tercatat terlambat 7 kali dalam 14 hari, dengan 5 kejadian terkonsentrasi di hari Senin/Selasa. Sistem menyarankan verifikasi kendala transportasi atau evaluasi penyesuaian jam kerja."
                </blockquote>
                <p className="text-[11px] text-emerald-300/80">
                  ✅ Mengutamakan investigasi human-in-the-loop dan solusi operasional yang berkeadilan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
