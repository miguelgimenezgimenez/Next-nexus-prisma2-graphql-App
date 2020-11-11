import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import Error from '../ErrorMessage';
import PhoneDetailStyles from './styles';


const GET_PHONE_QUERY = gql`
  query GET_PHONE_QUERY($id: String!) {
    getPhone(id:$id) {
      id
      name
      brand_id
      image
      dimensions
      os
      storage          
    }
  }
`;

function PhoneDetail({ id }) {
  const { loading, error, data } = useQuery(GET_PHONE_QUERY, {
    variables: { id },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  if (!data.getPhone) return <p>No phone Found for {id}</p>;
  const phone = data.getPhone;
  return (
    <PhoneDetailStyles data-testid="singleItem">
      <Head>
        <title> GS - {phone.name}</title>
      </Head>
      <div className="details">
        <h2>{phone.name}</h2>
        <p>{phone.storage}</p>
        <p>{phone.dimensions}</p>
        <p>{phone.os}</p>
      </div>
      <img src={phone.image} alt={phone.name} />
    </PhoneDetailStyles>
  );
}

export default PhoneDetail;
export { GET_PHONE_QUERY };
