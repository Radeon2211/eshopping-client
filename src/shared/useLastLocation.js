import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function useLastLocation() {
  const [lastLocation, setLastLocation] = useState(null);
  const currentLocationRef = useRef(null);
  const setCurrentLocation = (value) => {
    currentLocationRef.current = value;
  };
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setLastLocation(currentLocationRef.current);
      setCurrentLocation(location);
    });
    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return lastLocation;
}
