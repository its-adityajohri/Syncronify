import React, { createContext, useContext, useState } from 'react';

type Location = {
  name: string|null;
};

type LocationPos = {
  latitude: number |null;
  longitude: number |null;
};

type LocationContextData = {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  handleLocation: (event:{name:string})=>void;
  locationPos: LocationPos;
  setLocationPos: React.Dispatch<React.SetStateAction<LocationPos>>;
  handleLocationPos: (event:{latitude:string; longitude:string})=>void;
};


const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export const LocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<Location>({
    name: "",
  });

  const[locationPos, setLocationPos]=useState<LocationPos>({
    latitude: 10.123,
    longitude: 12.546
  })

  const handleLocation = (event: {name:string}) => {
    setLocation({
      name: event.name,
    });
  };
  const handleLocationPos=(event: {latitude:number; longitude:number})=>{
    setLocationPos({
      latitude: event.latitude,
      longitude:event.longitude
    })
  }

  return (
    <LocationContext.Provider value={{ location, setLocation, handleLocation, locationPos, setLocationPos, handleLocationPos}}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }

  return context;
};