import { Link } from "react-router-dom";
import { Stethoscope } from "lucide-react"; // an icon for healthcare

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6">
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
        <Stethoscope className="w-10 h-10 text-blue-600" />
      </div>

      {/* Headline */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 – Page Not Found
      </h1>

      {/* Message */}
      <p className="text-gray-600 text-center max-w-md mb-8">
        Oops! The page you’re looking for doesn’t exist.  
        It may have been moved, or you might have mistyped the address.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
        <Link
          to="/portal"
          className="px-6 py-3 rounded-2xl bg-white text-blue-600 font-medium border border-blue-600 shadow hover:bg-blue-50 transition"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
