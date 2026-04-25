import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Settings from './pages/Settings';
import Students from './pages/Students';
import TeacherOnboarding from './pages/TeacherOnboarding';
import TeacherPortal from './pages/TeacherPortal';
import WebsiteDesign from './pages/WebsiteDesign';
import AdmissionsForm from './pages/AdmissionsForm';
import Admissions from './pages/Admissions';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teacher-onboarding" element={<TeacherOnboarding />} />
        <Route path="/teacher-portal" element={<TeacherPortal />} />
        <Route path="/website-design" element={<WebsiteDesign />} />
        <Route path="/admissions-form" element={<AdmissionsForm />} />
        <Route path="/admissions" element={<Admissions />} />
      </Routes>
    </Router>
  );
}

export default App;
