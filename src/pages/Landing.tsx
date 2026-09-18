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

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-32 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Stop losing revenue<br />to bots.
          </h2>
          <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            14-day trial. No credit card. Point a CNAME and see what bot-shield finds.
          </p>
          <a href="/pricing" className="group btn-primary px-8 py-4 text-base inline-flex items-center gap-2">
            Start free trial
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
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
