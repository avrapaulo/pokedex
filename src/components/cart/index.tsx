import Image from 'next/image'
import { POKE_TYPES } from 'constant'
import { Type } from 'models'
import { formatId } from 'utils'

interface CartProps {
  id: number
  name: string
  color: string
  types: Type[]
}

const twColor = {
  black: { 400: 'bg-black-400', 600: 'bg-black-600' },
  blue: { 400: 'bg-blue-400', 600: 'bg-blue-600' },
  brown: { 400: 'bg-brown-400', 600: 'bg-brown-600' },
  gray: { 400: 'bg-gray-400', 600: 'bg-gray-600' },
  green: { 400: 'bg-green-400', 600: 'bg-green-600' },
  pink: { 400: 'bg-pink-400', 600: 'bg-pink-600' },
  purple: { 400: 'bg-purple-400', 600: 'bg-purple-600' },
  red: { 400: 'bg-red-400', 600: 'bg-red-600' },
  white: { 400: 'bg-white-400', 600: 'bg-white-600' },
  yellow: { 400: 'bg-yellow-400', 600: 'bg-yellow-600' }
}

export const Cart = ({ id, name, color, types }: CartProps) => (
  <div
    key={name}
    className={`${twColor[color][400]} rounded-3xl relative overflow-hidden shadow-2xl`}
  >
    <div className="absolute right-0">
      <p
        className={`${twColor[color][600]} ${
          color !== 'black' ? 'text-white' : 'text-black'
        } font-medium rounded-bl-2xl pl-3 pr-4 py-1 text-xs bg-opacity-80`}
      >
        {formatId(id)}
      </p>
    </div>
    <div className="mt-3 text-center">
      <Image
        alt={name}
        width="174"
        height="174"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
      />
    </div>
    <div className="flex justify-evenly">
      {types.map(({ type: { name } }) => (
        <Image width="36" height="36" alt={name} key={name} src={POKE_TYPES[name]?.image} />
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
