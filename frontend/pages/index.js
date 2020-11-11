import PhonesList from '../components/PhonesList';

function Home({ query }) {
  const { page, brand_id } = query
  return (
    <div>
      <PhonesList page={parseInt(page) || 1} brand_id={parseInt(brand_id)} />
    </div>
  );
}


export default Home;
