import React from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { perPage } from '../../config';

import { Center, ItemsList } from '../styles/common';
import ListItem from '../ListItem';

const ALL_PHONES_QUERY = gql`
  query ALL_PHONES_QUERY {
    getAllPhones {
      id
      name
      brand_id
      image      
    }
  }
`;

function Phones({ page, count }) {
  const { data, error, loading } = useQuery(ALL_PHONES_QUERY, {
  });

  return (
    <Center>

      {(() => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        if (!data) return <p>No items here!</p>;
        return (
          <ItemsList>
            {data.getAllPhones.map(phone => (
              <ListItem item={phone} key={phone.id} pathname="/phones" />
            ))}
          </ItemsList>
        );
      })()}
    </Center>
  );
}

export default Phones;
export { ALL_PHONES_QUERY }
