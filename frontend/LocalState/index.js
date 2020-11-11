import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag'


const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;


const GET_BRANDS_QUERY = gql`
  query GET_BRANDS_QUERY  {
    getAllBrands {
     name
     id
    }
  }
`;


function StateProvider({ children }) {
  const { data, error, loading } = useQuery(GET_BRANDS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No items here!</p>;

  return (
    <LocalStateProvider value={{ brands: data.getAllBrands }}>
      {children}
    </LocalStateProvider>
  );
}

function useLocalState() {
  const all = useContext(LocalStateContext);
  return all;
}

export { StateProvider, LocalStateContext, useLocalState };
