import { Link } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id
  return (
    <nav className="bg-magenta-800 p-4">
  <div className="flex justify-center">
    <div className="flex space-x-8">
      <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        Home
      </Link>
      <Link to="/hotornot"   
 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        Hot/Not
      </Link>   
      <Link to={`/${id}`}  
 className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
        Profile
      </Link>   
    

    </div>
  </div>
</nav>
  );
}

export default Navbar;