import PhoneDetail from '../components/PhoneDetail';

function Phone({ query }) {

  return (
    <div>
      <PhoneDetail id={query.id} />
    </div>
  );
}


export default Phone;
