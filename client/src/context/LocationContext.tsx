import React, { createContext, useContext, useState } from 'react';

type Location = {
  name: string;
  latitude: number;
  longitude: number;
  selected: boolean;
};

type LocationContextData = {
  location: Location;
  setLocation: React.Dispatch<React.SetStateAction<Location>>;
  handleLocation: (event:{name:string; latitude: number; longitude: number, selected: boolean})=>void;
};

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export const LocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<Location>({
    name:'',
    latitude : 26.512339,
    longitude : 80.2329,
    selected: false,
  });

  const handleLocation = (newLocation: Location) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      name: newLocation.name || prevLocation.name,
      latitude: newLocation.latitude,
      longitude: newLocation.longitude,
      selected: newLocation.selected,
    }));
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, handleLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }

  return context;
};