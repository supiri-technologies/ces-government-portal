
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Ministries from './pages/Ministries';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portal from './pages/Portal';
import Government from './pages/Government';
import Documents from './pages/Documents';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contact from './pages/Contact';
import EFilingForm from './pages/EFilingForm';
import Dashboard from './pages/Dashboard';
import ServiceInfo from './pages/ServiceInfo';
import TaxCalculator from './pages/TaxCalculator';
import DocumentVerification from './pages/DocumentVerification';
import AppointmentScheduler from './pages/AppointmentScheduler';
import PaymentPortal from './pages/PaymentPortal';
import ExecutiveOrders from './pages/ExecutiveOrders';
import Appointments from './pages/Appointments';
import CabinetAffairs from './pages/CabinetAffairs';
import Directives from './pages/Directives';
import LatestUpdates from './pages/LatestUpdates';
import SelfServiceTools from './pages/SelfServiceTools';
import EFilingTools from './pages/EFilingTools';

// Scroll to top helper
const ScrollToTopHelper = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTopHelper />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/government" element={<Government />} />
          <Route path="/government/executive-orders" element={<ExecutiveOrders />} />
          <Route path="/government/appointments" element={<Appointments />} />
          <Route path="/government/cabinet-affairs" element={<CabinetAffairs />} />
          <Route path="/government/directives" element={<Directives />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:category" element={<ServiceDetail />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/latest-updates" element={<LatestUpdates />} />
          <Route path="/self-service-tools" element={<SelfServiceTools />} />
          <Route path="/efiling-tools" element={<EFilingTools />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/portal/efiling-tools" element={<EFilingTools />} />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/service-info/:slug" element={<ServiceInfo />} />
          <Route path="/portal/efiling/:service" element={<EFilingForm />} /> 
          
          {/* Tool Routes */}
          <Route path="/portal/tools/tax-calculator" element={<TaxCalculator />} />
          <Route path="/portal/tools/verification" element={<DocumentVerification />} />
          <Route path="/portal/tools/appointments" element={<AppointmentScheduler />} />
          <Route path="/payment" element={<PaymentPortal />} />
          
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
