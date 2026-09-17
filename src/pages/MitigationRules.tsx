import { useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import { managedRules as initialRules, exceptions as initialExceptions } from '../data/mockData';

const ruleFields = ['JA4 Fingerprint', 'Threat Score', 'IP Address', 'ASN', 'User-Agent', 'Request Path', 'Request Method', 'Geo', 'TLS Version'];
const operators = ['EQUALS', 'CONTAINS', 'MATCHES', '>', '<', '>=', '<='];
const actions = ['BLOCK', 'CHALLENGE', 'DECEIVE', 'PASS', 'LOG'];

interface RuleCondition {
  field: string;
  operator: string;
  value: string;
}

export default function MitigationRules() {
  const [rules, setRules] = useState(initialRules);
  const [exceptions, setExceptions] = useState(initialExceptions);
  const [showBuilder, setShowBuilder] = useState(false);
  const [ruleName, setRuleName] = useState('');
  const [conditions, setConditions] = useState<RuleCondition[]>([{ field: 'JA4 Fingerprint', operator: 'EQUALS', value: '' }]);
  const [action, setAction] = useState('BLOCK');

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const addCondition = () => {
    setConditions([...conditions, { field: 'JA4 Fingerprint', operator: 'EQUALS', value: '' }]);
  };

  const removeCondition = (idx: number) => {
    setConditions(conditions.filter((_, i) => i !== idx));
  };

  const updateCondition = (idx: number, key: keyof RuleCondition, value: string) => {
    const updated = [...conditions];
    updated[idx] = { ...updated[idx], [key]: value };
    setConditions(updated);
  };

  const removeException = (id: string) => {
    setExceptions(exceptions.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">Mitigation Rules</h1>
          <p className="text-sm text-[#71717a]">Define how threats are handled when detected</p>
        </div>
        <button onClick={() => setShowBuilder(!showBuilder)} className="btn-primary text-xs flex items-center gap-1.5">
          <Plus size={12} /> Custom Rule
        </button>
      </div>

      {/* Visual Rule Builder */}
      {showBuilder && (
        <div className="card p-5 animate-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Create Custom Rule</h3>
            <button onClick={() => setShowBuilder(false)} className="text-[#71717a] hover:text-white text-sm">×</button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[#71717a] block mb-1.5">Rule Name</label>
              <input
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g., Block suspicious JA4 fingerprints"
                className="w-full px-3 py-2 text-sm rounded-md text-white placeholder-[#3f3f46] focus:outline-none focus:ring-1 focus:ring-[#3f3f46]"
                style={{ background: '#111', border: '1px solid #262626' }}
              />
            </div>

            {/* Conditions */}
            <div>
              <label className="text-xs text-[#71717a] block mb-1.5">Conditions</label>
              <div className="space-y-2">
                {conditions.map((cond, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {idx > 0 && <span className="text-xs text-[#71717a] w-8">AND</span>}
                    {idx === 0 && <span className="text-xs text-[#71717a] w-8">IF</span>}
                    <select
                      value={cond.field}
                      onChange={(e) => updateCondition(idx, 'field', e.target.value)}
                      className="px-2 py-1.5 text-xs rounded text-white focus:outline-none"
                      style={{ background: '#111', border: '1px solid #262626' }}
                    >
                      {ruleFields.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <select
                      value={cond.operator}
                      onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                      className="px-2 py-1.5 text-xs rounded text-white focus:outline-none"
                      style={{ background: '#111', border: '1px solid #262626' }}
                    >
                      {operators.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <input
                      type="text"
                      value={cond.value}
                      onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                      placeholder="Value..."
                      className="flex-1 px-2 py-1.5 text-xs rounded text-white font-mono placeholder-[#3f3f46] focus:outline-none"
                      style={{ background: '#111', border: '1px solid #262626' }}
                    />
                    {conditions.length > 1 && (
                      <button onClick={() => removeCondition(idx)} className="text-[#71717a] hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addCondition} className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <Plus size={12} /> Add condition
              </button>
            </div>

            {/* Action */}
            <div>
              <label className="text-xs text-[#71717a] block mb-1.5">Then Action</label>
              <div className="flex gap-2">
                {actions.map(a => (
                  <button
                    key={a}
                    onClick={() => setAction(a)}
                    className={`px-3 py-1.5 text-xs rounded font-medium transition-colors ${
                      action === a ? 'text-white' : 'text-[#71717a] hover:text-white'
                    }`}
                    style={{
                      background: action === a ? (a === 'BLOCK' ? '#7f1d1d' : a === 'CHALLENGE' ? '#713f12' : a === 'DECEIVE' ? '#7c2d12' : a === 'PASS' ? '#14532d' : '#1f1f1f') : '#111',
                      border: `1px solid ${action === a ? '#3f3f46' : '#262626'}`,
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Rule Preview */}
            <div className="rounded p-3 font-mono text-xs" style={{ background: '#0a0a0a', border: '1px solid #1f1f1f' }}>
              <span className="text-[#71717a]">Rule Preview: </span>
              <span className="text-blue-400">IF</span>{' '}
              {conditions.map((c, i) => (
                <span key={i}>
                  {i > 0 && <><span className="text-[#71717a]"> AND </span></>}
                  <span className="text-green-400">[{c.field}]</span>{' '}
                  <span className="text-yellow-400">{c.operator}</span>{' '}
                  <span className="text-orange-400">[{c.value || '...'}]</span>
                </span>
              ))}{' '}
              <span className="text-blue-400">THEN</span>{' '}
              <span className="text-red-400">[{action}]</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowBuilder(false)} className="btn-secondary text-xs">Cancel</button>
              <button onClick={() => setShowBuilder(false)} className="btn-primary text-xs">Create Rule</button>
            </div>
          </div>
        </div>
      )}

      {/* Managed Rules */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#1f1f1f' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Managed Rules</h2>
            <p className="text-xs text-[#71717a] mt-0.5">Pre-configured rules maintained by Bot-Shield</p>
          </div>
          <span className="badge badge-blue">{rules.filter(r => r.enabled).length} active</span>
        </div>
        <div className="divide-y" style={{ borderColor: '#1f1f1f' }}>
          {rules.map(rule => (
            <div key={rule.id} className="px-5 py-3 flex items-center justify-between hover:bg-[#0a0a0a] transition-colors">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button onClick={() => toggleRule(rule.id)} className="flex-shrink-0">
                  {rule.enabled ? (
                    <ToggleRight size={24} className="text-blue-400" />
                  ) : (
                    <ToggleLeft size={24} className="text-[#3f3f46]" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className={`text-sm font-medium ${rule.enabled ? 'text-white' : 'text-[#71717a]'}`}>{rule.name}</p>
                  <p className="text-xs text-[#71717a] truncate">{rule.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 ml-4">
                <span className="text-xs font-mono text-[#71717a]">{rule.hits.toLocaleString()} hits</span>
                <span className={`badge ${rule.enabled ? 'badge-green' : 'badge-gray'}`}>
                  {rule.enabled ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Exceptions */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#1f1f1f' }}>
          <div>
            <h2 className="text-sm font-semibold text-white">Custom Exceptions</h2>
            <p className="text-xs text-[#71717a] mt-0.5">Whitelisted IPs, bots, and fingerprints</p>
          </div>
          <button className="btn-secondary text-xs flex items-center gap-1.5">
            <Plus size={12} /> Add Exception
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Value</th>
                <th>Reason</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exceptions.map(ex => (
                <tr key={ex.id}>
                  <td><span className="badge badge-blue">{ex.type}</span></td>
                  <td className="font-mono text-xs text-white">{ex.value}</td>
                  <td className="text-xs">{ex.reason}</td>
                  <td className="text-xs text-[#71717a]">{ex.createdAt}</td>
                  <td>
                    <button onClick={() => removeException(ex.id)} className="text-[#71717a] hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
