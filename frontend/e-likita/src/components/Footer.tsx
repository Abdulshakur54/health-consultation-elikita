export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-10 pt-7">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">e-Likita</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Your AI-powered hospital consultation assistant, 
            helping you make informed healthcare decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/login" className="hover:text-blue-600">Login</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Resources</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          <p className="mt-3 text-sm text-gray-600">
            Email: <a href="mailto:support@elikita.com" className="text-blue-600">support@elikita.com</a>
          </p>
          <div className="flex space-x-4 mt-3">
            {/* Example using lucide-react icons */}
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <i className="fab fa-facebook"></i> {/* replace with lucide-react */}
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} e-Likita. All rights reserved.
      </div>
    </footer>
  );
}
