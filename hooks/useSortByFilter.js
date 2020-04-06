import React, { createContext, useState, useContext } from 'react'

const SortByFilterContext = createContext()

export const SortByFilterProvider = ({ children }) => {
  const [sortByFilter, setSortByFilter] = useState('Confirmed')
  return (
    <SortByFilterContext.Provider value={[sortByFilter, setSortByFilter]}>
      {children}
    </SortByFilterContext.Provider>
  )
}

const useSortByFilter = () => {
  return useContext(SortByFilterContext)
}

export default useSortByFilter
