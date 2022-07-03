import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData, searchOptions } from '../api/fetchData'
import SliderComponent from './SliderComponent'
import { StarOutline } from '@mui/icons-material'
import { Rating } from '@mui/material'
import { FcGlobe } from 'react-icons/fc'
import { VscLocation } from 'react-icons/vsc'
import Map from './Map'
import '../App.css'
import Footer from './Footer'
import Navbar from './Navbar'
import { ScrollTo } from "react-scroll-to";
import { ThreeDots } from 'react-loader-spinner'

// <ThreeDots color="#66b178" height={80} width={80} />
const CardDetails = () => {
  const { id } = useParams()
  const [hotelInfo, setHotelInfo] = useState([])
  const [neighborhood, setNeighborhood] = useState([])
  const [transportation, setTransportation] = useState([])
  const [hotelPhotos, setHotelPhotos] = useState([])
  const [roomPhotos, setRoomPhotos] = useState([])
  const [boolean, setBoolean] = useState(true)
  
setTimeout(() => {
  setBoolean(false)
}, 3000);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetchData(`https://hotels4.p.rapidapi.com/properties/get-details?id=${id}`, searchOptions)
      setHotelInfo(prevInfo => [...prevInfo, {
        amenities: data.data.body.amenities,
        hotelSize: data.data.body.atAGlance.keyFacts.hotelSize,
        requiredCheckin: data.data.body.atAGlance.keyFacts.requiredAtCheckIn,
        rating: data.data.body.propertyDescription.starRating,
        hygiene: data.data.body?.hygieneAndCleanliness?.healthAndSafetyMeasures.measures,
        overview: data.data.body.overview.overviewSections.slice(0, 3),
        adress: data.data.body.propertyDescription.address,
        price: data.data.body.propertyDescription.featuredPrice.currentPrice.formatted,
        hotelName: data.data.body.propertyDescription.name,
        roomTypes: data.data.body.propertyDescription.roomTypeNames,
        coordinates: data.data.body.pdpHeader.hotelLocation.coordinates
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
  return (
     <div style={{display:'flex',justifyContent:'center'}}>{boolean?(<ThreeDots color="#66b178" height={80} width={80} />):(<div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
     <div style={{ width: '100%', height: '65px' }} ></div>
     <Navbar />
     <div style={{ display: 'flex', width: '100%' }}>
       <div style={{ width: '50%' }}>
         <SliderComponent hotelPhotos={hotelPhotos} roomPhotos={roomPhotos} />
       </div>
       <div style={{ width: '50%', padding: '10px' }}>
         <h1 style={{fontFamily:'sans-serif'}} >{hotelInfo[0]?.hotelName}</h1>
         <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}> <p>{`${hotelInfo[0]?.adress.cityName || ''}/${hotelInfo[0]?.adress.countryName || ''}`}<FcGlobe /></p>
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
         <span style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", width: '100%' }}><p>{`Price For Night: ${hotelInfo[0]?.price}`}</p>
           <p>{hotelInfo[0]?.adress.addressLine1}
             <ScrollTo>
               {({ scroll }) => (
                 <VscLocation onClick={() => scroll({ x: 0, y: 700, smooth: true })} style={{ color: 'orange', cursor: 'pointer' }} />
               )}
             </ScrollTo>
           </p>
         </span>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }} >
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <h1>{hotelInfo[0]?.amenities[0].listItems[0].heading}</h1>
             <ul>
               {hotelInfo[0]?.amenities[0].listItems[0].listItems.map((items) => (
                 <li key={Math.random()} >{items}</li>
               ))}
             </ul>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <h1>{hotelInfo[0]?.amenities[0].listItems[1].heading}</h1>
             <ul>
               {hotelInfo[0]?.amenities[0].listItems[1].listItems.map((items) => (
                 <li key={Math.random()}>{items}</li>
               ))}
             </ul>
           </div>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }} >
           <div style={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <h1>{hotelInfo[0]?.amenities[0].listItems[2].heading}</h1>
             <ul>
               {hotelInfo[0]?.amenities[0].listItems[2].listItems.map((items) => (
                 <li key={Math.random()}>{items}</li>
               ))}
             </ul>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
             <h1>{hotelInfo[0]?.amenities[0].listItems[5]?.heading}</h1>
             <ul>
               {hotelInfo[0]?.amenities[0].listItems[5]?.listItems.map((items) => (
                 <li key={Math.random()}>{items}</li>
               ))}
             </ul>
           </div>
         </div>
       </div>
     </div>
     <div style={{ width: '100%', display: 'flex', marginTop: '50px',padding:'10px', justifyContent: 'space-between',backgroundColor:'#008137',color:'#fff' }} >
       <div>
         <h1>Hygiene</h1>
         <ul>
           {hotelInfo[0]?.hygiene?.map((item) => (
             <li key={Math.random()}>{item}</li>
           ))}
         </ul>
       </div>
       <div>
         <h1>{hotelInfo[0]?.overview[1].title}</h1>
         <ul>
           {hotelInfo[0]?.overview[1].content.map((item) => (
             <li key={Math.random()}>{item}</li>
           ))}
         </ul>
       </div>
       <div>
         <h1>{hotelInfo[0]?.overview[2].title}</h1>
         <ul>
           {hotelInfo[0]?.overview[2].content.map((item) => (
             <li key={Math.random()}>{item}</li>
           ))}
         </ul>
       </div>
     </div>
     <hr style={{backgroundColor:'#000',width:'90%'}} />
     <div style={{width:'100%',display:'flex',color:'#fff',justifyContent:'space-between', backgroundColor:'#008137',padding:'10px'}} >
       <div style={{width:'40%'}}>
         <h3>Description</h3>
         <p>{neighborhood[0]?.description}</p>
       </div>
       <div>
         <ul>
           {transportation[0]?.transportation[0]?.locations.map((airport)=>(
             <li key={Math.random()}>{`From ${airport?.name} ${airport?.distanceInTime}`}</li>
           ))}
           {transportation[0]?.transportation[1]?.locations.map((station)=>(
             <li key={Math.random()}>{`From ${station?.name} ${station?.distanceInTime}`}</li>
           ))}
         </ul>
       </div>
     </div>
     <div style={{ width: '90%', height: '300px', marginTop: '50px' }}>
       <Map lat={hotelInfo[0]?.coordinates.latitude} lon={hotelInfo[0]?.coordinates.longitude} />
     </div>
     <Footer />
   </div>)}</div>
    
  )
}

export default CardDetails


