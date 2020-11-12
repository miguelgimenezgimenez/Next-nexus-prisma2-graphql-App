import React from 'react';
import { useQuery } from '@apollo/client';

import { PER_PAGE } from '../../constants';
import Pagination from '../Pagination';
import { Center, List } from '../../styles/common';
import ListItem from '../ListItem';
import { PHONE_CONNECTION_QUERY } from '../../graphql/queries'


function PhonesList({ page, brand_id }) {
  const { data, error, loading } = useQuery(PHONE_CONNECTION_QUERY, {
    variables: { first: PER_PAGE, page, brand_id }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No items here!</p>;

  const totalCount = data.phoneConnection?.totalCount
  return (
    <Center>
      <Pagination page={page} pathname="phones" totalCount={totalCount} brand_id={brand_id} />
      <List>
        {data.phoneConnection.nodes.map(phone => (
          <ListItem item={phone} key={phone.id} pathname="/phone" id={phone.id} />
        ))}
      </List>
      <Pagination page={page} pathname="phones" totalCount={totalCount} brand_id={brand_id} />

    </Center>
  );
}

export default PhonesList

