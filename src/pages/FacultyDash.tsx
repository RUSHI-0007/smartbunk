import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, AlertTriangle, Download, Users, Building2, Clock } from 'lucide-react';
import { facultyData } from '../data/mockData';

export const FacultyDash = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 h-full overflow-y-auto hide-scrollbar bg-slate-50/50 p-4 lg:p-8 max-w-[1600px] mx-auto pb-24 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display font-bold text-2xl text-slate-800">SmartBunk <span className="text-sm font-medium text-slate-500 ml-2">Faculty Portal</span></h2>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-bold text-slate-600 shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-primary rounded-[2.5rem] p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 blur-3xl rounded-full"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold tracking-wider mb-4 border border-white/20">
              FACULTY PORTAL · COMPUTER DEPT.
            </span>
            <h1 className="font-display text-3xl lg:text-5xl font-extrabold mb-2">{facultyData.name}</h1>
            <p className="text-white/80 font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" /> DY Patil Institute, Pimpri-Chinchwad
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
              <div className="font-display text-3xl font-extrabold">2</div>
              <div className="text-xs opacity-70 font-bold uppercase mt-1">Classes Today</div>
            </div>
            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-4 text-center">
              <div className="font-display text-3xl font-extrabold text-yellow-300">
                {facultyData.defaulters.length}
              </div>
              <div className="text-xs opacity-70 font-bold uppercase mt-1">Defaulters</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <div>
          <h2 className="font-display text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-primary" /> Today's Classes
          </h2>
          <div className="space-y-3">
            {facultyData.todayClasses.map(c => (
              <div key={c.id} className="glass-panel p-5 rounded-2xl hover:-translate-y-0.5 hover:shadow-lg transition-all bg-white/70">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-800">{c.subj}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-0.5">{c.code}</p>
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-lg whitespace-nowrap">
                    {c.room}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{c.time}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{c.students} students</span>
                  </div>
                  <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-primary transition-colors">
                    Mark Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Defaulters Table */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-xl font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-danger" /> Defaulters Table
            </h2>
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
          
          <div className="glass-panel rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="text-left p-4">Student</th>
                  <th className="text-left p-4">Roll No.</th>
                  <th className="text-left p-4 hidden md:table-cell">Subject</th>
                  <th className="text-left p-4">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facultyData.defaulters.map((d, i) => {
                  const color = d.pct < 65 ? '#FF8B94' : '#F59E0B';
                  return (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-bold text-slate-800 text-sm">{d.name}</td>
                      <td className="p-4 text-xs font-semibold text-slate-500">{d.roll}</td>
                      <td className="p-4 text-xs font-semibold text-slate-500 hidden md:table-cell">{d.subj}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold" style={{ color }}>{d.pct}%</span>
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded" style={{ background: `${color}20`, color }}>CRITICAL</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
