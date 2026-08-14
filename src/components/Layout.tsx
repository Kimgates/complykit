import { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  LayoutDashboard,
  FileText,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Home,
  PlayCircle,
  Settings,
} from 'lucide-react';
import { PRODUCT_NAME } from '@/config/product';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Documents', icon: FileText, href: '/documents' },
  { label: 'Get Started', icon: PlayCircle, href: '/get-started' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const location = useLocation();

  const sidebarWidth = collapsed ? 'w-[72px]' : 'w-[260px]';

  return (
    <div className="min-h-[100dvh] bg-slate-50 flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex ${sidebarWidth} flex-col bg-white border-r border-slate-100 fixed top-0 left-0 h-[100dvh] z-40 transition-all duration-300 ease-soft`}
      >
        {/* Logo */}
        <div className="h-[72px] flex items-center px-6 border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-2.5 overflow-hidden">
            <Leaf className="w-7 h-7 text-leaf-500 flex-shrink-0" strokeWidth={2.5} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="font-heading text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {PRODUCT_NAME}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-leaf-50 text-leaf-700 border-l-[3px] border-leaf-500'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-l-[3px] border-transparent'
                  }`
                }
              >
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      className="whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div className="p-3 border-t border-slate-100">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all duration-200"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-[100dvh] ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
          {/* Search */}
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="relative w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors duration-200">
              <User className="w-5 h-5" />
            </button>
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl"
              onClick={() => setMobileNavVisible(!mobileNavVisible)}
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 z-50 flex items-center justify-around">
        {[
          { icon: Home, label: 'Home', href: '/' },
          { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
          { icon: FileText, label: 'Documents', href: '/documents' },
          { icon: PlayCircle, label: 'Start', href: '/get-started' },
          { icon: Settings, label: 'Settings', href: '/settings' },
        ].map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 ${
                isActive ? 'text-leaf-600' : 'text-slate-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile padding for bottom nav */}
      <div className="lg:hidden h-16" />
    </div>
  );
}
