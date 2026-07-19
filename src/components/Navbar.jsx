export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: '#000',
      borderBottom: '1px solid #222',
      padding: '16px 20px'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>
          Home Service Mastery
        </span>
        <a
          href="#apply"
          style={{
            background: '#3b82f6',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600,
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          Apply Now
        </a>
      </div>
    </nav>
  )
}
