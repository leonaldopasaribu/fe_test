import { BrowserRouter as Router, Routes, Route } from 'react-router';

import { ScrollToTop } from './components/common/ScrollToTop';
import SignIn from './pages/signin/SigIn';
import NotFound from './pages/not-found/NotFound';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/dashboard/Dashboard';
import BasicTables from './pages/tables/BasicTables';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GateMaster from './pages/gate-master/GateMaster';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Dashboard />} />
            <Route index path="/gate-master" element={<GateMaster />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
