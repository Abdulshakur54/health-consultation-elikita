export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Heartbeat Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 4 13.5 4 8.5C4 5.462 6.462 3 9.5 3C11.24 3 12.91 3.81 14 5.09C15.09 3.81 16.76 3 18.5 3C21.538 3 24 5.462 24 8.5C24 13.5 16 21 16 21H12Z"
              />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-600 font-medium animate-pulse">
          Loading
        </p>
      </div>
    </div>
  )
}
