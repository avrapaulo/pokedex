export const fetchWrapper = async ({
  url,
  host = 'https://pokeapi.co/api/v2',
  path
}: {
  url?: string
  host?: string
  path?: string
}) => {
  const response = await fetch(url || `${host}${path}`)
  const data = await response.json()
  return data
}
