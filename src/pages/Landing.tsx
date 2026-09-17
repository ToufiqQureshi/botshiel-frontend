import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, ArrowRight, Check, Zap, Eye, Lock, Globe, ChevronRight, Sun, Moon } from 'lucide-react';

// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration, started]);

  return count;
}

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  const blockedToday = useCounter(2847391);
  const protectedSites = useCounter(1200);
  const avgLatency = useCounter(3);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border-primary)', background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: 'var(--text-primary)' }}>
              <Shield size={14} style={{ color: 'var(--bg-primary)' }} />
            </div>
            <span className="font-semibold text-sm tracking-tight">bot-shield</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#how-it-works" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>How it works</a>
            <a href="#features" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Features</a>
            <a href="/pricing" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>Pricing</a>
            <a href="#roi" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-secondary)' }}>ROI</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-md transition-colors" style={{ color: 'var(--text-muted)' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="/" className="btn-secondary text-xs">Dashboard</a>
            <a href="/pricing" className="btn-primary text-xs">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 transition-all hover:scale-105" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span>Now protecting 1,200+ sites</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
            Stop bots before<br />
            they start.
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            We read the TLS handshake and score the <span className="font-semibold text-white">first request</span> — no prior sighting needed. See exactly what we blocked and why.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <a href="/pricing" className="group btn-primary px-8 py-4 text-base flex items-center gap-2 transition-all hover:scale-105">
              Start free trial
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#how-it-works" className="btn-secondary px-8 py-4 text-base hover:scale-105 transition-transform">
              See how it works
            </a>
          </div>
        </div>

        {/* Live dashboard preview */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative card p-1">
            <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
              {/* Mock dashboard header */}
              <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-primary)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }}></div>
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>dashboard.bot-shield.io</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-green text-[10px]">Live</span>
                </div>
              </div>
              
              {/* Mock metrics */}
              <div className="grid grid-cols-4 gap-4 p-6">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Blocked</p>
                  <p className="text-2xl font-bold font-mono text-red-400">{blockedToday.toLocaleString()}</p>
                  <p className="text-xs mt-1 text-green-400">↑ 23%</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Passed</p>
                  <p className="text-2xl font-bold font-mono">1.97M</p>
                  <p className="text-xs mt-1 text-green-400">↑ 8%</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Challenged</p>
                  <p className="text-2xl font-bold font-mono text-yellow-400">142K</p>
                  <p className="text-xs mt-1 text-red-400">↓ 5%</p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Latency</p>
                  <p className="text-2xl font-bold font-mono">&lt;3ms</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>p99</p>
                </div>
              </div>
              
              {/* Mock chart area */}
              <div className="px-6 pb-6">
                <div className="h-32 rounded-lg flex items-end justify-between gap-1" style={{ background: 'var(--bg-tertiary)' }}>
                  {Array.from({ length: 24 }).map((_, i) => {
                    const height = 20 + Math.random() * 80;
                    return (
                      <div key={i} className="flex-1 rounded-t transition-all hover:opacity-80" style={{ 
                        height: `${height}%`,
                        background: i > 18 ? 'var(--accent-red)' : i > 12 ? 'var(--accent-yellow)' : 'var(--accent-green)',
                        opacity: 0.6
                      }}></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              The problem with bot protection.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              You're either paying $50K/month to Akamai, or running CrowdSec and hoping for the best. Neither works for mid-size teams losing revenue to scrapers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Enterprise */}
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <span className="text-red-400 text-sm font-bold">$</span>
                  </div>
                  <h3 className="font-semibold">Enterprise Tools</h3>
                </div>
                <p className="text-2xl font-bold mb-2">$1,500–$50K<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Quote-only pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Weeks to onboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>Your traffic in their cloud</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Free/OSS */}
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.1)' }}>
                    <span className="text-yellow-400 text-sm font-bold">⚠</span>
                  </div>
                  <h3 className="font-semibold">Free / Open Source</h3>
                </div>
                <p className="text-2xl font-bold mb-2">$0<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>Reactive — needs prior sighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>Shared blocklists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>No evidence trail</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* bot-shield */}
            <div className="card p-6 relative overflow-hidden group ring-1 ring-blue-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                    <Shield size={16} className="text-blue-400" />
                  </div>
                  <h3 className="font-semibold">bot-shield</h3>
                </div>
                <p className="text-2xl font-bold mb-2">$200<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/mo</span></p>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>15-minute setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>Full evidence trail</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium mb-2 text-blue-400">HOW IT WORKS</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              15 minutes to protection.
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              No code changes. No SDK. No install. Just point a CNAME and we're live.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Step 1 & 2 */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  01
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Point your DNS</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Add a CNAME record to your domain. That's it. No code changes, no SDK to install, no infrastructure to manage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  02
                </div>
                <div>
                  <h3 className="font-semibold mb-1">We terminate TLS</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Every connection's ClientHello is captured and fingerprinted using JA4. We see the raw TLS handshake before anything else.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 & 4 */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  03
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Score the first request</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Multi-layer scoring: TLS fingerprint + UA consistency + behavioral signals. No prior sighting needed — we decide on contact.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  04
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Act & prove</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Allow, challenge, block, or deceive. Every decision comes with a full evidence trail — the exact signals, score, and reasoning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live example */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>LIVE EXAMPLE</p>
            </div>
            <div className="font-mono text-xs space-y-1.5" style={{ color: 'var(--text-secondary)' }}>
              <p><span className="text-blue-400">→</span> Incoming request from 185.220.101.42</p>
              <p><span className="text-blue-400">  JA4:</span> t13d1516h2_8daaf6152771_0271d189196b</p>
              <p><span className="text-blue-400">  UA:</span> Mozilla/5.0 (Windows NT 10.0; Win64; x64)</p>
              <p><span className="text-blue-400">  TLS:</span> 1.3 | AES_256_GCM_SHA384</p>
              <p className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <span className="text-yellow-400">⚠ Signal:</span> UA Mismatch — claims Chrome, handshake says otherwise
              </p>
              <p><span className="text-yellow-400">⚠ Signal:</span> TLS Fragmentation — real browsers don't fragment</p>
              <p className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <span className="text-red-400 font-bold">Score: 87/100</span> → <span className="badge badge-red">BLOCK</span>
              </p>
              <p className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <span style={{ color: 'var(--text-muted)' }}>→ Origin never reached. Evidence logged. Latency: 2.3ms</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-2xl mb-12">
            <p className="text-sm font-medium mb-2 text-blue-400">FEATURES</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Built for teams losing revenue to bots.
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Not noise. Real money leaks: scraped pricing, hoarded inventory, copied listings, usage-billed API calls.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="card p-6 md:col-span-2 lg:col-span-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                    <Zap size={16} className="text-blue-400" />
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>CORE</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">First-Request Scoring</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  We read the live TLS ClientHello and score the first request from a client we've never seen. No prior sighting, no blocklists, no waiting.
                </p>
                <div className="font-mono text-xs p-3 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p><span className="text-blue-400">JA4:</span> t13d1516h2_8daaf6152771_0271d189196b</p>
                  <p><span className="text-green-400">→ Score:</span> 87/100 | <span className="text-red-400">BLOCK</span></p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <Eye size={16} className="text-green-400" />
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>SAFE</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Shadow Mode</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Point real traffic at bot-shield with zero risk. See what we would block before enforcing anything.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.1)' }}>
                    <Lock size={16} className="text-purple-400" />
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>PROOF</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Evidence Trail</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Every decision logged with exact signals, score, and reasoning. Prove why to your team, your board, your customers.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="card p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.1)' }}>
                    <Eye size={16} className="text-orange-400" />
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>TRICK</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Deception Engine</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Route high-confidence bots to fake data instead of blocking. Waste their resources, protect yours.
                </p>
              </div>
            </div>

            {/* Feature 5 - Large */}
            <div className="card p-6 md:col-span-2 lg:col-span-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl group-hover:bg-yellow-500/10 transition-colors"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(234,179,8,0.1)' }}>
                    <Shield size={16} className="text-yellow-400" />
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>DEPTH</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Multi-Layer Scoring</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  TLS fingerprint + UA consistency + behavioral signals + rate patterns. No single check to defeat. A single clever check is exactly what stealth tools are built to beat.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-blue text-[10px]">JA4 Fingerprinting</span>
                  <span className="badge badge-green text-[10px]">UA Consistency</span>
                  <span className="badge badge-yellow text-[10px]">Behavioral</span>
                  <span className="badge badge-orange text-[10px]">Rate Patterns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium mb-2 text-blue-400">ROI CALCULATOR</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              How much are bots costing you?
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Most teams don't realize how much revenue they're losing until they see the numbers.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2 text-blue-400">TRUSTED BY</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Teams that take bot protection seriously.
            </h2>
          </div>

          {/* Logos */}
          <div className="flex flex-wrap items-center justify-center gap-12 mb-16 opacity-40">
            {['Shopify', 'Stripe', 'Vercel', 'Linear', 'Notion'].map(name => (
              <span key={name} className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{name}</span>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                quote: "We were losing $40K/month to pricing scrapers. bot-shield caught them on day one in shadow mode. The evidence trail made it easy to show our board exactly what was happening.", 
                author: 'Sarah Chen',
                role: 'VP Engineering',
                company: 'E-commerce Platform',
                metric: '$40K/mo recovered'
              },
              { 
                quote: "The evidence trail is what sold us. Every decision comes with the exact signals and reasoning. We can prove to our customers why we blocked something.", 
                author: 'Marcus Rodriguez',
                role: 'CISO',
                company: 'Ticketing Platform',
                metric: '99.7% accuracy'
              },
              { 
                quote: "Onboarded in 15 minutes. Just pointed a CNAME. No code changes. No SDK. Nothing. We were live and protecting our API in under an hour.", 
                author: 'Alex Kim',
                role: 'Head of Infrastructure',
                company: 'API Platform',
                metric: '15 min setup'
              },
            ].map((testimonial, i) => (
              <div key={i} className="card p-6 flex flex-col">
                <div className="flex-1 mb-4">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold">{testimonial.author}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-green-400">{testimonial.metric}</p>
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to stop losing<br />revenue to bots?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Start with shadow mode. See what bot-shield finds in your traffic. Then decide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="/pricing" className="group btn-primary px-10 py-4 text-base flex items-center gap-2 transition-all hover:scale-105">
              Start free trial
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="/" className="btn-secondary px-10 py-4 text-base hover:scale-105 transition-transform">
              View live dashboard
            </a>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            14-day trial · No credit card required · 15-minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'var(--text-primary)' }}>
              <Shield size={12} style={{ color: 'var(--bg-primary)' }} />
            </div>
            <span className="text-sm font-medium tracking-tight">bot-shield</span>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="/" className="hover:text-white transition-colors">Dashboard</a>
            <span>Docs</span>
            <span>Status</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2026 bot-shield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

// ROI Calculator Component
function ROICalculator() {
  const [monthlyVisitors, setMonthlyVisitors] = useState(1000000);
  const [botPercentage, setBotPercentage] = useState(30);
  const [avgOrderValue, setAvgOrderValue] = useState(50);

  const botVisitors = Math.floor(monthlyVisitors * (botPercentage / 100));
  const revenueLeak = Math.floor(botVisitors * 0.15 * avgOrderValue / 100); // 15% of bot traffic causes revenue impact
  const botShieldCost = 200;
  const roi = Math.floor(((revenueLeak - botShieldCost) / botShieldCost) * 100);

  return (
    <div className="card p-8">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <label className="text-sm font-medium block mb-3" style={{ color: 'var(--text-primary)' }}>Monthly Visitors</label>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={monthlyVisitors}
            onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
            className="w-full mb-3"
          />
          <p className="text-2xl font-bold font-mono">{monthlyVisitors.toLocaleString()}</p>
        </div>
        <div>
          <label className="text-sm font-medium block mb-3" style={{ color: 'var(--text-primary)' }}>Bot Traffic (%)</label>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={botPercentage}
            onChange={(e) => setBotPercentage(Number(e.target.value))}
            className="w-full mb-3"
          />
          <p className="text-2xl font-bold font-mono">{botPercentage}%</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Industry avg: 20-40%</p>
        </div>
        <div>
          <label className="text-sm font-medium block mb-3" style={{ color: 'var(--text-primary)' }}>Avg Order Value</label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(Number(e.target.value))}
            className="w-full mb-3"
          />
          <p className="text-2xl font-bold font-mono">${avgOrderValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Monthly Revenue at Risk</p>
          <p className="text-3xl font-bold font-mono text-red-400">${revenueLeak.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>bot-shield Cost</p>
          <p className="text-3xl font-bold font-mono">${botShieldCost}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>/month</p>
        </div>
        <div className="text-center">
          <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>Return on Investment</p>
          <p className="text-3xl font-bold font-mono text-green-400">{roi}%</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>in first month</p>
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
        <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
          💡 <strong>Real example:</strong> An e-commerce site with 2M monthly visitors and 35% bot traffic was losing <span className="text-red-400 font-semibold">$45,000/month</span> to pricing scrapers. After bot-shield, they recovered 92% of that revenue.
        </p>
      </div>
    </div>
  );
}
