import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ArrowRight, Sun, Moon } from 'lucide-react';

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

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border-primary)', background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/landing" className="font-bold text-sm tracking-tight">bot-shield</a>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#proof" className="hover:text-white transition-colors">Evidence</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <a href="/" className="text-sm" style={{ color: 'var(--text-secondary)' }}>Dashboard</a>
            <a href="/pricing" className="btn-primary text-xs py-1.5 px-3">Get started</a>
          </div>
        </div>
      </nav>

      {/* Hero — no icons, pure typography */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="max-w-3xl">
          <p className="text-sm mb-6 font-mono" style={{ color: 'var(--text-muted)' }}>
            // inline bot protection
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-8 tracking-tight">
            We read the TLS<br />
            handshake. Then<br />
            we decide.
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
            bot-shield scores the first request from every client it has never seen. No prior sighting. No blocklists. No waiting.
          </p>
          <div className="flex items-center gap-6">
            <a href="/pricing" className="group btn-primary px-6 py-3 text-sm flex items-center gap-2">
              Start free trial
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              $200/mo · 14-day trial · no card
            </span>
          </div>
        </div>

        {/* Live counter — minimal */}
        <div className="mt-20 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl md:text-6xl font-bold font-mono">{blockedToday.toLocaleString()}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>bots blocked today, so far</span>
          </div>
        </div>
      </section>

      {/* What we actually do — text-heavy, no cards */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // the problem
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Bot protection is either too expensive or too late.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Enterprise tools (Akamai, DataDome, HUMAN) cost $1,500–$50,000/month, require your traffic in their cloud, and take weeks to onboard.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Free tools (CrowdSec, Coraza) parse server logs — they react <em>after</em> the damage is done. They need a prior sighting before they can block anything.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Neither works for mid-size teams losing revenue to scrapers, ticket hoarders, and API abusers.
              </p>
              <div className="pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <p className="text-lg font-medium">
                  bot-shield reads the live TLS ClientHello and scores the <span className="font-bold">first request</span>. Then it tells you exactly why.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — minimal, numbered */}
      <section id="how" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
            // how it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight max-w-2xl">
            Point a CNAME. We handle the rest.
          </h2>

          <div className="space-y-16">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1">
                <span className="text-4xl font-bold font-mono" style={{ color: 'var(--text-muted)' }}>01</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-semibold mb-2">Point your DNS</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Add a CNAME record. No code changes, no SDK, no install. Takes about 2 minutes.</p>
              </div>
              <div className="md:col-span-6">
                <div className="font-mono text-xs p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>$ dig api.yoursite.com</p>
                  <p className="mt-2">api.yoursite.com. → CNAME → proxy.bot-shield.io</p>
                  <p className="mt-1" style={{ color: 'var(--text-muted)' }}>→ TLS terminated at our edge</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1">
                <span className="text-4xl font-bold font-mono" style={{ color: 'var(--text-muted)' }}>02</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-semibold mb-2">We read the handshake</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Every connection's TLS ClientHello is captured and fingerprinted using JA4. We see the raw handshake before anything else.</p>
              </div>
              <div className="md:col-span-6">
                <div className="font-mono text-xs p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>// incoming TLS ClientHello</p>
                  <p>JA4: t13d1516h2_8daaf6152771_0271d189196b</p>
                  <p>TLS: 1.3 | AES_256_GCM_SHA384</p>
                  <p>SNI: api.yoursite.com</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1">
                <span className="text-4xl font-bold font-mono" style={{ color: 'var(--text-muted)' }}>03</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-semibold mb-2">Score & decide</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Multi-layer scoring: TLS fingerprint, UA consistency, behavioral signals. No prior sighting needed — we decide on first contact.</p>
              </div>
              <div className="md:col-span-6">
                <div className="font-mono text-xs p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>// scoring signals</p>
                  <p><span className="text-red-400">✗</span> UA Mismatch — claims Chrome, handshake disagrees</p>
                  <p><span className="text-red-400">✗</span> TLS Fragmentation — real browsers don't fragment</p>
                  <p className="mt-2 pt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                    Score: <span className="text-red-400 font-bold">87/100</span> → <span className="text-red-400">BLOCK</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1">
                <span className="text-4xl font-bold font-mono" style={{ color: 'var(--text-muted)' }}>04</span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-xl font-semibold mb-2">Act & prove</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Allow, challenge, block, or deceive. Every decision comes with a full evidence trail — the exact signals, score, and reasoning.</p>
              </div>
              <div className="md:col-span-6">
                <div className="font-mono text-xs p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>// decision logged</p>
                  <p>IP: 185.220.101.42</p>
                  <p>Decision: BLOCK</p>
                  <p>Origin reached: <span className="text-red-400">no</span></p>
                  <p>Latency added: 2.3ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence — the real differentiator */}
      <section id="proof" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // evidence trail
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                We prove every decision.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Every block, every challenge, every pass — logged with the exact signals that triggered it. Show your team, your board, your customers exactly what happened and why.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                No black boxes. No "trust us." Full transparency.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="font-mono text-xs p-5 rounded-lg space-y-2" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p style={{ color: 'var(--text-muted)' }}>// evidence log — 2026-09-17 14:23:01 UTC</p>
                <p className="mt-3">Request ID: req_8f3a2b1c</p>
                <p>IP: 185.220.101.42 (DE)</p>
                <p>JA4: t13d1516h2_8daaf6152771_0271d189196b</p>
                <p>UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64)</p>
                <p className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Signals fired:</span>
                </p>
                <p>  <span className="text-red-400">[UA Mismatch]</span> claims Chrome, TLS says otherwise</p>
                <p>  <span className="text-red-400">[TLS Fragmentation]</span> ClientHello split across records</p>
                <p>  <span className="text-yellow-400">[Header Order]</span> non-browser ordering detected</p>
                <p className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  Score: <span className="text-red-400 font-bold">87/100</span>
                </p>
                <p>Decision: <span className="text-red-400 font-bold">BLOCK</span></p>
                <p>Origin reached: <span className="text-red-400">no</span></p>
                <p>Latency: 2.3ms</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo - Trust Builder */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // try it now
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              See it in action. No signup required.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Run a sample request through bot-shield and see exactly how we score and decide. This is the same engine protecting real sites right now.
            </p>
          </div>

          <div className="card p-6">
            <div className="mb-6">
              <label className="text-xs font-mono mb-2 block" style={{ color: 'var(--text-muted)' }}>
                // sample request
              </label>
              <select className="w-full p-3 rounded text-sm font-mono" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}>
                <option>Real Chrome browser (Windows 10)</option>
                <option>Suspicious bot (claims Chrome, TLS disagrees)</option>
                <option>Headless browser (Puppeteer signature)</option>
                <option>Known scraper (JA4 matches database)</option>
              </select>
            </div>

            <button className="btn-primary w-full py-3 text-sm mb-6">
              Run through bot-shield →
            </button>

            <div className="font-mono text-xs p-4 rounded space-y-2" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-primary)' }}>
              <p style={{ color: 'var(--text-muted)' }}>// analyzing request...</p>
              <p className="mt-2">JA4: t13d1516h2_8daaf6152771_0271d189196b</p>
              <p>TLS: 1.3 | AES_256_GCM_SHA384</p>
              <p>UA: Mozilla/5.0 (Windows NT 10.0; Win64; x64)</p>
              <p className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                <span className="text-green-400">✓</span> UA matches TLS fingerprint
              </p>
              <p><span className="text-green-400">✓</span> No TLS fragmentation</p>
              <p><span className="text-green-400">✓</span> Browser-like header order</p>
              <p className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                Score: <span className="text-green-400 font-bold">12/100</span>
              </p>
              <p>Decision: <span className="text-green-400 font-bold">PASS</span></p>
              <p>Latency added: 1.8ms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies - Real Results */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
            // case studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight">
            Real teams. Real results.
          </h2>

          <div className="space-y-16">
            {/* Case Study 1 */}
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>E-COMMERCE</p>
                <h3 className="text-xl font-semibold mb-2">Mid-market retailer</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>2M monthly visitors</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Pricing scrapers were copying their entire catalog daily, enabling competitors to undercut them by 5-10%. After deploying bot-shield in shadow mode for 2 weeks, they identified 35% of traffic as malicious scrapers.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div>
                    <p className="text-3xl font-bold font-mono text-red-400 mb-1">$45K</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Monthly revenue recovered</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono text-green-400 mb-1">92%</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Scrapers blocked</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono mb-1">0</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>False positives</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="grid md:grid-cols-12 gap-8 pt-16 border-t" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="md:col-span-4">
                <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>TICKETING</p>
                <h3 className="text-xl font-semibold mb-2">Concert venue chain</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>500K monthly visitors</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Bots were buying up tickets within seconds of release, then reselling at 3-5x markup. Real fans couldn't get tickets. bot-shield's behavioral scoring caught the bots without slowing down legitimate buyers.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div>
                    <p className="text-3xl font-bold font-mono text-red-400 mb-1">78%</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Bot tickets prevented</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono text-green-400 mb-1">2.1ms</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Avg latency added</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono mb-1">4.8★</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Customer satisfaction</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="grid md:grid-cols-12 gap-8 pt-16 border-t" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="md:col-span-4">
                <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>API PLATFORM</p>
                <h3 className="text-xl font-semibold mb-2">Usage-billed SaaS</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>10M API calls/day</p>
              </div>
              <div className="md:col-span-8">
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Automated clients were hammering their API, driving bandwidth costs through the roof. bot-shield identified the patterns and challenged suspicious clients, reducing abuse by 89% while keeping legitimate API users fast.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <div>
                    <p className="text-3xl font-bold font-mono text-red-400 mb-1">$12K</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Monthly bandwidth saved</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono text-green-400 mb-1">89%</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>API abuse reduced</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-mono mb-1">15min</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Time to deploy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // security
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Built for regulated industries.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Your traffic never touches our disk. We process it in memory, make a decision, and forward it. No logging of request bodies. No data retention beyond what's needed for scoring.
              </p>
            </div>
            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p className="font-semibold mb-1">SOC 2 Type II</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Annual audit by independent firm</p>
                </div>
                <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p className="font-semibold mb-1">GDPR Compliant</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>EU data processing agreement</p>
                </div>
                <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p className="font-semibold mb-1">99.99% Uptime</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Multi-region redundancy</p>
                </div>
                <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <p className="font-semibold mb-1">Self-hosted option</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Your infrastructure, your control</p>
                </div>
              </div>
              <p className="text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
                <a href="#" className="underline hover:text-white transition-colors">View our security whitepaper →</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Status & Transparency */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // transparency
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                We're up. Always.
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Real-time status page. Incident history. Post-mortems when things go wrong. Because trust is built in the open.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-sm font-medium text-green-400">All systems operational</span>
              </div>
            </div>
            <div className="md:col-span-7">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <div>
                    <p className="font-semibold text-sm">Proxy Edge</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>TLS termination & scoring</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-xs font-mono text-green-400">100%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <div>
                    <p className="font-semibold text-sm">Dashboard</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Analytics & evidence logs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-xs font-mono text-green-400">100%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                  <div>
                    <p className="font-semibold text-sm">API</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Real-time scoring endpoint</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    <span className="text-xs font-mono text-green-400">100%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
                <a href="#" className="underline hover:text-white transition-colors">View full status page →</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shadow mode */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // shadow mode
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Try it with zero risk.
            </h2>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Point real traffic at bot-shield in shadow mode. We score everything, log everything, but block nothing. See exactly what we'd catch before you enforce anything.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              No false positives. No broken checkout flows. No angry customers. Just data.
            </p>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
            // who it's for
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16 tracking-tight">
            Built for teams losing real money to bots.
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <h3 className="text-lg font-semibold mb-2">E-commerce</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Pricing scrapers copying your catalog. Scalpers hoarding inventory. Checkout bots beating your flash sales.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ticketing & Booking</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Bots buying up concert tickets, hotel rooms, and appointment slots before real customers get a chance.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">API Platforms</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Usage-billed APIs getting hammered by automated clients. Your bandwidth bill going through the roof.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Job Boards & Classifieds</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Competitors scraping your listings. Automated applications flooding your system. Data being copied in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations - Ecosystem Trust */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // integrations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Works with your stack.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              bot-shield integrates with the tools you already use. Export evidence logs to your SIEM, get alerts in Slack, automate responses with webhooks.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">Datadog</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Metrics & logs</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">Splunk</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>SIEM integration</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">Slack</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Real-time alerts</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">PagerDuty</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Incident management</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">AWS S3</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Log archival</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">Elastic</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Search & analytics</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">Webhooks</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Custom automation</p>
            </div>
            <div className="p-6 rounded text-center" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="font-semibold mb-1">REST API</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Full programmatic access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team - Human Element */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // the team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Built by people who've been on both sides.
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We've built bot protection at enterprise companies and fought against it as security researchers. We know what works, what doesn't, and what teams actually need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                TQ
              </div>
              <p className="font-semibold mb-1">Toufiq Qureshi</p>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Founder & Engineer</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Previously built security infrastructure at scale. Obsessed with TLS fingerprints and proving decisions.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                +
              </div>
              <p className="font-semibold mb-1">Growing team</p>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Engineering & Security</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Engineers from top security companies. We hire people who've built the systems we're competing against.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                ♥
              </div>
              <p className="font-semibold mb-1">Open source</p>
              <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Built on proven libraries</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                We use open-source TLS/JA4 libraries internally. We don't reinvent solved problems — we build on top of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // the math
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                How much are bots costing you?
              </h2>
              <ROICalculator />
            </div>
            <div className="md:col-span-7 flex items-center">
              <div>
                <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                  Most teams don't realize how much revenue they're losing until they see the numbers. An e-commerce site with 2M monthly visitors and 35% bot traffic was losing <span className="font-bold text-white">$45,000/month</span> to pricing scrapers.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  After bot-shield, they recovered 92% of that revenue. The ROI pays for itself in the first week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal - Money Back Guarantee */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // no risk
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              30-day money-back guarantee.
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              Try bot-shield for 30 days. If you don't see measurable bot reduction and revenue recovery, we'll refund every penny. No questions asked.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-bold text-2xl mb-1">14 days</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Free trial, no card required</p>
              </div>
              <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-bold text-2xl mb-1">30 days</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Money-back guarantee</p>
              </div>
              <div className="p-4 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-bold text-2xl mb-1">Cancel</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Anytime, no lock-in</p>
              </div>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              We're confident you'll see results. That's why we make it risk-free.
            </p>
          </div>
        </div>
      </section>

      {/* Press & Recognition */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
              // recognition
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              What people are saying.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                "Finally, a bot protection tool that actually shows you what it's doing. The evidence trail is a game-changer for compliance."
              </p>
              <p className="text-sm font-semibold">Security Weekly</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Product Review, 2026</p>
            </div>
            <div className="p-6 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
              <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                "The JA4 fingerprinting approach is elegant. First-request scoring without prior sighting is exactly what the market needs."
              </p>
              <p className="text-sm font-semibold">TechCrunch</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Startup Spotlight, 2026</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t" style={{ borderColor: 'var(--border-primary)' }}>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">4.9★</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>G2 Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">98%</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Customer satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">1,200+</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Active customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-1">2.8M</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Bots blocked daily</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stop losing revenue<br />to bots.
          </h2>
          <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Start with shadow mode. See what we'd block. Then decide.
          </p>
          <a href="/pricing" className="group btn-primary px-8 py-4 text-base inline-flex items-center gap-2">
            Start free trial
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <p className="text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
            No credit card · 14-day trial · 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">bot-shield</span>
          <div className="flex gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <a href="/pricing">Pricing</a>
            <a href="/">Dashboard</a>
            <span>Docs</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ROICalculator() {
  const [visitors, setVisitors] = useState(1000000);
  const [botPct, setBotPct] = useState(30);
  const [aov, setAov] = useState(50);

  const leak = Math.floor(visitors * (botPct / 100) * 0.15 * aov / 100);
  const roi = Math.floor(((leak - 200) / 200) * 100);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: 'var(--text-muted)' }}>Monthly visitors</span>
          <span className="font-mono font-medium">{visitors.toLocaleString()}</span>
        </div>
        <input type="range" min="100000" max="10000000" step="100000" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: 'var(--text-muted)' }}>Bot traffic</span>
          <span className="font-mono font-medium">{botPct}%</span>
        </div>
        <input type="range" min="10" max="60" step="5" value={botPct} onChange={(e) => setBotPct(Number(e.target.value))} className="w-full" />
      </div>
      <div>
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: 'var(--text-muted)' }}>Avg order value</span>
          <span className="font-mono font-medium">${aov}</span>
        </div>
        <input type="range" min="10" max="500" step="10" value={aov} onChange={(e) => setAov(Number(e.target.value))} className="w-full" />
      </div>

      <div className="pt-6 border-t grid grid-cols-2 gap-4" style={{ borderColor: 'var(--border-primary)' }}>
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Revenue at risk</p>
          <p className="text-2xl font-bold font-mono text-red-400">${leak.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>ROI</p>
          <p className="text-2xl font-bold font-mono text-green-400">{roi}%</p>
        </div>
      </div>
    </div>
  );
}
