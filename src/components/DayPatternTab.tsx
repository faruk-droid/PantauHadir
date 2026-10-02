import React, { useState } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Truck
} from 'lucide-react';
import { DayPatternStat } from '../types/attendance';

interface DayPatternTabProps {
  dayStats: DayPatternStat[];
  onOpenDSSConcept: () => void;
}

export const DayPatternTab: React.FC<DayPatternTabProps> = ({ dayStats, onOpenDSSConcept }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Senin');

  const activeStat = dayStats.find(d => d.day === selectedDay) || dayStats[0];
  const maxLateRate = Math.max(...dayStats.map(d => d.lateRate));

  const logisticsContextByDay: Record<string, {
    trafficContext: string;
    operationalRootCause: string;
    safeAction: string;
  }> = {
    'Senin': {
      trafficContext: 'Puncak kemacetan awal pekan arteri Kalimalang & Tol Jakarta-Cikampek. Lonjakan volume kendaraan pribadi dan armada logistik.',
      operationalRootCause: 'Transisi pasca akhir pekan serta briefing serentak jam 06:45 membuat antrean pemindai sidik jari menumpuk.',
      safeAction: 'Buka 2 unit mesin fingerprint cadangan dan berikan toleransi 10 menit khusus briefing Senin.'
    },
    'Selasa': {
      trafficContext: 'Arus lalu lintas normal-padat, rute komuter relatif lancar.',
      operationalRootCause: 'Keterlambatan didominasi shift pagi karyawan yang tinggal di titik perbaikan jalan flyover.',
      safeAction: 'Pertahankan jadwal reguler, lakukan evaluasi bersama supervisor.'
    },
    'Rabu': {
      trafficContext: 'Tingkat lalu lintas paling stabil dalam sepekan. Ritme mobilitas optimal.',
      operationalRootCause: 'Hari paling tertib dengan keterlambatan terendah (9.1%).',
      safeAction: 'Jadikan baseline standar kehadiran harian untuk perbandingan performa.'
    },
    'Kamis': {
      trafficContext: 'Lalu lintas sedang. Menjelang malam mulai terlihat peningkatan volume logistik e-commerce.',
      operationalRootCause: 'Sedikit peningkatan keterlambatan menjelang akhir pekan.',
      safeAction: 'Pastikan kesiapan kru dan briefing operasional malam.'
    },
    'Jumat': {
      trafficContext: 'Kepadatan arus keluar kota sore/malam serta potensi cuaca hujan badai.',
      operationalRootCause: 'Keterlambatan 19.8%, terkonsentrasi di pergantian shift siang ke malam.',
      safeAction: 'Sesuaikan jadwal serah terima tugas 15 menit lebih awal.'
    },
    'Sabtu': {
      trafficContext: 'Jalan raya sekitar hub lancar.',
      operationalRootCause: 'Shift operasional rotasi. Keterlambatan terisolasi pada driver rute luar kota.',
      safeAction: 'Monitoring jam istirahat driver sebelum pemberangkatan long-haul.'
    },
    'Minggu': {
      trafficContext: 'Jalanan lancar.',
      operationalRootCause: 'Shift rotasi khusus. Tingkat disiplin stabil 11.1%.',
      safeAction: 'Pemberian insentif kehadiran rotasi akhir pekan.'
    }
  };

  const currentContext = logisticsContextByDay[selectedDay] || logisticsContextByDay['Senin'];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Dimensi Analitik Pola Hari</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Analisis Pola Keterlambatan Berdasarkan Hari Kerja
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sistem memetakan fluktuasi kehadiran harian untuk mendeteksi korelasi eksternal 
            (kondisi jalur logistik, kemacetan awal pekan, serta lonjakan akhir pekan).
          </p>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold block">Temuan Utama: Hari Senin</span>
            <span className="text-[11px] text-amber-300/80">Keterlambatan 28.4% (3.1x lebih tinggi dari hari Rabu).</span>
          </div>
        </div>
      </div>

      {/* Interactive Day Distribution Bar Chart & Selector */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Tingkat Keterlambatan per Hari (Senin - Minggu)
            </h3>
            <p className="text-xs text-slate-400">
              Klik pada batang hari untuk menganalisis konteks rute transportasi & rekomendasi mitigasi.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-rose-500"></span>
              <span>Tinggi (&gt;20%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-amber-500"></span>
              <span>Sedang (12-20%)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span>Rendah (&lt;12%)</span>
            </div>
          </div>
        </div>

        {/* Custom Interactive SVG / Visual Bar Chart */}
        <div className="grid grid-cols-7 gap-3 pt-4 pb-2 items-end h-64 border-b border-slate-800">
          {dayStats.map((item) => {
            const heightPercent = Math.round((item.lateRate / maxLateRate) * 100);
            const isSelected = item.day === selectedDay;
            const barColor = 
              item.lateRate >= 20 
                ? 'from-rose-500 to-rose-600' 
                : item.lateRate >= 12 
                  ? 'from-amber-500 to-amber-600' 
                  : 'from-emerald-500 to-emerald-600';

            return (
              <div
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`flex flex-col items-center justify-end h-full group cursor-pointer transition p-1 rounded-xl ${
                  isSelected ? 'bg-slate-800/80 ring-2 ring-indigo-500/80' : 'hover:bg-slate-800/40'
                }`}
              >
                {/* Rate Value Label */}
                <span className={`text-xs font-bold font-mono mb-1 transition ${
                  isSelected ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {item.lateRate}%
                </span>

                {/* Vertical Bar */}
                <div className="w-full max-w-[48px] bg-slate-800/80 rounded-t-xl overflow-hidden flex flex-col justify-end h-44 p-0.5">
                  <div
                    className={`w-full rounded-t-lg bg-gradient-to-t ${barColor} transition-all duration-500 shadow-lg`}
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>

                {/* Day Label */}
                <span className={`text-xs font-semibold mt-2.5 transition ${
                  isSelected ? 'text-indigo-400 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                }`}>
                  {item.day}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.latePunches} kasus
                </span>
              </div>
            );
          })}
        </div>

        {/* Selected Day Contextual Deep-Dive Card */}
        <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-700/60 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-white">
                Analisis Kontekstual Hari {activeStat.day}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                activeStat.lateRate >= 20 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                  : activeStat.lateRate >= 12
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                Tingkat Keterlambatan: {activeStat.lateRate}% • Rata-rata +{activeStat.avgDelayMinutes} Menit
              </span>
            </div>

            <span className="text-xs text-slate-400">
              Total Log Masuk: <strong className="text-slate-200">{activeStat.totalPunches} Absensi</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-sky-400 font-semibold text-xs">
                <Truck className="w-4 h-4" />
                <span>Kondisi Arteri & Rute Logistik</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                {currentContext.trafficContext}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-xs">
                <Info className="w-4 h-4" />
                <span>Akar Masalah Operasional Teridentifikasi</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                {currentContext.operationalRootCause}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30 bg-emerald-500/5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rekomendasi Tindakan DSS Human-in-the-Loop</span>
              </div>
              <p className="text-slate-200 leading-relaxed text-xs">
                {currentContext.safeAction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
