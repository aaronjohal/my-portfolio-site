// portfolio.jsx — IDE-inspired portfolio components
// Aesthetic DNA borrowed from Sublime/Monokai: monospace type, dark panels,
// subtle syntax-color accents, code-flavored micro-details. But the layout
// itself is a portfolio — hero, work grid, sections.

const THEMES = {
  monokai: {
    name: "Monokai",
    bg: "#1e1f1c",
    bgDeep: "#181915",
    panel: "#272822",
    panelHi: "#33342d",
    border: "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.14)",
    text: "#f8f8f2",
    dim: "#9c9988",
    dimmer: "#6d6a5c",
    pink:   "#f92672",   // keyword
    green:  "#a6e22e",   // function
    cyan:   "#66d9ef",   // type
    purple: "#ae81ff",   // number
    yellow: "#e6db74",   // string
    orange: "#fd971f",   // operator
  },
  paper: {
    name: "Paper",
    bg: "#f5f3ee",
    bgDeep: "#ebe9e2",
    panel: "#ffffff",
    panelHi: "#f0eee8",
    border: "rgba(0,0,0,0.10)",
    borderStrong: "rgba(0,0,0,0.18)",
    text: "#1a1a1a",
    dim: "#5a5648",
    dimmer: "#9a9684",
    pink:   "#c9285e",
    green:  "#3f9b30",
    cyan:   "#1a8fb0",
    purple: "#7c4dff",
    yellow: "#a16500",
    orange: "#c75300",
  },
};

// Used for syntax-style spans inline in prose.
const Tok = ({ c, children, bg }) => (
  <span style={{
    color: c, background: bg || 'transparent',
    padding: bg ? '0 5px' : 0, borderRadius: bg ? 3 : 0,
    fontWeight: bg ? 500 : 400,
  }}>{children}</span>
);

// File-extension dot color mapping (matches "syntax" tokens by file type).
const extColor = (theme, ext) => ({
  py: theme.green, ts: theme.cyan, tsx: theme.cyan, js: theme.yellow,
  go: theme.cyan, html: theme.pink, md: theme.cyan, json: theme.yellow,
  yaml: theme.orange, txt: theme.text, pdf: theme.purple,
}[ext] || theme.dim);

// ── Top nav (chrome bar with traffic-light pseudo-decor) ─────────────
function TopNav({ theme, onJump }) {
  const items = [
    { id: 'work', label: 'projects', c: theme.green },
    { id: 'about', label: 'me', c: theme.cyan },
    { id: 'process', label: 'thinking', c: theme.purple },
    { id: 'contact', label: 'contact', c: theme.pink },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: theme.bgDeep + 'ee',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.border}`,
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 24,
        fontSize: 13,
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
           style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: theme.text }}>
          <span style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 6, background: '#ff5f56' }} />
            <span style={{ width: 11, height: 11, borderRadius: 6, background: '#ffbd2e' }} />
            <span style={{ width: 11, height: 11, borderRadius: 6, background: '#27c93f' }} />
          </span>
          <span style={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
            <Tok c={theme.dim}>~/</Tok>aaron-johal
          </span>
        </a>
        <nav style={{ display: 'flex', gap: 22, marginLeft: 16, flex: 1, flexWrap: 'wrap' }}>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`}
               onClick={(e) => { e.preventDefault(); onJump(it.id); }}
               style={{
                 color: theme.dim, textDecoration: 'none',
                 display: 'flex', alignItems: 'center', gap: 7,
                 transition: 'color .15s',
               }}
               onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
               onMouseLeave={(e) => (e.currentTarget.style.color = theme.dim)}
            >
              <span style={{ width: 6, height: 6, borderRadius: 3, background: it.c }} />
              {it.label}
            </a>
          ))}
        </nav>
        <a href={window.PORTFOLIO.links.linkedin} target="_blank" rel="noreferrer"
           style={{ color: theme.dim, fontSize: 12 }}>linkedin ↗</a>
        <a href={window.PORTFOLIO.links.github} target="_blank" rel="noreferrer"
           style={{ color: theme.dim, fontSize: 12 }}>github ↗</a>
      </div>
    </header>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────
