import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpenCheck, Users, GraduationCap, Presentation, ArrowRight } from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: 'student' | 'faculty') => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${role}`);
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 relative overflow-x-hidden overflow-y-auto flex flex-col items-center justify-center p-6 py-12 selection:bg-primary selection:text-white">
      {/* Animated Blobs Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/20 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob z-0 pointer-events-none"></div>
      <div className="fixed top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-accent/20 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob z-0 pointer-events-none" style={{ animationDelay: '3s' }}></div>
      <div className="fixed bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-secondary/30 rounded-full mix-blend-multiply blur-3xl opacity-60 animate-blob z-0 pointer-events-none" style={{ animationDelay: '6s' }}></div>

      <div className="w-full max-w-4xl animate-slide-up relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl bg-white shadow-xl shadow-primary/10 mb-5 border border-slate-100">
            <BookOpenCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-slate-800 mb-3 tracking-tight">SmartBunk</h1>
          <p className="text-slate-500 font-medium text-lg">Select your role to access the EPD project portal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button 
            onClick={() => handleRoleSelect('student')}
            disabled={loading}
            className="group glass-panel p-8 rounded-[2.5rem] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-2 border-transparent hover:border-primary/40 text-left relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-emerald-400 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-3 text-slate-800">Student</h2>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">Track attendance, predict bunks, manage assignments, and avoid the defaulter list.</p>
            <div className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-primary transition-colors">
              {loading ? 'Authenticating...' : 'Enter Portal'} <ArrowRight className="w-5 h-5" />
            </div>
          </button>

          <button 
            onClick={() => handleRoleSelect('faculty')}
            disabled={loading}
            className="group glass-panel p-8 rounded-[2.5rem] cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 border-2 border-transparent hover:border-primary/40 text-left relative overflow-hidden"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
              <Presentation className="w-10 h-10" />
            </div>
            <h2 className="font-display text-3xl font-bold mb-3 text-slate-800">Faculty</h2>
            <p className="text-slate-500 mb-8 leading-relaxed font-medium">Manage classes, monitor at-risk students, generate reports, and control attendance.</p>
            <div className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-primary transition-colors">
              {loading ? 'Authenticating...' : 'Enter Portal'} <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
