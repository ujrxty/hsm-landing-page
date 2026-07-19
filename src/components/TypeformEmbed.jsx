import { useEffect } from 'react'

export default function TypeformEmbed({ formId }) {
  useEffect(() => {
    // Load Typeform embed script
    const script = document.createElement('script')
    script.src = '//embed.typeform.com/next/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="apply" style={{ padding: '80px 20px', background: '#0a0a0a' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>

        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
          Apply For The Program
        </h2>
        <p style={{ color: '#888', marginBottom: '40px' }}>
          Fill out the application below to see if you qualify
        </p>

        {/* Typeform Embed */}
        <div
          data-tf-live={formId}
          style={{
            width: '100%',
            height: '500px',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        />

      </div>
    </section>
  )
}
