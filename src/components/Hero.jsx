import { PopupButton } from 'react-calendly'

export default function Hero() {
  const videoId = 'z28HxuI9X-4'

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '60px', background: '#000' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '16px',
          color: '#fff'
        }}>
          How To Make <span style={{ color: '#3b82f6' }}>$1,000 Per Day</span> In Profit
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: '#888',
          marginBottom: '40px'
        }}>
          Watch the free training below to learn the exact system
        </p>

        {/* Video */}
        <div style={{
          position: 'relative',
          paddingBottom: '56.25%',
          marginBottom: '40px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid #222'
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

        {/* CTA */}
        <a
          href="#apply"
          style={{
            display: 'inline-block',
            background: '#3b82f6',
            color: '#fff',
            fontSize: '18px',
            fontWeight: 700,
            padding: '16px 48px',
            borderRadius: '6px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Apply Now →
        </a>

      </div>
    </section>
  )
}
