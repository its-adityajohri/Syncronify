"use client"

import React, {useEffect, useState, useRef} from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapBox.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const MapboxComponent = ({longitude='', latitude='', description=''}) => {
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(15);

    const [userPosition, setUserPosition] = useState(undefined);
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserPosition([pos.coords.longitude, pos.coords.latitude]);
            });
        }, []);

    const [IITKPosition] = useState([80.2329,26.512339]);

    const geojson = {
            'type': 'FeatureCollection',
            'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': longitude && latitude ? [longitude, latitude] : userPosition || IITKPosition 
                },
                'properties': {
                    'title': 'IIT Kanpur',
                    'description': description ? description : userPosition? 'Your Location' : 'IIT Kanpur'
                }
            }
        ]};

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: longitude && latitude ? [longitude, latitude] : userPosition || IITKPosition,
            zoom: zoom
        });

        // Add our navigation control (the +/- zoom buttons)
        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
        // Map onload event 
        map.current.on("load", ()=> {
            // Nifty code to force map to fit inside container when it loads
            map.current.resize();
    
        })


        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
            // make a marker for each feature and add it to the map
            new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
            )
            .addTo(map.current);
            }

        // Clean up on unmount
        return () => map.current.remove();
        }, [longitude, latitude, zoom, userPosition]);

    return (
        <div className='map-container h-[100vh] v-full' ref={mapContainerRef} />
    );
};

export default MapboxComponent;