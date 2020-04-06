import { useEffect, useState } from 'react'

export default () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isMobile =
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    setIsMobile(isMobile)
  }, [])

  return isMobile
}
