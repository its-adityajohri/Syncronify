"use client"

import "./MapBox.css";
import ReactMapGl, { Marker, GeolocateControl, NavigationControl } from "react-map-gl";
import { useEffect, useState } from "react";
// import pointerIcon from "/pointer.svg";
import getPlaces from './API/getPlaces';
import 'mapbox-gl/dist/mapbox-gl.css'
import { useLocation } from "@/context/LocationContext";
// import {location, setLocation, handleLocation} from 

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

function BrowseMap({handleBrowseMap}) {
    const [viewport, setViewport] = useState({
        latitude : 26.512339,
        longitude : 80.2329,
        zoom: 15,
    });

    const [userLocation, setUserLocation]=useState({
        latitude: viewport.latitude,
        longitude: viewport.longitude,
    })

    useEffect(() => {
            navigator.geolocation.getCurrentPosition(pos => {
                setUserLocation({
                  ...userLocation,
                  longitude: pos.coords.longitude,
                  latitude: pos.coords.latitude,
            });
            setViewport({
                ...viewport,
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude,
          });

            console.log(pos.coords);
            });
        }, []);



    const {location, handleLocation} = useLocation();

    const handleMarkerDrag = (event:any) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setUserLocation({latitude, longitude });
        setViewport((oldViewport) => ({
        ...oldViewport,
        latitude,
        longitude,
        }));
    };

    const handleClick = (event:any) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setUserLocation({latitude, longitude });
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
    }

    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const handleOnChange = (event:any) => {
        setValue(event.target.value);
        handleInputChange(event.target.value);
    }

    const handleInputChange = async (query:any) => {
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
    };

    const handleSuggestionClick = (suggestion:any) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        setValue(streetAndNumber);
        // setUserLocation({latitude, longitude});
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
        setSuggestions([]);
    };

    const handleConfirmLocation = (event: any) => {
        const {latitude, longitude}= userLocation;
        const name=location? location.name:'';
        // setLocation({name, latitude, longitude, selected: true});
        handleLocation({name, latitude, longitude, selected: true});
        console.log("location",location);
        console.log("userLocation",userLocation)
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
                latitude={userLocation.latitude}
                longitude={userLocation.longitude}
                draggable={true}
                onDragEnd={handleMarkerDrag}
                >
                <img className="w-[40px] h-[40px] z-30" src="/icons/pointer.svg" alt="pointer" />
                </Marker>
                <GeolocateControl 
                    positionOptions={{enableHighAccuracy: true}}
                    trackUserLocation={true}
                    // auto
                    // className="z-[1]"
                />
                <NavigationControl/>
            </ReactMapGl>
        </div>
        </ div>
    );
}

export default BrowseMap;