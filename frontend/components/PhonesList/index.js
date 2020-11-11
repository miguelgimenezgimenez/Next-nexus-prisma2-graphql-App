import React from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { perPage } from '../../config';
import Pagination from '../Pagination';

import { Center, List } from '../styles/common';
import ListItem from '../ListItem';

const ALL_PHONES_QUERY = gql`
  query ALL_PHONES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    getAllPhones(first: $first, skip: $skip, orderBy: "name ") {
      id
      name
      brand_id
      image      
    }
  }
`;

const PHONE_CONNECTION_QUERY = gql`
  query PHONE_CONNECTION_QUERY( $first: Int = ${perPage}) {
    phoneConnection(first: $first) {
      pageInfo{
        startCursor
        endCursor
      }
      totalCount
      nodes{
        id
        name
        brand_id
        image      
      }
    }
  }
`;

function PhonesList({ page, count }) {
  const { data, error, loading } = useQuery(PHONE_CONNECTION_QUERY, {
    variables: { first: count, perPage }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No items here!</p>;

  return (
    <Center>
      <Pagination page={page} pathname="phones" />


      <List>
        {data.phoneConnection.nodes.map(phone => (
          <ListItem item={phone} key={phone.id} pathname="/phone" />
        ))}
      </List>
        );

      <Pagination page={page} pathname="phones" />

    </Center>
  );
}

export default PhonesList;
export { ALL_PHONES_QUERY }
