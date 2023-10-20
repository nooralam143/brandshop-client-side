import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { AuthContext } from './../Provider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading user data using async/await
    const loadUserData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate data loading delay
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    loadUserData();
  }, []);

  const handalSignout = () => {
    logOut()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      })
  }

    const links = <>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/add-product">Add Product</NavLink></li>
    </> 
    const logo ="NoorMart";
    return (
        <div>
            <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {links}
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl"><Link to="/">{logo}</Link></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {links}
      <li tabIndex={0}>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
  <div className="navbar-end">
  </div>
  {/* Cart & User start */}
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">My cart</button>
          </div>
        </div>
      </div>
    </div>
    {
      isLoading ? (
        // Show loading indicator or nothing while loading
        <span className="loading loading-spinner loading-xs"></span>
      ) :
            user ?
              <>
                <div className="navbar-end">
                   
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                   
                    <div className="px-1 text-xl font-bold">
                      <h2>{user.displayName}</h2>
                    </div>
                    <li className="py-2">
                      <Link to="/profile">
                      <button className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </button>
                      </Link>
                    </li>
                    <li><button className=" hover:bg-primary text-white bg-pink-600 text-center" onClick={handalSignout}>Sign out</button></li>
                  </ul>
                </div>
                </div>
              </>
              :
              <div className="navbar-end">
              <Link to="/login">
                <button className="btn btn-sm">Login</button>
              </Link>
              </div>
          }
  </div>
  {/* user end */}
</div>
        </div>
    );
};

export default Navbar;