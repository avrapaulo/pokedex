import { useMemo } from 'react'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import type { NormalizedCacheObject } from '@apollo/client'
import type { AppProps } from 'next/app'

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> = null

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.POKEAPI_GRAPHQL_URI
    }),
    cache: new InMemoryCache()
  })

export function initializeApollo(initialState = null) {
  const client = apolloClient ?? createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract()

    // Merge the existing cache into data passed from
    // getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s)))
      ]
    })

    // Restore the cache with the merged data
    client.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client
  }

  return client
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME]
  const store = useMemo(() => initializeApollo(state), [state])

  return store
}
