import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles';
import { perPage } from '../../config';
import ErrorMessage from '../ErrorMessage';


// //TODO A proper dynamic pagination query should be created which depending on the input, gives number of total items
// export const PAGINATION_QUERY = gql`
//   query PAGINATION_QUERY {  
//     phoneConnection(first:1) {
//       totalCount
//     }
//   }
// `;

function Pagination({ page, pathname , totalCount}) {
  // const { error, loading, data } = useQuery(PAGINATION_QUERY);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <ErrorMessage error={error} />;
  // const { totalCount } = data.phoneConnection;
  const pages = Math.ceil(totalCount / perPage);
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Phones  Page {page} of {pages}
        </title>
      </Head>
      <Link

        href={{
          pathname: pathname,
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of{' '}
        <span className="totalPages" data-testid="totalPages">
          {pages}
        </span>
      </p>
      <p>{totalCount} Items Total</p>
      <Link

        href={{
          pathname: pathname,
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </PaginationStyles>
  );
}

export default Pagination;

