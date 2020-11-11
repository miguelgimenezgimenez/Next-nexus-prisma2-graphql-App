// import App from 'next/app';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import withData from '../utils/withData';

import { StateProvider } from '../LocalState';

function MyApp({ Component, apollo, pageProps }) {
  return (
    <ApolloProvider client={apollo}>
      <StateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </StateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // this exposes the url params to the page component so we can use things like item ID in our queries
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);