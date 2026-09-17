import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import EvidenceLogs from './pages/EvidenceLogs';
import MitigationRules from './pages/MitigationRules';
import ProtectionSettings from './pages/ProtectionSettings';
import DomainsSiem from './pages/DomainsSiem';
import Landing from './pages/Landing';
import Pricing from './pages/Pricing';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Marketing Pages (no dashboard layout) */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Dashboard */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="evidence-logs" element={<EvidenceLogs />} />
            <Route path="mitigation-rules" element={<MitigationRules />} />
            <Route path="protection-settings" element={<ProtectionSettings />} />
            <Route path="domains-siem" element={<DomainsSiem />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
