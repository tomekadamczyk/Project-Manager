import { InMemoryCache,  defaultDataIdFromObject } from '@apollo/client';

export const cache = new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        default: return defaultDataIdFromObject(object);
      }
    }
});