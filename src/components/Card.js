import React from 'react'
import { Box, Typography, Button, Rating } from '@mui/material';
import { StarOutline } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const Card = ({ hotel }) => {
  return (
    <Link style={{textDecoration:'none',color:'#000'}} to={`/hotels/${hotel.id}`}>
      <Box sx={{ width: { lg: '400px', xs: '90%' }, height: '450px', margin: '20px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px' }} >
        <img style={{ width: "100%", height: '50%', borderRadius: '10px', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', objectFit: 'cover' }} src={hotel.thumbnail} alt={`picture not specified ${hotel.name}`} />
        <span style={{ display: 'flex', justifyContent: 'space-between',padding:'5px' }}> <Typography textTransform='capitalize' variant='h5'>{hotel.name}</Typography>
          <Typography variant='h5'>{`${hotel.locality}/${hotel.countryName}`}</Typography></span>
        <span style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}><p>{`Night for Person: ${hotel.price}`}</p><p style={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            name="text-feedback"
            value={hotel.rating}
            readOnly
            precision={0.5}
            emptyIcon={<StarOutline style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
        </p></span>
        <span style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}><p>{`Address: ${hotel.streetAddress}`}</p> <p>{`Hotel Id: ${hotel.id}`}</p> </span>
        <Box sx={{ display: 'flex', justifyContent: 'center' }} ></Box>
      </Box >
    </Link>
  )
}

export default Card