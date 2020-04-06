import { useEffect, useState } from 'react'
import useAnalytics from '../hooks/useAnalytics'
import axios from 'axios'

export default () => {
  const { trackEvent } = useAnalytics()
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/data')
      setData(res.data)
      trackEvent({ category: 'Data', action: 'Fetched' })
    }

    fetchData()
  }, [])

  return data
}
