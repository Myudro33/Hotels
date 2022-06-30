import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData, searchOptions } from '../api/fetchData'
import SliderComponent from './SliderComponent'
import { StarOutline } from '@mui/icons-material'
import { Rating } from '@mui/material'
import '../App.css'


const CardDetails = () => {
  const { id } = useParams()
  const [hotelInfo, setHotelInfo] = useState([])
  const [neighborhood, setNeighborhood] = useState([])
  const [transportation, setTransportation] = useState([])
  const [hotelPhotos, setHotelPhotos] = useState([])
  const [roomPhotos, setRoomPhotos] = useState([])
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(`https://hotels4.p.rapidapi.com/properties/get-details?id=${id}`, searchOptions)
      setHotelInfo(prevInfo => [...prevInfo, {
        amenities: data.data.body.amenities,
        hotelSize: data.data.body.atAGlance.keyFacts.hotelSize,
        requiredCheckin: data.data.body.atAGlance.keyFacts.requiredAtCheckIn,
        rating: data.data.body.propertyDescription.starRating,
        hygiene: data.data.body.hygieneAndCleanliness.healthAndSafetyMeasures.measures,
        overview: data.data.body.overview.overviewSections.slice(0, 3),
        adress: data.data.body.propertyDescription.address,
        price: data.data.body.propertyDescription.featuredPrice.currentPrice.formatted,
        hotelName: data.data.body.propertyDescription.name,
        roomTypes: data.data.body.propertyDescription.roomTypeNames
      }])
      setNeighborhood(prevNeigh => [...prevNeigh, {
        description: data.neighborhood?.neighborhoodLongDescription || 'Has no Description yet'
      }])
      setTransportation(prevTrans => [...prevTrans, {
        transportation: data.transportation.transportLocations
      }])
    }
    fetch()
  }, [id])

  useEffect(() => {
    const fetchPhotos = async () => {
      const photos = await fetchData(`https://hotels4.p.rapidapi.com/properties/get-hotel-photos?id=${id}`, searchOptions)
      setHotelPhotos(prevHot => [...prevHot, {
        hotelImages: photos.hotelImages.slice(0, 5)
      }])
      setRoomPhotos(prevRoom => [...prevRoom, {
        roomImages: photos.roomImages[0].images
      }])
    }
    fetchPhotos()
  }, [id])
  console.log(hotelInfo[0]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
          <SliderComponent hotelPhotos={hotelPhotos} roomPhotos={roomPhotos} />
        </div>
        <div style={{ width: '50%',padding:'10px' }}>
          <h1>{hotelInfo[0]?.hotelName}</h1>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> <p>{`${hotelInfo[0]?.adress.cityName||''}/${hotelInfo[0]?.adress.countryName||''}`}</p>
            <Rating
              name="text-feedback"
              value={hotelInfo[0]?.rating || 0}
              readOnly
              precision={0.5}
              emptyIcon={<StarOutline style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          </span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }}>
            {hotelInfo[0]?.hotelSize.map((info) => (
              <p key={Math.random()} style={{ textTransform: 'capitalize' }}>{`${info}`}</p>
            ))}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }}><p>{hotelInfo[0]?.price}</p>
            <p>{hotelInfo[0]?.adress.addressLine1}</p>
          </span>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
               <h1>{hotelInfo[0]?.amenities[0].listItems[0].heading}</h1>
               <ul>
                {hotelInfo[0]?.amenities[0].listItems[0].listItems.map((items)=>(
                  <li>{items}</li>
                ))}
               </ul>
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h1>{hotelInfo[0]?.amenities[0].listItems[1].heading}</h1>
            <ul>
                {hotelInfo[0]?.amenities[0].listItems[1].listItems.map((items)=>(
                  <li>{items}</li>
                ))}
               </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardDetails