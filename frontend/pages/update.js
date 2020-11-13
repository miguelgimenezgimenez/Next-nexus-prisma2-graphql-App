import UpdatePhone from '../components/UpdatePhone'
import { useQuery } from '@apollo/client'
import { GET_PHONE_QUERY } from '../graphql/queries'

function Update({ query }) {
  const { id } = query

  const { data = {}, loading } = useQuery(GET_PHONE_QUERY, {
    variables: {
      id: parseInt(id),
    },
  })

  if (loading) return <p>Loading...</p>
  if (!data || !data.getPhone) return <p>No Item Found for ID {id}</p>

  return (
    <UpdatePhone id={parseInt(id)} phone={data.getPhone}></UpdatePhone>
  )
}

export default Update

