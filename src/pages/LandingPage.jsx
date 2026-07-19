import { useEffect } from 'react'

export default function LandingPage() {
  const videoId = 'z28HxuI9X-4'
  // Replace with your actual Typeform ID
  const TYPEFORM_ID = 'YOUR_TYPEFORM_ID'

  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => document.body.removeChild(script)
  }, [])

  const results = [
    { name: 'Daniel', result: '$600 Per Day to $3,000 Daily', time: '1 Month' },
    { name: 'Josiah & Matt', result: '$4k/Month to $40k/Month', time: 'While In High-school' },
    { name: 'Josh', result: '$25k In His FIRST Month', time: 'In the Program' },
    { name: 'Evan', result: 'Working At McDonalds to Making $20k/Month', time: '' },
    { name: 'Gabe', result: '$65,000/Month In Profit', time: 'Under 4 months' },
    { name: 'Christian', result: '$3k/Month to $20k/Month', time: '30 Days' },
  ]

  const testimonialImages = Array.from({ length: 12 }, (_, i) => `/testimonials/${i + 1}.jpeg`)

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* Header */}
      <header style={{
        padding: '16px 20px',
        borderBottom: '1px solid #222',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <span style={{ fontWeight: 700, fontSize: '16px' }}>Home Service Academy</span>
        <a href="#apply" style={{
          color: '#3b82f6',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 600
        }}>
          Apply For Coaching →
        </a>
      </header>

      {/* Hero */}
      <section style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>

        <p style={{ color: '#3b82f6', fontSize: '14px', fontWeight: 600, marginBottom: '16px', textTransform: 'uppercase' }}>
          Sign Up To Get The Full Course Right Now!
        </p>

        <h1 style={{
          fontSize: 'clamp(24px, 5vw, 40px)',
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: '32px'
        }}>
          I'll Show You How To Scale A Home Service Business to{' '}
          <span style={{ color: '#3b82f6' }}>$1,000 Per Day In Profit</span>...{' '}
          Or You Don't Pay
        </h1>

        <p style={{ color: '#888', marginBottom: '40px', fontSize: '16px' }}>
          Watch This 5 Minute Video On How This Works:
        </p>

        {/* Video */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          marginBottom: '40px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #333'
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
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

        <a href="#apply" style={{
          display: 'inline-block',
          background: '#3b82f6',
          color: '#fff',
          padding: '16px 40px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '16px'
        }}>
          Apply For Coaching
        </a>
        <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
          Click Here To Get Started
        </p>

      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '0' }} />

      {/* Results */}
      <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>

        <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 700, marginBottom: '40px' }}>
          Check Out Our WILD Student Results
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          {results.map((r, i) => (
            <div key={i} style={{
              background: '#111',
              border: '1px solid #222',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <span style={{ fontWeight: 600 }}>{r.name}:</span>
              <span>
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{r.result}</span>
                {r.time && <span style={{ color: '#888' }}> in {r.time}</span>}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="#apply" style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '16px'
          }}>
            Apply For Coaching
          </a>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
            Click Here To Get Started
          </p>
        </div>

      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '0' }} />

      {/* Testimonial Screenshots */}
      <section style={{ padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {testimonialImages.map((src, i) => (
            <div key={i} style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <a href="#apply" style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '16px'
          }}>
            Apply For Coaching
          </a>
          <p style={{ color: '#666', fontSize: '12px', marginTop: '8px' }}>
            Book Your Perfect Window
          </p>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '0' }} />

      {/* Typeform */}
      <section id="apply" style={{ padding: '60px 20px', maxWidth: '700px', margin: '0 auto' }}>
        <div
          data-tf-live={TYPEFORM_ID}
          style={{ width: '100%', height: '500px' }}
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
