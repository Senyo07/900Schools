import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import TeacherPortal from './pages/TeacherPortal';
import AdmissionsForm from './pages/AdmissionsForm';
import Admissions from './pages/Admissions';
import TeacherOnboarding from './pages/TeacherOnboarding';
import WebsiteDesign from './pages/WebsiteDesign';
import Settings from './pages/Settings';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teacher" element={<TeacherPortal />} />
        <Route path="/teacher/onboarding" element={<TeacherOnboarding />} />
        <Route path="/website-design" element={<WebsiteDesign />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/admissions-form" element={<AdmissionsForm />} />
        <Route path="/settings" element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
