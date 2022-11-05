import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    //console.log(user)

    const handleLogOut = () => {
        logout()
            .then((result) => {
                const user = result.user;
                console.log(user)
            })
            .catch(err => console.error(err))
    }

    const menuItem = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        {
            user?.email ?
                <>
                    <li className='font-semibold'><Link to='/orders'>Orders</Link></li>
                    <li onClick={handleLogOut} className='font-semibold'><Link >logout</Link></li>
                </>

                : <li className='font-semibold'><Link to='/login'>Login</Link></li>
        }

    </>
    return (
        <div className="navbar bg-base-100 h-20 mb-14">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItem}
                    </ul>
                </div>
                <Link to='/' className=" normal-case text-xl">
                    <p className='text-4xl  font-bold '>Practice Car</p>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItem}
                </ul>
            </div>

            <div className="navbar-end">
                <div className='mr-5'>
                    <p className='text-black'>Welcome <span className='text-orange-500 font-bold'>{user?.displayName}</span></p>
                </div>
                <button className="btn btn-outline btn-warning">Appointment</button>
            </div>
        </div>
    );
};

export default Header;