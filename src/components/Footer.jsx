export default function Footer() {
  return (
    <footer style={{ padding: '40px 20px', background: '#000', borderTop: '1px solid #222' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
          © {new Date().getFullYear()} Home Service Mastery. All rights reserved.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a href="/privacy" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: '#555', fontSize: '13px', textDecoration: 'none' }}>Terms of Service</a>
        </div>
        <p style={{ color: '#444', fontSize: '12px', marginTop: '24px', maxWidth: '600px', margin: '24px auto 0' }}>
          Results vary. Success depends on effort, market conditions, and other factors.
        </p>
      </div>
    </footer>
  )
}
