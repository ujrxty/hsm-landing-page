import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Check, Loader2, Flame, Send } from 'lucide-react'
import { PopupButton } from 'react-calendly'

const questions = [
  {
    id: 'name',
    question: "What's your name?",
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    question: "What's your email address?",
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
  },
  {
    id: 'phone',
    question: "What's your phone number?",
    type: 'tel',
    placeholder: '(555) 123-4567',
    required: true,
  },
  {
    id: 'business_type',
    question: 'What type of home service business do you run?',
    type: 'select',
    options: [
      'HVAC',
      'Plumbing',
      'Electrical',
      'Roofing',
      'Landscaping',
      'Cleaning',
      'Pressure Washing',
      'Painting',
      'Handyman',
      'Other',
    ],
    required: true,
  },
  {
    id: 'revenue',
    question: "What's your current monthly revenue?",
    type: 'select',
    options: [
      'Just starting (Pre-revenue)',
      '$0 - $5,000',
      '$5,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000 - $50,000',
      '$50,000 - $100,000',
      '$100,000+',
    ],
    required: true,
  },
  {
    id: 'goal',
    question: "What's your revenue goal for the next 12 months?",
    type: 'select',
    options: [
      '$10,000/month',
      '$25,000/month',
      '$50,000/month',
      '$100,000/month',
      '$250,000+/month',
    ],
    required: true,
  },
  {
    id: 'challenge',
    question: "What's your biggest challenge right now?",
    type: 'textarea',
    placeholder: 'Tell us about the main obstacle holding you back...',
    required: true,
  },
  {
    id: 'investment',
    question: 'Are you ready to invest in coaching to grow your business?',
    type: 'select',
    options: [
      'Yes, I\'m ready to invest now',
      'Yes, within the next 30 days',
      'Maybe, I need to learn more',
      'No, just exploring',
    ],
    required: true,
  },
]

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const navigate = useNavigate()

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep) / questions.length) * 100

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const canProceed = () => {
    if (!currentQuestion.required) return true
    const answer = answers[currentQuestion.id]
    return answer && answer.trim() !== ''
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && canProceed()) {
      handleNext()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers),
      })

      if (response.ok) {
        setShowCalendly(true)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      setShowCalendly(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showCalendly) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Application Submitted!
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Now book your free strategy call to discuss how we can help you scale.
          </p>
          <PopupButton
            url="https://calendly.com/your-calendly-link"
            rootElement={document.getElementById('root')}
            text="Book Your Free Call →"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 text-white font-bold text-lg rounded-full transition-all duration-300 animate-pulse-glow"
          />
          <p className="mt-6 text-gray-500 text-sm">
            Or <a href="/" className="text-red-400 hover:text-red-300">return to homepage</a>
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-white">Home Services Mastery</span>
          </a>
          <div className="text-sm text-gray-400">
            Step {currentStep + 1} of {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Question Number */}
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-mono">{currentStep + 1}</span>
                <ArrowRight className="w-4 h-4 text-red-400" />
              </div>

              {/* Question */}
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                {currentQuestion.question}
              </h2>

              {/* Input */}
              <div className="space-y-4">
                {currentQuestion.type === 'text' && (
                  <input
                    type="text"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-red-500 text-2xl text-white placeholder-gray-600 py-4 outline-none transition-colors"
                    autoFocus
                  />
                )}

                {currentQuestion.type === 'email' && (
                  <input
                    type="email"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-red-500 text-2xl text-white placeholder-gray-600 py-4 outline-none transition-colors"
                    autoFocus
                  />
                )}

                {currentQuestion.type === 'tel' && (
                  <input
                    type="tel"
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-transparent border-b-2 border-white/20 focus:border-red-500 text-2xl text-white placeholder-gray-600 py-4 outline-none transition-colors"
                    autoFocus
                  />
                )}

                {currentQuestion.type === 'select' && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          handleAnswer(option)
                          setTimeout(handleNext, 300)
                        }}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${
                          answers[currentQuestion.id] === option
                            ? 'border-red-500 bg-red-500/10'
                            : 'border-white/10 hover:border-white/30 bg-white/5'
                        }`}
                      >
                        <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-mono text-gray-400">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-white text-lg">{option}</span>
                        {answers[currentQuestion.id] === option && (
                          <Check className="w-5 h-5 text-red-400 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'textarea' && (
                  <textarea
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    rows={4}
                    className="w-full bg-white/5 border-2 border-white/10 focus:border-red-500 rounded-xl text-lg text-white placeholder-gray-600 p-4 outline-none transition-colors resize-none"
                    autoFocus
                  />
                )}
              </div>

              {/* Navigation */}
              {currentQuestion.type !== 'select' && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleNext}
                    disabled={!canProceed() || isSubmitting}
                    className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-orange-500 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : currentStep === questions.length - 1 ? (
                      <>
                        Submit Application
                        <Send className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        OK
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <span className="text-gray-500 text-sm">
                    press <kbd className="px-2 py-1 rounded bg-white/10 font-mono">Enter ↵</kbd>
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-white/10 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-red-500'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          <div className="w-16" />
        </div>
      </footer>
    </div>
  )
}
