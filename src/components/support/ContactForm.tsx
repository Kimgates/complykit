import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Paperclip } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    email: '',
    plan: 'Seedling (Free)',
    message: '',
  });
  const [topicOpen, setTopicOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);

  const topics = ['General Question', 'Technical Issue', 'Billing Question', 'Feature Request', 'Compliance Help', 'Report a Bug'];
  const plans = ['Seedling (Free)', 'Growth', 'Flourish'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ topic: '', name: '', email: '', plan: 'Seedling (Free)', message: '' });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        className="bg-white border border-slate-100 rounded-2xl p-10 max-w-2xl mx-auto text-center"
      >
        {/* Animated checkmark */}
        <motion.div
          className="w-20 h-20 rounded-full bg-leaf-50 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Check className="w-10 h-10 text-leaf-500" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        <h3 className="font-heading font-semibold text-2xl text-leaf-700 mb-2">
          Message sent!
        </h3>
        <p className="text-slate-500 mb-6">
          We&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={handleReset}
          className="text-sm font-semibold text-slate-600 px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-white border border-slate-100 rounded-2xl p-8 max-w-2xl mx-auto"
    >
      <h3 className="font-heading font-semibold text-xl text-slate-800 mb-6">
        Send us a message
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Topic dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setTopicOpen(!topicOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-leaf-400 transition-colors focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15"
            >
              <span className={formData.topic ? 'text-slate-700' : 'text-slate-400'}>
                {formData.topic || 'Select a topic'}
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${topicOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {topicOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setTopicOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, topic });
                          setTopicOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-leaf-50 hover:text-leaf-700 transition-colors text-left"
                      >
                        {topic}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your name"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            required
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            required
          />
        </motion.div>

        {/* Plan dropdown */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.24, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Plan</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPlanOpen(!planOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-leaf-400 transition-colors focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15"
            >
              {formData.plan}
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${planOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {planOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setPlanOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-20 overflow-hidden"
                  >
                    {plans.map((plan) => (
                      <button
                        key={plan}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, plan });
                          setPlanOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-leaf-50 hover:text-leaf-700 transition-colors text-left"
                      >
                        {plan}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your question or issue in detail..."
            className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 resize-y min-h-[120px] transition-all duration-200"
            required
          />
        </motion.div>

        {/* Attachments */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.36, duration: 0.3 }}
        >
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-3 border border-dashed border-slate-200 rounded-xl text-sm text-slate-400 hover:border-leaf-300 hover:text-slate-600 transition-all duration-200"
          >
            <Paperclip className="w-4 h-4" />
            Attach screenshots or files (optional)
          </button>
          <p className="text-[11px] text-slate-400 mt-1">Max 3 files, 5MB each</p>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.42, duration: 0.3 }}
        >
          <button
            type="submit"
            className="w-full py-3.5 bg-leaf-500 text-white font-semibold text-sm rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] active:translate-y-0 transition-all duration-200"
          >
            Send Message
          </button>
          <p className="text-[11px] text-slate-400 mt-2 text-center">
            We typically respond within 24 hours. For urgent issues, use live chat.
          </p>
        </motion.div>
      </form>
    </motion.div>
  );
}
