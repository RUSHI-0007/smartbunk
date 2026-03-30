
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Chatbot } from './Chatbot';

export const StudentLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50 relative selection:bg-primary selection:text-white">
      <Sidebar />
      {/* 
        The main content area takes up the remaining width and is scrollable.
        On large screens (where lg:flex is active for Sidebar), we add a left margin equal to the 72 (18rem) sidebar width. 
      */}
      <main className="flex-1 overflow-y-auto lg:ml-[18rem] bg-[#fdfdfd] h-full shadow-inner border-l border-white">
        <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
      <Chatbot />
    </div>
  );
};
