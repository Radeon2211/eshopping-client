import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function useLastLocation() {
  const [lastLocation, setLastLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setLastLocation(currentLocation);
    setCurrentLocation(location);
  }, [location]);

  return lastLocation;
}
