import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setAuth, clearAuth } from '../redux/features/authSlice.js'

function SignIn() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [isUserIconVisible, setIsUserIconVisible] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin = async () => {
        try {
            const response = await axios.post('https://flat-apartment.onrender.com/login', null, {
                auth: {
                    username: user,
                    password: password,
                },
            });
            const { token } = response.data;
            setToken(token);
            setIsLoggedIn(true);
            console.log(response.data);
            //Setting token and username in localstorage
            localStorage.setItem('user', user);
            localStorage.setItem('token', token);

            //Setting token and userName into redux store
            dispatch(setAuth({ token: token, username: user }))

        } catch (error) {
            console.error('Login failed:', error);
        }
    };




    const handleEmailChange = (e) => {
        setUser(e.target.value);
        setIsUserIconVisible(e.target.value === '');
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('user:', user);
        console.log('Password:', password);

        // Resetting the form fields
        setUser('mecskyverse');
        setPassword('');


        //Hitting the server for Authentication
        handleLogin();

        // handleGet();
    };
    console.log(localStorage.getItem('token'))

    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            navigate('/', { replace: true });
        }
    }, [token])

    return (
        <>
            <main className='h-screen bg-sign'>
                <section className='bg-gradient h-screen w-screen flex flex-col justify-center align-center'>
                    <h1 className='headline self-center text-[46px] font-[700] not-italic mt-10'>UniHome: Sign In</h1>
                    <div className='flex flex-col self-center mt-5' >
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5 relative'>
                            <label htmlFor="username">
                                {isUserIconVisible && <BiUserCircle className='absolute left-2 top-9 text-2xl align-center' />}
                            </label>
                            <input
                                type="text"
                                onChange={handleEmailChange}
                                placeholder="Username"
                                className='w-80 placeholder:pl-5 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className='bg-transparent w-80 h-14 border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white '
                                value={password}
                                onChange={handlePasswordChange}
                                required

                            />

                            <button type="submit" className='text-white rounded-2xl w-80 h-14 bg-[#205BF1] button-signin'>Sign In</button>
                        </form>

                    </div>
                    <p className='mt-5 text-center text-white opacity-50'>Don't have an account? <NavLink to='/signup' className='text-blue-700  underline'>
                        Sign up</NavLink></p>
                </section>
            </main >
        </>
    )
}

export default SignIn