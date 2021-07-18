import { AdjustmentsIcon } from '@heroicons/react/outline'
import { useSetRecoilState } from 'recoil'
import { displayFilters } from 'lib/recoil'

export const OpenIcon = () => {
  const setDisplayFilters = useSetRecoilState(displayFilters)

  return (
    <div
      className="fixed text-black bottom-10 right-10 bg-gray-200 rounded-3xl p-1 cursor-pointer hover:text-black hover:bg-white"
      onClick={() => setDisplayFilters(true)}
    >
      <AdjustmentsIcon className="h-7 w-7" aria-hidden="true" />
    </div>
  )
}