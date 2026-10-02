import React from 'react';
import { 
  Fingerprint, 
  BrainCircuit, 
  Clock, 
  Sparkles, 
  Download, 
  HelpCircle,
  Play,
  Pause,
  AlertTriangle
} from 'lucide-react';

interface HeaderProps {
  timeRange: string;
  setTimeRange: (range: string) => void;
  liveStreamActive: boolean;
  setLiveStreamActive: (active: boolean) => void;
  onOpenDSSConcept: () => void;
  onOpenAIReport: () => void;
  onOpenExport: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  criticalAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  timeRange,
  setTimeRange,
  liveStreamActive,
  setLiveStreamActive,
  onOpenDSSConcept,
  onOpenAIReport,
  onOpenExport,
  activeTab,
  setActiveTab,
  criticalAlertCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner: Project Context & Philosophy Quick Bar */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 px-4 py-1.5 border-b border-indigo-900/50 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2 text-indigo-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-200">PantauHadir</span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-indigo-300/90">
            Attendance Intelligence System • Transformasi Raw Fingerprint Log ke Decision Support System (DSS)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDSSConcept}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 font-medium transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Konsep Alur DSS & Etika Evaluasi</span>
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <Fingerprint className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  PantauHadir
                  <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                    DSS v2.4
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Attendance Intelligence • Pola Keterlambatan • Analisis Hari • Early Warning
              </p>
            </div>
          </div>

          {/* Controls: Time Filter, Live Stream, Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Date Range Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                aria-label="Pilih Rentang Waktu Analisis Data"
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
              >
                <option value="today" className="bg-slate-900 text-slate-200">Hari Ini (02 Okt 2026)</option>
                <option value="7days" className="bg-slate-900 text-slate-200">7 Hari Terakhir</option>
                <option value="14days" className="bg-slate-900 text-slate-200">14 Hari Terakhir (Default DSS)</option>
                <option value="30days" className="bg-slate-900 text-slate-200">30 Hari Terakhir</option>
              </select>
            </div>

            {/* Live Stream Sensor Toggle */}
            <button
              onClick={() => setLiveStreamActive(!liveStreamActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                liveStreamActive 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30' 
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
              title="Simulasi penangkapan data real-time dari mesin fingerprint logistik"
            >
              {liveStreamActive ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Stream Sensor: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-400" />
                  <span>Stream Sensor: PAUSE</span>
                </>
              )}
            </button>

            {/* AI Executive Brief Button */}
            <button
              onClick={onOpenAIReport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white shadow-md shadow-indigo-600/20 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>AI Executive Synthesis</span>
            </button>

            {/* Export Button */}
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Ekspor Laporan Audit & Data Logistik"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Ekspor</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 mt-4 overflow-x-auto pb-1 border-b border-slate-800/80">
          {[
            { id: 'overview', label: 'Ringkasan Eksekutif & EWS', badge: criticalAlertCount > 0 ? criticalAlertCount : null },
            { id: 'lateness', label: 'Pola Keterlambatan', desc: 'Frekuensi & Tren' },
            { id: 'day_pattern', label: 'Pola Berdasarkan Hari', desc: 'Senin vs Weekend' },
            { id: 'raw_logs', label: 'Raw Fingerprint Stream', desc: 'Sensor Log Mentah' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-indigo-500 text-white bg-slate-800/60 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge !== null && tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
