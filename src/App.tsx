
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { StudentLayout } from './components/StudentLayout';
import { StudentDash } from './pages/StudentDash';
import { SubjectView } from './pages/SubjectView';
import { Analytics } from './pages/Analytics';
import { Assignments } from './pages/Assignments';
import { Timetable } from './pages/Timetable';
import { Absence } from './pages/Absence';
import { FacultyDash } from './pages/FacultyDash';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-primary selection:text-white">
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route element={<StudentLayout />}>
            <Route path="/student" element={<StudentDash />} />
            <Route path="/subject/:id" element={<SubjectView />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/absence" element={<Absence />} />
          </Route>

          <Route path="/faculty" element={<FacultyDash />} />
          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
