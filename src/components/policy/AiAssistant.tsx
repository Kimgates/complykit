import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AiAssistantProps {
  policyTitle: string;
}

const quickPrompts = [
  'Explain in simpler terms',
  'Check for compliance gaps',
  'Add section for...',
];

const mockResponses: Record<string, string> = {
  'explain': 'This policy sets out the rules for how incidents (accidents, injuries, or near-misses) should be reported and handled. The key points are: (1) ensure safety first, (2) report within 2 hours to your supervisor, (3) fill out the incident form within 24 hours, and (4) more serious incidents must be reported directly to the NDIS Commission. Think of it as a step-by-step guide for when things go wrong, so everyone stays safe and the right people are informed.',
  'compliance': 'I\'ve reviewed this policy against the NDIS Practice Standards. It covers most requirements well, but there are a couple of areas to strengthen:\n\n1. **Module 3 (Delivery of Supports)** — The policy references incident reporting but could be clearer on how incidents relate to specific support delivery contexts.\n\n2. **Staff training evidence** — There\'s no documented evidence that all staff have been trained on this policy. I recommend adding a training log.\n\n3. **Review schedule** — The review due date is approaching (March 2026). Consider starting the review process early.',
  'simpler': 'This policy is about what to do when something goes wrong. Here\'s the simple version:\n\n1. **Keep everyone safe** — First priority is making sure no one gets hurt.\n2. **Tell your boss within 2 hours** — Even if it seems small.\n3. **Write it down within 24 hours** — Use the incident report form.\n4. **Serious stuff goes to the NDIS Commission** — If someone is badly hurt or abused, report directly within 24 hours.\n\nThat\'s basically it — be safe, speak up quickly, and write it down.',
  'default': 'That\'s a great question about this policy. Based on the NDIS Practice Standards, I\'d recommend ensuring all workers understand their specific responsibilities. Would you like me to explain a particular section in more detail, or help you identify any compliance gaps?',
};

function generateResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('explain') || lower.includes('simpler') || lower.includes('simple')) return mockResponses.simpler;
  if (lower.includes('compliance') || lower.includes('gap') || lower.includes('check')) return mockResponses.compliance;
  if (lower.includes('what') || lower.includes('how') || lower.includes('mean')) return mockResponses.explain;
  return mockResponses.default;
}

export default function AiAssistant({ policyTitle }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hi! I can help you understand or improve the ${policyTitle}. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: generateResponse(text),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 border-l border-slate-100">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-leaf-600" />
          <h3 className="font-heading text-sm font-semibold text-slate-800">Policy Assistant</h3>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[90%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-leaf-500 text-white rounded-br-md'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 text-leaf-500 animate-spin" />
                <span className="text-xs text-slate-400">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-600 hover:bg-leaf-50 hover:border-leaf-200 hover:text-leaf-700 transition-all duration-150"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this policy..."
            className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-leaf-500 text-white rounded-xl hover:bg-leaf-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
