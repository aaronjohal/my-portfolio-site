// work.jsx — Work / projects section: grid of cards + expandable detail.

function StatusPill({ theme, status }) {
  const map = {
    shipped:     { c: theme.green,  l: 'shipped' },
    in_progress: { c: theme.orange, l: 'in progress' },
    archived:    { c: theme.dim,    l: 'archived' },
  };
  const s = map[status] || map.archived;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 11, color: s.c,
      background: s.c + '18',
      padding: '3px 9px', borderRadius: 999,
      fontWeight: 500, letterSpacing: '.02em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: s.c }} />
      {s.l}
    </span>
  );
}

// Image carousel for the project detail modal.
function ProjectCarousel({ theme, project, dot }) {
  const [idx, setIdx] = React.useState(0);
  const slides = React.useMemo(() => {
    const labels = ['Overview', 'Key flow', 'Detail view', 'Result'];
    return labels.map((l, i) => ({ id: i, label: l }));
  }, [project.id]);
  const n = slides.length;
  const go = (delta) => setIdx((i) => (i + delta + n) % n);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [n]);

  const stripeBg = `repeating-linear-gradient(135deg,
    ${theme.bgDeep} 0 18px,
    ${theme.panel} 18px 36px)`;

  return (
    <div style={{
      marginTop: 28,
      border: `1px solid ${theme.border}`,
      borderRadius: 8, overflow: 'hidden',
      background: theme.bgDeep,
    }}>
      {/* Slide viewport */}
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          height: '100%',
          width: `${n * 100}%`,
          transform: `translateX(-${idx * (100 / n)}%)`,
          transition: 'transform .45s cubic-bezier(.4,.0,.2,1)',
        }}>
          {slides.map((s, i) => (
            <div key={s.id} style={{
              width: `${100 / n}%`, height: '100%',
              background: stripeBg,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute', inset: 24,
                border: `1px dashed ${theme.borderStrong}`, borderRadius: 6,
                pointerEvents: 'none',
              }} />
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 10, textAlign: 'center', padding: '0 24px',
              }}>
                <span style={{
                  width: 44, height: 44, borderRadius: 22,
                  background: dot, opacity: .9,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.bg, fontSize: 22, fontWeight: 700,
                }}>↗</span>
                <div style={{
                  fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
                  color: theme.dim, fontWeight: 600,
                }}>product screenshot</div>
                <div style={{ fontSize: 18, color: theme.text, fontWeight: 500 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: 12, color: theme.dimmer }}>
                  {project.file} — frame {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button aria-label="Previous" onClick={() => go(-1)} style={arrowStyle(theme, 'left')}>‹</button>
        <button aria-label="Next" onClick={() => go(1)} style={arrowStyle(theme, 'right')}>›</button>
      </div>

      {/* Footer: counter + dots */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px',
        borderTop: `1px solid ${theme.border}`,
        background: theme.panel,
      }}>
        <span style={{ fontSize: 12, color: theme.dim, fontVariantNumeric: 'tabular-nums' }}>
          {String(idx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {slides.map((s, i) => (
            <button key={s.id} aria-label={`Go to slide ${i + 1}`} onClick={() => setIdx(i)} style={{
              width: i === idx ? 22 : 8, height: 8, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              background: i === idx ? dot : theme.border,
              transition: 'all .25s',
            }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: theme.dimmer }}>← → to navigate</span>
      </div>
    </div>
  );
}

function arrowStyle(theme, side) {
  return {
    position: 'absolute', top: '50%', [side]: 12,
    transform: 'translateY(-50%)',
    width: 38, height: 38, borderRadius: 19,
    background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(6px)',
    border: `1px solid ${theme.borderStrong}`,
    color: theme.text, fontSize: 22, lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', userSelect: 'none',
  };
}

function CardPreview({ theme, project }) {
  const v = project.visual;
  const tints = {
    terminal:   { c: theme.green,  l: 'product screenshot' },
    transcript: { c: theme.cyan,   l: 'product screenshot' },
    spec:       { c: theme.purple, l: 'product screenshot' },
    imessage:   { c: theme.yellow, l: 'product screenshot' },
    themes:     { c: theme.pink,   l: 'product screenshot' },
    changelog:  { c: theme.orange, l: 'product screenshot' },
    chat:       { c: theme.cyan,   l: 'product screenshot' },
    dashboard:  { c: theme.green,  l: 'product screenshot' },
  };
  const t = tints[v] || { c: theme.dim, l: 'product screenshot' };
  const stripeBg = `repeating-linear-gradient(135deg,
    ${theme.bgDeep} 0 14px,
    ${theme.panel} 14px 28px)`;
  return (
    <div style={{
      position: 'relative', height: 156,
      background: stripeBg,
      borderBottom: `1px solid ${theme.border}`,
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', inset: 14,
        border: `1px dashed ${theme.borderStrong}`,
        borderRadius: 4, pointerEvents: 'none',
      }} />
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        textAlign: 'center', padding: '0 12px',
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: 13,
          background: t.c, opacity: .9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: theme.bg, fontSize: 14, fontWeight: 700,
        }}>↗</span>
        <div style={{
          fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
          color: theme.dim, fontWeight: 600,
        }}>{t.l}</div>
        <div style={{ fontSize: 11, color: theme.dimmer }}>
          {project.file}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ theme, project, onOpen }) {
  const ext = project.file.split('.').pop();
  const dot = extColor(theme, ext);
  const [hover, setHover] = React.useState(false);

  return (
    <article
      onClick={() => onOpen(project.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: theme.panel,
        border: `1px solid ${hover ? theme.borderStrong : theme.border}`,
        borderRadius: 8, overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform .2s ease, border-color .15s, box-shadow .2s',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? `0 16px 40px rgba(0,0,0,.25)` : 'none',
        display: 'flex', flexDirection: 'column',
      }}>
      <CardPreview theme={theme} project={project} />
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: theme.dim, fontSize: 12,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: dot }} />
            {project.file}
          </span>
          <span style={{ marginLeft: 'auto' }}>
            <StatusPill theme={theme} status={project.status} />
          </span>
        </div>
        <h3 style={{
          margin: 0, fontSize: 19, fontWeight: 600,
          color: theme.text, letterSpacing: '-0.01em', lineHeight: 1.2,
        }}>{project.title}</h3>
        <p style={{
          margin: 0, fontSize: 14, color: theme.dim, lineHeight: 1.5,
        }}>{project.tagline}</p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 6,
        }}>
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} style={{
              fontSize: 10, color: theme.dim,
              background: theme.bgDeep, border: `1px solid ${theme.border}`,
              padding: '2px 7px', borderRadius: 4,
              fontFamily: 'inherit',
            }}>{s}</span>
          ))}
          {project.stack.length > 4 && (
            <span style={{ fontSize: 10, color: theme.dimmer, padding: '2px 0' }}>
              +{project.stack.length - 4}
            </span>
          )}
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 6, paddingTop: 12, borderTop: `1px solid ${theme.border}`,
          fontSize: 12,
        }}>
          <span style={{ color: hover ? theme.green : theme.dim, transition: 'color .15s' }}>
            read case study →
          </span>
          <a href={project.github} target="_blank" rel="noreferrer"
             onClick={(e) => e.stopPropagation()}
             style={{ color: theme.dim, textDecoration: 'none' }}>
            github ↗
          </a>
        </div>
      </div>
    </article>
  );
}

