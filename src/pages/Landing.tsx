import { useTheme } from '../context/ThemeContext';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();

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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-32 pb-24 animate-fade-in-up">
        <div className="max-w-3xl">
          <p className="text-sm mb-6 font-mono animate-fade-in-left stagger-1" style={{ color: 'var(--text-muted)' }}>
            // inline bot protection
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-8 tracking-tight animate-fade-in-up stagger-2">
            We read the TLS<br />
            handshake. Then<br />
            we decide.
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl animate-fade-in-up stagger-3" style={{ color: 'var(--text-secondary)' }}>
            bot-shield scores the first request from every client it has never seen. No prior sighting. No blocklists. No waiting.
          </p>
          <div className="flex items-center gap-6 animate-fade-in-up stagger-4">
            <a href="/pricing" className="group btn-primary px-6 py-3 text-sm flex items-center gap-2 hover-lift">
              Start free trial
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
              $200/mo · 14-day trial · no card
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-20 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Currently in development</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>· Looking for 10 founding customers</span>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t animate-fade-in-up" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4 animate-fade-in-left stagger-2">
              <p className="text-sm font-mono mb-4" style={{ color: 'var(--text-muted)' }}>
                // the problem
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Bot protection is either too expensive or too late.
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8 animate-fade-in-right stagger-3">
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

      {/* How it works */}
      <section id="how" className="border-t animate-fade-in-up" style={{ borderColor: 'var(--border-primary)' }}>
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

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">bot-shield</span>
          <div className="flex gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <a href="/pricing">Pricing</a>
            <a href="/changelog">Changelog</a>
            <a href="/docs">Docs</a>
            <a href="/contact">Contact</a>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
