// PropertyForm.js

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa'

const Publish = () => {
    const [propertyData, setPropertyData] = useState({
        imageUrl: '',
        title: '',
        location: '',
        type: '',
        price: '',
        contact: ''
    });

    const [imageData, setImageData] = useState(null);
    const [imageName, setImageName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData({
            ...propertyData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64ImageData = e.target.result;
                setImageData(base64ImageData);
                setImageName(file.name)
                setPropertyData({
                    ...propertyData,
                    imageUrl: base64ImageData,
                });
            };

            reader.readAsDataURL(file);
        }
    };
    const handleUpload = () => {
        fileInputRef.current.click();
        console.log("Upload button clicked")
    }


    const handleSubmit = (e) => {
        if (!submitted) {
            e.preventDefault();
            console.log(propertyData); // You can send the propertyData to an API or perform other actions here
            // Add your axios.post request here to handle the property data
            console.log('type', typeof propertyData.price);
            axios.post('https://flat-apartment.onrender.com/property',
                {
                    propertyData: propertyData,
                    username: localStorage.getItem("user"),
                })
                .then((response) => {
                    setSubmitted(true);
                    toast.success('Property published successfully');
                    console.log('Property published:', response.data.message);
                })
                .catch((error) => {
                    toast.error('Error publishing property');
                    console.error('Error publishing property:', error);
                });
        }
        else {
            toast.error('You can Publish for only once try after some time')
        }
    };

    return (
        <>
            <h1 className='headline self-center text-[46px] font-[700] not-italic mt-28'>Publish Your Property</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-7 place-items-center'>
                <input
                    type="text"
                    onChange={handleChange}
                    name='title'
                    value={propertyData.title}
                    placeholder="Property Title"
                    className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                    required
                />

                <select
                    onChange={handleChange}
                    name='location'
                    value={propertyData.location}
                    className='w-80 h-14 border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-gray-400 bg-[#000f30] p-5'
                    required
                >
                    <option value="" disabled>Select Property Location</option>
                    <option value='Kharar'>Kharar</option>
                    <option value='Bhago Majra'>Bhago Majra</option>
                    <option value='Shivjot'>Shivjot</option>
                    <option value='Omega City'>Omega City</option>
                    <option value='Modern Valley'>Modern Valley</option>
                    <option value='GBP Crest'>GBP Crest</option>
                    <option value='Darpan'>Darpan</option>

                    {/* Add more options as needed */}
                </select>

                <select
                    onChange={handleChange}
                    name='type'
                    value={propertyData.type}
                    className='w-80 h-14 bg-[#000f30] border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-gray-400 p-5'
                    required
                >
                    <option value="" disabled>Select Property Type</option>
                    <option value="Flat">Flat</option>
                    <option value="PG">P.G.</option>
                    <option value="House">House</option>

                    {/* Add more options as needed */}
                </select>
                <input
                    type="number"
                    onChange={handleChange}
                    name='price'
                    value={propertyData.price}
                    placeholder="Property Rent"
                    className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                    required
                />
                <div
                    className='flex flex-row justify-between w-80 h-14 bg-transparent border border-gray-500 py-3 rounded-2xl text-gray-400 p-5 '
                    onClick={handleUpload}

                > {imageData ? `Uploaded ${imageName}` : 'Upload Image'}  <span className='text-xl text-gray-600 rounded-lg' >
                        <FaUpload fontSize='inherit' />
                    </span ></div>

                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                    onChange={handleFileChange}
                />
                <input
                    type="number"
                    onChange={handleChange}
                    name='contact'
                    value={propertyData.contact}
                    placeholder="Your Mobile No."
                    className='w-80 h-14 bg-transparent border border-gray-500 focus:border-blue-500 outline-none px-4 py-2 rounded-2xl text-white p-5'
                    required
                />

                <button type="submit" className='text-white rounded-2xl w-80 h-14 bg-[#205BF1] button-signin col-span-full place-self-center'>Publish Property</button>

            </form>
        </>
    );
};

export default Publish;