
import { Outlet, NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Chatbot } from './Chatbot';
import { LayoutDashboard, TrendingUp, FileText, CalendarRange, UserMinus } from 'lucide-react';

export const StudentLayout = () => {
  const mobileLinks = [
    { path: '/student', icon: LayoutDashboard },
    { path: '/analytics', icon: TrendingUp },
    { path: '/assignments', icon: FileText },
    { path: '/timetable', icon: CalendarRange },
    { path: '/absence', icon: UserMinus }
  ];

  return (
    <div className="flex h-screen bg-slate-50 relative selection:bg-primary selection:text-white">
      <Sidebar />
      {/* 
        The main content area takes up the remaining width and is scrollable.
        On large screens (where lg:flex is active for Sidebar), we add a left margin equal to the 72 (18rem) sidebar width. 
      */}
      <main className="flex-1 overflow-y-auto lg:ml-[18rem] bg-[#fdfdfd] h-full shadow-inner border-l border-white relative z-0">
        <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto min-h-full pb-28 lg:pb-12">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-40 lg:hidden px-6 py-4 pb-safe flex justify-between items-center h-20">
        {mobileLinks.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) => 
              `p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-white shadow-md shadow-primary/20 scale-110' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`
            }
          >
            <link.icon className="w-6 h-6" />
          </NavLink>
        ))}
      </nav>

      <Chatbot />
    </div>
  );
};
