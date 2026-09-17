import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import EvidenceLogs from './pages/EvidenceLogs';
import MitigationRules from './pages/MitigationRules';
import ProtectionSettings from './pages/ProtectionSettings';
import DomainsSiem from './pages/DomainsSiem';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
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
