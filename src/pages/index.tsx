import { useRef, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetStaticProps } from 'next'
import { addApolloState, initializeApollo } from 'lib/apollo'
import { Cart } from 'components/cart'
import { Pokemon } from 'models'
import { Pokeball } from 'constants/svg'
import { DEFAULT_LIMIT } from 'constants/defaults'
import { GetPokemons } from 'lib/graphql/get-pokemons'

const App = () => {
  const { data, fetchMore } = useQuery<Pokemon>(GetPokemons, {
    variables: { limit: DEFAULT_LIMIT, offset: 0 }
  })
  const loader = useRef()

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: 1
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMore({
          variables: {
            limit: DEFAULT_LIMIT,
            offset: data.pokemon.length
          },
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

    if (loader.current) {
      observer.observe(loader.current)
    }
    return () => {
      observer.unobserve(loader.current)
    }
  }, [data.pokemon])

  return (
    <section>
      <>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 xl:gap-8 md:gap-6 gap-2 md:mx-0 mx-3">
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
        <div className="mb-6 mt-10" ref={loader}>
          <Pokeball />
        </div>
      </>
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
