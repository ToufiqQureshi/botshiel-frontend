import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Shield, ShieldAlert, ShieldCheck, Zap } from 'lucide-react';
import { generateTrafficData, topOffenders } from '../data/mockData';

const metrics = [
  { label: 'Total Requests', value: '2.41M', change: '+12.3%', up: true, icon: Shield },
  { label: 'Clean Traffic', value: '1.97M', change: '+8.1%', up: true, icon: ShieldCheck },
  { label: 'Blocked', value: '187K', change: '+23.4%', up: false, icon: ShieldAlert, color: 'red' },
  { label: 'Challenged', value: '142K', change: '-5.2%', up: true, icon: Zap, color: 'yellow' },
  { label: 'Deceived', value: '98K', change: '+31.7%', up: true, icon: AlertTriangle, color: 'orange' },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload) return null;
  return (
    <div className="custom-tooltip">
      <p className="text-white font-medium mb-1.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }}></span>
          <span className="text-[#a1a1aa]">{entry.name}:</span>
          <span className="text-white font-mono">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

export default function Overview() {
  const trafficData = useMemo(() => generateTrafficData(), []);

  return (
    <div className="space-y-6 animate-in">
      {/* Shadow Mode Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: '#0f0f00', border: '1px solid #332b00' }}>
        <AlertTriangle size={16} className="text-yellow-500 flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-medium text-yellow-500">Shadow Mode Active</span>
          <span className="text-sm text-[#a1a1aa] ml-2">— Evaluating traffic but not dropping requests. <button className="text-yellow-500 underline underline-offset-2 hover:text-yellow-400">Switch to Active Mode</button></span>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="card p-4">
              <div className="flex items-center justify-between mb-3">
                <Icon size={16} className={m.color === 'red' ? 'text-red-400' : m.color === 'yellow' ? 'text-yellow-400' : m.color === 'orange' ? 'text-orange-400' : 'text-[#71717a]'} />
                <div className={`flex items-center gap-0.5 text-xs font-medium ${m.up ? 'text-green-400' : 'text-red-400'}`}>
                  {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {m.change}
                </div>
              </div>
              <p className="text-2xl font-semibold text-white font-mono">{m.value}</p>
              <p className="text-xs text-[#71717a] mt-1">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Traffic Chart */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Traffic Volume</h2>
            <p className="text-xs text-[#71717a] mt-0.5">Requests by decision — Last 24 hours</p>
          </div>
          <div className="flex gap-1">
            <button className="btn-secondary text-xs py-1">24h</button>
            <button className="nav-tab text-xs py-1">7d</button>
            <button className="nav-tab text-xs py-1">30d</button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPassed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorChallenged" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDeceived" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#71717a' }} axisLine={{ stroke: '#1f1f1f' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#71717a' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="passed" name="Passed" stroke="#22c55e" fill="url(#colorPassed)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="blocked" name="Blocked" stroke="#ef4444" fill="url(#colorBlocked)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="challenged" name="Challenged" stroke="#eab308" fill="url(#colorChallenged)" strokeWidth={1.5} />
              <Area type="monotone" dataKey="deceived" name="Deceived" stroke="#f97316" fill="url(#colorDeceived)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Offenders */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: '#1f1f1f' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Top Offenders</h2>
            <p className="text-xs text-[#71717a] mt-0.5">IPs with the most blocked requests</p>
          </div>
          <button className="btn-secondary text-xs">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>IP Address</th>
                <th>JA4 Fingerprint</th>
                <th>ASN</th>
                <th>Geo</th>
                <th>Blocked</th>
                <th>Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {topOffenders.map((o, i) => (
                <tr key={i}>
                  <td className="font-mono text-white text-xs">{o.ip}</td>
                  <td className="font-mono text-xs" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{o.ja4}</td>
                  <td className="text-xs">{o.asn}</td>
                  <td>
                    <span className="badge badge-gray">{o.geo}</span>
                  </td>
                  <td className="font-mono text-xs text-red-400">{o.blocked.toLocaleString()}</td>
                  <td className="text-xs text-[#71717a]">{o.lastSeen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
