
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, FileText, CalendarRange, UserMinus, Settings, BookOpenCheck } from 'lucide-react';
import { studentData } from '../data/mockData';

export const Sidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'Assignments', path: '/assignments', icon: FileText },
    { name: 'Timetable', path: '/timetable', icon: CalendarRange },
    { name: 'Absence', path: '/absence', icon: UserMinus },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="w-72 h-screen bg-white hidden lg:flex flex-col justify-between py-8 px-6 border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] fixed left-0 top-0">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="bg-primary/10 p-2 rounded-xl text-primary shrink-0">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <h1 className="font-display font-extrabold text-xl text-slate-800 tracking-tight truncate">SmartBunk</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-50 text-primary border border-slate-100 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                }`
              }
            >
              <link.icon className="w-5 h-5" />
              <span className="text-sm">{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 p-3 mt-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors">
        <div className="w-10 h-10 rounded-xl bg-primary/40 flex items-center justify-center text-primary font-bold text-lg relative">
          {studentData.name.charAt(0)}
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-accent border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h4 className="font-extrabold text-sm text-slate-800">{studentData.name}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            STUDENT · SEM {studentData.semester}
          </p>
        </div>
      </div>
    </div>
  );
};
