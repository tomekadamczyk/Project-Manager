import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ApolloProvider, gql } from '@apollo/client';
import * as serviceWorker from './serviceWorker';
import { client } from 'config/apolloClient';

const app = (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </React.StrictMode>
)

const statuses = client.query({
  query: gql`
    query GetStatuses {
      statuses {
        id,
        name
      }
    }
  `
}).then(res => {
  console.log('statuses', res);
  
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
