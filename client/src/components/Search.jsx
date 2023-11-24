import React, { useState } from 'react'
import { Select, Box, Flex } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux'
import { setRentFilter, clearRentFilter } from '../redux/features/rentSlice.js'

function Search({ onSearch }) {

    const [formData, setFormData] = useState({
        location: '',
        type: '',
        price: '',
    });
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSearch = () => {
        //Setting Form data into redux container

        dispatch(setRentFilter({ location: formData.location, type: formData.type, price: formData.price }));
        onSearch(formData);
        // console.log(formData);
    };
    return (
        <Box>
            <Flex >
                <Select
                    placeholder='Location'
                    size='lg'
                    w='30%'
                    name="location"
                    mb={2}
                    value={formData.location}
                    onChange={handleChange}

                >
                    <option value='Kharar'>Kharar</option>
                    <option value='Bhago Majra'>Bhago Majra</option>
                    <option value='Shivjot'>Shivjot</option>
                    <option value='Omega City'>Omega City</option>
                    <option value='Modern Valley'>Modern Valley</option>
                    <option value='GBP Crest'>GBP Crest</option>
                    <option value='Darpan'>Darpan</option>
                </Select>
                <Select
                    placeholder='Type'
                    size='lg'
                    w='30%'
                    name="type"
                    mb={2}
                    value={formData.type}
                    onChange={handleChange}

                >
                    <option value='PG'>P.G.</option>
                    <option value='Flat'>Flat</option>

                </Select>
                <Select
                    placeholder='Price'
                    size='lg'
                    w='30%'
                    name="price"
                    mb={2}
                    value={formData.price}
                    onChange={handleChange}

                >
                    <option value='5000'>&lt;5000</option>
                    <option value='6000'>&lt;6000</option>
                    <option value='7000'>&lt;7000</option>
                    <option value='8000'>&lt;8000</option>
                    <option value='10000'>&lt;10000</option>
                    <option value='15000'>&lt;15000</option>
                    <option value='20000'>&lt;20000</option>
                    <option value='25000'>&lt;25000</option>
                </Select>
                <IconButton onClick={handleSearch} aria-label='Search database' size='lg' icon={<SearchIcon />} />
            </Flex>
        </Box >
    )
}

export default Search