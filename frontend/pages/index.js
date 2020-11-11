import PhonesList from '../components/PhonesList';

function Home({ query }) {
  const { page } = query
  return (
    <div>
      <PhonesList page={parseInt(page) || 1} />
    </div>
  );
}


export default Home;
