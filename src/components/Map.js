import React, { useEffect, useRef } from 'react';

const Map = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (address) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBTXnYgtldybZVv51t5WhfRLB5CnzfPTWU&callback=initMap`;
      script.defer = true;
      script.async = true;
      document.body.appendChild(script);

      window.initMap = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === 'OK') {
            const map = new window.google.maps.Map(mapRef.current, {
              center: results[0].geometry.location,
              zoom: 16,
            });
             new window.google.maps.Marker({
              map,
              position: results[0].geometry.location,
            });
          } else {
            console.log('Geocode was not successful for the following reason:', status);
          }
        });
      };
    }
  }, [address]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};

export default Map;
