import React, { useState, useEffect } from 'react';
import Nominatim from 'nominatim-geocoder';

function GeocodingComponent({onGeocodingResult, indirizzo}) {

    
    useEffect(() => {
        if (indirizzo) {
          handleSearch();
        }
      }, [indirizzo]);

  const handleSearch = async () => {
    try {
      const geocoder = new Nominatim();
      const response = await geocoder.search({ q: indirizzo });

      if (response && response.length > 0) {
        const firstResult = response[0];
        const lat = parseFloat(firstResult.lat);
        const lon = parseFloat(firstResult.lon);
        onGeocodingResult(lat, lon);
      } else {
        onGeocodingResult("", "");
      }
    } catch (error) {
      console.error('Error fetching geocoding data', error);
    }
  };

  return (
    <div>
      
    </div>
  );
}

export default GeocodingComponent;