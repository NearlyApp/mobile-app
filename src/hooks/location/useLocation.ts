import { Coords } from '@nearlyapp/common';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';

export const QUERY_KEY = () => ['location', 'current'];

export type PermissionStatus =
  | 'undetermined' // Jamais demandé
  | 'denied' // Refusé mais redemandable
  | 'denied_permanently' // Refusé définitivement (doit aller dans les paramètres)
  | 'granted'; // Accordé

interface ILocationData {
  coords: Coords;
}

interface ILocationState {
  permissionStatus: PermissionStatus;
  servicesEnabled: boolean;
}

async function getPermissionStatus(): Promise<ILocationState> {
  const servicesEnabled = await Location.hasServicesEnabledAsync();
  const { status, canAskAgain } =
    await Location.getForegroundPermissionsAsync();

  let permissionStatus: PermissionStatus;

  if (status === 'granted') {
    permissionStatus = 'granted';
  } else if (status === 'denied' && !canAskAgain) {
    permissionStatus = 'denied_permanently';
  } else if (status === 'denied') {
    permissionStatus = 'denied';
  } else {
    permissionStatus = 'undetermined';
  }

  return { permissionStatus, servicesEnabled };
}

async function requestPermission(): Promise<PermissionStatus> {
  const { status, canAskAgain } =
    await Location.requestForegroundPermissionsAsync();

  if (status === 'granted') {
    return 'granted';
  } else if (!canAskAgain) {
    return 'denied_permanently';
  } else {
    return 'denied';
  }
}

async function fetchLocation(): Promise<ILocationData> {
  // 1. Vérifier si les services de localisation sont activés
  const servicesEnabled = await Location.hasServicesEnabledAsync();
  if (!servicesEnabled) {
    throw new LocationError(
      'services_disabled',
      'Les services de localisation sont désactivés sur cet appareil',
    );
  }

  // 2. Vérifier le statut actuel des permissions
  const { status, canAskAgain } =
    await Location.getForegroundPermissionsAsync();

  // 3. Si pas encore accordé, demander la permission
  if (status !== 'granted') {
    const result = await Location.requestForegroundPermissionsAsync();

    if (result.status !== 'granted') {
      if (!result.canAskAgain) {
        throw new LocationError(
          'permission_denied_permanently',
          'Accès à la localisation refusé définitivement',
        );
      }
      throw new LocationError(
        'permission_denied',
        'Accès à la localisation refusé',
      );
    }
  }

  // 4. Essayer d'obtenir la position actuelle
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
      mayShowUserSettingsDialog: true,
    });

    if (
      !location.coords ||
      typeof location.coords.latitude !== 'number' ||
      typeof location.coords.longitude !== 'number'
    ) {
      throw new LocationError('invalid_coords', 'Coordonnées invalides');
    }

    return {
      coords: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        alt: location.coords.altitude ?? null,
      },
    };
  } catch (error) {
    // 5. Fallback: essayer la dernière position connue
    const lastKnown = await Location.getLastKnownPositionAsync();

    if (
      lastKnown?.coords &&
      typeof lastKnown.coords.latitude === 'number' &&
      typeof lastKnown.coords.longitude === 'number'
    ) {
      console.log('Using last known position as fallback');
      return {
        coords: {
          lat: lastKnown.coords.latitude,
          lng: lastKnown.coords.longitude,
          alt: lastKnown.coords.altitude ?? null,
        },
      };
    }

    // Si c'est déjà une LocationError, la propager
    if (error instanceof LocationError) {
      throw error;
    }

    throw new LocationError(
      'fetch_failed',
      'Impossible de récupérer la position',
    );
  }
}

export class LocationError extends Error {
  code:
    | 'services_disabled'
    | 'permission_denied'
    | 'permission_denied_permanently'
    | 'invalid_coords'
    | 'fetch_failed';

  constructor(
    code: LocationError['code'],
    message: string,
  ) {
    super(message);
    this.code = code;
    this.name = 'LocationError';
  }

  get canRetry(): boolean {
    return this.code !== 'permission_denied_permanently';
  }

  get shouldOpenSettings(): boolean {
    return (
      this.code === 'permission_denied_permanently' ||
      this.code === 'services_disabled'
    );
  }
}

export function openLocationSettings() {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
}

export default function useLocation() {
  const queryClient = useQueryClient();
  const [permissionState, setPermissionState] = useState<ILocationState>({
    permissionStatus: 'undetermined',
    servicesEnabled: true,
  });

  // Vérifier le statut des permissions au montage
  useEffect(() => {
    getPermissionStatus().then(setPermissionState);
  }, []);

  const query = useQuery<ILocationData, LocationError>({
    queryKey: QUERY_KEY(),
    queryFn: fetchLocation,
    retry: (count, error) => {
      // Ne pas réessayer si permission refusée définitivement
      if (error instanceof LocationError && !error.canRetry) {
        return false;
      }
      return count < 2;
    },
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  // Mettre à jour le statut des permissions après une erreur
  useEffect(() => {
    if (query.error) {
      getPermissionStatus().then(setPermissionState);
    }
  }, [query.error]);

  const requestPermissionAndRefetch = useCallback(async () => {
    const currentStatus = await getPermissionStatus();

    if (currentStatus.permissionStatus === 'denied_permanently') {
      Alert.alert(
        'Permission requise',
        'La permission de localisation a été refusée. Veuillez l\'activer dans les paramètres de l\'application.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Ouvrir les paramètres', onPress: openLocationSettings },
        ],
      );
      return;
    }

    if (!currentStatus.servicesEnabled) {
      Alert.alert(
        'Localisation désactivée',
        'Les services de localisation sont désactivés sur votre appareil. Veuillez les activer dans les paramètres.',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Ouvrir les paramètres', onPress: openLocationSettings },
        ],
      );
      return;
    }

    if (currentStatus.permissionStatus !== 'granted') {
      const newStatus = await requestPermission();
      setPermissionState((prev) => ({ ...prev, permissionStatus: newStatus }));

      if (newStatus === 'denied_permanently') {
        Alert.alert(
          'Permission requise',
          'La permission de localisation a été refusée. Veuillez l\'activer dans les paramètres de l\'application.',
          [
            { text: 'Annuler', style: 'cancel' },
            { text: 'Ouvrir les paramètres', onPress: openLocationSettings },
          ],
        );
        return;
      }
    }

    // Invalider le cache et refetch
    queryClient.invalidateQueries({ queryKey: QUERY_KEY() });
  }, [queryClient]);

  return {
    ...query,
    permissionStatus: permissionState.permissionStatus,
    servicesEnabled: permissionState.servicesEnabled,
    requestPermissionAndRefetch,
    openSettings: openLocationSettings,
  };
}
