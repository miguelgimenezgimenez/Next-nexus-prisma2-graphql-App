import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles';
import { PER_PAGE } from '../../constants';


function Pagination({ page, pathname, totalCount, brand_id }) {

  const pages = Math.ceil(totalCount / PER_PAGE);
  return (
    <PaginationStyles data-testid="pagination">
      <Head>
        <title>
          Phones  Page {page}
        </title>
      </Head>
      <Link

        href={{
          pathname: pathname,
          query: { page: page - 1, brand_id },
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
          query: { page: page + 1, brand_id },
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

