import React from 'react';
import { Send, Calendar, FileText, CloudUpload, History, Check, Clock, X } from 'lucide-react';
import { studentData } from '../data/mockData';

export const Absence = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-10">
      <div className="mb-10 text-center flex flex-col items-center">
        <h1 className="font-display text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Absence Request</h1>
        <p className="text-sm font-bold text-slate-500 tracking-wider">
          Submit a leave application to your faculty.
        </p>
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-slate-100 shadow-[0_8px_32px_rgba(0,0,0,0.03)] selection:bg-primary/20">
        <h2 className="text-xl font-display font-bold text-slate-800 flex items-center gap-2 mb-8 border-b border-slate-50 pb-5">
          <Send className="w-5 h-5 text-primary" /> New Request
        </h2>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Subject</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl focus:ring-primary focus:border-primary block p-3.5 pl-12 shadow-inner appearance-none outline-none">
                  <option>Select subject</option>
                  {studentData.subjects.map(s => (
                    <option key={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input type="date" defaultValue="2026-03-30" className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl focus:ring-primary focus:border-primary block p-3.5 pl-12 shadow-inner outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Reason Type</label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <select className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl focus:ring-primary focus:border-primary block p-3.5 pl-12 shadow-inner appearance-none outline-none">
                  <option>Medical Emergency</option>
                  <option>Family Application</option>
                  <option>Hackathon / Tech Fest</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Supporting Document <span className="text-slate-400 font-medium normal-case">(optional)</span></label>
              <div className="border border-dashed border-primary/30 rounded-2xl p-3 bg-primary/5 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/10 transition-colors">
                <CloudUpload className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs font-bold text-slate-500">Click to upload PDF / JPG</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Detailed Reason</label>
            <textarea rows={3} placeholder="Explain the reason for your absence..." className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-bold rounded-2xl focus:ring-primary focus:border-primary block p-4 shadow-inner outline-none resize-none"></textarea>
          </div>

          <button type="button" className="w-full text-white bg-gradient-to-r from-[#9B89C9] to-[#C7CEEA] hover:from-[#8b79b5] hover:to-[#b1a2d6] shadow-[0_4px_24px_rgba(155,137,201,0.4)] font-bold rounded-2xl text-sm px-5 py-4 text-center flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5">
            <Send className="w-4 h-4" /> Submit Request
          </button>
        </form>
      </div>

      {/* Previous Requests */}
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <History className="w-4 h-4" /> Previous Requests
        </h3>
        <div className="space-y-3">
          {studentData.absenceHistory.map(req => {
            let statusStyle, Icon;
            if (req.status === 'Approved') {
              statusStyle = 'text-accent bg-accent/10 border-accent/20';
              Icon = Check;
            } else if (req.status === 'Pending') {
              statusStyle = 'text-warning bg-warning/10 border-warning/20';
              Icon = Clock;
            } else {
              statusStyle = 'text-danger bg-danger/10 border-danger/20';
              Icon = X;
            }

            return (
              <div key={req.id} className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{req.subject}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{req.date} · {req.reasonType}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${statusStyle}`}>
                  <Icon className="w-3 h-3" /> {req.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
