import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, AlertCircle, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { Subject } from '../data/mockData';

export const SubjectCard = ({ subject }: { subject: Subject }) => {
  const navigate = useNavigate();
  const pct = Math.round((subject.attended / subject.total) * 100);
  
  let statusColor, bgLight, Icon, borderTop, barColor, message, MessageIcon;
  
  if (pct >= 75) {
    statusColor = 'text-accent';
    bgLight = 'bg-accent/10';
    Icon = CheckCircle2;
    borderTop = 'border-t-4 border-t-accent';
    barColor = '#7FD8BE';
    message = 'Safe';
    MessageIcon = ShieldCheck;
  } else if (pct >= 65) {
    statusColor = 'text-warning';
    bgLight = 'bg-warning/10';
    Icon = AlertCircle;
    borderTop = 'border-t-4 border-t-warning';
    barColor = '#F59E0B';
    message = 'Warning';
    MessageIcon = ShieldAlert;
  } else {
    statusColor = 'text-danger';
    bgLight = 'bg-danger/10';
    Icon = AlertTriangle;
    borderTop = 'border-t-4 border-t-danger';
    barColor = '#FF8B94';
    const needed = Math.ceil((0.75 * subject.total - subject.attended) / 0.25);
    message = `Need ${needed} more`;
    MessageIcon = ShieldAlert;
  }

  return (
    <div 
      onClick={() => navigate(`/subject/${subject.id}`)}
      className={`glass-panel p-6 rounded-[2rem] cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ${borderTop} group bg-white/60 relative overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 ${bgLight} rounded-xl ${statusColor} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`font-display text-3xl font-extrabold ${statusColor}`}>{pct}%</span>
      </div>
      
      <h3 className="font-bold text-slate-800 text-base mb-1 leading-tight">{subject.name}</h3>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{subject.code} · Theory</p>
      
      <div className="w-full bg-slate-200/60 rounded-full h-2 mb-3 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000" 
          style={{ width: `${pct}%`, backgroundColor: barColor }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs font-bold text-slate-400 items-center">
        <span>{subject.attended}/{subject.total} Classes</span>
        <span className={`flex items-center gap-1 ${statusColor}`}>
          <MessageIcon className="w-3.5 h-3.5" />
          {message}
        </span>
      </div>
    </div>
  );
};
