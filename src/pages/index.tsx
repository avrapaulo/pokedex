import { useRef, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { useRecoilValue, useRecoilState } from 'recoil'
import { addApolloState, initializeApollo } from 'lib/apollo'
import { GetPokemons } from 'lib/graphql'
import { inputName, isLastPokemon, selectedTypes } from 'lib/recoil'
import { PokeFetchVariables } from 'utils'
import { DEFAULT_LIMIT } from 'constant'
import { Pokeball } from 'constant/svg'
import { Pokemon } from 'models'
import { Cart } from 'components/cart'
import { OpenIcon, Modal } from 'components/filters'

const App = () => {
  const atomSelectedTypes = useRecoilValue(selectedTypes)
  const atomInputName = useRecoilValue(inputName)
  const [lastItem, setLastItem] = useRecoilState(isLastPokemon)
  const {
    data: { pokemon },
    error,
    loading,
    fetchMore
  } = useQuery<Pokemon>(GetPokemons, {
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
            offset: pokemon.length,
            types: atomSelectedTypes,
            pokeName: atomInputName
          }),
          updateQuery: (previousResult: Pokemon, { fetchMoreResult: { pokemon: morePokemon } }) => {
            if (morePokemon.length === 0) {
              console.log(morePokemon)
              setLastItem(true)
              return Object.assign({}, previousResult)
            }
            setLastItem(false)
            return Object.assign(
              {},
              {
                pokemon: [...previousResult.pokemon, ...morePokemon]
              }
            )
          }
        })
      }
    }, options)

    if (_loader) observer.observe(_loader)

    return () => {
      if (_loader) observer.unobserve(_loader)
    }
  }, [pokemon, atomSelectedTypes, atomInputName, fetchMore, setLastItem])

  return (
    <section>
      <Modal fetchMore={fetchMore} />

      {pokemon.length > 0 ? (
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:gap-8 md:gap-6 gap-2 md:mx-0 mx-3">
          {pokemon.map(
            ({
              id,
              name,
              specy: {
                color: { name: color }
              },
              types
            }) => (
              <Cart key={id} name={name} color={color} id={id} types={types} />
            )
          )}
        </div>
      ) : (
        // TODO: scroll bar space with modal
        // style={{ marginRight: `${isDisplayFilers ? '0' : '17px'}` }}
        <div className="flex-row text-center justify-center">
          <Image alt="No results" width="719" height="677" src={'/images/pikachu.png'} />
          <div className="text-3xl text-white">No results found</div>
        </div>
      )}
      <OpenIcon />
      <div className="mb-6 mt-10 h-24">
        {!lastItem && (
          <div ref={loader}>
            <Pokeball />
          </div>
        )}
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
