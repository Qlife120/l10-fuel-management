import { GaugeCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GaugeCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">L10 Fuel Management</h1>
          </div>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/graphs"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/graphs'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Analytics
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}