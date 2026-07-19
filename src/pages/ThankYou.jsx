import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, Flame } from 'lucide-react'
import { PopupButton } from 'react-calendly'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
        >
          You're In!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-8"
        >
          Your application has been submitted successfully. Book your free strategy call now to discuss your business goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <PopupButton
            url="https://calendly.com/your-calendly-link"
            rootElement={document.getElementById('root')}
            text="Book Your Free Strategy Call →"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold text-lg rounded-full transition-all duration-300 animate-pulse-glow"
          />

          <p className="text-gray-500">
            Or <a href="/" className="text-red-400 hover:text-red-300 transition-colors">return to homepage</a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl"
        >
          <h3 className="font-semibold text-white mb-2">What Happens Next?</h3>
          <ul className="text-gray-400 text-left space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">1</span>
              Book your strategy call using the button above
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">2</span>
              We'll analyze your business and create a custom growth plan
            </li>
            <li className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">3</span>
              If you qualify, we'll invite you to join the program
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}
