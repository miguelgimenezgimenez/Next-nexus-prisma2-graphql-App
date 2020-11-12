import React from 'react';
import { useQuery } from '@apollo/client';
import Head from 'next/head';

import Error from '../ErrorMessage';
import PhoneDetailStyles from './styles';
import { GET_PHONE_QUERY } from '../../graphql/queries';


function PhoneDetail({ id }) {
  const { loading, error, data } = useQuery(GET_PHONE_QUERY, {
    variables: { id },
  });
  if (error) return <Error error={error} />;
  if (loading) return <p>Loading...</p>;

  if (!data.getPhone) return <p>No phone Found for {id}</p>;
  const phone = data.getPhone;
  return (
    <PhoneDetailStyles >
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

