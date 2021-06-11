import { POKE_TYPES } from 'constants/types'
import { Type } from 'models'
import { formatId } from 'utils'

interface CartProps {
  id: number
  name: string
  color: string
  types: Type[]
}

export const Cart = ({ id, name, color, types }: CartProps) => (
  <div key={name} className={`bg-${color}-400 rounded-3xl relative overflow-hidden shadow-2xl`}>
    <div className="absolute right-0">
      <p
        className={`bg-${color}-600 ${
          color !== 'black' ? 'text-white' : 'text-black'
        } font-medium rounded-bl-2xl pl-3 pr-4 py-1 text-xs bg-opacity-80`}
      >
        {formatId(id)}
      </p>
    </div>
    <img
      className="mt-3"
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
    />
    <div className="flex justify-evenly">
      {types.map(({ type: { name } }) => (
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
)
