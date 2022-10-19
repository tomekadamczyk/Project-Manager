import React from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache,  defaultDataIdFromObject } from '@apollo/client';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    }
});

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache
})

const app = (
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
