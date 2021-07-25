import { Fragment, useCallback, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil'
import _ from 'lodash'
import { DEFAULT_LIMIT, POKE_TYPES } from 'constant'
import { displayFilters, inputName, isLastPokemon, selectedTypes } from 'lib/recoil'
import { PokeFetchVariables } from 'utils'

export const Modal = ({ fetchMore }: { fetchMore: any }) => {
  const [pokeTypes, setPokeTypes] = useRecoilState<string[]>(selectedTypes)
  const [pokeName, setPokeName] = useRecoilState<string>(inputName)
  const setLastItem = useSetRecoilState(isLastPokemon)
  const [open, setOpen] = useRecoilState(displayFilters)

  const fetchPoke = useCallback(
    ({ types, name }: { types: string[]; name: string }) => {
      fetchMore({
        variables: PokeFetchVariables({
          types,
          pokeName: name
        }),
        updateQuery: (_, { fetchMoreResult: { pokemon } }) => {
          setLastItem(pokemon.length < DEFAULT_LIMIT)
          return Object.assign({}, { pokemon })
        }
      })
    },
    [fetchMore, setLastItem]
  )

  const debouncedSearch = useMemo(
    () =>
      _.debounce((value: string) => {
        fetchPoke({ types: pokeTypes, name: value.toLowerCase() })
      }, 1000),
    [fetchPoke, pokeTypes]
  )

  const handleChange = useCallback(
    (value: string) => {
      debouncedSearch(value)
    },
    [debouncedSearch]
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="min-h-screen px-4 flex items-center justify-center">
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />

          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-3xl">
            <Dialog.Title className=" text-center text-lg font-bold text-gray-900">
              Filter by
            </Dialog.Title>
            <label htmlFor="types" className="block text-sm text-gray-800 mt-3 mb-1">
              Types
            </label>
            <div className="grid grid-cols-6 gap-3">
              {Object.values(POKE_TYPES).map(({ name, image, color }) => (
                <div key={name} className="flex justify-center">
                  <div
                    className={`rounded-3xl flex justify-center  ${
                      pokeTypes.some(type => type === name)
                        ? `ring-2 ring-offset-2 ${color} ring-opacity-70`
                        : ''
                    }`}
                  >
                    <Image
                      className="cursor-pointer"
                      width="50"
                      height="50"
                      alt={name}
                      src={image}
                      onClick={() => {
                        let _types: string[]
                        if (pokeTypes.some(type => type === name)) {
                          _types = pokeTypes.filter(type => type !== name)
                        } else {
                          _types = [...pokeTypes, name]
                        }

                        setPokeTypes(_types)
                        fetchPoke({ types: _types, name: pokeName })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <label htmlFor="name" className="block text-sm text-gray-800 mt-3 mb-1">
              Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-500 sm:text-sm" />
              </div>
              <input
                className="focus:ring-black focus:border-black block w-full pl-9 py-2 sm:text-sm border-gray-300 rounded-md border-2"
                type="text"
                name="name"
                id="name"
                value={pokeName}
                placeholder="Type pokemon name..."
                onChange={({ currentTarget: { value } }) => {
                  setPokeName(value)
                  handleChange(value)
                }}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
