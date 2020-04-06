import useFetchData from '../hooks/useFetchData'
import Logo from '../components/Logo'
import WorldStats from '../components/WorldStats'
import CountryStats from '../components/CountryStats'
import Footer from '../components/Footer'

const HomePage = () => {
  const data = useFetchData()

  return (
    <>
      <Logo />
      <WorldStats data={data.world} />
      <CountryStats data={data.countries} />
      <Footer />
    </>
  )
}

export default HomePage
