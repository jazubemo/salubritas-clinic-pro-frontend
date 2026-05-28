'use client';

import { ReactNode } from "react";
import { ApolloClient, InMemoryCache, HttpLink  } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink  } from "@apollo/client/link/context";
import { auth } from "@/lib/firebase";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql",
});


const authLink = new SetContextLink(async (prevContext) => {
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  const existingHeaders = (prevContext.headers as Record<string, string>) || {};

  return {
    ...prevContext,
    headers: {
      ...existingHeaders,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface ProvidersProps {
  children: ReactNode;
}

export default function ApolloGraphQLProvider({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
