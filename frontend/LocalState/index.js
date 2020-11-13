import { createContext, useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BRANDS_QUERY } from '../graphql/queries'


const LocalStateContext = createContext()
const LocalStateProvider = LocalStateContext.Provider


export function StateProvider({ children }) {
  const { data, error, loading } = useQuery(GET_BRANDS_QUERY)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!data) return <p>No items here!</p>

  return (
    <LocalStateProvider value={{ brands: data.getAllBrands }}>
      {children}
    </LocalStateProvider>
  )
}

export function useLocalState() {
  const all = useContext(LocalStateContext)
  return all
}

