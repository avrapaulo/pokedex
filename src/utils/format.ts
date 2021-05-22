export const formatId = (id: number) => {
  const number = ('00' + id).slice(-3)
  return `#${number}`
}