function Hero({ theme }) {
  const P = window.PORTFOLIO;
  return (
    <section id="top" style={{
      maxWidth: 1240, margin: '0 auto',
      padding: '88px 32px 56px',
    }}>
      {/* file path crumb */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        color: theme.dim, fontSize: 12, marginBottom: 28,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: theme.green }} />
        <span>~/aaron-johal</span>
        <span style={{ color: theme.dimmer }}>/</span>
        <span>readme.md</span>
        <span style={{ marginLeft: 'auto', color: theme.dimmer }}>last updated · {window.PORTFOLIO.lastUpdated}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'end' }}>
        <div>
          <div style={{ color: theme.dim, fontSize: 14, marginBottom: 14 }}>
            <Tok c={theme.pink}>const</Tok> <Tok c={theme.cyan}>aaron</Tok> <Tok c={theme.text}>=</Tok> <Tok c={theme.text}>{'{'}</Tok>
          </div>
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 78px)', fontWeight: 700,
            lineHeight: 1.02, letterSpacing: '-0.025em',
            margin: 0, color: theme.text,
          }}>
            Hi, I'm <Tok c={theme.green}>Aaron</Tok>.
            <br />
            I'm a Senior PM<br />
            who <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
              <Tok c={theme.yellow}>builds</Tok>
              <span style={{
                position: 'absolute', left: 0, right: 0, bottom: -2,
                height: 4, background: theme.yellow, opacity: .25,
              }} />
            </span> the things he ships.
          </h1>
          <p style={{
            fontSize: 18, lineHeight: 1.55,
            color: theme.dim, maxWidth: 620, marginTop: 24, marginBottom: 0,
          }}>
            {P.tagline} I treat product management like an engineering discipline —
            write the spec, ship the prototype, measure, iterate. <Tok c={theme.text}>The fastest way to know
            if a thing should exist is to build a janky version and use it.</Tok>
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work').scrollIntoView({ behavior: 'smooth' }); }}
               style={{
                 background: theme.green, color: theme.bg,
                 padding: '12px 22px', textDecoration: 'none',
                 fontSize: 14, fontWeight: 600, borderRadius: 6,
                 display: 'inline-flex', alignItems: 'center', gap: 8,
               }}>
              <span>./view-projects.sh</span>
              <span>→</span>
            </a>
            <a href={P.links.linkedin} target="_blank" rel="noreferrer"
               style={{
                 border: `1px solid ${theme.borderStrong}`, color: theme.text,
                 padding: '12px 22px', textDecoration: 'none',
                 fontSize: 14, fontWeight: 500, borderRadius: 6,
               }}>linkedin ↗</a>
            <a href={P.links.github} target="_blank" rel="noreferrer"
               style={{
                 border: `1px solid ${theme.borderStrong}`, color: theme.text,
                 padding: '12px 22px', textDecoration: 'none',
                 fontSize: 14, fontWeight: 500, borderRadius: 6,
               }}>github ↗</a>
          </div>
        </div>

        {/* Stats card (right side, like a sidebar comment) */}
        <div style={{
          display: 'none',
          width: 240,
        }} className="hero-side" />
      </div>

      <div style={{ marginTop: 40, color: theme.dim, fontSize: 14 }}>
        <Tok c={theme.text}>{'}'}</Tok>;
      </div>
    </section>
  );
}

// ── Section header (decorative file-path style) ──────────────────────
function SectionHeader({ theme, kicker, title, subtitle, accent, file }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        color: theme.dim, fontSize: 12, marginBottom: 14,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: accent }} />
        <span>{kicker}</span>
        {file && <>
          <span style={{ color: theme.dimmer }}>/</span>
          <span>{file}</span>
        </>}
      </div>
      <h2 style={{
        margin: 0, fontSize: 'clamp(28px, 3.5vw, 44px)',
        fontWeight: 700, color: theme.text, letterSpacing: '-0.02em',
        lineHeight: 1.05,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          color: theme.dim, fontSize: 17, lineHeight: 1.5,
          maxWidth: 720, marginTop: 14, marginBottom: 0,
        }}>{subtitle}</p>
      )}
    </div>
  );
}

window.THEMES = THEMES;
Object.assign(window, { Tok, extColor, TopNav, Hero, SectionHeader });
