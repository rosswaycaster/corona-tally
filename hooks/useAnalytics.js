import React, { createContext, useEffect, useContext } from 'react'
import ReactGA from 'react-ga'
import { useRouter } from 'next/router'

const AnalyticsContext = createContext()

export const AnalyticsProvider = ({ children }) => {
  const router = useRouter()

  const trackingId = process.env.NODE_ENV !== 'development' && 'UA-162761342-1'
  ReactGA.initialize(trackingId)

  // Since our Provider will be wrapping the whole app
  // we can go ahead and track pageviews here
  useEffect(() => {
    const trackPageView = (url) => {
      ReactGA.set({ page: url }) // Update the user's current page
      ReactGA.pageview(url) // Record a pageview for the given page
    }
    router.events.on('routeChangeComplete', trackPageView)

    // Track on initial page load
    trackPageView(router.pathname)
  }, [])

  // Pass the ReactGA object as the value of our Context
  return (
    <AnalyticsContext.Provider value={ReactGA}>
      {children}
    </AnalyticsContext.Provider>
  )
}

const useAnalytics = () => {
  // Retrieve the ReactGA object from our context
  const ReactGA = useContext(AnalyticsContext)

  return {
    trackEvent: ReactGA.event,
  }
}

export default useAnalytics
