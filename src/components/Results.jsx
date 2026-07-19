const results = [
  { name: 'Mike J.', before: '$600/day', after: '$3,000/day', time: '30 days' },
  { name: 'Sarah D.', before: '$4K/mo', after: '$40K/mo', time: '90 days' },
  { name: 'James W.', before: '$0', after: '$25K/mo', time: '60 days' },
  { name: 'Chris M.', before: 'W-2 Job', after: '$20K/mo', time: '4 months' },
]

export default function Results() {
  return (
    <section style={{ padding: '80px 20px', background: '#000' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px', color: '#fff' }}>
          Student Results
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 24px',
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{r.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: '#666', textDecoration: 'line-through' }}>{r.before}</span>
                <span style={{ color: '#888' }}>→</span>
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '18px' }}>{r.after}</span>
                <span style={{ color: '#666', fontSize: '14px' }}>({r.time})</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="#apply"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 700,
              padding: '14px 40px',
              borderRadius: '6px',
              textDecoration: 'none'
            }}
          >
            Apply Now →
          </a>
        </div>

      </div>
    </section>
  )
}
