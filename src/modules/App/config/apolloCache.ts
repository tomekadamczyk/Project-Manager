import { InMemoryCache,  defaultDataIdFromObject } from '@apollo/client';

export const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      default: {
        return defaultDataIdFromObject(object);
      }
    }
  },
  typePolicies: {
    Query: {
      fields: {
        tasksPaginated: {
          // read(existing, { args }) {
          //   if(args && existing) {
          //     const { offset, limit } = args;
          //     console.log(existing.edges.slice(offset, offset + limit));
              
          //     return existing && existing.edges.slice(offset, offset + limit);
          //   }
          //   console.log('not ex')
          //   return existing;
          // },
          // keyArgs: false,
          // merge(existing: TasksPaginated = {totalCount: 0, edges: []}, incoming: TasksPaginated, { args }) {
          //   const merged = existing.edges ? { totalCount: existing.totalCount, edges: existing.edges.slice(0)} : {totalCount: 0, edges: []};
          //   if(args) {
          //     merged.totalCount = incoming.totalCount;
          //     for(let i = 0; i < incoming.edges.length; ++i) {
          //       merged.edges[args.offset + i] = incoming.edges[i];
          //     }
          //   }
          //   return merged
          // }
        },
      }
    }
  }
});