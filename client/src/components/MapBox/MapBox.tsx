"use client"

import "./MapBox.css";
import ReactMapGl, { Marker, FullscreenControl, GeolocateControl, NavigationControl, Source, Layer } from "react-map-gl";
import { useState, useEffect, useRef, SetStateAction } from "react";
import PointerIcon from "./pointer.svg";
import getPath from "./API/getPath";
import getPlaces from './API/getPlaces';

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
    <> 
        <div className='inputBar'>
        <div className="autoCompleteInputContainer">
            <input
            id="address"
            type="text"
            placeholder="Address"
            value={value}
            onChange={handleOnChange}
            className='input'
            />
            <ul className="addressSuggestions">
            {suggestions?.map((suggestion : any, index : number) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion.place_name}
                {/* {suggestion.name} {suggestion.full_address} */}
                </li>
            ))}
            </ul>
        </div>
        </div>
    
        <div className="map-container">
            <button className="button" onClick={() => setTrack(prev => !prev)}>Track</button>
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
            <img className="marker" src={PointerIcon} />
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
                className="geolocate"
            />
            <NavigationControl className="geolocate"/>
            <FullscreenControl className="geolocate"/>
        </ReactMapGl>
        </div>
        </>
    );
}

export default MapboxComponent;