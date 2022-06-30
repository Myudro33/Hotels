import React,{useEffect, useState} from 'react'
import Slider from "react-slick";

const SliderComponent = ({roomPhotos,hotelPhotos}) => {
  const [imgUrl, setImgUrl] = useState([])
  useEffect(()=>{
      if(roomPhotos.length>0){
        for(let i = 0;i<roomPhotos[0].roomImages.length;i++){
          const sliced = roomPhotos[0].roomImages[i].baseUrl.slice(0,roomPhotos[0].roomImages[i].baseUrl.length-11)
          setImgUrl(prevUrl=>[...prevUrl,{
            sliced
          }])
        }
        for(let i = 0;i<hotelPhotos[0].hotelImages.length;i++){
          const sliced = hotelPhotos[0].hotelImages[i].baseUrl.slice(0,hotelPhotos[0].hotelImages[i].baseUrl.length-11)
          setImgUrl(prevUrl=>[...prevUrl,{
            sliced
          }])
        }
      }
  },[roomPhotos])



  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
    {imgUrl?.map((photo) => (
      <div key={Math.random()}>
        <img style={{objectFit:'cover'}} height={500} width='100%' alt='img not exist' src={`${photo.sliced}.jpg`} />
      </div>
    ))}
  </Slider>
  )
}

export default SliderComponent