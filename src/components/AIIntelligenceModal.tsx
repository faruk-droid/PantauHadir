import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Printer
} from 'lucide-react';
import { EmployeeProfile, DayPatternStat } from '../types/attendance';

interface AIIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: EmployeeProfile[];
  dayStats: DayPatternStat[];
}

export const AIIntelligenceModal: React.FC<AIIntelligenceModalProps> = ({
  isOpen,
  onClose,
  employees,
  dayStats
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(executiveReportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const executiveReportContent = `
================================================================================
LAPORAN EKSEKUTIF PANTAUHADIR — ATTENDANCE INTELLIGENCE SYSTEM (DSS)
OPERASIONAL LOGISTIK & WORKFORCE ANALYTICS
Proyek Inovasi Magang Informatika • Versi 2.4
Tanggal Laporan: 02 Oktober 2026
================================================================================

1. EXECUTIVE SUMMARY & LATAR BELAKANG
PantauHadir mengolah log mentah pemindai sidik jari (fingerprint) menjadi kecerdasan 
pengambilan keputusan (Decision Support System / DSS) tanpa menggantikan mesin fisik 
maupun memberikan sanksi otomatis. Pendekatan "Human-in-the-Loop" diterapkan untuk 
menjamin keadilan evaluasi terhadap faktor eksternal operasional logistik.

2. TEMUAN UTAMA POLA KEHADIRAN:
--------------------------------------------------------------------------------
A. Pola Keterlambatan Individu:
   • Budi Santoso (ID 1025, Warehouse Staging): 7x terlambat dalam 14 hari kerja (50%). 
     Rata-rata deviasi +24.5 menit.
     Diagnostik: 5 dari 7 kejadian terjadi di hari Senin & Selasa. 
     Faktor terkonfirmasi: Rekonstruksi flyover arteri Tambun-Cakung.
   • Dewi Anggraini (ID 1055, Sorting Hub): 6x terlambat terkonsentrasi di akhir pekan.

B. Pola Berdasarkan Hari:
   • Hari Senin mencatat tingkat keterlambatan tertinggi (28.4%), 3.1x lipat lebih tinggi 
     dibandingkan hari Rabu (9.1%).
   • Penyebab: Kemacetan arteri industri pasca akhir pekan dan antrean scanner saat 
     briefing serentak jam 06:45 WIB.

C. Deteksi Anomali Pemindaian Fingerprint:
   • Terdeteksi Double Punch pada sensor FP-DOCK-IN02 (Rian Hidayat, 32 detik selisih). 
     Rekomendasi inspeksi debu industri pada sensor optik gerbang muat.

3. REKOMENDASI TINDAKAN STRATEGIS HR & SUPERVISOR:
--------------------------------------------------------------------------------
1. Solusi Budi Santoso: Lakukan uji coba penyesuaian jam kedatangan. Hindari penerbitan sanksi SP sebelum 
   uji coba operasional selesai.
2. Mitigasi Keterlambatan Senin: Aktifkan 2 unit terminal fingerprint tambahan 
   dan terapkan toleransi 10 menit khusus absensi briefing Senin.
3. Perawatan Sensor: Lakukan pembersihan mingguan sensor sidik jari di dermaga dock 
   untuk mencegah error double scanning.

================================================================================
Disusun oleh: Mahasiswa Magang Informatika
Dievaluasi oleh: HR & Operations Logistics Committee
Prinsip: Data → Analisis → Insight → Rekomendasi Investigasi → Evaluasi Human → Keputusan
================================================================================
  `.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Executive Synthesis & AI DSS Intelligence Brief
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                  PantauHadir
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Sintesis otomatis pola absensi logistik dan rekomendasi investigasi ramah HR
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
        <div className="p-6 space-y-6 text-xs text-slate-300">
          <div className="flex items-center justify-end gap-2 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Cetak PDF</span>
            </button>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto whitespace-pre-wrap selection:bg-indigo-500/40">
            {executiveReportContent}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900 flex justify-between items-center text-xs text-slate-400">
          <span>PantauHadir • Menunjang Keputusan Manusia • Bukan Penalti Otomatis</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
