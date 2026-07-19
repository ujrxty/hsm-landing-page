import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Results from '../components/Results'
import Testimonials from '../components/Testimonials'
import TypeformEmbed from '../components/TypeformEmbed'
import Footer from '../components/Footer'

export default function LandingPage() {
  // Replace with your actual Typeform ID
  const TYPEFORM_ID = 'YOUR_TYPEFORM_ID'

  return (
    <div>
      <Navbar />
      <Hero />
      <Results />
      <Testimonials />
      <TypeformEmbed formId={TYPEFORM_ID} />
      <Footer />
    </div>
  )
}
