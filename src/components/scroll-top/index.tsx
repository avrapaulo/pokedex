const goTop = () =>
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

export const ScrollToTop = () => (
  <div
    className="fixed text-white bottom-10 right-10 bg-gray-600 rounded-3xl p-1 cursor-pointer hover:text-black hover:bg-white"
    onClick={goTop}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 11l7-7 7 7M5 19l7-7 7 7"
      />
    </svg>
  </div>
)
