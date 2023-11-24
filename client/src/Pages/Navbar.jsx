import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Dropdown from '../components/Dropdown';
function Navbar() {

    const { token, username } = useSelector((state) => state.auth);
    const [callToggleDropdown, setCallToggleDropdown] = useState(0);

    const navItems = ['Home', 'Rent', 'Publish', 'Forum']
    const authToken = localStorage.getItem('token')
    const authUsername = localStorage.getItem('user')
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        setLoggedIn(!loggedIn);


    }, [token, authToken, authUsername])




    return (
        <nav className='nav flex bg-[#FFFFFF29] w-[500px] h-[52px] rounded-3xl font-jost mt-10 justify-center gap-8 items-center text-[16px]'>
            {navItems.map((item, index) => {
                return (<NavLink key={index} className='transition ease-in-out delay-150 duration-200 hover:scale-110 hover:text-cyan-500' to={`${item == 'Home' ? '/' : item}`}>{item}</NavLink>)
            })}
            {
                authToken && authUsername ?
                    (
                        <>
                            <button
                                onClick={() => {
                                    setCallToggleDropdown((callToggleDropdown) => callToggleDropdown + 1)
                                }}
                                className='transition ease-in-out delay-150 duration-200 hover:scale-110 hover:text-cyan-500 flex items-center gap-1' to='/login'><AiOutlineUser />{authUsername}</button>
                            <Dropdown callToggleDropdown={callToggleDropdown} />
                        </>
                    )
                    :
                    <NavLink className='transition ease-in-out delay-150 duration-200 hover:scale-110 hover:text-cyan-500 flex items-center gap-1' to='/login'><AiOutlineUser />Login</NavLink>
            }
        </nav>
    )
}

export default Navbar