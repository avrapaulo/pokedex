import { selector, useRecoilValueLoadable } from 'recoil'
import { IType } from 'models/type'
import { IPokemon } from 'models/pokemon'
import { fetchWrapper } from 'utils/fetch'
import { formatId } from 'utils'
import { POKE_TYPES } from 'constants/types'

const currentPokeQuery = selector({
  key: 'pokemonsList',
  get: async () => {
    const pokemons = await fetchWrapper('https://pokeapi.co/api/v2/pokemon/?limit=151')

    const result: Promise<IPokemon[]> = Promise.all(
      pokemons.results.map(async (pokemon: any) => {
        const info = await fetchWrapper(pokemon.url)
        const species = await fetchWrapper(info.species.url)

        const types: IType[] = info.types.map((type: any) => ({ name: type.type.name }))

        return {
          name: pokemon.name,
          id: info.id,
          image: info.sprites.other['official-artwork'].front_default,
          color: species.color.name,
          types
        }
      })
    )

    return result
  }
})

const App = () => {
  const { contents: pokemons, state } = useRecoilValueLoadable(currentPokeQuery)
  if (state === 'hasError') return null
  if (state === 'loading') return null

  return (
    <section>
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-3 xl:gap-8 md:gap-6 gap-2 md:mx-0 mx-3">
        {Array.isArray(pokemons) &&
          pokemons.map(({ name, image, color, types, id }) => (
            <div key={name} className={`bg-${color}-400 rounded-3xl relative overflow-hidden`}>
              <div className="absolute right-0">
                <p
                  className={`bg-${color}-600 ${
                    color !== 'black' ? 'text-white' : 'text-black'
                  } font-medium rounded-bl-2xl pl-3 pr-4 py-1 text-xs bg-opacity-80`}
                >
                  {formatId(id)}
                </p>
              </div>
              <img className="mt-3" src={image} />
              <div className="flex justify-evenly">
                {types.map(({ name }: IType) => (
                  <img className="h-9" title={name} key={name} src={POKE_TYPES[name]?.image} />
                ))}
              </div>
              <div
                className={`text-center text-lg mb-2 mt-1 font-medium uppercase ${
                  color === 'white' ? 'text-black' : 'text-white'
                }`}
              >
                {name}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default App
