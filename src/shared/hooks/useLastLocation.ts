import { useEffect, useState } from 'react';
import { useLocation, Location } from 'react-router-dom';

export default function useLastLocation() {
  const [lastLocation, setLastLocation] = useState<Location>();
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const location = useLocation();

  useEffect(() => {
    setLastLocation(currentLocation);
    setCurrentLocation(location);
  }, [location]);

  return lastLocation;
}
