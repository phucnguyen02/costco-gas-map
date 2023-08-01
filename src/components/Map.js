import React, {useState, useContext} from 'react'
import GoogleMapReact from 'google-map-react'
import LocationInfoBox from './LocationInfoBox';
import { RegularContext } from './RegularContext';
import './Map.css'

function Map({coords}) {
    const [locationInfo, setLocationInfo] = useState(null);
    const { isRegular } = useContext(RegularContext);
    let infoWindow;
    const renderMarkers = (map, maps) => {
        let markers = [];
        coords.forEach((elem) => {
            let marker = new maps.Marker({
                position: { lat: elem.position.lat, lng: elem.position.lng },
                map
            });

            marker.addListener("click", () => {
                let content = document.createElement("div");

                let ul = document.createElement("ul");
                content.append(ul);

                let address = document.createElement("li");
                address.innerHTML = "Address: <strong>" + elem.name + "</strong>";
                ul.append(address);

                let priceLI = document.createElement("li");
                let price = JSON.parse(localStorage.getItem("regular")) ? elem.regular_gas : elem.premium_gas;
                priceLI.innerHTML = "Price: <strong>" + price + "</strong>";
                ul.append(priceLI);

                if(infoWindow) infoWindow.close();
                infoWindow = new maps.InfoWindow({
                    content: content
                })
                infoWindow.open(map, marker)
            })
            markers.push(marker);
        })
        return markers;
    };


    return (
        <div className='map'>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter = { {lat: 33.352235, lng: -117.943683} }
                defaultZoom = { 10.5 }
                onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
            >
            </GoogleMapReact>
        </div>
    ) 
}

export default Map