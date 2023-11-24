import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Pages/Navbar'
function Layout() {
    return (
        <div className='flex flex-col'>
            <div className='self-center absolute'><Navbar /> </div>
            <Outlet />
        </div>
    )
}

export default Layout