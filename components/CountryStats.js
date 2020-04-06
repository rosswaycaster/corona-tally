import { useRef, useState } from 'react'
import useIsMobile from '../hooks/useIsMobile'
import useSortByFilter from '../hooks/useSortByFilter'
import useAnalytics from '../hooks/useAnalytics'
import useDetectFocusOutside from '../hooks/useDetectFocusOutside'
import Header from './Header'
import * as addCommas from 'comma-number'
import ordinal from 'ordinal'
import styled from 'styled-components'
import { sortBy } from 'lodash'

const CountryStats = styled.div`
  & {
    .small-count {
      font-size: 0.75em;
      opacity: 0.2;
      padding-right: 5px;
      line-height: 2em;
      font-weight: 900;
    }

    .country-count,
    .total-count {
      text-shadow: 0.08em 0.08em red;
    }

    ${({ isMobile, theme }) =>
      !isMobile &&
      `
        .country-line:hover,
        .country-line:focus {
          background-color: ${theme.colors.midPurple};
          outline: none;
        }
      `}

    .more-info {
      max-height: 0;
      overflow: hidden;
      font-size: 0.9em;
      line-height: 1.4em;
      transition: flex 0.3s ease-out, max-height 0.3s ease 0.2s;
    }

    .more-info .total-count {
      font-size: 1.15em;
    }

    .more-info .left {
      border-right: 1px rgba(0, 0, 0, 0.15) solid;
    }

    .country.selected .more-info {
      max-height: 400px;
      padding-bottom: 10px;
      transition: flex 0.1s ease-in, max-height 0.8s ease-in;
    }

    .hide {
      transition: flex 0.3s ease-out;
    }

    .country.selected .hide {
      opacity: 0;
    }

    .num {
      transition: none;
    }

    .country.selected .num {
      transition: all 0.3s ease-out 0s;
      width: 0;
    }

    .country {
      transition: background-color 0.3s ease-out 0s;
    }

    .country.selected {
      transition: background-color 0s ease-out 0s;
      background-color: ${({ theme }) => theme.colors.midPurple};
    }
  }
`

export default ({ data }) => {
  const isMobile = useIsMobile()
  const [sortByFilter] = useSortByFilter()
  const { trackEvent } = useAnalytics()
  const [selectedCountry, setSelectedCountry] = useState()
  const selectedRef = useRef()
  const countriesListRef = useRef()

  useDetectFocusOutside([selectedRef, countriesListRef], () => {
    setSelectedCountry(null)
  })

  const sortedCountriesData = sortBy(data, sortByFilter.toLowerCase()).reverse()

  return (
    <>
      <Header
        title="Country Stats"
        subHeader={`${isMobile ? 'tap' : 'click'} country for more stats`}
        className="pb3"
      />
      <CountryStats
        ref={countriesListRef}
        className="center"
        style={{ maxWidth: 400 }}
        isMobile={isMobile}
      >
        {sortedCountriesData?.map((country, index) => {
          const handleOnClick = () => {
            setSelectedCountry(selectedCountry !== country ? country : null)
            if (selectedCountry !== country) {
              trackEvent({
                category: 'Country Clicked',
                action: country.name,
              })
            }
          }
          const isSelected = selectedCountry === country
          return (
            <div
              className={`country ph3 pointer ${
                selectedCountry === country && 'selected'
              }`}
              key={country.name}
              onClick={handleOnClick}
              ref={(ref) => {
                if (isSelected) selectedRef.current = ref
              }}
            >
              <div
                className={`flex ${
                  !isSelected && 'justify-end'
                } pv1 country-line`}
                tabIndex="1"
              >
                <div
                  className={`hide num pr1 flex ${
                    !isSelected && 'flex-grow-1'
                  } tr`}
                >
                  {index + 1}.{' '}
                </div>
                <div className="flex flex-shrink-1 flex-wrap tr">
                  {country.name}
                </div>{' '}
                <div className="hide ph2">⇢</div>
                <div className="hide country-count">
                  {' '}
                  {addCommas(country[sortByFilter.toLowerCase()])}
                </div>
              </div>
              <div className="more-info flex bg-mid-purple">
                <div className="left flex flex-column flex-grow-1 tr pr2">
                  <div className="flex justify-end">
                    <span className="small-count">
                      {ordinal(country.confirmedRank)}
                    </span>{' '}
                    Confirmed
                  </div>
                  <div className="flex justify-end">
                    <span className="small-count">
                      {ordinal(country.recoveredRank)}
                    </span>{' '}
                    Recovered
                  </div>
                  <div className="flex justify-end">
                    <span className="small-count">
                      {ordinal(country.deathsRank)}
                    </span>{' '}
                    Deaths
                  </div>
                </div>
                <div className="flex flex-column tr pl2">
                  <div className="total-count">
                    {addCommas(country.confirmed)}
                  </div>
                  <div className="total-count">
                    {addCommas(country.recovered)}
                  </div>
                  <div className="total-count">{addCommas(country.deaths)}</div>
                </div>
              </div>
            </div>
          )
        })}
      </CountryStats>
    </>
  )
}
