import { Coords } from '@nearlyapp/common';
import { useQuery } from '@tanstack/react-query';
import * as Location from 'expo-location';

export const QUERY_KEY = () => ['location', 'current'];

interface ILocationData {
  coords: Coords;
}

async function fetchLocation(): Promise<ILocationData> {
  try {
    const isEnabled = await Location.hasServicesEnabledAsync();
    if (!isEnabled) {
      throw new Error('Location services are disabled on this device');
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Access to location refused');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    if (
      !location.coords ||
      typeof location.coords.latitude !== 'number' ||
      typeof location.coords.longitude !== 'number'
    ) {
      throw new Error('Invalid coordinates');
    }

    return {
      coords: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        alt: location.coords.altitude ?? null,
      },
    };
  } catch (error) {
    console.error('Location fetch failed', error);
    throw error;
  }
}

export default function useLocation() {
  return useQuery<ILocationData, Error>({
    queryKey: QUERY_KEY(),
    queryFn: fetchLocation,
    retry: (count, error) => {
      if (error.message.includes('refused')) {
        return false;
      }
      return count < 3;
    },
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
