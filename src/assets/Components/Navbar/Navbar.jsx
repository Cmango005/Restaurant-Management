import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FiLogOut } from 'react-icons/fi';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className="flex justify-between  p-5 top-0 z-20 bg-transparent backdrop-blur-lg fixed left-0 mx-auto container">
                    <div className="flex flex-row lg:space-x-60">
                        <img className="h-14 w-32 shadow-2xl" src="https://i.ibb.co/QJjkZpq/restaurant-logo-design-template-free-vector.jpg" alt="" />
                        <div >
                        <nav className="flex flex-row lg:p-1 lg:space-x-10 lg:gap-6 ">
                            <NavLink to="/"><h3 className="text-blue-500">Home</h3></NavLink>
                            <NavLink to="/menu"><h3 className="text-blue-500">All Food Items</h3></NavLink>
                            <NavLink to="/blog"><h3 className="text-blue-500">Blog</h3></NavLink>
                        </nav>
                    </div>

                    </div>
                    
                    {
                        user ?
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    type="button"
                                    className="inline-flex items-center justify-center w-10 h-10 text-gray-700 border border-gray-300 rounded-full focus:outline-none"
                                    id="dropdown-menu-button"
                                    aria-expanded={isOpen ? 'true' : 'false'}
                                >
                                    <img
                                        src={user.photoURL}
                                        alt="Dropdown Icon"
                                        className="w-20 rounded-full border-cyan-400"
                                    />
                                </button>
                                {isOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 backdrop-blur bg-transparent rounded-md shadow-lg   ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="p-2 space-y-2"
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="dropdown-menu-button"
                                        >
                                            <h3 className="text-center text-sky-500 text-lg font-semibold">{user.displayName}</h3>
                                            <li
                                               
                                                className="block px-4 rounded-lg py-2 text-sm text-teal-600 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                <Link to='/my-addItems'><button >My added food items</button></Link>
                                            </li>
                                            <li
                                               
                                                className="block px-4 rounded-lg py-2 text-sm text-teal-600 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                <Link to='/add-item'><button >Add a food item</button></Link>
                                            </li>
                                            <li
                                               
                                               className="block px-4 rounded-lg py-2 text-sm text-teal-600 hover:bg-gray-100"
                                               role="menuitem"
                                           >
                                               <Link to='/my-items'><button >My ordered food items</button></Link>
                                           </li>
                                            <button onClick={handleSignOut} className="advanced-button flex items-center justify-between">LogOut <FiLogOut></FiLogOut></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className=" flex">

                                <Link to='/login'><button className="advanced-button">Login</button></Link>
                            </div>
                    }

                </div>

    
    );
};

export default Navbar;