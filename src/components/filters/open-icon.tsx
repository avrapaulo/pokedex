import { AdjustmentsIcon } from '@heroicons/react/outline'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { displayFilters, inputName, selectedTypes } from 'lib/recoil'

const goTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

export const OpenIcon = () => {
  const setDisplayFilters = useSetRecoilState(displayFilters)
  const atomSelectedTypes = useRecoilValue(selectedTypes)
  const atomInputName = useRecoilValue(inputName)

  return (
    <div
      className="fixed text-black bottom-10 right-10 bg-gray-200 rounded-3xl p-1 cursor-pointer hover:text-black hover:bg-white"
      onClick={() => {
        goTop()
        setDisplayFilters(true)
      }}
    >
      <AdjustmentsIcon className="h-7 w-7" aria-hidden="true" />
      {(atomInputName.length > 0 || atomSelectedTypes.length > 0) && (
        <div className="bg-red-700 rounded-full w-3 h-3 absolute -top-1 right-0" />
      )}
    </div>
  )
}
