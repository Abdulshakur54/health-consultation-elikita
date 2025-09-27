import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

export default function BackButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
      aria-label="Go back"
    >
      <FaArrowLeft />
    </button>
  )
}
