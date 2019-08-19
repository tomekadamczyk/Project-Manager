import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        case !null: return object.key; // use `key` as the primary key
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    }
});

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache
})
console.log(cache)
const app = (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
