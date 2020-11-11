import React from 'react';
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client';
import { perPage } from '../../config';
import Pagination from '../Pagination';

import { Center, List } from '../styles/common';
import ListItem from '../ListItem';


const PHONE_CONNECTION_QUERY = gql`
  query PHONE_CONNECTION_QUERY( 
    $first: Int = ${perPage},
    $after:String=${null}, 
    $page:Int=1
    $brand_id:Int)  
     {
    phoneConnection(first: $first,after:$after, page:$page, brand_id:$brand_id ) {
      pageInfo{
        startCursor
        endCursor
      }
      totalCount(brand_id:$brand_id)
      nodes{
        id
        name
        brand_id
        image      
      }
    }
  }
`;

function PhonesList({ page, brand_id }) {
  const { data, error, loading } = useQuery(PHONE_CONNECTION_QUERY, {
    variables: { first: perPage, page, brand_id }
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

export default PhonesList;
export { PHONE_CONNECTION_QUERY }
