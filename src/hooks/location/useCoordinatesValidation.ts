import { Coords } from '@nearlyapp/common';

export const useCoordinatesValidation = () => {
  const validateCoordinates = (coords?: Coords): boolean => {
    if (!coords) return false;

    const { lat, lng, alt } = coords;

    if (typeof lat !== 'number' || typeof lng !== 'number') return false;

    if (lat === 0 && lng === 0) return false;

    if (lat < -90 || lat > 90) return false;
    if (lng < -180 || lng > 180) return false;

    if (alt !== null && alt !== undefined && typeof alt !== 'number')
      return false;

    return true;
  };

  const getCoordinatesErrorMessage = (coords?: Coords): string | null => {
    if (!coords) return 'Missing coordinates';

    const { lat, lng, alt } = coords;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return 'Invalid coordinates';
    }

    if (lat === 0 && lng === 0) {
      return 'Position not determined';
    }

    if (lat < -90 || lat > 90) {
      return 'Invalid latitude (must be between -90 and 90)';
    }

    if (lng < -180 || lng > 180) {
      return 'Invalid longitude (must be between -180 and 180)';
    }

    if (alt !== null && alt !== undefined && typeof alt !== 'number') {
      return 'Invalid altitude (must be a number)';
    }

    return null;
  };

  return {
    validateCoordinates,
    getCoordinatesErrorMessage,
  };
};

export default useCoordinatesValidation;
