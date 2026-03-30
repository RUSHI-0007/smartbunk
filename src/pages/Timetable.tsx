import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Timetable = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysFull = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const calendarData = Array.from({ length: 31 }, (_, i) => {
    const date = i + 1;
    let status = 'future';
    if ([2, 3, 5, 9, 10, 11, 12, 17, 18, 19, 20, 23, 24, 26].includes(date)) status = 'present';
    else if ([4, 13, 25].includes(date)) status = 'absent';
    else if ([16, 30].includes(date)) status = 'holiday';
    else if ([1, 7, 8, 14, 15, 21, 22, 28, 29].includes(date)) status = 'weekend';
    return { date, status };
  });

  const getDayStyle = (status: string, date: number) => {
    if (date === 30) return 'bg-primary text-white font-black shadow-lg shadow-primary/30';
    switch (status) {
      case 'present': return 'bg-accent/10 text-accent font-black border border-accent/20';
      case 'absent': return 'bg-danger/10 text-danger font-black border border-danger/20';
      case 'holiday': return 'bg-primary/5 text-primary font-black border border-primary/20';
      case 'weekend': return 'bg-slate-50 text-slate-300 font-bold';
      default: return 'bg-white text-slate-600 font-bold border border-slate-100 shadow-sm';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">Timetable & Calendar</h1>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-3">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent"></div> Present</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-danger"></div> Absent</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary/60"></div> Holiday</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div> Weekend</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 shrink-0">
          <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
          <span className="font-display font-bold text-xs text-slate-800 px-2 whitespace-nowrap">Mar 2026</span>
          <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl p-3 md:p-6 lg:p-10 border border-slate-100 shadow-sm overflow-hidden">
        {/* Day headers — single letter on mobile, full on md+ */}
        <div className="grid grid-cols-7 mb-2">
          {days.map((d, i) => (
            <div key={i} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest md:hidden py-1">
              {d}
            </div>
          ))}
          {daysFull.map((d) => (
            <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block py-1">
              {d}
            </div>
          ))}
        </div>
        {/* Date cells */}
        <div className="grid grid-cols-7 gap-1 md:gap-2">
          {calendarData.map(({ date, status }) => (
            <div
              key={date}
              className={`aspect-square rounded-lg md:rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${getDayStyle(status, date)}`}
            >
              <span className="text-xs md:text-base lg:text-lg font-display leading-none">{date}</span>
              {date === 30 && <span className="text-[5px] md:text-[7px] font-black uppercase tracking-widest mt-0.5">Today</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 md:gap-6">
        {[
          { color: 'text-accent', bg: 'bg-accent/10', count: 14, label: 'Present Days' },
          { color: 'text-danger', bg: 'bg-danger/10', count: 3, label: 'Absent Days' },
          { color: 'text-primary', bg: 'bg-primary/10', count: 3, label: 'Holidays' }
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
            <span className={`font-display text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter ${stat.color}`}>{stat.count}</span>
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
