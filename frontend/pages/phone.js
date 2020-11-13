import PhoneDetail from '../components/PhoneDetail'

function Phone({ query }) {
  const { id } = query

  return (
    <div>
      <PhoneDetail id={parseInt(id)} />
    </div>
  )
}


export default Phone
