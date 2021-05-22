import { useState, useRef, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Cart } from 'components/cart'
import { IType, IPokemon } from 'models'
import { fetchWrapper } from 'utils'
import { Pokeball } from 'constants/svg'
import { DEFAULT_LIMIT } from 'constants/defaults'

const fetchPokemon = async ({
  offset,
  limit = DEFAULT_LIMIT
}: {
  offset?: number
  limit?: number
}) => {
  const json = await fetchWrapper({
    path: `/pokemon/?limit=${limit}${offset ? `&offset=${offset}` : ''}`
  })

  const pokemons: IPokemon[] = await Promise.all(
    json.results.map(async (pokemon: any) => {
      const info = await fetchWrapper({ url: pokemon.url })
      const species = await fetchWrapper({ url: info.species.url })

      const types: IType[] = info.types.map((pokeType: any) => ({ name: pokeType.type.name }))

      return {
        name: pokemon.name,
        id: info.id,
        image: info.sprites.other['official-artwork'].front_default,
        color: species.color.name,
        types
      }
    })
  )

  return { pokemons }
}

const App = ({ pokemons }: { pokemons: IPokemon[] }) => {
  const [poke, setPoke] = useState(pokemons)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const loader = useRef()

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1
    }
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(pageNumber => pageNumber + 1)
      }
    }, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  useEffect(() => {
    const fetchPokemonPage = async () => {
      setIsLoading(true)
      const { pokemons: data } = await fetchPokemon({ offset: DEFAULT_LIMIT * page })
      setPoke([...poke, ...data])
      setIsLoading(false)
    }
    if (page !== 0) fetchPokemonPage()
  }, [page])

  const clickPage = () => console.log(page)

  return (
    <section>
      <>
        <div onClick={clickPage}>asd</div>
        <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 xl:gap-8 md:gap-6 gap-2 md:mx-0 mx-3">
          {poke.map(({ name, image, color, types, id }) => (
            <Cart key={id} name={name} image={image} color={color} types={types} id={id} />
          ))}
        </div>
        <div ref={loader}>
          <Pokeball />
        </div>
      </>
    </section>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { pokemons } = await fetchPokemon({})
  return { props: { pokemons } }
}

export default App
