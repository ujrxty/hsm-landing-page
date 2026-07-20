import { useEffect } from 'react'

export default function LandingPage() {
  const mainVideoId = 'z28HxuI9X-4'

  // Testimonial videos
  const testimonialVideos = [
    'hvShHjz0zNw',
    '13l0d4k_WhE',
    // Add third video ID here when ready
  ]

  // Testimonial images
  const testimonialImages = Array.from({ length: 12 }, (_, i) => `/testimonials2/${i + 1}.jpeg`)

  const TYPEFORM_ID = 'SInDiF4o'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      const existing = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]')
      if (existing) existing.remove()
    }
  }, [])

  const buttonStyle = {
    display: 'inline-block',
    background: '#22c55e',
    color: '#fff',
    padding: '16px 40px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '16px',
    textDecoration: 'none'
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* Header */}
      <header style={{
        padding: '16px 20px',
        borderBottom: '1px solid #222',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>Home Service Academy</span>
      </header>

      {/* Hero */}
      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>

        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 40px)',
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: '32px'
        }}>
          I'll Show You How To Scale A Home Service Business to{' '}
          <span style={{ color: '#22c55e' }}>$1,000 Per Day In Profit</span>...{' '}
          Or You Don't Pay
        </h1>

        <p style={{ color: '#888', marginBottom: '40px', fontSize: '16px' }}>
          Watch This 5 Minute Video On How This Works:
        </p>

        {/* Main Video */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          marginBottom: '40px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #333'
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${mainVideoId}?rel=0&modestbranding=1`}
            title="Free Training"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <a href="#apply" style={buttonStyle}>
          Apply For Coaching
        </a>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
          Click Here To Get Started
        </p>

      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '0' }} />

      {/* Testimonial Videos */}
      <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>

        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}>
          Student Success Stories
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {testimonialVideos.map((videoId, i) => (
            <div key={i} style={{
              position: 'relative',
              paddingBottom: '56.25%',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #333'
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                title={`Testimonial ${i + 1}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>

        {/* Testimonial Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '40px' }}>
          {testimonialImages.map((src, i) => (
            <div key={i} style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#apply" style={buttonStyle}>
            Apply For Coaching
          </a>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
            Click Here To Get Started
          </p>
        </div>

      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '0' }} />

      {/* Typeform */}
      <section id="apply" style={{ padding: '60px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}>
          Apply Now
        </h2>
        <iframe
          src={`https://form.typeform.com/to/${TYPEFORM_ID}?typeform-medium=embed-snippet`}
          style={{
            width: '100%',
            height: '600px',
            border: 'none',
            borderRadius: '8px'
          }}
          title="Application Form"
        />
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '13px' }}>
          <a href="/terms" style={{ color: '#666', textDecoration: 'none' }}>Terms of Service</a>
          <span style={{ color: '#333' }}>|</span>
          <a href="/privacy" style={{ color: '#666', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
      </footer>

    </div>
  )
}
