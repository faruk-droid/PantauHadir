import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileSpreadsheet, 
  Check, 
  Database
} from 'lucide-react';
import { FingerprintRawLog, EmployeeProfile } from '../types/attendance';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: FingerprintRawLog[];
  employees: EmployeeProfile[];
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  logs,
  employees
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const downloadCSV = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadSuccess(filename);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleExportRawLogs = () => {
    const headers = ['Log ID', 'Employee ID', 'Name', 'Division', 'Timestamp', 'Device ID', 'Punch Type', 'Match Score', 'Status', 'Delay Minutes', 'Notes'];
    const rows = logs.map(l => [
      l.id,
      l.employeeId,
      `"${l.employeeName}"`,
      `"${l.division}"`,
      l.timestamp,
      l.deviceId,
      l.punchType,
      `${l.matchScore}%`,
      l.status,
      l.delayMinutes,
      `"${l.notes || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(csvContent, `pantauhadir_raw_logs_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  const handleExportChronicCases = () => {
    const headers = ['Employee ID', 'Name', 'Division', 'Role', 'Total Days', 'Late Count', 'Late Rate %', 'Avg Delay Min', 'DSS Status', 'Safe Recommendation'];
    const rows = employees
      .filter(e => e.stats.lateCount > 0)
      .map(e => [
        e.id,
        `"${e.name}"`,
        `"${e.division}"`,
        `"${e.role}"`,
        e.stats.totalWorkDays,
        e.stats.lateCount,
        `${e.stats.lateRate}%`,
        e.stats.avgDelayMinutes,
        `"${e.dssFlag?.status || 'NORMAL'}"`,
        `"${e.dssFlag?.safeRecommendation || 'Evaluasi standar'}"`
      ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSV(csvContent, `pantauhadir_lateness_cases_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-indigo-400">
            <Download className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Ekspor Data & Laporan PantauHadir</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {downloadSuccess && (
          <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>File <strong>{downloadSuccess}</strong> berhasil diunduh!</span>
          </div>
        )}

        <div className="space-y-3 text-xs">
          <div 
            onClick={handleExportRawLogs}
            className="p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 group-hover:bg-sky-500/20">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-sky-300">Raw Fingerprint Ingestion Logs (CSV)</h4>
                <p className="text-slate-400 text-[11px]">Riwayat stempel waktu, sensor ID, match score, dan deviasi menit.</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </div>

          <div 
            onClick={handleExportChronicCases}
            className="p-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 flex items-center justify-between transition cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white group-hover:text-amber-300">Laporan Kasus Pola Keterlambatan DSS (CSV)</h4>
                <p className="text-slate-400 text-[11px]">Daftar karyawan dengan pola berulang dan rekomendasi safe non-penal.</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-500 text-[11px]">Format CSV komparabel Excel & Google Sheets</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
