"use client"

import "./MapBox.css";
import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl, Source, Layer } from "react-map-gl";
import { useState, useEffect, useRef, SetStateAction } from "react";
// import PointerIcon from "/pointer.svg";
import getPath from "./API/getPath";
import getPlaces from './API/getPlaces';
import 'mapbox-gl/dist/mapbox-gl.css'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';



function MapboxComponent({ longitude = 80.2329, latitude = 26.512339 }) {
    const [viewport, setViewport] = useState({
        latitude,
        longitude,
        zoom: 15,
    });

    const [marker, setMarker] = useState({
        latitude,
        longitude,
    });



    const [path, setPath] = useState([]);
    const [ userLocation, setUserLocation ] = useState({latitude: 26.512339, longitude: 80.2329});
    const [ track, setTrack ] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setUserLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        });
        });
    }, []);

    useEffect(() => {
        setMarker({latitude, longitude});
        setViewport((oldViewport) => ({
        ...oldViewport,
        latitude,
        longitude,
        }));
    }, [Marker, longitude, latitude]);

    const handleMarkerDrag = (event: { lngLat: { lat: any; lng: any; }; }) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({ latitude, longitude });
        console.log(event);
        // updateCoordinates(latitude, longitude);
        setViewport((oldViewport) => ({
        ...oldViewport,
        latitude,
        longitude,
        }));
    };

    const handleClick = (event: { lngLat: { lat: any; lng: any; }; }) => {
        const latitude = event.lngLat.lat;
        const longitude = event.lngLat.lng;
        setMarker({ latitude, longitude });
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
    }

    useEffect(() => {
        const getPathFunc = async () => {
            const start = {
                lat: userLocation.latitude,
                long: userLocation.longitude,
            };
            const end = {
                lat: marker.latitude,
                long: marker.longitude,
            };
            const coord = await getPath(start, end);
            setPath(coord);
            console.log(path);
        }
        getPathFunc();
    }, [marker]);

    const geojson = {
        type: "FeatureCollection",
        features: [
        {
            type: "Feature",
            geometry: {
            type: "LineString",
            coordinates:path,
            },
            properties: {},
        },
        ],
    };

    const lineStyle= {
        id: "roadLayer",
        type: "line",
        layout: {
            "line-join": "round",
            "line-cap": "round",
        },
        paint: {
            "line-color": "blue",
            "line-width": 4,
            "line-opacity": 0.8,
        },
    };




    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');

    const handleOnChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setValue(event.target.value);
        handleInputChange(event.target.value);
    }

    const handleInputChange = async (query: any) => {
        const suggesions = await getPlaces(query);
        setSuggestions(suggesions);
    };

    const handleSuggestionClick = (suggestion: any) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        // const address = {
        //     streetAndNumber,
        //     place: "",
        //     region: "",
        //     postcode: "",
        //     country: "",
        //     latitude,
        //     longitude,
        //     };

        // suggestion.context.forEach((element: { id: string; text: any; }) => {
        //     const identifier = element.id.split(".")[0];
        //     address[identifier] = element.text;
        // });

        // console.log(address.longitude, address.latitude);
        // console.log(address);

        setValue(streetAndNumber);
        setMarker({latitude, longitude});
        setViewport((oldViewport) => ({
            ...oldViewport,
            latitude,
            longitude,
            }));
        setSuggestions([]);
    };




    return (
    <div className="h-full w-full relative z-20"> 
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
            {suggestions?.map((suggestion : any, index : number) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full border-none p-1 border-b-2 border-b-black">
                {suggestion.place_name}
                {/* {suggestion.name} {suggestion.full_address} */}
                </li>
            ))}
            </ul>
        </div>
        </div>
    
        <div className="w-full h-full relative">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded z-10 absolute bottom-9 right-9" onClick={() => setTrack(prev => !prev)}>Track</button>
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
            <img className="w-[40px] h-[40px] z-30" src="/pointer.svg" />
            </Marker>
            {track &&  <Source
                id="routeSource"
                type="geojson"
                data={geojson}
            >
                <Layer 
                    id= "roadLayer"
                    type= "line"
                    layout= {{
                        "line-join": "round",
                        "line-cap": "round",
                    }}
                    paint = {{
                        "line-color": "blue",
                        "line-width": 4,
                        "line-opacity": 0.8,
                    }}
                />
            </Source>}
            <GeolocateControl 
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
                auto
                className="z-[1]"
            />
            <NavigationControl className="z-[1]"/>
            <FullscreenControl className="z-[1]"/>
        </ReactMapGl>
        </div>
        </ div>
    );
}

export default MapboxComponent;