import { motion } from 'framer-motion'
import ContactForm from './ContactForm'

export default function Footer() {
  return (
    <footer id="contacto" className="relative bg-luxury-charcoal text-white py-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* CTA Section */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2.5rem,8vw,6rem)] font-display font-semibold leading-none"
            >
              Agenda tu Visita
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed max-w-lg"
            >
              Descubre la exclusividad de Los Cedros. Nuestro equipo te guiará a través de esta experiencia única.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 text-white/60"
            >
              <p className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <span>Ubicación exclusiva</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <span>contacto@loscedros.com</span>
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm"
        >
          <p>© 2024 Los Cedros. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-luxury-gold transition-colors">Privacidad</a>
            <a href="#" className="hover:text-luxury-gold transition-colors">Términos</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
