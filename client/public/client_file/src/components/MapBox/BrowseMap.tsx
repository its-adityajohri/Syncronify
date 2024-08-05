"use client"

import "./MapBox.css";
import ReactMapGl, { Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import { useState } from "react";
// import pointerIcon from "/pointer.svg";
import getPlaces from './API/getPlaces';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useLocationContext } from "@/context/LocationContext";
// import {location, setLocation, handleLocation} from 

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

function BrowseMap({handleBrowseMap, handleLocationPos}) {

    const [viewport, setViewport] = useState({
        latitude : 26.512339,
        longitude : 80.2329,
        zoom: 15,
    });

    const [marker, setMarker] = useState({
        name:'',
        latitude : 26.512339,
        longitude : 80.2329,
    });

    const handleMarkerDrag = (event) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({name:'', latitude, longitude });
        setViewport((oldViewport) => ({
        ...oldViewport,
        latitude,
        longitude,
        }));
    };

    const handleClick = (event) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({name:'', latitude, longitude });
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
            console.log(marker);
    }

    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const handleOnChange = (event) => {
        setValue(event.target.value);
        handleInputChange(event.target.value);
    }

    const handleInputChange = async (query) => {
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
    };

    const handleSuggestionClick = (suggestion) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        setValue(streetAndNumber);
        setMarker({name:suggestion?.place_name, latitude, longitude});
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
        setSuggestions([]);
    };

    const handleConfirmLocation = (event: any) => {
        const {latitude, longitude}= marker;
        console.log(latitude)
        // const name = marker?.name;
        handleLocationPos({longitude, latitude})
        console.log(marker);
        // event.preventDefault();
        handleBrowseMap(event);

    }


    return (
    <div className="h-full w-full relative">
        <div className='absolute top-2 w-full z-[1] flex flex-col justify-center items-center'>
        <div className=" w-[80%] ">
            <input
            id="address"
            type="text"
            placeholder="Address"
            value={value}
            onChange={handleOnChange}
            className='w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
            />
            <ul className="w-full overflow-hidden rounded-md p-1 align-middle bg-white">
            {suggestions?.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full border-none p-1 border-b-2 border-b-black">
                {suggestion.place_name}
                </li>
            ))}
            </ul>
        </div>
        </div>
    
        <div className="w-full h-full relative">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded z-10 absolute bottom-9 right-9" onClick={handleConfirmLocation}>Confirm Location</button>
            <ReactMapGl
                {...viewport}
                mapboxAccessToken={TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                onMove={(event) => {
                setViewport(event.viewState);
                }}
                onDblClick={handleClick}
            >
                <Marker
                latitude={marker.latitude}
                longitude={marker.longitude}
                draggable={true}
                onDragEnd={handleMarkerDrag}
                >
                <img className="w-[40px] h-[40px] z-30" src="/pointer.svg" alt="pointer" />
                </Marker>
                <GeolocateControl 
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    // auto
                    className="z-[1]"
                />
                <NavigationControl className="z-[1]"/>
            </ReactMapGl>
        </div>
        </ div>
    );
}

export default BrowseMap;