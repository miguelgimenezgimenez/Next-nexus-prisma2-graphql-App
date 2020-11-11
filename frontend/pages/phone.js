import PhoneDetail from '../components/PhoneDetail';

function Phone({ query }) {

  return (
    <div>
      <PhoneDetail id={parseInt(query.id)} />
    </div>
  );
}


export default Phone;
