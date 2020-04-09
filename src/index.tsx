import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';
import * as serviceWorker from './serviceWorker';

toast.configure();

// Custom Apollo link which pops up a toast notification whenever network requests are happening, just to make the demo clearer
const networkActivityToastLink = new ApolloLink((operation, forward) => {
  toast(`Network request: ${operation.operationName}`);
  return forward(operation);
});

// HttpLink which connects to an example public GraphQL API for Spotify, see https://github.com/lowsky/spotify-graphql-server
const httpLink = new HttpLink({
  uri: 'https://spotify-graphql-server.herokuapp.com/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  link: networkActivityToastLink.concat(httpLink)
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
