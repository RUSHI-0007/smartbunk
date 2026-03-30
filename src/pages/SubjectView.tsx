import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, ArrowRight } from 'lucide-react';
import { studentData } from '../data/mockData';

export const SubjectView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const subject = studentData.subjects.find(s => s.id === id);
  const [bunks, setBunks] = useState(0);

  if (!subject) return <div className="p-8">Subject not found</div>;

  const currentPct = Math.round((subject.attended / subject.total) * 100);
  
  // Real-time Bunk Simulator Logic
  const newTotal = subject.total + bunks;
  const projectedPct = Math.round((subject.attended / newTotal) * 100);
  
  const isSafe = projectedPct >= 75;
  const isWarning = projectedPct >= 65 && projectedPct < 75;

  const classesNeeded = Math.ceil((0.75 * newTotal - subject.attended) / 0.25);

  let alertBox = null;
  if (isSafe) {
    alertBox = (
      <div className="text-center p-4 rounded-2xl font-bold text-sm transition-all duration-300 bg-accent/10 border border-accent/20 text-emerald-700">
        🎉 You stay in the Safe Zone! You can afford {bunks} absence{bunks !== 1 ? 's' : ''}.
      </div>
    );
  } else if (isWarning) {
    alertBox = (
      <div className="text-center p-4 rounded-2xl font-bold text-sm transition-all duration-300 bg-warning/20 border border-warning/30 text-yellow-700">
        ⚠️ Warning: Drops below 75%. You'll need a valid excuse to submit to faculty.
      </div>
    );
  } else {
    alertBox = (
      <div className="text-center p-4 rounded-2xl font-bold text-sm transition-all duration-300 bg-danger/10 border border-danger/20 text-danger">
        🚨 CRITICAL: Defaulter Status! Attend the next <strong>{classesNeeded}</strong> consecutive classes to recover to 75%.
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-y-auto hide-scrollbar bg-slate-50/50 p-4 lg:p-8 max-w-[1200px] mx-auto pb-24">
      <button 
        onClick={() => navigate('/student')} 
        className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors bg-white/60 px-4 py-2 rounded-full w-max mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="glass-panel rounded-[2.5rem] p-8 lg:p-10 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-7 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold tracking-widest uppercase">{subject.code}</span>
            </div>
            <h1 className="font-display text-3xl lg:text-4xl font-extrabold text-slate-800">{subject.name}</h1>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Attended</p>
            <p className="text-2xl font-bold text-slate-800">{subject.attended} / {subject.total}</p>
          </div>
        </div>

        {/* Bunk Simulator */}
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-[2rem] p-7 border border-slate-100 shadow-inner">
          <h3 className="font-display text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" /> Smart Bunk Simulator
          </h3>
          <p className="text-slate-500 font-medium text-sm mb-7">Drag the slider to see how skipping lectures impacts your attendance.</p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white p-6 rounded-[1.5rem] shadow-sm border border-slate-50">
            <div className="text-center flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Current</p>
              <div className="text-5xl font-display font-extrabold text-slate-800 tracking-tighter">{currentPct}%</div>
              <p className="text-sm font-medium text-slate-400 mt-1">{subject.attended}/{subject.total} Classes</p>
            </div>
            
            <div className="flex flex-col items-center text-slate-300">
              <span className="text-xs font-bold tracking-widest mb-2 uppercase text-slate-400">If You Bunk</span>
              <ArrowRight className="w-6 h-6" />
            </div>
            
            <div className="text-center flex-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Projected</p>
              <div 
                className={`text-6xl font-display font-black tracking-tighter transition-colors duration-300`}
                style={{ color: isSafe ? '#7FD8BE' : isWarning ? '#F59E0B' : '#FF8B94' }}
              >
                {projectedPct}%
              </div>
              <p className="text-sm font-medium text-slate-400 mt-1">{subject.attended}/{newTotal} Classes</p>
            </div>
          </div>

          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="font-bold text-slate-700 text-sm">Future Classes to Bunk:</label>
              <span className="bg-primary/10 text-primary font-black px-4 py-1 rounded-xl text-base">{bunks}</span>
            </div>
            <input 
              type="range" 
              min="0" max="10" 
              value={bunks} 
              onChange={(e) => setBunks(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer shadow-inner" 
            />
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 px-1">
              <span>0 bunks</span><span>5</span><span>10 bunks</span>
            </div>
          </div>

          {alertBox}
        </div>
      </div>
    </div>
  );
};
