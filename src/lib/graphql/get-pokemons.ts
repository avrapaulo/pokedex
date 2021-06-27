import { gql } from '@apollo/client'

export const GetPokemons = gql`
  query GetPokemons(
    $types: [String!] = [
      "bug"
      "dark"
      "dragon"
      "electric"
      "fairy"
      "fighting"
      "fire"
      "flying"
      "ghost"
      "grass"
      "ground"
      "ice"
      "normal"
      "poison"
      "psychic"
      "rock"
      "steel"
      "water"
    ]
    $pokeName: String = ""
    $limit: Int!
    $offset: Int!
  ) {
    pokemon: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        _or: {
          pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $types } } }
          _and: { id: { _lt: 899 }, name: { _regex: $pokeName } }
        }
      }
      order_by: { id: asc }
    ) {
      id
      name
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      specy: pokemon_v2_pokemonspecy {
        color: pokemon_v2_pokemoncolor {
          name
        }
      }
    }
  }
`
