// Function to update temperature only if it has changed
export const updateTemperature = (
  currentTemperature: number | null,
  fetchedTemperature: number | undefined,
) => {
  if (
    fetchedTemperature !== undefined &&
    fetchedTemperature !== currentTemperature
  ) {
    return fetchedTemperature;
  }
  return currentTemperature;
};
