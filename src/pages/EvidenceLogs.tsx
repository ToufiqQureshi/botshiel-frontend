import { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { generateLogs, signals, decisions, type Decision } from '../data/mockData';

function getDecisionBadge(decision: Decision) {
  switch (decision) {
    case 'PASS': return 'badge-green';
    case 'BLOCK': return 'badge-red';
    case 'CHALLENGE': return 'badge-yellow';
    case 'DECEIVE': return 'badge-orange';
  }
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-red-400';
  if (score >= 50) return 'text-yellow-400';
  if (score >= 30) return 'text-orange-400';
  return 'text-green-400';
}

export default function EvidenceLogs() {
  const logs = useMemo(() => generateLogs(100), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [decisionFilter, setDecisionFilter] = useState<string>('ALL');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'timestamp' | 'score'>('timestamp');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filteredLogs = useMemo(() => {
    let filtered = logs.filter(log => {
      const matchesSearch = searchQuery === '' ||
        log.ip.includes(searchQuery) ||
        log.ja4.includes(searchQuery) ||
        log.path.includes(searchQuery);
      const matchesDecision = decisionFilter === 'ALL' || log.decision === decisionFilter;
      return matchesSearch && matchesDecision;
    });

    filtered.sort((a, b) => {
      if (sortField === 'timestamp') {
        const diff = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        return sortDir === 'desc' ? -diff : diff;
      }
      return sortDir === 'desc' ? b.score - a.score : a.score - b.score;
    });

    return filtered;
  }, [logs, searchQuery, decisionFilter, sortField, sortDir]);

  const toggleSort = (field: 'timestamp' | 'score') => {
    if (sortField === field) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const SortIcon = ({ field }: { field: string }) => {
    if (sortField !== field) return <ChevronDown size={12} className="text-[#3f3f46]" />;
    return sortDir === 'desc' ? <ChevronDown size={12} className="text-white" /> : <ChevronUp size={12} className="text-white" />;
  };

  return (
    <div className="space-y-4 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Evidence Logs</h1>
          <p className="text-sm text-[#71717a]">Real-time telemetry of all inspected requests</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary text-xs flex items-center gap-1.5">
            <ExternalLink size={12} /> Export
          </button>
          <button className="btn-primary text-xs">Live Tail</button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="card p-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search by IP, JA4 fingerprint, or path..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-md text-white placeholder-[#71717a] focus:outline-none focus:ring-1 focus:ring-[#3f3f46]"
              style={{ background: '#111', border: '1px solid #262626' }}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={decisionFilter}
                onChange={(e) => setDecisionFilter(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 text-sm rounded-md text-white focus:outline-none cursor-pointer"
                style={{ background: '#111', border: '1px solid #262626' }}
              >
                <option value="ALL">All Decisions</option>
                {decisions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717a] pointer-events-none" />
            </div>
            <select
              className="appearance-none pl-3 pr-8 py-2 text-sm rounded-md text-white focus:outline-none cursor-pointer"
              style={{ background: '#111', border: '1px solid #262626' }}
            >
              <option>Last 1 hour</option>
              <option>Last 6 hours</option>
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Log Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="cursor-pointer select-none" onClick={() => toggleSort('timestamp')}>
                  <div className="flex items-center gap-1">Timestamp <SortIcon field="timestamp" /></div>
                </th>
                <th>Method & Path</th>
                <th>Client IP & Geo</th>
                <th>JA4 Fingerprint</th>
                <th>Signals</th>
                <th className="cursor-pointer select-none" onClick={() => toggleSort('score')}>
                  <div className="flex items-center gap-1">Score <SortIcon field="score" /></div>
                </th>
                <th>Decision</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.slice(0, 50).map(log => (
                <LogRow
                  key={log.id}
                  log={log}
                  expanded={expandedRow === log.id}
                  onToggle={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t flex items-center justify-between text-xs text-[#71717a]" style={{ borderColor: '#1f1f1f' }}>
          <span>Showing {Math.min(50, filteredLogs.length)} of {filteredLogs.length} entries</span>
          <div className="flex gap-1">
            <button className="btn-secondary text-xs py-1 px-2">Previous</button>
            <button className="btn-secondary text-xs py-1 px-2">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogRow({ log, expanded, onToggle }: { log: any; expanded: boolean; onToggle: () => void }) {
  return (
    <>
      <tr onClick={onToggle} className="cursor-pointer">
        <td className="text-xs font-mono text-[#a1a1aa]">{new Date(log.timestamp).toLocaleTimeString()}</td>
        <td>
          <div className="flex items-center gap-1.5">
            <span className="badge badge-gray text-[10px]">{log.method}</span>
            <span className="text-xs text-white font-mono">{log.path}</span>
          </div>
        </td>
        <td>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-white">{log.ip}</span>
            <span className="badge badge-gray text-[10px]">{log.geo}</span>
          </div>
        </td>
        <td className="font-mono text-[10px] text-[#a1a1aa]" style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {log.ja4}
        </td>
        <td>
          <div className="flex flex-wrap gap-1">
            {log.signals.slice(0, 2).map((s: string, i: number) => (
              <span key={i} className="badge badge-red text-[10px]">{s}</span>
            ))}
            {log.signals.length > 2 && (
              <span className="text-[10px] text-[#71717a]">+{log.signals.length - 2}</span>
            )}
          </div>
        </td>
        <td>
          <span className={`font-mono text-xs font-medium ${getScoreColor(log.score)}`}>{log.score}</span>
        </td>
        <td>
          <span className={`badge ${getDecisionBadge(log.decision)}`}>{log.decision}</span>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={7} className="p-0">
            <div className="px-4 py-3 grid md:grid-cols-2 gap-4" style={{ background: '#0a0a0a' }}>
              <div>
                <h4 className="text-xs font-medium text-[#71717a] mb-2 uppercase tracking-wider">HTTP Headers</h4>
                <div className="rounded p-3 font-mono text-[11px] space-y-1" style={{ background: '#111', border: '1px solid #1f1f1f' }}>
                  {Object.entries(log.headers).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-blue-400">{key}</span>
                      <span className="text-[#71717a]">: </span>
                      <span className="text-[#a1a1aa]">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium text-[#71717a] mb-2 uppercase tracking-wider">TLS Handshake</h4>
                <div className="rounded p-3 font-mono text-[11px] space-y-1" style={{ background: '#111', border: '1px solid #1f1f1f' }}>
                  {Object.entries(log.tls).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-green-400">{key}</span>
                      <span className="text-[#71717a]">: </span>
                      <span className="text-[#a1a1aa]">{value as string}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t" style={{ borderColor: '#1f1f1f' }}>
                    <span className="text-[#71717a]">JA4: </span>
                    <span className="text-yellow-400">{log.ja4}</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
