import React, { useState, useEffect } from 'react'
import { fetchData, searchOptions } from '../api/fetchData'
import { Box, Stack } from '@mui/material'
import Card from './Card.js'
import { Pagination } from '@mui/material';

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

    const paginate = (e, value) => {
        setCurrentPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const clickHandler = async () => {
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
        <div style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center' }}>
            <input type='text' value={city} onChange={(e) => { setCity(e.target.value) }} />
            <button onClick={clickHandler}  >submit</button>
            <h1>{cityName}</h1>
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
        </div>
    )
}

export default Container