import React, { useState } from 'react';
import { 
  Fingerprint, 
  Search, 
  Plus, 
  Cpu, 
  ArrowRight
} from 'lucide-react';
import { FingerprintRawLog, EmployeeProfile } from '../types/attendance';

interface RawDataStreamTabProps {
  logs: FingerprintRawLog[];
  employees: EmployeeProfile[];
  onAddLog: (log: FingerprintRawLog) => void;
  isStreaming: boolean;
}

export const RawDataStreamTab: React.FC<RawDataStreamTabProps> = ({
  logs,
  employees,
  onAddLog,
  isStreaming
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [showSimulateModal, setShowSimulateModal] = useState(false);

  // Form state for test punch simulation
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || '1025');
  const [testTime, setTestTime] = useState('07:35:00');
  const [testDevice, setTestDevice] = useState('FP-WH-GATE01');
  const [testPunchType, setTestPunchType] = useState<'IN' | 'OUT'>('IN');

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      log.employeeId.includes(search) ||
      log.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      log.hub.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || log.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleCreateTestPunch = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find(e => e.id === selectedEmpId) || employees[0];
    
    const [h, m] = testTime.split(':').map(Number);
    let status: FingerprintRawLog['status'] = 'ON_TIME';
    let delay = 0;
    
    if (h > 7 || (h === 7 && m > 0)) {
      status = 'LATE';
      delay = (h - 7) * 60 + m;
    }

    const newLog: FingerprintRawLog = {
      id: `RAW-${Date.now().toString().slice(-5)}`,
      employeeId: emp.id,
      employeeName: emp.name,
      division: emp.division,
      shift: emp.defaultShift,
      hub: emp.hub,
      deviceId: testDevice,
      timestamp: `2026-10-02 ${testTime}`,
      timeOnly: testTime,
      dateOnly: '2026-10-02',
      dayOfWeek: 'Jumat',
      punchType: testPunchType,
      matchScore: +(97 + Math.random() * 2.8).toFixed(1),
      status,
      delayMinutes: delay,
      notes: delay > 0 ? `Simulasi keterlambatan +${delay}m` : 'Simulasi tepat waktu'
    };

    onAddLog(newLog);
    setShowSimulateModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Educational Banner: How Fingerprint Sensor Data is Ingested */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Cpu className="w-4 h-4" />
              <span>Cara Kerja Sensor & Ingestion Data Mentah Fingerprint</span>
            </div>
            <h2 className="text-lg font-bold text-white">
              Log Mentah Pemindai Sidik Jari (Raw Attendance Logs)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
              Sensor sidik jari mengekstrak titik minutiae, mencocokkan pola (matching score), 
              dan merekam stempel waktu mentah ke database sebelum diolah oleh intelligence engine.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowSimulateModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-indigo-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>Simulasi Absensi Sidik Jari Baru</span>
            </button>
          </div>
        </div>

        {/* Visual Pipeline of Fingerprint Extraction */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[700px] text-xs gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex-1">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Langkah 1</span>
              <span className="font-bold text-slate-200 block mt-0.5">Penempelan Jari</span>
              <span className="text-[10px] text-slate-400">Sensor Optik 500 DPI</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex-1">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Langkah 2</span>
              <span className="font-bold text-sky-400 block mt-0.5">Ekstraksi Minutiae</span>
              <span className="text-[10px] text-slate-400">Ridge Bifurcation & Endings</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex-1">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Langkah 3</span>
              <span className="font-bold text-indigo-400 block mt-0.5">Fingerprint Matching</span>
              <span className="text-[10px] text-slate-400">Verifikasi 1:N Score &gt;96%</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex-1">
              <span className="text-[10px] text-slate-500 block uppercase font-mono">Langkah 4</span>
              <span className="font-bold text-emerald-400 block mt-0.5">Log Raw Database</span>
              <span className="text-[10px] text-slate-400 font-mono">ID 1025 • 07:32:18</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
            <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex-1">
              <span className="text-[10px] text-indigo-400 block uppercase font-mono">Langkah 5 (PantauHadir)</span>
              <span className="font-bold text-white block mt-0.5">Attendance Intelligence</span>
              <span className="text-[10px] text-amber-300">Interpretasi: +32m Terlambat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID, nama karyawan, kode mesin (FP-WH-01)..."
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
            <option value="ALL">Semua Status Hasil</option>
            <option value="ON_TIME">Tepat Waktu (On-Time)</option>
            <option value="LATE">Terlambat (Late)</option>
            <option value="ANOMALY">Anomali Sensor</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {isStreaming && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Scanner Listening
            </span>
          )}
          <span className="text-xs text-slate-400 font-mono">
            {filteredLogs.length} Catatan Log
          </span>
        </div>
      </div>

      {/* Raw Fingerprint Log Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Raw Log ID</th>
                <th className="py-3 px-4">ID Pegawai & Nama</th>
                <th className="py-3 px-4">Waktu Pemindaian (Timestamp)</th>
                <th className="py-3 px-4">Mesin & Lokasi Sensor</th>
                <th className="py-3 px-4 text-center">Tipe Punch</th>
                <th className="py-3 px-4 text-center">Akurasi Sidik Jari</th>
                <th className="py-3 px-4">Interpretasi Intelligence</th>
                <th className="py-3 px-4">Catatan DSS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {filteredLogs.map((log) => {
                const isLate = log.status === 'LATE';
                const isAnomaly = log.status === 'ANOMALY';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 text-slate-400 font-bold">
                      {log.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-sans">
                        <span className="font-bold text-white block">{log.employeeName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID #{log.employeeId} • {log.division}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      <span className="text-slate-200 block font-semibold">{log.timeOnly}</span>
                      <span className="text-[10px] text-slate-400">{log.dayOfWeek}, {log.dateOnly}</span>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className="font-semibold text-sky-400 font-mono block text-xs">{log.deviceId}</span>
                      <span className="text-[10px] text-slate-400 block">{log.hub}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.punchType === 'IN' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-700 text-slate-300'
                      }`}>
                        {log.punchType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-emerald-400 font-semibold">{log.matchScore}%</span>
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${
                        isAnomaly 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : isLate 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isAnomaly ? 'ANOMALI DOUBLE PUNCH' : isLate ? `TERLAMBAT (+${log.delayMinutes}m)` : 'TEPAT WAKTU'}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-400 text-[11px]">
                      {log.notes || 'Pencatatan normal'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Simulate Fingerprint Punch */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Fingerprint className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Simulasi Penempelan Sidik Jari</h3>
              </div>
              <button
                onClick={() => setShowSimulateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTestPunch} className="space-y-3.5 text-xs text-slate-300">
              <div>
                <label className="block text-slate-400 mb-1">Pilih Karyawan</label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none"
                >
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>
                      #{emp.id} - {emp.name} ({emp.division})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Waktu Masuk (HH:MM:SS)</label>
                  <input
                    type="time"
                    step="1"
                    value={testTime}
                    onChange={(e) => setTestTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Contoh: 07:35 (Terlambat)</span>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Tipe Absensi</label>
                  <select
                    value={testPunchType}
                    onChange={(e) => setTestPunchType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                  >
                    <option value="IN">IN (Masuk Shift)</option>
                    <option value="OUT">OUT (Pulang Shift)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Terminal Sensor Fingerprint</label>
                <select
                  value={testDevice}
                  onChange={(e) => setTestDevice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
                >
                  <option value="FP-WH-GATE01">FP-WH-GATE01 (Gerbang Barat Gudang)</option>
                  <option value="FP-SORT-LINEA">FP-SORT-LINEA (Line 1 Sorting Hub)</option>
                  <option value="FP-DOCK-IN02">FP-DOCK-IN02 (Inbound Crossdock)</option>
                  <option value="FP-DRIVER-ROOM">FP-DRIVER-ROOM (Ruang Dispatch Driver)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="px-3.5 py-1.5 rounded-lg text-slate-400 hover:text-white transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition cursor-pointer"
                >
                  Trigger Sensor Punch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
