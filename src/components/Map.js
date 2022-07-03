import React, { useEffect } from "react";

function Map({lat,lon}){
    useEffect(()=>{
        const ifameData=document.getElementById("iframeId")
        ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
    })
    return(
        <div>
            <iframe   frameBorder={'none'} id="iframeId" height="300px" width="100%"></iframe>
        </div>
    );
}
export default Map;