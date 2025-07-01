import { Link } from "react-router"


const Navbar = () => {
  return (
    <nav data-testid="nav" className="bg-gray-100 text-white p-4 flex justify-end items-center mb-2 mt-1  ">
        <ul className="flex space-x-6 pr-20 text-black font-semibold">
           <Link to="/">  <li className="cursor-pointer">Home</li></Link>
            <Link  to="/cart"><li className="cursor-pointer"  >Cart</li></Link>
         
        </ul>
    </nav>
  )
}

export default Navbar
