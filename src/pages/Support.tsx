import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  Clock,
} from 'lucide-react';
import {
  supportCategories,
  popularArticles,
  contactOptions,
  guidedTutorials,
  searchSuggestions,
} from '@/data/support';
import type { ContactOption } from '@/data/support';
import CategoryCard from '@/components/support/CategoryCard';
import ArticleCard from '@/components/support/ArticleCard';
import ContactForm from '@/components/support/ContactForm';
import TutorialCard from '@/components/support/TutorialCard';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Filter articles based on search
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return popularArticles;
    const q = searchQuery.toLowerCase();
    return popularArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-[100dvh]">
      {/* Section 1: Help Hero */}
      <section className="bg-teal-900 py-16 md:py-20">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="font-heading font-semibold text-3xl md:text-[40px] text-white leading-tight mb-3"
          >
            How can we help?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="text-lg text-white/70 mb-8"
          >
            Search our help centre, browse topics, or reach out to our friendly team.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers... (e.g., 'How do I generate a policy?')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white rounded-[14px] text-slate-700 placeholder:text-slate-400 shadow-[0_4px_16px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-[4px] focus:ring-teal-500/30 transition-all duration-200"
            />
          </motion.div>

          {/* Popular searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-4"
          >
            {searchSuggestions.map((suggestion, i) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                onClick={() => setSearchQuery(suggestion)}
                className="px-3 py-1.5 bg-white/20 text-white text-xs font-medium rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 2: Help Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="font-heading font-semibold text-xl text-slate-800 text-center mb-8"
        >
          Browse by Topic
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {supportCategories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* Section 3: Popular Articles */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="font-heading font-semibold text-xl text-slate-800 mb-6"
          >
            Most Read Articles
          </motion.h2>
          <div>
            {filteredArticles.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} variant="list" />
            ))}
            {filteredArticles.length === 0 && (
              <div className="text-center py-8">
                <p className="text-slate-400">No articles found matching your search</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-leaf-600 font-semibold hover:text-leaf-700 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 4: Contact Options */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-semibold text-xl text-slate-800 mb-2">
            Still need help? We&apos;re here for you.
          </h2>
          <p className="text-slate-500">
            Our team of NDIS compliance specialists is ready to assist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactOptions.map((contact, i) => (
            <ContactOptionCard key={contact.id} contact={contact} index={i} onChatOpen={() => setIsChatOpen(true)} />
          ))}
        </div>
      </section>

      {/* Section 5: Contact Form */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <ContactForm />
      </section>

      {/* Section 6: Guided Tutorials */}
      <section className="bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="mb-8"
          >
            <h2 className="font-heading font-semibold text-xl text-slate-800 mb-1">
              Interactive Tutorials
            </h2>
            <p className="text-slate-500">
              Step-by-step walkthroughs of key features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guidedTutorials.map((tutorial, i) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Live Chat Widget */}
      {isChatOpen && <LiveChatWidget onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

/* ── Contact Option Card ─────────────────────────────────────────── */

function ContactOptionCard({
  contact,
  index,
  onChatOpen,
}: {
  contact: ContactOption;
  index: number;
  onChatOpen: () => void;
}) {
  const iconMap: Record<string, React.ElementType> = {
    MessageCircle,
    Mail,
    Phone,
  };
  const Icon = iconMap[contact.iconName] || MessageCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: easeOutExpo,
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      className="bg-white border border-slate-100 rounded-2xl p-6 text-center transition-all duration-250"
    >
      <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 ${contact.iconColor}`} />
      </div>

      <h3 className="font-heading font-semibold text-lg text-slate-800 mb-1">
        {contact.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">{contact.description}</p>

      {contact.detail && (
        <p className={`text-base font-semibold mb-3 ${contact.iconColor}`}>
          {contact.detail}
        </p>
      )}

      {contact.availability && (
        <p className="text-xs text-slate-400 mb-4 flex items-center justify-center gap-1">
          <Clock className="w-3 h-3" />
          {contact.availability}
        </p>
      )}

      {contact.badge && (
        <span className="inline-block text-[10px] font-semibold px-2.5 py-1 bg-leaf-50 text-leaf-700 border border-leaf-200 rounded-full mb-4">
          {contact.badge}
        </span>
      )}

      {contact.buttonText && contact.type === 'live-chat' && (
        <>
          <button
            onClick={onChatOpen}
            className={`inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold text-sm rounded-xl hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 ${
              contact.buttonColor || 'bg-leaf-500 hover:bg-leaf-600 hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)]'
            }`}
          >
            {contact.buttonText}
          </button>
          <p className="text-[11px] text-leaf-600 mt-2 font-medium">{contact.detail}</p>
        </>
      )}
    </motion.div>
  );
}

/* ── Live Chat Widget ────────────────────────────────────────────── */

function LiveChatWidget({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ id: number; sender: 'agent' | 'user'; text: string }[]>([
    { id: 1, sender: 'agent', text: 'Hi there! Welcome to ComplyKit support. How can we help you today?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: input }]);
    setInput('');
    // Auto-reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'agent', text: 'Thanks for your message! One of our NDIS compliance specialists will be with you shortly.' },
      ]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: easeOutExpo }}
      className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 flex flex-col overflow-hidden"
      style={{ maxHeight: '500px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-leaf-500">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Live Chat</p>
            <p className="text-[11px] text-white/70 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              Typically replies in under 5 minutes
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                msg.sender === 'user'
                  ? 'bg-leaf-500 text-white rounded-br-md'
                  : 'bg-slate-100 text-slate-700 rounded-bl-md'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-slate-100 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 transition-all duration-200"
        />
        <button
          onClick={handleSend}
          className="p-2.5 bg-leaf-500 text-white rounded-xl hover:bg-leaf-600 transition-colors duration-200"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
