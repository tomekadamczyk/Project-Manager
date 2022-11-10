import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import { addMocksToSchema, createMockStore, IMocks, } from "@graphql-tools/mock";
import { render as rtlRender } from "@testing-library/react";
import React, { ReactNode } from "react";
import { schema } from "./schema";

export function render<TResolvers>(component: ReactNode, { resolvers }: { resolvers?: Partial<TResolvers>}) {
    const mockSchema = addMocksToSchema({
        schema,
        resolvers,
        mocks: {},
        preserveResolvers: true
    });
    

    const client = new ApolloClient({
        link: new SchemaLink({ schema: mockSchema }),
        cache: new InMemoryCache()
    });

    return rtlRender(
        <ApolloProvider client={client}>{component}</ApolloProvider>
    )
}
