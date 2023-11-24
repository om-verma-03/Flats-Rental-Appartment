import React from 'react'
import { Box, Badge, Image, ScaleFade } from '@chakra-ui/react'
import { useLocation, Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import { StarIcon } from '@chakra-ui/icons'
import ReviewsPage from './ReviewsPage'
function PropertyDetail() {
    const location = useLocation();
    //Optional Chaining 
    const search = location.state?.search || "";
    const property = location.state?.currentHome;
    return (
        <>

            <div className='w-full h-screen flex justify-center items-center '>
                <ScaleFade initialScale={0.4} in={true}>
                    <Link
                        to={`..${search}`}
                        relative="path"
                        className="back-button hover:text-slate-600"
                    >&larr; <span>Back</span></Link>
                    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' className=' bg-cyan-950 relative flex flex-row max-w-[1400px]'>

                        <Image src={property.imageUrl} alt={property.imageAlt} className='max-w-[70%] max-h-[500px]' />
                        <Box p='6' className='flex flex-col'>
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
                                    {property.location} location
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
                            <Box className='justify-self-end h-full '><ReviewsPage /></Box>
                        </Box>
                        <Link
                            to={`..${search}`}
                            relative="path"
                            className='absolute top-0 right-0'
                        >
                            <span className=' text-3xl text-white hover:cursor-pointer ' ><AiOutlineClose /></span>
                        </Link>
                    </Box>
                </ScaleFade>
            </div>
        </>
    )
}

export default PropertyDetail