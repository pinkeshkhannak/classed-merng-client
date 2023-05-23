import React from "react";
import App from "./App";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

//production this will be different
const httpLink = createHttpLink({
  uri: "http://localhost:10000/",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  console.log(token);
  return { authorization: `Bearer ${token}` };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
