import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi'
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        mobileNo: '',
        password: '',
    });
    const [accountCreated, setAccountCreated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (accountCreated)
            navigate('/login', { replace: true });

    }, [accountCreated])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // You can send the formData to an API or perform other actions here
        axios.post('https://flat-apartment.onrender.com/signup', formData)
            .then((response) => {
                toast.success('Account created successfully');
                console.log('Account created:', response.data.message);
                setAccountCreated(true);
            })
            .catch((error) => {
                if (error.response.status === 401)
                    toast.error('User Already Exist!! Change Username')

                else
                    toast.error('Error creating account');

                console.error('Error creating account:', error);
            });
    };
    return (
        <>
            <main className='h-screen bg-sign'>
                <section className='bg-gradient h-screen w-screen flex flex-col justify-center align-center'>
                    <h1 className='headline self-center text-[46px] font-[700] not-italic mt-10'>Create Account</h1>
                    <div className='flex flex-col self-center mt-5' >
                        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='name'
                                value={formData.name}
                                placeholder="Full Name"
                                className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                required
                            />
                            <input
                                type="email"
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                placeholder="Email"
                                required
                            />
                            <input
                                type="text"
                                name='username'
                                onChange={handleChange}
                                value={formData.username}
                                placeholder="Username"
                                className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                required
                            />
                            <input
                                type="number"
                                name='mobileNo'
                                onChange={handleChange}
                                value={formData.mobileNo}
                                placeholder="Mobile no."
                                className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                                required
                            />


                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="Password"
                                className='bg-transparent w-80 h-14 border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white '

                                required

                            />

                            <button type="submit" className='text-white rounded-2xl w-80 h-14  bg-[#205BF1] button-signin'>Sign Up</button>
                        </form>

                        <p className='text-center text-white opacity-50'>Already have an account? <NavLink to='/login' className='text-blue-700  underline'>
                            Sign In</NavLink></p>
                    </div>
                </section>
            </main >
        </>
    )
}

export default SignUp