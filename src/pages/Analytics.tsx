import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { studentData } from '../data/mockData';

export const Analytics = () => {
  // Recharts Data
  const donutData = [
    { name: 'Safe', value: 81, color: '#7FD8BE' },
    { name: 'Warning', value: 19, color: '#F59E0B' },
  ];
  
  const trendData = [
    { name: 'Week 1', pct: 85 }, { name: 'Week 2', pct: 82 },
    { name: 'Week 3', pct: 79 }, { name: 'Week 4', pct: 81 },
    { name: 'Week 5', pct: 82 }, { name: 'Week 6', pct: 81 },
  ];

  const atRiskSubjects = studentData.subjects.filter(s => (s.attended / s.total) * 100 < 75);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-display text-4xl font-extrabold text-slate-800 tracking-tight mb-2">Analytics & Predictions</h1>
          <p className="text-sm font-bold text-slate-500 tracking-wider">
            SEMESTER {studentData.semester} · {studentData.branch.toUpperCase()} · {studentData.university}
          </p>
        </div>
        <div className="bg-warning/10 border border-warning/20 text-warning px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
          <AlertCircle className="w-4 h-4" /> {atRiskSubjects.length} subjects at risk
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donut Chart Box */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center">
          <div className="relative w-48 h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%" cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  stroke="none"
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  cornerRadius={10}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-display font-black text-4xl text-slate-800 tracking-tighter shadow-sm">{studentData.overallAttendance}%</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Overall</span>
            </div>
          </div>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-accent"></div> Safe</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-warning"></div> Warning</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-danger"></div> Critical</span>
          </div>
        </div>

        {/* Line Chart Box */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] lg:col-span-2">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> 6-Week Attendance Trend
          </h3>
          <div className="h-64 mt-4 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dy={10} />
                <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} dx={-10} tickFormatter={(v) => `${v}%`} />
                <Line
                  type="monotone"
                  dataKey="pct"
                  stroke="#9B89C9"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#9B89C9', strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject-wise Risk Analysis */}
      <div>
        <h2 className="font-display text-xl font-bold text-slate-800 mb-6">Subject-wise Risk Analysis</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentData.subjects.map((subject) => {
            const pct = Math.round((subject.attended / subject.total) * 100);
            const isDanger = pct < 75;
            const color = isDanger ? '#F59E0B' : '#7FD8BE';
            const req = isDanger ? Math.ceil((0.75 * subject.total - subject.attended) / 0.25) : 0;
            
            return (
              <div key={subject.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subject.code}</span>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight mt-0.5">{subject.name}</h3>
                  </div>
                  <span className="font-display font-black text-2xl tracking-tighter" style={{ color }}>{pct}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, backgroundColor: color }}></div>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest" style={{ color: isDanger ? '#F59E0B' : '#7FD8BE' }}>
                  <span className="text-slate-400">{subject.attended}/{subject.total} attended</span>
                  <span>{isDanger ? `Need ${req} more classes` : '✓ Safe'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Defaulter Recovery Plan */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8">
        <h2 className="font-display text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-danger" /> Defaulter Recovery Plan
        </h2>
        <div className="space-y-4">
          {atRiskSubjects.map(subject => {
            const classesNeeded = Math.ceil((0.75 * subject.total - subject.attended) / 0.25);
            const pct = Math.round((subject.attended / subject.total) * 100);

            return (
              <div key={subject.id} className="flex flex-col md:flex-row md:items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-warning/10 text-warning shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-slate-800">{subject.name} <span className="text-slate-400 font-medium">({subject.code})</span></h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Attend the next <strong className="text-slate-800">{classesNeeded} consecutive classes</strong> to reach 75%</p>
                </div>
                <div className="font-display text-2xl font-black text-warning tracking-tighter">
                  {pct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
