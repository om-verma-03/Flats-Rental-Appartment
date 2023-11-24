import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import Search from '../components/Search.jsx'
function Rent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(null);
    const [toggleSearch, setToggleSearch] = useState(true);

    const handleSearch = (formData) => {
        // setSearchParams({ location: formData.location });
        // setSearchParams({ price: formData.price });
        // setSearchParams({ type: formData.type });
        setSearchParams(formData);

        console.log('search params is ', searchParams.get('price'))
        setSearch();
    };

    return (
        <div className='mt-32 flex flex-col items-center'>
            <Search onSearch={handleSearch} />
            <div className='mt-10' onClick={() => setToggleSearch(!toggleSearch)}><PropertyCard /></div>
        </div>
    )
}

export default Rent