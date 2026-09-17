import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ChevronDown, Shield, Bell, Search } from 'lucide-react';

const tabs = [
  { path: '/', label: 'Overview' },
  { path: '/evidence-logs', label: 'Evidence Logs' },
  { path: '/mitigation-rules', label: 'Mitigation Rules' },
  { path: '/protection-settings', label: 'Protection Settings' },
  { path: '/domains-siem', label: 'Domains & SIEM' },
];

const tenants = [
  { id: '1', name: 'Production — example.com', env: 'prod' },
  { id: '2', name: 'Staging — staging.example.com', env: 'staging' },
  { id: '3', name: 'Development — dev.example.com', env: 'dev' },
];

export default function Layout() {
  const [tenantOpen, setTenantOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(tenants[0]);

  return (
    <div className="min-h-screen" style={{ background: '#000' }}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b" style={{ borderColor: '#1f1f1f', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left: Logo + Tenant Switcher */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-white" />
              <span className="font-semibold text-sm text-white">Bot-Shield</span>
            </div>

            {/* Tenant Switcher */}
            <div className="relative">
              <button
                onClick={() => setTenantOpen(!tenantOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium hover:bg-[#161616] transition-colors"
                style={{ border: '1px solid #262626' }}
              >
                <span className="text-white">{selectedTenant.name}</span>
                <ChevronDown size={14} className="text-[#71717a]" />
              </button>
              {tenantOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-lg py-1 z-50 animate-in" style={{ background: '#111', border: '1px solid #262626' }}>
                  {tenants.map(t => (
                    <button
                      key={t.id}
                      onClick={() => { setSelectedTenant(t); setTenantOpen(false); }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between"
                    >
                      <span className={t.id === selectedTenant.id ? 'text-white' : 'text-[#a1a1aa]'}>{t.name}</span>
                      <span className={`badge ${t.env === 'prod' ? 'badge-green' : t.env === 'staging' ? 'badge-yellow' : 'badge-gray'}`}>
                        {t.env}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Tabs */}
            <nav className="hidden md:flex items-center gap-0.5">
              {tabs.map(tab => (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
                  end={tab.path === '/'}
                >
                  {tab.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right: Search + Notifications */}
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-[#161616] transition-colors text-[#71717a] hover:text-white">
              <Search size={16} />
            </button>
            <button className="p-2 rounded-md hover:bg-[#161616] transition-colors text-[#71717a] hover:text-white relative">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium text-white ml-1">
              JD
            </div>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="md:hidden border-t px-2 py-1.5 flex gap-0.5 overflow-x-auto" style={{ borderColor: '#1f1f1f' }}>
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => `nav-tab whitespace-nowrap text-xs ${isActive ? 'active' : ''}`}
              end={tab.path === '/'}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
