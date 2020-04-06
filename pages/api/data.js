import axios from 'axios'
import csv from 'csvtojson'
import { sortBy, sumBy, maxBy } from 'lodash'

export default async (req, res) => {
  /* 
    Setting this header will cache this endpoint on the server for
    5 minutes (300 seconds).
    We do this so we don't fetch the data from GitHub on every request.

    Docs: https://zeit.co/docs/v2/network/caching#stale-while-revalidate
  */
  res.setHeader(
    'Cache-Control',
    's-maxage=300, stale-while-revalidate, max-age=0'
  )

  // Retrieve the most up to date data from GitHub
  const githubRes = await axios.get(
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/web-data/data/cases_country.csv'
  )
  const csvData = githubRes.data

  // Convert the CSV data to a JSON object
  const countriesArray = await csv().fromString(csvData)

  // Normalize the data
  const normalizedCountriesArray = countriesArray.map((country) => {
    return {
      name: country.Country_Region,
      lastUpdate: country.Last_Update,
      lat: country.Lat,
      long: country.Long_,
      confirmed: Number(country.Confirmed),
      deaths: Number(country.Deaths),
      recovered: Number(country.Recovered),
      active: Number(country.Active),
    }
  })

  // Helper function to sum up the total number of stats from each country.
  // We use this to calculate the World stats.
  const sumByStat = (stat) =>
    sumBy(normalizedCountriesArray, (country) => Number(country[stat]))

  const confirmedTotal = sumByStat('confirmed')
  const recoveredTotal = sumByStat('recovered')
  const deathTotal = sumByStat('deaths')
  const activeTotal = sumByStat('active')

  // Create the World object that we will send back with the response
  const worldObject = {
    confirmed: confirmedTotal,
    recovered: recoveredTotal,
    deaths: deathTotal,
    active: activeTotal,
    lastUpdate: maxBy(normalizedCountriesArray, 'lastUpdate').lastUpdate,
  }

  // Helper function to create a new array of Country names sorted by stat.
  // We use this to get the ranking of each country per stat.
  const sortByStat = (stat) =>
    sortBy(normalizedCountriesArray, (country) => Number(country[stat]))
      .reverse()
      .map((o) => o.name)

  const sortedByConfirmed = sortByStat('confirmed')
  const sortedByRecovered = sortByStat('recovered')
  const sortedByDeaths = sortByStat('deaths')
  const sortedByActive = sortByStat('active')

  const countriesData = normalizedCountriesArray.map((country) => ({
    ...country,
    confirmedRank: sortedByConfirmed.indexOf(country.name) + 1,
    recoveredRank: sortedByRecovered.indexOf(country.name) + 1,
    deathsRank: sortedByDeaths.indexOf(country.name) + 1,
    activeRank: sortedByActive.indexOf(country.name) + 1,
  }))

  const coronaData = {
    world: worldObject,
    countries: countriesData,
  }

  res.json(coronaData)
}
