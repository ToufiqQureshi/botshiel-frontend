import { useState } from 'react';
import { Info, Shield, Zap, Ghost, Lock } from 'lucide-react';

export default function ProtectionSettings() {
  const [blockThreshold, setBlockThreshold] = useState(90);
  const [challengeThreshold, setChallengeThreshold] = useState(50);
  const [challengeType, setChallengeType] = useState<'pow' | 'captcha'>('pow');
  const [honeypotEnabled, setHoneypotEnabled] = useState(true);
  const [tarpitDelay, setTarpitDelay] = useState(30);
  const [sqliProtection, setSqliProtection] = useState(true);
  const [xssProtection, setXssProtection] = useState(true);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [rateLimitRpm, setRateLimitRpm] = useState(100);

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-lg font-semibold text-white">Protection Settings</h1>
        <p className="text-sm text-[#71717a]">Configure security modules and edge behavior</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Threat Scoring Thresholds */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Threat Scoring Thresholds</h3>
          </div>
          <p className="text-xs text-[#71717a] mb-5">Set sensitivity levels for automated decisions</p>

          <div className="space-y-6">
            {/* Block Threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-white">Block Threshold</label>
                <span className="font-mono text-sm text-red-400">{blockThreshold}</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={blockThreshold}
                onChange={(e) => setBlockThreshold(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#71717a]">50</span>
                <span className="text-[10px] text-[#71717a]">100</span>
              </div>
              <p className="text-[11px] text-[#71717a] mt-1">Requests scoring above this value are immediately blocked</p>
            </div>

            {/* Challenge Threshold */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-white">Challenge Threshold</label>
                <span className="font-mono text-sm text-yellow-400">{challengeThreshold}</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={challengeThreshold}
                onChange={(e) => setChallengeThreshold(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-[#71717a]">10</span>
                <span className="text-[10px] text-[#71717a]">80</span>
              </div>
              <p className="text-[11px] text-[#71717a] mt-1">Requests scoring above this value receive a challenge</p>
            </div>

            {/* Visual scale */}
            <div className="rounded-lg p-3" style={{ background: '#0a0a0a', border: '1px solid #1f1f1f' }}>
              <div className="h-3 rounded-full overflow-hidden flex">
                <div className="bg-green-500/30" style={{ width: `${challengeThreshold}%` }}></div>
                <div className="bg-yellow-500/30" style={{ width: `${blockThreshold - challengeThreshold}%` }}></div>
                <div className="bg-red-500/30 flex-1"></div>
              </div>
              <div className="flex justify-between mt-1.5 text-[10px]">
                <span className="text-green-400">PASS (0-{challengeThreshold})</span>
                <span className="text-yellow-400">CHALLENGE ({challengeThreshold}-{blockThreshold})</span>
                <span className="text-red-400">BLOCK ({blockThreshold}+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Configuration */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={16} className="text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">Challenge Configuration</h3>
          </div>
          <p className="text-xs text-[#71717a] mb-5">Choose how suspicious clients are challenged</p>

          <div className="space-y-3">
            <button
              onClick={() => setChallengeType('pow')}
              className="w-full text-left rounded-lg p-4 transition-colors"
              style={{
                background: challengeType === 'pow' ? '#111' : 'transparent',
                border: `1px solid ${challengeType === 'pow' ? '#3f3f46' : '#262626'}`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">Invisible Proof-of-Work</span>
                {challengeType === 'pow' && <span className="badge badge-blue">Selected</span>}
              </div>
              <p className="text-xs text-[#71717a]">Client solves a computational challenge silently. No user interaction required. Adds ~200ms latency to bots.</p>
            </button>

            <button
              onClick={() => setChallengeType('captcha')}
              className="w-full text-left rounded-lg p-4 transition-colors"
              style={{
                background: challengeType === 'captcha' ? '#111' : 'transparent',
                border: `1px solid ${challengeType === 'captcha' ? '#3f3f46' : '#262626'}`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white">Interactive Turnstile CAPTCHA</span>
                {challengeType === 'captcha' && <span className="badge badge-blue">Selected</span>}
              </div>
              <p className="text-xs text-[#71717a]">Present a visual challenge to verify human interaction. Best for high-value endpoints.</p>
            </button>
          </div>
        </div>

        {/* Deception Engine */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Ghost size={16} className="text-orange-400" />
            <h3 className="text-sm font-semibold text-white">Deception Engine</h3>
            <span className="badge badge-orange">Beta</span>
          </div>
          <p className="text-xs text-[#71717a] mb-5">Route malicious bots to honeypots and tarpits</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white">Enable Honeypot Routing</p>
                <p className="text-xs text-[#71717a]">Serve fake data to waste bot resources</p>
              </div>
              <div
                className={`toggle ${honeypotEnabled ? 'active' : ''}`}
                onClick={() => setHoneypotEnabled(!honeypotEnabled)}
              />
            </div>

            {honeypotEnabled && (
              <div className="pl-4 border-l-2 border-orange-500/30 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs text-white">Tarpit Delay</label>
                    <span className="font-mono text-xs text-orange-400">{tarpitDelay}s</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={tarpitDelay}
                    onChange={(e) => setTarpitDelay(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-[11px] text-[#71717a] mt-1">Delay responses to waste bot compute time</p>
                </div>

                <div>
                  <label className="text-xs text-white block mb-1.5">Honeypot Endpoints</label>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-orange-400">/api/v1/admin/users</span>
                      <span className="badge badge-gray">Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-orange-400">/internal/secrets</span>
                      <span className="badge badge-gray">Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-[#3f3f46]">+ Add endpoint</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WAF Settings */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={16} className="text-[#71717a]" />
            <h3 className="text-sm font-semibold text-white">WAF Settings</h3>
            <span className="badge badge-gray">Coming Soon</span>
          </div>
          <p className="text-xs text-[#71717a] mb-5">Web Application Firewall protections</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm text-white">SQL Injection Protection</p>
                <p className="text-xs text-[#71717a]">Detect and block SQLi payloads</p>
              </div>
              <div className={`toggle ${sqliProtection ? 'active' : ''}`} onClick={() => setSqliProtection(!sqliProtection)} />
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div>
                <p className="text-sm text-white">XSS Protection</p>
                <p className="text-xs text-[#71717a]">Block cross-site scripting attempts</p>
              </div>
              <div className={`toggle ${xssProtection ? 'active' : ''}`} onClick={() => setXssProtection(!xssProtection)} />
            </div>

            <div className="opacity-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm text-white">Rate Limiting</p>
                  <p className="text-xs text-[#71717a]">Max requests per minute per IP</p>
                </div>
                <div className={`toggle ${rateLimitEnabled ? 'active' : ''}`} onClick={() => setRateLimitEnabled(!rateLimitEnabled)} />
              </div>
              {rateLimitEnabled && (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={rateLimitRpm}
                    onChange={(e) => setRateLimitRpm(Number(e.target.value))}
                    className="w-20 px-2 py-1 text-xs font-mono rounded text-white focus:outline-none"
                    style={{ background: '#111', border: '1px solid #262626' }}
                  />
                  <span className="text-xs text-[#71717a]">requests/min</span>
                </div>
              )}
            </div>

            <div className="rounded p-3 flex items-start gap-2" style={{ background: '#0a0a0a', border: '1px solid #1f1f1f' }}>
              <Info size={14} className="text-[#71717a] flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#71717a]">WAF rules are currently in development. Bot detection and threat scoring remain fully active.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
