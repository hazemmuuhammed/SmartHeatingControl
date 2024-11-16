import {useQuery} from 'react-query';
import fetchTemperatureFromAPI from '../services/mock-api';

export function useTemperature() {
  return useQuery(
    ['temperature'], // Query key
    fetchTemperatureFromAPI, // Query function
    {
      refetchInterval: 5000, // Fetch new data every 5 seconds
      staleTime: 3000, // Data is fresh for 3 seconds
    },
  );
}
