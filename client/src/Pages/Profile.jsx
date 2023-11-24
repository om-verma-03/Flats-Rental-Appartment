import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Badge, Image, Grid, GridItem, ScaleFade, Button } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

import { toast } from 'react-toastify'
function Profile() {
    const [propertyList, setPropertyList] = useState([]);
    const [deleted, setDeleted] = useState(false)
    useEffect(() => {
        axios.post('https://flat-apartment.onrender.com/property/getById', {
            username: localStorage.getItem("user"),
        },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => {
                console.log('here is response', res.data.propertyList);
                setPropertyList(res.data.propertyList);
            }).catch(
                err => {
                    console.error('Error fetching Data:', err);
                    toast.error("There is some problem in fetching data check your internet connection!!")

                }
            )

    }, [deleted])

    const handleDelete = (id = 0) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this?');

        if (confirmDelete) {
            // Perform the delete operation
            console.log('Item deleted');
            // Add your delete logic here
        } else {
            // User clicked Cancel or No
            console.log('Delete canceled');
        }
        if (id === 0) {
            console.log('some error occured!')
        }
        else {
            axios.post('https://flat-apartment.onrender.com/property/deleteById', {
                id: id,
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            ).then(res => {
                console.log('here is response', res.data);
                setPropertyList(res.data.propertyList);
                setDeleted(true);
                toast.success("successfully deleted")
            }).catch(
                err => {
                    console.error('Error fetching Data:', err);
                    toast.error("There is some problem deleting property check your internet connection!!")

                }
            )
            console.log('called')
        }
    };

    if (propertyList.length === 0) {
        return (
            <h1 className='headline self-center text-[46px] font-[700] not-italic mt-28'>You have no properties Listed!</h1>

        )
    }
    return (
        <div className='mt-28 flex flex-col items-center justify-center '>
            <h1 className='headline self-center text-[46px] font-[700] not-italic'>Your Properties</h1>
            <Grid templateColumns='repeat(4, 1fr)' gap={6} mt='10'>
                {propertyList.map((property, index) => {
                    return (

                        <GridItem key={property.id}>
                            <ScaleFade initialScale={0.5} in={true}>
                                <Box maxW='350px' borderWidth='1px' borderRadius='lg' overflow='hidden' className='bg-cyan-950'>
                                    <Image src={property.imageUrl} alt={property.imageAlt} className='h-60' />

                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                New
                                            </Badge>
                                            <Box
                                                color='gray.500'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='xs'
                                                textTransform='uppercase'
                                                ml='2'
                                            >
                                                {property.location}
                                            </Box>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={1}
                                        >
                                            {property.title}
                                        </Box>

                                        <Box>
                                            {property.price}
                                            <Box as='span' color='gray.600' fontSize='sm'>
                                                / month
                                            </Box>
                                        </Box>

                                        <Box display='flex' mt='2' alignItems='center'>
                                            {Array(5)
                                                .fill('')
                                                .map((_, i) => (
                                                    <StarIcon
                                                        key={i}
                                                        color={i < property.rating ? 'teal.500' : 'gray.300'}
                                                    />
                                                ))}
                                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                {property.reviewCount} ratings
                                            </Box>
                                        </Box>
                                        <span onClick={() => handleDelete(property.id)} ><Button colorScheme='teal' size='xs'>Delete</Button></span>
                                    </Box>
                                </Box>
                            </ScaleFade >
                        </GridItem>

                    )
                })}
            </Grid >
        </div>
    )
}

export default Profile
