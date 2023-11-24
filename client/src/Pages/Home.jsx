import React from 'react'
import VectorImage from '../assets/HomeVector.png'
import Navbar from './Navbar'
import Box from '../components/Box'
import { data } from 'autoprefixer'
import Dropdown from '../components/Dropdown'
function Home() {

    const customerData = [{
        id: 1,
        url: './box1.png',
        headline: '100+ Reviews',
        detail: 'Reviews which makes your decision better.'
    },
    {
        id: 2,
        url: './box2.png',
        headline: 'Customer Service',
        detail: 'Personalize Customer Service for all your needs.'
    },
    {
        id: 3,
        url: './box3.png',
        headline: 'Easy Payments',
        detail: 'With Payment Interface you can easily make payments done.'
    }
    ]

    return (
        <div className='home min-h-screen flex flex-col align-center'>
            <div className='home-grid flex flex-col items-center object-cover grow'>
                <div className='home-bg-image absolute top-36 left-32'>
                    <div className='text-2xl font-jost text-[50px] leading-[50px] ml-20 font-semibold'>Find <br /> <span className='home__newHome'>New Home</span><br /> Like Never<br /> Before</div>
                </div>

            </div>

            <img className='absolute bottom-0 w-full' src={VectorImage} alt="Vector Image" />
            <div className='relative right-0 flex flex-col gap-3 z-[3] w-full items-end'>
                {customerData.map((data) => {
                    // console.log(data)
                    return (
                        <Box id={data.id} url={data.url} headline={data.headline} detail={data.detail} />
                    )
                })}
            </div>
        </div>
    )
}

export default Home