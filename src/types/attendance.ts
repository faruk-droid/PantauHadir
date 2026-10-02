export type Division = 
  | 'Warehouse' 
  | 'Sorting Hub' 
  | 'Fleet & Driver' 
  | 'Operasional Dock' 
  | 'Admin & Dispatch';

export type ShiftType = 'Shift 1 (Pagi 07:00-15:00)' | 'Shift 2 (Siang 15:00-23:00)' | 'Shift 3 (Malam 23:00-07:00)';

export type AttendanceStatus = 'ON_TIME' | 'LATE' | 'OVERTIME' | 'EARLY_LEAVE' | 'ABSENT' | 'ANOMALY';

export interface FingerprintRawLog {
  id: string;
  employeeId: string;
  employeeName: string;
  division: Division;
  shift: ShiftType;
  hub: string;
  deviceId: string;
  timestamp: string;
  timeOnly: string;
  dateOnly: string;
  dayOfWeek: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  punchType: 'IN' | 'OUT';
  matchScore: number;
  status: AttendanceStatus;
  delayMinutes: number;
  notes?: string;
  deviceLocation?: string;
}

export interface EmployeeProfile {
  id: string;
  name: string;
  division: Division;
  role: string;
  defaultShift: ShiftType;
  hub: string;
  joinDate: string;
  phone: string;
  avatar: string;
  stats: {
    totalWorkDays: number;
    presentDays: number;
    lateCount: number;
    absentCount: number;
    avgDelayMinutes: number;
    lateRate: number;
    streakLate: number;
  };
  weeklyPatterns: {
    Senin: number;
    Selasa: number;
    Rabu: number;
    Kamis: number;
    Jumat: number;
    Sabtu: number;
  };
  recentLogs: FingerprintRawLog[];
  dssFlag?: {
    level: 'HIGH_PRIORITY' | 'MEDIUM_PRIORITY' | 'NORMAL';
    patternDescription: string;
    safeRecommendation: string;
    status: 'PERLU_KLARIFIKASI' | 'DALAM_INVESTIGASI' | 'TINDAKAN_SELESAI';
    investigationNotes: InvestigationNote[];
  };
}

export interface InvestigationNote {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  category: 'KENDALA_TRANSPORTASI' | 'KESEHATAN_DARURAT' | 'OVERTIME_SHIFT_SEBELUMNYA' | 'GANGGUAN_MESIN_FINGERPRINT' | 'LAINNYA';
  note: string;
  decisionOutcome?: string;
}

export interface ShiftStaffingRequirement {
  id: string;
  shift: ShiftType;
  division: Division;
  hub: string;
  requiredHeadcount: number;
  actualPresent: number;
  deficit: number;
  deficitPercentage: number;
  riskStatus: 'AMAN' | 'WASPADA' | 'KRITIS';
  operationalImpact: string;
}

export interface EarlyWarningAlert {
  id: string;
  type: 'CHRONIC_TARDINESS' | 'SHIFT_DEFICIT' | 'UNUSUAL_ABSENCE_SPIKE' | 'ANOMALY_RECORD' | 'DAY_CONCENTRATION';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  metric: string;
  targetEntity: string;
  safeRecommendation: string;
  affectedCount: number;
  humanEvaluationStatus: 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
  timestamp: string;
}

export interface DayPatternStat {
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu';
  totalPunches: number;
  latePunches: number;
  lateRate: number;
  avgDelayMinutes: number;
  riskLabel: string;
}

export interface ShiftPatternStat {
  shift: ShiftType;
  shortName: string;
  targetPersonnel: number;
  avgPresent: number;
  lateCount: number;
  lateRate: number;
  deficitRate: number;
  bottleneckRisk: string;
}

export interface DivisionStat {
  division: Division;
  headcount: number;
  attendanceRate: number;
  lateRate: number;
  chronicTardinessCount: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}
