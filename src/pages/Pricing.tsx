import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Shield, Check, ArrowRight, Sun, Moon } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$200',
    period: '/mo',
    description: 'For growing sites that need bot protection now.',
    features: [
      'Up to 1M requests/month',
      '3 protected domains',
      'JA4 TLS fingerprinting',
      'Multi-layer scoring',
      'Shadow mode',
      'Evidence trail (24h)',
      'JS challenge',
      'Email support',
    ],
    cta: 'Start free trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$500',
    period: '/mo',
    description: 'For businesses where bots are a revenue leak.',
    features: [
      'Up to 10M requests/month',
      '10 protected domains',
      'Everything in Starter',
      'Behavioral scoring',
      'Deception engine (honeypot)',
      'Evidence trail (30 days)',
      'Custom rules & exceptions',
      'SIEM integrations',
      'Rate limiting per endpoint',
      'Priority support',
    ],
    cta: 'Start free trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Self-hosted. For regulated industries.',
    features: [
      'Unlimited requests',
      'Unlimited domains',
      'Everything in Growth',
      'Self-hosted deployment',
      'Data residency compliance',
      'SSO / SAML',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
      'Fingerprint database access',
    ],
    cta: 'Talk to sales',
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'How long does onboarding take?',
    a: '15 minutes. Add a CNAME record, verify domain ownership, and bot-shield is protecting your traffic. No code changes, no SDK, no install.',
  },
  {
    q: 'What if bot-shield blocks a real user?',
    a: 'Shadow mode lets you run bot-shield without blocking anything first. See exactly what it would block, tune thresholds, then enforce. Every decision comes with a full evidence trail so you can investigate.',
  },
  {
    q: 'How is this different from Cloudflare?',
    a: 'Cloudflare is a CDN that happens to have bot detection. bot-shield is purpose-built for bot detection — we read the live TLS handshake and score the first request, not react to logs after the fact.',
  },
  {
    q: 'Do you support HTTP/2?',
    a: 'HTTP/1.1 fingerprinting is live today. HTTP/2 fingerprinting is on the roadmap and actively being built.',
  },
  {
    q: 'What about false positives?',
    a: 'Our scoring engine uses multiple signals — no single check can trigger a block. Shadow mode lets you measure false positives against real traffic before enforcing. Known-browser fingerprints ensure niche browsers aren\'t wrongly flagged.',
  },
  {
    q: 'Can I self-host?',
    a: 'Yes — that\'s the Enterprise plan. Same binary, your infrastructure. For teams in regulated sectors who can\'t send traffic to our cloud.',
  },
];

export default function Pricing() {
  const { theme, toggleTheme } = useTheme();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--border-primary)', background: theme === 'dark' ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={20} style={{ color: 'var(--text-primary)' }} />
            <span className="font-semibold text-sm">bot-shield</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-md transition-colors" style={{ color: 'var(--text-muted)' }}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="/landing" className="btn-secondary text-xs">Home</a>
            <a href="/" className="btn-secondary text-xs">Dashboard</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Simple, transparent pricing.</h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          14-day free trial. No credit card required. Every plan includes a bandwidth cap — no surprise bills.
        </p>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`card p-6 relative ${plan.highlighted ? 'ring-1 ring-blue-500' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge badge-blue text-[10px]">Most Popular</span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{plan.period}</span>
              </div>
              <a
                href="/"
                className={`w-full py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-opacity mb-6 ${
                  plan.highlighted ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {plan.cta} <ArrowRight size={14} />
              </a>
              <ul className="space-y-2.5">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs">
                    <Check size={14} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why not the alternatives?</h2>
          <div className="card overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-center">
                    <span className="font-semibold text-blue-400">bot-shield</span>
                  </th>
                  <th className="text-center">Enterprise tools</th>
                  <th className="text-center">Free / OSS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>First-request detection</td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                  <td className="text-center"><span className="text-red-400">✕</span></td>
                </tr>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>Evidence trail</td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                  <td className="text-center"><span style={{ color: 'var(--text-muted)' }}>Partial</span></td>
                  <td className="text-center"><span className="text-red-400">✕</span></td>
                </tr>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>Shadow mode</td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                  <td className="text-center"><span className="text-red-400">✕</span></td>
                  <td className="text-center"><span className="text-red-400">✕</span></td>
                </tr>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>Self-hosted option</td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                  <td className="text-center"><span className="text-red-400">✕</span></td>
                  <td className="text-center"><span className="text-green-400">✓</span></td>
                </tr>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>Setup time</td>
                  <td className="text-center font-mono text-xs">15 min</td>
                  <td className="text-center font-mono text-xs">Weeks</td>
                  <td className="text-center font-mono text-xs">Hours</td>
                </tr>
                <tr>
                  <td className="font-medium" style={{ color: 'var(--text-primary)' }}>Starting price</td>
                  <td className="text-center font-mono text-xs text-green-400">$200/mo</td>
                  <td className="text-center font-mono text-xs">$1,500+/mo</td>
                  <td className="text-center font-mono text-xs">$0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <span className="text-lg" style={{ color: 'var(--text-muted)' }}>
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 animate-in">
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t" style={{ borderColor: 'var(--border-primary)' }}>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to stop losing revenue to bots?</h2>
          <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Start with shadow mode. See what bot-shield finds. Then decide.</p>
          <a href="/" className="btn-primary px-8 py-3 text-sm inline-flex items-center gap-2">
            Start free trial <ArrowRight size={14} />
          </a>
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
            <a href="/landing">Home</a>
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
