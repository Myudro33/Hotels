import React, { useState, useEffect } from 'react'
import { fetchData, searchOptions } from '../api/fetchData'
import { Box, Stack } from '@mui/material'
import Card from './Card.js'
import Navbar from './Navbar'
import Footer from './Footer'
import { Pagination } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner'
const Container = () => {
    const [cityName, setCityName] = useState('')
    const [cityId, setCityId] = useState('')
    const [hotels, setHotels] = useState([])
    const [city, setCity] = useState('')
    const [data, setData] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const hotelsPerPage = 9;
    const indexOfLastHotel = currentPage * hotelsPerPage
    const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel)
    const [boolean, setBoolean] = useState(false)
    const paginate = (e, value) => {
        setCurrentPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const clickHandler = async () => {
        setCityName('')
        setHotels([])
        setBoolean(true)
        setTimeout(() => {
            setBoolean(false)
        }, 6000);
        const data = await fetchData(`https://hotels4.p.rapidapi.com/locations/search?query=${city}`, searchOptions)
        setData(data)
        setCity('')
    }
    useEffect(() => {
        if (data !== '') {
            setCityId(data.suggestions[0].entities[0].destinationId)
        }
    }, [data])
    useEffect(() => {
        if (cityId !== '') {
            setHotels([])
            const getCity = async () => {
                const city = await fetchData(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${cityId}&pageNumber=1&pageSize=20&checkIn=2020-01-08&checkOut=2020-01-15&adults1=1`, searchOptions)
                setCityName(city.data.body.header)
                city.data.body.searchResults.results.map((hotel) => {
                    setHotels(prevHot => [...prevHot, { coordinates: hotel.coordinate, id: hotel.id, name: hotel.name, rating: hotel.starRating, countryName: hotel.address.countryName, locality: hotel.address.locality, streetAddress: hotel.address.streetAddress, thumbnail: hotel.optimizedThumbUrls?.srpDesktop, price: hotel.ratePlan?.price.current || 'Not Specified' }])
                })
            }
            getCity()
        }
    }, [cityId])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '65px' }}></div>
            <Navbar />
            <div style={{ width: '100%', height: '400px' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://www.gpih.ge/files/img/img-20-17-13950720.png' alt='img' />
                <h1 style={{ position: 'relative', bottom: 300, left: 20, color: '#66b178', fontSize: '40px', fontFamily: 'monospace' }} >"The world is a book and those who do not travel read only one page"</h1>
                <h1 style={{ position: 'relative', bottom: 270, left: 1250, color: '#fff' }}> ~ Saint Augustine</h1>
            </div>
            <div style={{ display: 'flex', margin: '50px' }}>
                <input style={{ width: '700px', height: '50px', borderRadius: '10px', outline: 'none', border: '1px solid #66b178', fontSize: "20px", padding: '5px', textTransform: 'capitalize' }} placeholder='Search Your Next Destination...' type='text' value={city} onChange={(e) => { setCity(e.target.value) }} />
                <button style={{ width: '150px', borderRadius: '10px', border: 'none', backgroundColor: '#66b178', color: '#fff', fontSize: '20px', cursor: 'pointer' }} onClick={clickHandler}   >Search</button>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}} >{boolean ? (<ThreeDots color="#66b178" height={80} width={80} />) : (<>
                <h1 style={{ margin: "20px", color: '#66b178', fontSize: '40px',display:'flex',justifyContent:'center' }}>{cityName}</h1>
                <Box sx={{ width: '90%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    {currentHotels?.map((hotel, index) => (<Card hotel={hotel} key={index} />))}
                </Box>
                <Stack mt='100px' alignItems='center'>
                    {hotels.length > 9 && (
                        <Pagination shape='rounded'
                            defaultPage={currentPage}
                            count={Math.ceil(hotels.length / hotelsPerPage)}
                            page={currentPage}
                            onChange={paginate}
                            size='large'
                        />
                    )}
                </Stack>
            </>)}</div>
            <Footer />
        </div>
    )
}

export default Container