import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ShieldCheck, AlertTriangle, CalendarRange, FileText, TrendingUp, UserMinus, ArrowRight } from 'lucide-react';
import { studentData } from '../data/mockData';

export const StudentDash = () => {
  const navigate = useNavigate();
  const defaulterSubject = studentData.subjects.find(s => s.code === 'CS403'); // Using CS403 from the image
  const defaulterPct = 68;
  const classesNeeded = 10;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner (Image 1 replica) */}
      <div className="bg-gradient-to-r from-[#9B89C9] to-[#b1a2d6] rounded-[2rem] p-8 lg:p-12 text-white relative shadow-[0_20px_40px_-15px_rgba(155,137,201,0.5)] overflow-hidden">
        <div className="absolute -left-32 -bottom-32 w-80 h-80 bg-white/10 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[11px] font-bold tracking-widest uppercase mb-5 border border-white/20 backdrop-blur-md">
              SEMESTER {studentData.semester} · {studentData.branch}
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-black mb-3 tracking-tight w-full leading-tight drop-shadow-md">
              Welcome back, {studentData.name}!
            </h1>
            <p className="text-white/80 font-semibold flex items-center gap-2 text-sm mt-4">
              <MapPin className="w-4 h-4" /> {studentData.university} Institute · Pimpri-Chinchwad
            </p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 min-w-[280px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-white/90 uppercase tracking-widest">Overall Attendance</span>
              <ShieldCheck className="w-5 h-5 text-accent/80" />
            </div>
            <div className="flex items-baseline gap-1.5 mb-2 mt-2">
              <span className="font-display text-5xl font-black tracking-tighter">{studentData.overallAttendance}</span>
              <span className="text-2xl font-bold text-white/70">%</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2 mb-2 overflow-hidden shadow-inner">
              <div className="bg-accent h-full rounded-full transition-all duration-1000" style={{ width: `${studentData.overallAttendance}%` }}></div>
            </div>
            <p className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Safe Zone ✓ — Keep it up!</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Schedule', subtitle: 'CALENDAR', icon: CalendarRange, color: 'text-accent', bg: 'bg-accent/10', path: '/timetable' },
          { label: 'Tasks', subtitle: '2 PENDING', icon: FileText, color: 'text-warning', bg: 'bg-warning/10', path: '/assignments' },
          { label: 'Reports', subtitle: 'ANALYTICS', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10', path: '/analytics' },
          { label: 'Request', subtitle: 'LEAVES', icon: UserMinus, color: 'text-slate-500', bg: 'bg-slate-100', path: '/absence' },
        ].map((action, i) => (
          <div key={i} onClick={() => navigate(action.path)} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] flex items-center gap-4 hover:-translate-y-1 transition-transform cursor-pointer">
            <div className={`p-4 rounded-2xl ${action.bg} ${action.color}`}>
              <action.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{action.subtitle}</div>
              <div className="font-display font-bold text-lg text-slate-800">{action.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alert Banner */}
      <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-2xl p-5 flex items-start md:items-center gap-4 shadow-sm relative overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-danger"></div>
        <div className="p-3 bg-danger/10 rounded-xl text-danger shrink-0 ml-2">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-danger text-base">Defaulter Risk — Action Needed</h3>
          <p className="text-slate-600 font-medium text-sm mt-1">
            Your <strong>Computer Organization (CS403)</strong> is at <strong>68%</strong>. Attend next {classesNeeded} lectures to recover to 75%.
          </p>
        </div>
        <button 
          onClick={() => navigate('/subject/cs403')}
          className="px-5 py-2.5 bg-danger/90 text-white font-bold rounded-xl hover:bg-danger transition-colors shadow-md shadow-danger/20 text-sm whitespace-nowrap"
        >
          Fix Now
        </button>
      </div>

      {/* Course Overview */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-display text-2xl font-extrabold text-slate-800">Course Overview</h2>
          <button onClick={() => navigate('/analytics')} className="text-xs font-bold text-primary hover:text-primary/80 flex items-center gap-1 uppercase tracking-wider">
            View Analytics <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="grid xl:grid-cols-2 gap-5">
          {studentData.subjects.map((subject, i) => {
            const pct = Math.round((subject.attended / subject.total) * 100);
            const isCritical = pct < 75;
            const isWarning = pct >= 75 && pct < 80;
            const primaryColor = isCritical ? 'text-warning' : (isWarning ? 'text-accent' : 'text-accent');
            const borderColor = isCritical ? 'border-warning/30 top-border-warning' : 'border-accent/30 top-border-accent';
            const barBgColor = isCritical ? '#F59E0B' : '#7FD8BE'; // Matches Warning yellow vs Safe green
            
            return (
              <div key={subject.id} className={`bg-white rounded-3xl p-6 lg:p-8 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow border-t-[3px] border-l border-r border-b ${isCritical ? 'border-t-warning shadow-warning/5' : 'border-t-accent shadow-accent/5'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-start">
                    <div className={`p-1.5 rounded-full border-2 ${isCritical ? 'border-warning text-warning bg-warning/5' : 'border-accent text-accent bg-accent/5'} mt-1`}>
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl lg:text-2xl text-slate-800 leading-tight mb-1">{subject.name}</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subject.code} · {subject.type}</p>
                    </div>
                  </div>
                  <span className={`font-display text-4xl lg:text-5xl font-black tracking-tighter ${primaryColor}`}>
                    {pct}<span className="text-2xl">%</span>
                  </span>
                </div>
                
                <div className="mt-auto">
                  <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden shadow-inner">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: barBgColor }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{subject.attended}/{subject.total} Classes</span>
                    {isCritical ? (
                      <span className="text-xs font-bold text-warning flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full"><AlertTriangle className="w-3.5 h-3.5" /> Need {Math.ceil((0.75 * subject.total - subject.attended) / 0.25)} more</span>
                    ) : (
                      <span className="text-xs font-bold text-accent flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full"><ShieldCheck className="w-3.5 h-3.5" /> Safe</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
