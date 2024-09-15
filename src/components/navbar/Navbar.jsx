import { Link } from 'react-router-dom';

function Navbar() {
   
  return (
    <nav className="bg-magenta-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            {/* Your logo or brand name here */}
          </div>
          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex space-x-8 justify-center">
              <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/profile" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex sm:items-center sm:ml-6">
          <div className="flex space-x-8">
            {/* Add any additional navigation items here */}
          </div>
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;