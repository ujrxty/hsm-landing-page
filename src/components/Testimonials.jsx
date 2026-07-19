const testimonialImages = Array.from({ length: 12 }, (_, i) => `/testimonials/${i + 1}.jpeg`)

export default function Testimonials() {
  return (
    <section style={{ padding: '80px 20px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px', color: '#fff' }}>
          What Our Students Are Saying
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {testimonialImages.map((src, i) => (
            <div key={i} style={{
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #222'
            }}>
              <img src={src} alt="" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
