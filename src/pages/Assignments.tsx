import React from 'react';
import { Plus, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { studentData } from '../data/mockData';

export const Assignments = () => {
  const pending = studentData.assignments.filter(a => a.status === 'Pending');
  const completed = studentData.assignments.filter(a => a.status === 'Completed');
  const completionRate = Math.round((completed.length / studentData.assignments.length) * 100) || 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl">
      <div className="flex justify-between items-start gap-3 mb-6">
        <div className="min-w-0">
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-1">Assignments Workspace</h1>
          <p className="text-xs md:text-sm font-bold text-slate-500 tracking-wider">
            Manage your programming and theory submissions.
          </p>
        </div>
        <button className="bg-slate-900 text-white px-3 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1.5 hover:bg-slate-800 transition-colors shadow-sm shrink-0 whitespace-nowrap">
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden xs:inline">New</span> Task
        </button>
      </div>

      {/* Completion Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] gap-6">
        <div className="flex-1 w-full relative">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Completion Rate</span>
            <span className="text-sm font-bold text-slate-400">{completed.length} of {studentData.assignments.length} done</span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-3 overflow-hidden shadow-inner cursor-pointer">
            <div className="bg-primary h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(155,137,201,0.5)]" style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
        <div className="font-display font-black text-6xl lg:text-7xl text-primary tracking-tighter shrink-0 drop-shadow-sm">
          {completionRate}<span className="text-4xl">%</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pending Col */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning" /> Pending Submissions
          </h3>
          {pending.map(task => {
            const isHigh = task.urgency === 'high';
            const urgencyColor = isHigh ? 'text-danger' : 'text-warning';
            const urgencyBorder = isHigh ? 'border-danger/30' : 'border-warning/30';
            const urgencyBg = isHigh ? 'bg-danger/10' : 'bg-warning/10';

            return (
              <div key={task.id} className={`bg-white rounded-[2rem] p-6 border-2 border-transparent ${urgencyBorder} shadow-sm group hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{task.subjectCode} · {task.subjectName}</span>
                  <span className={`text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest ${urgencyColor} ${urgencyBg} px-3 py-1 rounded-full`}>
                    {isHigh ? <AlertCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />} {task.dueDate}
                  </span>
                </div>
                
                <h4 className="font-display font-bold text-xl text-slate-800 leading-tight mb-2">{task.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">{task.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {task.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg uppercase tracking-widest">{tag}</span>
                    ))}
                  </div>
                  <button className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-colors">
                    Mark Complete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completed Col */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Completed
          </h3>
          {completed.map(task => (
            <div key={task.id} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-800 text-sm leading-tight mb-0.5">{task.title}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.subjectCode} · {task.subjectName}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-accent opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
