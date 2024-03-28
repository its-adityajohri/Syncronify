import React, { createContext, useContext, useState } from 'react';

type Location = {
  name: string|null;
  latitude: number;
  longitude: number;
};

type LocationContextData = {
  location: Location | null;
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>;
  handleLocation: (event:{name:string|null; latitude: number; longitude: number})=>void;
};

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export const LocationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);

  const handleLocation = (event: {name:string|null; latitude: number; longitude: number }) => {
    setLocation({
      ...location,
      name: event.name||location?.name || '',
      latitude: event.latitude,
      longitude: event.longitude,
    });
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, handleLocation }}>
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