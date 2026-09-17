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
          <div className="flex items-center gap-2">
            <Shield size={20} style={{ color: 'var(--text-primary)' }} />
            <span className="font-semibold text-sm">bot-shield</span>
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
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Now protecting 1,200+ sites from automated abuse
        </div>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
          The inline layer that decides<br />
          <span style={{ color: 'var(--text-muted)' }}>which bots reach your site.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
          bot-shield reads the live TLS handshake and scores the <strong className="text-white">first request</strong> from a client it has never seen — then tells you exactly why it decided what it decided.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a href="/pricing" className="btn-primary px-6 py-3 text-sm flex items-center gap-2">
            Start protecting — $200/mo <ArrowRight size={14} />
          </a>
          <a href="#how-it-works" className="btn-secondary px-6 py-3 text-sm">
            See how it works
          </a>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold font-mono">{blockedToday.toLocaleString()}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Bots blocked today</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold font-mono">{protectedSites.toLocaleString()}+</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Sites protected</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold font-mono">&lt;{avgLatency}ms</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Added latency</p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Bot protection today is broken.</h2>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Enterprise tools cost $1,500–$50,000/month and require your traffic in their cloud. Free tools parse server logs — they react <em>after</em> the damage is done.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong className="text-white">Enterprise:</strong> Quote-only pricing, weeks to onboard, your data in their cloud</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(239,68,68,0.1)' }}>
                    <span className="text-red-400 text-xs">✕</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong className="text-white">Free tools:</strong> Reactive — needs a prior sighting, shared blocklists, no proof</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(34,197,94,0.1)' }}>
                    <span className="text-green-400 text-xs">✓</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}><strong className="text-white">bot-shield:</strong> Inline, scores first request, proves every decision, $200/mo</p>
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="font-mono text-xs space-y-2" style={{ color: 'var(--text-secondary)' }}>
                <p style={{ color: 'var(--text-muted)' }}># What bot-shield sees on first contact:</p>
                <p><span className="text-blue-400">JA4:</span> t13d1516h2_8daaf6152771_0271d189196b</p>
                <p><span className="text-blue-400">UA:</span> Mozilla/5.0 (Windows NT 10.0...)</p>
                <p><span className="text-blue-400">TLS:</span> 1.3 | cipher: AES_256_GCM</p>
                <p><span className="text-blue-400">Signal:</span> <span className="text-red-400">UA Mismatch detected</span></p>
                <p><span className="text-blue-400">Signal:</span> <span className="text-red-400">TLS Fragmentation</span></p>
                <p className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <span className="text-blue-400">Score:</span> <span className="text-red-400 font-bold">87/100</span>
                </p>
                <p><span className="text-blue-400">Decision:</span> <span className="badge badge-red">BLOCK</span></p>
                <p className="pt-2 mt-2 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>→ Origin never reached. Evidence logged.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How it works</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Point a CNAME. We handle the rest.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Point DNS', desc: 'Add a CNAME record. No code, no SDK, no install.', icon: Globe },
              { step: '02', title: 'TLS Termination', desc: 'We terminate TLS and read every ClientHello handshake.', icon: Lock },
              { step: '03', title: 'Score & Decide', desc: 'Multi-layer scoring on the first request. No prior sighting needed.', icon: Zap },
              { step: '04', title: 'Act & Prove', desc: 'Allow, challenge, block, or deceive — with full evidence trail.', icon: Eye },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="card p-5 relative">
                  <span className="text-xs font-mono mb-3 block" style={{ color: 'var(--text-muted)' }}>{item.step}</span>
                  <Icon size={20} className="mb-3 text-blue-400" />
                  <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Architecture diagram */}
          <div className="card p-6 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
              <div className="text-center px-4 py-3 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-semibold mb-1">Bot / Scraper</p>
                <p style={{ color: 'var(--text-muted)' }}>curl, puppeteer, scrapy</p>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              <div className="text-center px-4 py-3 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-semibold text-blue-400 mb-1">bot-shield</p>
                <p style={{ color: 'var(--text-muted)' }}>JA4 + Score + Decide</p>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              <div className="text-center px-4 py-3 rounded" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                <p className="font-semibold text-green-400 mb-1">Your Origin</p>
                <p style={{ color: 'var(--text-muted)' }}>Only clean traffic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Built for teams that lose money to bots</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Not noise. Revenue leaks: scraped pricing, hoarded inventory, copied listings, usage-billed API calls.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'First-Request Scoring', desc: 'No prior sighting needed. We read the live TLS ClientHello and score immediately.', highlight: 'JA4 Fingerprinting' },
              { title: 'Shadow Mode', desc: 'Point real traffic at bot-shield with zero risk. See what it would block before enforcing.', highlight: 'Zero false-positive risk' },
              { title: 'Evidence Trail', desc: 'Every decision is logged with the exact signals, score, and reasoning. Prove why.', highlight: 'Full audit trail' },
              { title: 'Deception Engine', desc: 'Route high-confidence bots to fake data instead of blocking. Waste their resources.', highlight: 'Honeypot responses' },
              { title: 'JS Challenge', desc: 'SHA-256 proof + canvas fingerprint. Raises the bar beyond plain HTTP clients.', highlight: 'Proof-of-work' },
              { title: 'Multi-Layer Scoring', desc: 'TLS fingerprint + UA consistency + behavioral signals. No single check to defeat.', highlight: 'Defense in depth' },
            ].map((feature, i) => (
              <div key={i} className="card p-5">
                <span className="badge badge-blue mb-3">{feature.highlight}</span>
                <h3 className="text-sm font-semibold mb-2">{feature.title}</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section id="roi" className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How much are bots costing you?</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Interactive estimate based on your traffic profile</p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Trusted by teams at</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 opacity-50">
            {['Acme Corp', 'TechFlow', 'DataSync', 'CloudNine', 'ScaleUp'].map(name => (
              <span key={name} className="text-lg font-semibold" style={{ color: 'var(--text-muted)' }}>{name}</span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { quote: "We were losing $40K/month to pricing scrapers. bot-shield caught them on day one in shadow mode.", author: 'VP Engineering', company: 'E-commerce, Series B' },
              { quote: "The evidence trail is what sold us. We can show our board exactly what was blocked and why.", author: 'CISO', company: 'Ticketing Platform' },
              { quote: "Onboarded in 15 minutes. Just pointed a CNAME. No code changes. No SDK. Nothing.", author: 'Head of Infrastructure', company: 'API Platform' },
            ].map((testimonial, i) => (
              <div key={i} className="card p-5">
                <p className="text-sm mb-4 italic" style={{ color: 'var(--text-secondary)' }}>"{testimonial.quote}"</p>
                <div>
                  <p className="text-xs font-medium">{testimonial.author}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stop losing revenue to bots.</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
            14-day trial. No credit card. Point a CNAME and see what bot-shield finds in your traffic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/pricing" className="btn-primary px-8 py-3 text-sm flex items-center gap-2">
              Start free trial <ArrowRight size={14} />
            </a>
            <a href="/" className="btn-secondary px-8 py-3 text-sm">
              View live dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="text-sm font-medium">bot-shield</span>
          </div>
          <div className="flex gap-6 text-xs" style={{ color: 'var(--text-muted)' }}>
            <a href="/pricing">Pricing</a>
            <a href="/">Dashboard</a>
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
    <div className="card p-6">
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-secondary)' }}>Monthly Visitors</label>
          <input
            type="range"
            min="100000"
            max="10000000"
            step="100000"
            value={monthlyVisitors}
            onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-sm font-mono font-medium">{monthlyVisitors.toLocaleString()}</p>
        </div>
        <div>
          <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-secondary)' }}>Estimated Bot Traffic (%)</label>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={botPercentage}
            onChange={(e) => setBotPercentage(Number(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-sm font-mono font-medium">{botPercentage}%</p>
        </div>
        <div>
          <label className="text-xs font-medium block mb-2" style={{ color: 'var(--text-secondary)' }}>Avg. Order Value ($)</label>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={avgOrderValue}
            onChange={(e) => setAvgOrderValue(Number(e.target.value))}
            className="w-full mb-2"
          />
          <p className="text-sm font-mono font-medium">${avgOrderValue}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-red-400">${revenueLeak.toLocaleString()}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Monthly revenue at risk</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono">${botShieldCost}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>bot-shield cost/mo</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-green-400">{roi}%</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Return on investment</p>
        </div>
      </div>
    </div>
  );
}
