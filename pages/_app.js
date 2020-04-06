import React from 'react'
import { AnalyticsProvider } from '../hooks/useAnalytics'
import isMobile from '../hooks/useIsMobile'
import { SortByFilterProvider } from '../hooks/useSortByFilter'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from '../constants/theme'
import classnames from 'classnames'
import 'tachyons/css/tachyons.min.css'
import useIsMobile from '../hooks/useIsMobile'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.darkPurple};
    font-family: "Overpass Mono", monospace;
    color: white;
    max-width: 1000px;
    margin: auto;
    padding: 1rem;
  }

  * {
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`

export default ({ Component, pageProps }) => {
  const isMobile = useIsMobile()

  return (
    <ThemeProvider theme={theme}>
      <AnalyticsProvider>
        <SortByFilterProvider>
          <GlobalStyle />
          <div className={classnames(!isMobile && 'is-not-mobile')}>
            <Component {...pageProps} />
          </div>
        </SortByFilterProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  )
}