// Detail modal — full case study
function ProjectDetail({ theme, project, onClose }) {
  React.useEffect(() => {
    const k = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', k);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', k);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;
  const ext = project.file.split('.').pop();
  const dot = extColor(theme, ext);

  const Section = ({ kicker, c, children }) => (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c, fontSize: 12, marginBottom: 12, letterSpacing: '.04em', textTransform: 'uppercase', fontWeight: 600 }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: c }} />
        {kicker}
      </div>
      {children}
    </div>
  );

  return ReactDOM.createPortal(
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      padding: '60px 20px', overflowY: 'auto',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: 880,
        background: theme.panel, border: `1px solid ${theme.borderStrong}`,
        borderRadius: 10, color: theme.text,
        boxShadow: '0 24px 80px rgba(0,0,0,.5)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 22px',
          borderBottom: `1px solid ${theme.border}`,
          background: theme.bgDeep,
          borderTopLeftRadius: 10, borderTopRightRadius: 10,
        }}>
          <span style={{ display: 'flex', gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f56', cursor: 'pointer' }} onClick={onClose} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ffbd2e' }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#27c93f' }} />
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: theme.dim, fontSize: 13, marginLeft: 8,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: 4, background: dot }} />
            {project.file}
          </span>
          <span style={{ marginLeft: 'auto' }}>
            <StatusPill theme={theme} status={project.status} />
          </span>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', color: theme.dim,
            fontSize: 18, cursor: 'pointer', padding: '0 4px', lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ padding: '32px 36px 40px' }}>
          <h2 style={{
            margin: 0, fontSize: 36, fontWeight: 700,
            letterSpacing: '-0.02em', lineHeight: 1.1,
          }}>{project.title}</h2>
          <p style={{
            margin: '12px 0 0', color: theme.dim, fontSize: 18, lineHeight: 1.5,
          }}>{project.tagline}</p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))',
            gap: 12, marginTop: 24,
            padding: '16px 18px',
            background: theme.bgDeep,
            border: `1px solid ${theme.border}`,
            borderRadius: 6,
          }}>
            <div>
              <div style={{ fontSize: 10, color: theme.dimmer, letterSpacing: '.06em', textTransform: 'uppercase' }}>role</div>
              <div style={{ fontSize: 14, marginTop: 2 }}>{project.role}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: theme.dimmer, letterSpacing: '.06em', textTransform: 'uppercase' }}>stack</div>
              <div style={{ fontSize: 14, marginTop: 2, color: theme.dim }}>{project.stack.join(' · ')}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: theme.dimmer, letterSpacing: '.06em', textTransform: 'uppercase' }}>status</div>
              <div style={{ fontSize: 14, marginTop: 2 }}>{project.status.replace('_', ' ')}</div>
            </div>
          </div>

          <ProjectCarousel theme={theme} project={project} dot={dot} />

          <Section kicker="The problem" c={theme.pink}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: theme.text }}>{project.problem}</p>
          </Section>

          <Section kicker="My approach" c={theme.cyan}>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'step' }}>
              {project.approach.map((a, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 14, padding: '10px 0',
                  borderBottom: i < project.approach.length - 1 ? `1px solid ${theme.border}` : 'none',
                }}>
                  <span style={{
                    flexShrink: 0, color: theme.cyan, fontVariantNumeric: 'tabular-nums',
                    fontSize: 14, fontWeight: 500, minWidth: 24,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.55 }}>{a}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section kicker="Outcome" c={theme.green}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {project.outcome.map((o, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 15, lineHeight: 1.55 }}>
                  <span style={{ color: theme.green, flexShrink: 0 }}>✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section kicker="What I learned" c={theme.yellow}>
            <blockquote style={{
              margin: 0, padding: '14px 18px',
              borderLeft: `3px solid ${theme.yellow}`,
              background: theme.bgDeep,
              fontSize: 16, lineHeight: 1.6, fontStyle: 'italic',
              borderRadius: '0 4px 4px 0',
            }}>{project.learned}</blockquote>
          </Section>

          <div style={{
            marginTop: 36, paddingTop: 20,
            borderTop: `1px solid ${theme.border}`,
            display: 'flex', gap: 12, flexWrap: 'wrap',
          }}>
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              background: theme.green, color: theme.bg,
              padding: '10px 18px', textDecoration: 'none',
              borderRadius: 6, fontSize: 14, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              view on github ↗
            </a>
            <button onClick={onClose} style={{
              border: `1px solid ${theme.borderStrong}`, color: theme.text,
              background: 'transparent', padding: '10px 18px',
              borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'inherit',
            }}>← back to all projects</button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function WorkSection({ theme }) {
  const [openId, setOpenId] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const projects = window.PORTFOLIO.projects;
  const open = projects.find(p => p.id === openId);

  const pro = projects.filter(p => p.category === 'professional');
  const personal = projects.filter(p => p.category === 'personal');

  const Tab = ({ id, label, count, c }) => {
    const active = filter === id;
    return (
      <button onClick={() => setFilter(id)} style={{
        background: active ? c + '20' : 'transparent',
        border: `1px solid ${active ? c : theme.border}`,
        color: active ? c : theme.dim,
        padding: '8px 14px', borderRadius: 999, cursor: 'pointer',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
        display: 'inline-flex', alignItems: 'center', gap: 8,
        transition: 'all .15s',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: c }} />
        {label}
        <span style={{ color: theme.dimmer, fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>{count}</span>
      </button>
    );
  };

  const Group = ({ title, kicker, accent, items }) => (
    <div style={{ marginTop: 36 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 18,
        paddingBottom: 12, borderBottom: `1px solid ${theme.border}`,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: accent }} />
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: theme.text, letterSpacing: '-0.01em' }}>{title}</h3>
        <span style={{ color: theme.dim, fontSize: 13 }}>// {kicker}</span>
        <span style={{ marginLeft: 'auto', color: theme.dimmer, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
          {items.length} project{items.length === 1 ? '' : 's'}
        </span>
      </div>
      <div style={{
        display: 'grid', gap: 20,
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      }}>
        {items.map((p) => (
          <ProjectCard key={p.id} theme={theme} project={p} onOpen={setOpenId} />
        ))}
      </div>
    </div>
  );

  return (
    <section id="work" style={{ maxWidth: 1240, margin: '0 auto', padding: '64px 32px' }}>
      <SectionHeader theme={theme}
        kicker="~/aaron-johal" file="projects/" accent={theme.green}
        title="Things I've built."
        subtitle="Eight AI products I shipped — split between work-driven products and personal builds. Click any card for the full case study." />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        <Tab id="all" label="all" count={projects.length} c={theme.text} />
        <Tab id="professional" label="professional" count={pro.length} c={theme.cyan} />
        <Tab id="personal" label="personal" count={personal.length} c={theme.yellow} />
      </div>

      {filter !== 'personal' && (
        <Group title="Professional" kicker="built for work / teams / customers" accent={theme.cyan} items={pro} />
      )}
      {filter !== 'professional' && (
        <Group title="Personal" kicker="built for myself / my family / fun" accent={theme.yellow} items={personal} />
      )}

      <ProjectDetail theme={theme} project={open} onClose={() => setOpenId(null)} />
    </section>
  );
}

window.WorkSection = WorkSection;
