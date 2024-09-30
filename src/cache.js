import { makeVar, InMemoryCache } from "@apollo/client";

export const products = makeVar([]);

export const CustomInMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});
