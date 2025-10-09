import { Coords } from '@nearlyapp/common';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

export const QUERY_KEY = () => ['location', 'current'];

async function fetchLocation(): Promise<{ coords: Coords }> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  const location = await Location.getCurrentPositionAsync({});

  return {
    coords: {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      alt: location.coords.altitude ?? null,
    },
  };
}

export default function useLocation() {
  return useQuery({
    queryKey: QUERY_KEY(),
    queryFn: fetchLocation,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
