import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { LatenessPatternsTab } from './components/LatenessPatternsTab';
import { DayPatternTab } from './components/DayPatternTab';
import { RawDataStreamTab } from './components/RawDataStreamTab';
import { EmployeeDetailModal } from './components/EmployeeDetailModal';
import { DSSPhilosophyModal } from './components/DSSPhilosophyModal';
import { AIIntelligenceModal } from './components/AIIntelligenceModal';
import { ExportModal } from './components/ExportModal';

import { 
  INITIAL_EMPLOYEES, 
  INITIAL_RAW_LOGS, 
  INITIAL_SHIFT_STAFFING, 
  INITIAL_EARLY_WARNINGS, 
  DAY_PATTERN_DATA, 
  SHIFT_PATTERN_DATA 
} from './data/mockLogisticsData';
import { EmployeeProfile, FingerprintRawLog, InvestigationNote } from './types/attendance';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [timeRange, setTimeRange] = useState<string>('14days');
  const [liveStreamActive, setLiveStreamActive] = useState<boolean>(true);

  // Core application state
  const [employees, setEmployees] = useState<EmployeeProfile[]>(INITIAL_EMPLOYEES);
  const [rawLogs, setRawLogs] = useState<FingerprintRawLog[]>(INITIAL_RAW_LOGS);
  const [shiftRequirements] = useState(INITIAL_SHIFT_STAFFING);
  const [alerts, setAlerts] = useState(INITIAL_EARLY_WARNINGS);

  // Modals state
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeProfile | null>(null);
  const [isDSSConceptOpen, setIsDSSConceptOpen] = useState(false);
  const [isAIReportOpen, setIsAIReportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Toast notification for simulated scanner events
  const [recentLivePunch, setRecentLivePunch] = useState<FingerprintRawLog | null>(null);

  // Simulated live scanner ingestion every 14 seconds if streaming is active
  useEffect(() => {
    if (!liveStreamActive) return;

    const interval = setInterval(() => {
      const randomEmp = employees[Math.floor(Math.random() * employees.length)];
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const timeStr = `${hours}:${minutes}:${seconds}`;

      const isLateSim = Math.random() < 0.25;
      const delayMin = isLateSim ? Math.floor(Math.random() * 35) + 5 : 0;
      const score = +(97.5 + Math.random() * 2.2).toFixed(1);

      const newLog: FingerprintRawLog = {
        id: `RAW-${Date.now().toString().slice(-5)}`,
        employeeId: randomEmp.id,
        employeeName: randomEmp.name,
        division: randomEmp.division,
        shift: randomEmp.defaultShift,
        hub: randomEmp.hub,
        deviceId: 'FP-WH-GATE01',
        deviceLocation: 'Pintu Gerbang Barat Gudang Staging',
        timestamp: `2026-10-02 ${timeStr}`,
        timeOnly: timeStr,
        dateOnly: '2026-10-02',
        dayOfWeek: 'Jumat',
        punchType: 'IN',
        matchScore: score,
        status: isLateSim ? 'LATE' : 'ON_TIME',
        delayMinutes: delayMin,
        notes: isLateSim ? `Deteksi scanner real-time (+${delayMin}m)` : 'Sensor matching valid 1:N'
      };

      setRawLogs((prev) => [newLog, ...prev.slice(0, 49)]);
      setRecentLivePunch(newLog);

      setTimeout(() => {
        setRecentLivePunch(null);
      }, 5000);
    }, 14000);

    return () => clearInterval(interval);
  }, [liveStreamActive, employees]);

  // Handler: Add Human Investigation Note to an Employee
  const handleAddInvestigationNote = (
    employeeId: string, 
    newNoteData: Omit<InvestigationNote, 'id' | 'timestamp'>
  ) => {
    const note: InvestigationNote = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === employeeId) {
          const existingDss = emp.dssFlag || {
            level: 'MEDIUM_PRIORITY',
            patternDescription: 'Evaluasi berkala pola absensi',
            safeRecommendation: 'Monitoring supervisor',
            status: 'DALAM_INVESTIGASI',
            investigationNotes: []
          };

          return {
            ...emp,
            dssFlag: {
              ...existingDss,
              status: 'DALAM_INVESTIGASI',
              investigationNotes: [note, ...existingDss.investigationNotes]
            }
          };
        }
        return emp;
      })
    );

    setSelectedEmployee((prev) => {
      if (prev && prev.id === employeeId) {
        const existingDss = prev.dssFlag || {
          level: 'MEDIUM_PRIORITY',
          patternDescription: 'Evaluasi berkala pola absensi',
          safeRecommendation: 'Monitoring supervisor',
          status: 'DALAM_INVESTIGASI',
          investigationNotes: []
        };

        return {
          ...prev,
          dssFlag: {
            ...existingDss,
            status: 'DALAM_INVESTIGASI',
            investigationNotes: [note, ...existingDss.investigationNotes]
          }
        };
      }
      return prev;
    });
  };

  // Handler: Add new test log from manual simulation form
  const handleAddRawLog = (newLog: FingerprintRawLog) => {
    setRawLogs((prev) => [newLog, ...prev]);
    setRecentLivePunch(newLog);
    setTimeout(() => setRecentLivePunch(null), 4000);
  };

  const criticalAlertCount = alerts.filter(a => a.severity === 'critical').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header with Navigation and Global Controls */}
      <Header
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        liveStreamActive={liveStreamActive}
        setLiveStreamActive={setLiveStreamActive}
        onOpenDSSConcept={() => setIsDSSConceptOpen(true)}
        onOpenAIReport={() => setIsAIReportOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        criticalAlertCount={criticalAlertCount}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Real-time incoming punch toast notification */}
        {recentLivePunch && (
          <div className="fixed bottom-6 right-6 z-40 p-3.5 rounded-xl bg-slate-900 border border-indigo-500/40 shadow-2xl shadow-indigo-950/80 flex items-center gap-3 animate-bounce">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div className="text-xs">
              <p className="font-bold text-white flex items-center gap-1.5">
                <span>Sensor Log Baru: {recentLivePunch.employeeName}</span>
                <span className="font-mono text-[10px] text-slate-400">({recentLivePunch.timeOnly})</span>
              </p>
              <p className="text-[11px] text-slate-300">
                {recentLivePunch.status === 'LATE' ? (
                  <span className="text-amber-400 font-semibold">
                    ⚠️ Terlambat +{recentLivePunch.delayMinutes} menit ({recentLivePunch.division})
                  </span>
                ) : (
                  <span className="text-emerald-400 font-semibold">
                    ✓ Hadir Tepat Waktu • Minutiae Score {recentLivePunch.matchScore}%
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Tab 1: Overview & Executive DSS */}
        {activeTab === 'overview' && (
          <OverviewTab
            employees={employees}
            alerts={alerts}
            dayStats={DAY_PATTERN_DATA}
            onSelectEmployee={(emp) => setSelectedEmployee(emp)}
            onOpenDSSConcept={() => setIsDSSConceptOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onResolveAlert={(id) => setAlerts(prev => prev.filter(a => a.id !== id))}
          />
        )}

        {/* Tab 2: Pola Keterlambatan */}
        {activeTab === 'lateness' && (
          <LatenessPatternsTab
            employees={employees}
            onSelectEmployee={(emp) => setSelectedEmployee(emp)}
          />
        )}

        {/* Tab 3: Pola Berdasarkan Hari */}
        {activeTab === 'day_pattern' && (
          <DayPatternTab
            dayStats={DAY_PATTERN_DATA}
            onOpenDSSConcept={() => setIsDSSConceptOpen(true)}
          />
        )}

        {/* Tab 4: Raw Fingerprint Stream & Ingestion Pipeline */}
        {activeTab === 'raw_logs' && (
          <RawDataStreamTab
            logs={rawLogs}
            employees={employees}
            onAddLog={handleAddRawLog}
            isStreaming={liveStreamActive}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            PantauHadir • Attendance Intelligence System (DSS) Logistik
          </span>
          <span className="text-[11px] text-slate-400">
            Prinsip DSS: Data → Analisis → Insight → Rekomendasi Investigasi → Evaluasi Human → Keputusan
          </span>
        </div>
      </footer>

      {/* Modals */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={selectedEmployee !== null}
        onClose={() => setSelectedEmployee(null)}
        onAddNote={handleAddInvestigationNote}
      />

      <DSSPhilosophyModal
        isOpen={isDSSConceptOpen}
        onClose={() => setIsDSSConceptOpen(false)}
      />

      <AIIntelligenceModal
        isOpen={isAIReportOpen}
        onClose={() => setIsAIReportOpen(false)}
        employees={employees}
        dayStats={DAY_PATTERN_DATA}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        logs={rawLogs}
        employees={employees}
      />
    </div>
  );
}
