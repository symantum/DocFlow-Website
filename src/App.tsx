import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'

import HomePage from './pages/HomePage'

import APAutomationPage from './pages/APAutomationPage'

import PurchaseAnalyticsPage from './pages/PurchaseAnalyticsPage'

import DataIntegrityPage from './pages/DataIntegrityPage'

import ResourcesPage from './pages/ResourcesPage'

import GetStartedPage from './pages/GetStartedPage'

import ContactPage from './pages/ContactPage'

import PrivacyPage from './pages/PrivacyPage'

import TermsPage from './pages/TermsPage'

import PricingPage from './pages/PricingPage'

import PilotPage from './pages/PilotPage'

import VerifyEmailPage from './pages/VerifyEmailPage'



export default function App() {

  return (

    <Routes>

      <Route element={<Layout />}>

        <Route path="/"                    element={<HomePage />} />

        <Route path="/automation"          element={<APAutomationPage />} />

        <Route path="/analytics"           element={<PurchaseAnalyticsPage />} />

        <Route path="/data-integrity"      element={<DataIntegrityPage />} />

        <Route path="/resources"           element={<ResourcesPage />} />

        <Route path="/pricing"             element={<PricingPage />} />

        <Route path="/pilot"               element={<PilotPage />} />

        <Route path="/get-started"         element={<GetStartedPage />} />

        <Route path="/verify-email"        element={<VerifyEmailPage />} />

        <Route path="/activation"          element={<Navigate to="/get-started" replace />} />

        <Route path="/contact"             element={<ContactPage />} />

        <Route path="/privacy"             element={<PrivacyPage />} />

        <Route path="/terms"               element={<TermsPage />} />

        {/* Legacy redirects */}

        <Route path="/ap-automation"       element={<Navigate to="/automation" replace />} />

        <Route path="/purchase-analytics"  element={<Navigate to="/analytics" replace />} />

        <Route path="/dashboard/activation" element={<Navigate to="/get-started" replace />} />

      </Route>

    </Routes>

  )

}


