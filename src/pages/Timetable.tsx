import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Timetable = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  // Hardcoded visual mockup matching "March 2026" exactly from the EPD design prompt
  const calendarData = Array.from({ length: 31 }, (_, i) => {
    const date = i + 1;
    let status = 'future';
    
    // Pattern mimicking the image:
    if ([2, 3, 5, 9, 10, 11, 12, 17, 18, 19, 20, 23, 24, 26].includes(date)) status = 'present';
    else if ([4, 13, 25].includes(date)) status = 'absent';
    else if ([16, 30].includes(date)) status = 'holiday';
    else if ([1, 7, 8, 14, 15, 21, 22, 28, 29].includes(date)) status = 'weekend';
    
    return { date, status };
  });

  const getDayStyle = (status: string, date: number) => {
    if (date === 30) return 'bg-primary text-white font-black shadow-lg shadow-primary/30'; // TODAY
    switch (status) {
      case 'present': return 'bg-accent/10 text-accent font-black border border-accent/20';
      case 'absent': return 'bg-danger/10 text-danger font-black border border-danger/20';
      case 'holiday': return 'bg-primary/5 text-primary font-black border border-primary/20';
      case 'weekend': return 'bg-slate-50 text-slate-300 font-bold';
      default: return 'bg-white text-slate-600 font-bold border border-slate-100 shadow-sm';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-slate-800 tracking-tight">Timetable & Calendar</h1>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-4">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent"></div> Present</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-danger"></div> Absent</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-primary/60"></div> Holiday</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div> Weekend</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><ChevronLeft className="w-5 h-5 text-slate-400" /></button>
          <span className="font-display font-bold text-sm text-slate-800 px-4">March 2026</span>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors"><ChevronRight className="w-5 h-5 text-slate-400" /></button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 lg:p-12 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <div className="grid grid-cols-7 gap-4 mb-6">
          {days.map(day => (
            <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-3 lg:gap-4">
          {calendarData.map(({ date, status }) => (
            <div 
              key={date} 
              className={`aspect-square rounded-[1.5rem] flex flex-col items-center justify-center transition-all duration-300 hover:scale-[1.05] cursor-pointer ${getDayStyle(status, date)}`}
            >
              <span className="text-lg lg:text-xl font-display">{date}</span>
              {date === 30 && <span className="text-[8px] font-black uppercase tracking-widest mt-1">Today</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { color: 'text-accent', bg: 'bg-accent/10', count: 14, label: 'Present Days' },
          { color: 'text-danger', bg: 'bg-danger/10', count: 3, label: 'Absent Days' },
          { color: 'text-primary', bg: 'bg-primary/10', count: 3, label: 'Holidays' }
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
            <span className={`font-display text-4xl lg:text-5xl font-black tracking-tighter ${stat.color} drop-shadow-sm`}>{stat.count}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
