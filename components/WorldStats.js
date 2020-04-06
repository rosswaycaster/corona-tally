import useIsMobile from '../hooks/useIsMobile'
import Header from '../components/Header'
import StatCard from '../components/StatCard'

export default ({ data }) => {
  const isMobile = useIsMobile()

  return (
    <>
      <Header
        title="World Stats"
        subHeader={`${isMobile ? 'tap' : 'click'} stat to filter country list`}
      />
      <div className="flex justify-between flex-wrap flex-column flex-row-l">
        <StatCard title="Confirmed" emoji="😷" count={data?.confirmed} />
        <StatCard title="Recovered" emoji="🙌" count={data?.recovered} />
        <StatCard title="Deaths" emoji="😞" count={data?.deaths} />
      </div>
    </>
  )
}
