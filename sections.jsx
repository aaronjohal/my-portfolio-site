// sections.jsx — About / Skills / Process / Reading / Contact

function AboutSection({ theme }) {
  const A = window.PORTFOLIO.about;
  const aiSkills = window.PORTFOLIO.skills.AI_specific || [];
  const logoColors = [theme.cyan, theme.pink, theme.green, theme.orange, theme.purple, theme.yellow];
  return (
    <section id="about" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px' }}>
      <SectionHeader theme={theme} kicker="~/aaron-johal" file="about.json" accent={theme.cyan}
        title="A few things about me." />
      <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {A.blurb.map((b, i) => (
            <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: theme.text }}>{b}</p>
          ))}
        </div>
        {A.companies && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {A.companies.map((c, i) => (
                <div key={c} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  background: theme.panel,
                  border: `1px solid ${theme.border}`,
                  borderRadius: 6,
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: 4,
                    background: logoColors[i % logoColors.length] + '22',
                    border: `1px solid ${logoColors[i % logoColors.length]}55`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: logoColors[i % logoColors.length], fontSize: 11, fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}>
                    {c.slice(0, 1)}
                  </span>
                  <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ color: theme.dimmer, fontSize: 11, marginTop: 10 }}>
              // logos are placeholders — drop in real SVGs when ready
            </div>
          </div>
        )}
        <div style={{
          background: theme.panel, border: `1px solid ${theme.border}`,
          borderRadius: 8, padding: '20px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: theme.pink }} />
            <span style={{ color: theme.text, fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}>AI specific</span>
            <span style={{ color: theme.dim, fontSize: 12, marginLeft: 4 }}>// what I specialise in now</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {aiSkills.map((it) => (
              <span key={it} style={{
                fontSize: 13, color: theme.dim,
                background: theme.bgDeep, border: `1px solid ${theme.border}`,
                padding: '5px 12px', borderRadius: 999,
              }}>{it}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection({ theme }) {
  const paragraphs = [
    <>I run continuous discovery as a guiding practice, influenced heavily by <Tok c={theme.cyan}>Teresa Torres</Tok>. Shipping is how I learn, not how I celebrate. I'm comfortable in ambiguity and tend to reach for an <Tok c={theme.green}>A/B test</Tok> before a roadmap slide.</>,
    <>I'm an IC who's guided teams — which means I can go deep on a problem myself, or help others go deep. I'm business-focused, but the <Tok c={theme.pink}>customer</Tok> is the check on everything.</>,
    <>I build the tools I wish I had, mostly to eliminate the admin that pulls me away from customers. Many of the projects on this site started as <Tok c={theme.yellow}>personal frustrations</Tok>.</>,
  ];
  return (
    <section id="process" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px' }}>
      <SectionHeader theme={theme} kicker="~/aaron-johal" file="process.md" accent={theme.purple}
        title="How I work." />
      <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {paragraphs.map((p, i) => (
          <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: theme.text }}>{p}</p>
        ))}
      </div>
    </section>
  );
}

function SkillsSection({ theme }) {
  const S = window.PORTFOLIO.skills;
  const cats = Object.entries(S);
  const colors = [theme.green, theme.cyan, theme.yellow, theme.purple, theme.pink, theme.orange, theme.cyan, theme.green];
  return (
    <section id="skills" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px' }}>
      <SectionHeader theme={theme} kicker="~/aaron-johal" file="skills.yaml" accent={theme.orange}
        title="Tools, systems, skills."
        subtitle="The toolkit. Constantly being edited." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
        {cats.map(([cat, items], i) => (
          <div key={cat} style={{
            background: theme.panel, border: `1px solid ${theme.border}`,
            borderRadius: 8, padding: '18px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: colors[i % colors.length] }} />
              <span style={{ color: theme.text, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em' }}>{cat.replace(/_/g, ' ')}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {items.map((it) => (
                <span key={it} style={{
                  fontSize: 12, color: theme.dim,
                  background: theme.bgDeep, border: `1px solid ${theme.border}`,
                  padding: '4px 10px', borderRadius: 999,
                }}>{it}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReadingSection({ theme }) {
  const R = window.PORTFOLIO.reading;
  return (
    <section id="reading" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px' }}>
      <SectionHeader theme={theme} kicker="~/aaron-johal" file="reading_list.txt" accent={theme.yellow}
        title="What I steal from."
        subtitle="Books and writers shaping how I think. In no particular order." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
        {R.map((r, i) => (
          <div key={i} style={{
            background: theme.panel, border: `1px solid ${theme.border}`,
            borderRadius: 6, padding: '16px 18px',
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ color: theme.dimmer, fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>[{String(i + 1).padStart(2, '0')}]</span>
              <span style={{ color: theme.yellow, fontSize: 15, fontWeight: 600 }}>"{r.title}"</span>
            </div>
            <div style={{ color: theme.dim, fontSize: 13 }}>by <Tok c={theme.cyan}>{r.author}</Tok></div>
            <div style={{ color: theme.dimmer, fontSize: 12, lineHeight: 1.5, marginTop: 2 }}>// {r.note}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ theme }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [sent, setSent] = React.useState(false);
  const Inp = ({ as = 'input', label, value, onChange, placeholder, rows }) => {
    const Tag = as;
    return (
      <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ color: theme.dim, fontSize: 12 }}>{label}</span>
        <Tag value={value} onChange={onChange} placeholder={placeholder} rows={rows}
          style={{
            background: theme.bgDeep, border: `1px solid ${theme.border}`,
            color: theme.text, padding: '10px 12px', fontFamily: 'inherit',
            fontSize: 14, borderRadius: 5, outline: 'none', resize: 'vertical',
          }} />
      </label>
    );
  };
  return (
    <section id="contact" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px 120px' }}>
      <SectionHeader theme={theme} kicker="~/aaron-johal" file="contact.html" accent={theme.pink}
        title="Say hi."
        subtitle="Recruiting? Building something? Just curious about a project? I write back." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }} className="twocol">
        <div style={{
          background: theme.panel, border: `1px solid ${theme.border}`,
          borderRadius: 8, padding: '24px 26px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {sent ? (
            <div style={{
              padding: '32px 16px', textAlign: 'center',
              border: `1px dashed ${theme.green}`, borderRadius: 6,
              color: theme.green, fontSize: 14,
            }}>
              ✓ message queued. (this is a portfolio mock — please email or DM for real)
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <Inp label="your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aaron J." />
              <Inp label="your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@somewhere.com" />
              <Inp as="textarea" rows={5} label="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What's on your mind?" />
              <button type="submit" style={{
                alignSelf: 'flex-start',
                background: theme.pink, color: '#fff',
                border: 'none', padding: '10px 22px', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                borderRadius: 6,
              }}>./send_message.sh →</button>
            </form>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <a href={window.PORTFOLIO.links.linkedin} target="_blank" rel="noreferrer"
            style={{
              padding: '18px 22px', background: theme.panel,
              border: `1px solid ${theme.border}`, borderRadius: 8,
              color: theme.text, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.cyan }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>LinkedIn</div>
              <div style={{ color: theme.dim, fontSize: 13 }}>linkedin.com/in/aaronjohal</div>
            </div>
            <span style={{ color: theme.dim }}>↗</span>
          </a>
          <a href={window.PORTFOLIO.links.github} target="_blank" rel="noreferrer"
            style={{
              padding: '18px 22px', background: theme.panel,
              border: `1px solid ${theme.border}`, borderRadius: 8,
              color: theme.text, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.green }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>GitHub</div>
              <div style={{ color: theme.dim, fontSize: 13 }}>github.com/aaronjohal</div>
            </div>
            <span style={{ color: theme.dim }}>↗</span>
          </a>
          <a href={window.PORTFOLIO.links.email}
            style={{
              padding: '18px 22px', background: theme.panel,
              border: `1px solid ${theme.border}`, borderRadius: 8,
              color: theme.text, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.yellow }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>Email</div>
              <div style={{ color: theme.dim, fontSize: 13 }}>hello@aaronjohal.com</div>
            </div>
            <span style={{ color: theme.dim }}>↗</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('In a real deployment this would download the PDF.'); }}
            style={{
              padding: '18px 22px', background: theme.panel,
              border: `1px solid ${theme.border}`, borderRadius: 8,
              color: theme.text, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: theme.purple }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>Resume.pdf</div>
              <div style={{ color: theme.dim, fontSize: 13 }}>↓ download · 2 pages</div>
            </div>
            <span style={{ color: theme.dim }}>↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ theme }) {
  return (
    <footer style={{
      borderTop: `1px solid ${theme.border}`,
      padding: '32px',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16,
        fontSize: 12, color: theme.dim,
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: theme.green }} />
        <span>~/aaron-johal — built by hand, in <Tok c={theme.cyan}>{'<html>'}</Tok>, with too much coffee.</span>
        <span style={{ marginLeft: 'auto' }}>© 2026 Aaron Johal</span>
      </div>
    </footer>
  );
}

Object.assign(window, { AboutSection, ProcessSection, SkillsSection, ReadingSection, ContactSection, Footer });
