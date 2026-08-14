import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Linkedin, Facebook, Mail } from 'lucide-react';

const productLinks = [
  { label: 'Policy Generator', href: '/get-started' },
  { label: 'Compliance Dashboard', href: '/compliance' },
  { label: 'Learning Hub', href: '/learn' },
  { label: 'Mock Audit', href: '/mock-audit' },
  { label: 'Worker Screening', href: '/screening' },
  { label: 'Invoice Checker', href: '/invoice-checker' },
  { label: 'Pricing', href: '/#pricing' },
];

const resourceLinks = [
  { label: 'NDIS Practice Standards Guide', href: '#' },
  { label: 'Audit Preparation Checklist', href: '#' },
  { label: 'Compliance Blog', href: '#' },
  { label: 'Webinars', href: '#' },
  { label: 'Case Studies', href: '#' },
  { label: 'Template Library', href: '#' },
];

const companyLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '/support' },
  { label: 'Partner Program', href: '#' },
  { label: 'NDIS Provider Community', href: '#' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Security', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'ABN Information', href: '#' },
];

const footerColumns = [
  { title: 'Product', links: productLinks },
  { title: 'Resources', links: resourceLinks },
  { title: 'Company', links: companyLinks },
  { title: 'Legal', links: legalLinks },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const scrollReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <footer className="bg-teal-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-12">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div>
              <h3 className="text-xl font-semibold font-heading text-white">Stay updated on NDIS changes</h3>
              <p className="text-white/50 text-sm mt-1">
                Get compliance tips and NDIS regulatory updates. Unsubscribe anytime.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-[280px] px-4 py-3 rounded-l-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-leaf-400"
              />
              <button className="px-6 py-3 bg-leaf-500 text-white font-semibold rounded-r-xl hover:bg-leaf-600 transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Link Columns */}
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((col, i) => (
            <motion.div
              key={col.title}
              custom={i}
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4 text-sm tracking-wide">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-white/50 text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-white/10">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-leaf-400" />
            <span className="text-white/50 text-sm">&copy; 2025 ComplyKit. All rights reserved.</span>
          </div>
          <p className="text-white/40 text-sm hidden md:block">
            Made with care for NDIS providers Australia-wide
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors duration-150" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors duration-150" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors duration-150" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
