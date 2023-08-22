import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from "leaflet"
import IconMap from "../../images/Build/icon.png"
import GeocodingComponent from "./geog"
import "./maps.css"


const Maps = () => {

    const [latitude, setLatitude] = useState(null); // Valore iniziale
    const [longitude, setLongitude] = useState(null); // Valore iniziale

    const indirizzo = "Via vasco de gama N*27, Andrano, Lecce"

    const mark = {
        geocode: [latitude, longitude],
        popUp: "Qui"
    }

    const customIcon = new Icon({
        iconUrl: IconMap,
        iconSize: [38   , 38]
    })

    const handleGeocodingResult = (lat, lon) => {
        setLatitude(lat);
        setLongitude(lon);
    };

    return (<div>
        <GeocodingComponent onGeocodingResult={handleGeocodingResult} indirizzo={indirizzo} />
        {latitude &&
            <MapContainer center={[latitude, longitude]} zoom={16} scrollWheelZoom={false} zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={mark.geocode} icon={customIcon}></Marker>
            </MapContainer>
        }

    </div>
    );
}

export default Maps