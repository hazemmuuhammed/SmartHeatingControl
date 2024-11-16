import {ActivityIndicator} from 'react-native';

// Function to render the activity indicator or temperature text
export const renderTemperatureText = (
  isLoading: boolean,
  temperature: number | null,
) => {
  if (isLoading || temperature === null) {
    return <ActivityIndicator />;
  }
  return `${temperature}°C`;
};
