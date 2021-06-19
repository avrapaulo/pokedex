import { useRef, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useQuery } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { addApolloState, initializeApollo } from 'lib/apollo'
import { Cart } from 'components/cart'
import { Pokemon } from 'models'
import { Pokeball } from 'constant/svg'
import { DEFAULT_LIMIT } from 'constant'
import { GetPokemons } from 'lib/graphql/get-pokemons'
import { PokeFetchVariables } from 'utils/poke-fetch-helper'
import { ScrollToTop } from '../components/scroll-top/index'
import { Filters, selectedTypes } from '../components/filters/index'

const App = () => {
  const atomSelectedTypes = useRecoilValue(selectedTypes)
  const { data, error, loading, fetchMore } = useQuery<Pokemon>(GetPokemons, {
    variables: {
      limit: DEFAULT_LIMIT,
      offset: 0
    }
  })
  const loader = useRef()

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    }

    const _loader = loader.current

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMore({
          variables: PokeFetchVariables({
            offset: data.pokemon.length,
            types: atomSelectedTypes
          }),
          updateQuery: (previousResult: Pokemon, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult
            }
            return Object.assign({}, previousResult, {
              pokemon: [...previousResult.pokemon, ...fetchMoreResult.pokemon]
            })
          }
        })
      }
    }, options)

    if (_loader) {
      observer.observe(_loader)
    }
    return () => {
      observer.unobserve(_loader)
    }
  }, [data.pokemon, atomSelectedTypes, fetchMore])

  return (
    <section>
      <Filters fetchMore={fetchMore} />
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 md:gap-6 gap-2 md:mx-0 mx-3">
        {data &&
          data.pokemon.map(
            ({
              id,
              name,
              specy: {
                color: { name: color }
              },
              types
            }) => <Cart key={id} name={name} color={color} id={id} types={types} />
          )}
      </div>
      <ScrollToTop />
      <div className="mb-6 mt-10" ref={loader}>
        <Pokeball />
      </div>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GetPokemons,
    variables: { limit: DEFAULT_LIMIT, offset: 0 }
  })

  return addApolloState(apolloClient, {
    props: {}
  })
}

export default App
