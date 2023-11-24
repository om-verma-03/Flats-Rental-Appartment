import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '../redux/features/authSlice';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ callToggleDropdown }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (callToggleDropdown)
            toggleDropdown()
    }, [callToggleDropdown]);

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        dispatch(clearAuth());
    }

    return (
        <div className='absolute -right-20 mt-5' >
            {isOpen && (
                <div
                    onMouseLeave={toggleDropdown}
                    className="origin-top-right  absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg"
                >
                    <ul>
                        <li>

                            <NavLink
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                                to='/profile'
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <a
                                onClick={handleLogout}
                                className="block px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer"
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
