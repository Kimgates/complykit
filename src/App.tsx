import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Layout from './components/Layout'
import Home from './pages/Home'
import Wizard from './pages/Wizard'
import Dashboard from './pages/Dashboard'
import PolicyViewer from './pages/PolicyViewer'
import Compliance from './pages/Compliance'
import Pricing from './pages/Pricing'
import Settings from './pages/Settings'
import Support from './pages/Support'

// Landing page layout wrapper
function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      {/* Landing pages with Navbar + Footer */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <Home />
          </LandingLayout>
        }
      />
      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <Pricing />
          </LandingLayout>
        }
      />
      <Route
        path="/support"
        element={
          <LandingLayout>
            <Support />
          </LandingLayout>
        }
      />

      {/* App routes with sidebar Layout */}
      <Route element={<Layout />}>
        <Route path="/get-started" element={<Wizard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/policies/:id" element={<PolicyViewer />} />
        <Route path="/documents" element={<Compliance />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
