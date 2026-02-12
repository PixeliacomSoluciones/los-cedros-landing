import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitStatus('success')
    
    // Reset form
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitStatus('idle')
    }, 3000)
  }

  const isFormValid = formData.name && formData.email && formData.phone && formData.message

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div className="relative">
        <motion.label
          animate={{
            y: focusedField === 'name' || formData.name ? -24 : 0,
            scale: focusedField === 'name' || formData.name ? 0.85 : 1,
            color: focusedField === 'name' ? '#B8956A' : '#ffffff80',
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-3 pointer-events-none origin-left"
        >
          Nombre
        </motion.label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-luxury-gold py-3 text-white outline-none transition-colors"
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <motion.label
          animate={{
            y: focusedField === 'email' || formData.email ? -24 : 0,
            scale: focusedField === 'email' || formData.email ? 0.85 : 1,
            color: focusedField === 'email' ? '#B8956A' : '#ffffff80',
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-3 pointer-events-none origin-left"
        >
          Email
        </motion.label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-luxury-gold py-3 text-white outline-none transition-colors"
        />
      </div>

      {/* Phone Field */}
      <div className="relative">
        <motion.label
          animate={{
            y: focusedField === 'phone' || formData.phone ? -24 : 0,
            scale: focusedField === 'phone' || formData.phone ? 0.85 : 1,
            color: focusedField === 'phone' ? '#B8956A' : '#ffffff80',
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-3 pointer-events-none origin-left"
        >
          Teléfono
        </motion.label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-luxury-gold py-3 text-white outline-none transition-colors"
        />
      </div>

      {/* Message Field */}
      <div className="relative">
        <motion.label
          animate={{
            y: focusedField === 'message' || formData.message ? -24 : 0,
            scale: focusedField === 'message' || formData.message ? 0.85 : 1,
            color: focusedField === 'message' ? '#B8956A' : '#ffffff80',
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-3 pointer-events-none origin-left"
        >
          Mensaje
        </motion.label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          rows={4}
          className="w-full bg-transparent border-b-2 border-white/20 focus:border-luxury-gold py-3 text-white outline-none transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isFormValid || isSubmitting}
        whileHover={{ scale: isFormValid ? 1.02 : 1 }}
        whileTap={{ scale: isFormValid ? 0.98 : 1 }}
        className={`
          w-full py-4 rounded-full font-medium uppercase tracking-wider
          transition-all duration-300
          ${isFormValid 
            ? 'bg-luxury-gold text-white hover:bg-luxury-gold-light' 
            : 'bg-white/10 text-white/30 cursor-not-allowed'
          }
        `}
      >
        {isSubmitting ? 'Enviando...' : submitStatus === 'success' ? '¡Enviado!' : 'Enviar Mensaje'}
      </motion.button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-luxury-gold text-center"
        >
          ¡Gracias! Te contactaremos pronto.
        </motion.p>
      )}
    </form>
  )
}
