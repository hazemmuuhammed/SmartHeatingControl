// Mock API function
const fetchTemperatureFromAPI = async (): Promise<number> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockTemperature = Math.floor(Math.random() * 21) + 10; // Random value between 10 and 30
      resolve(mockTemperature);
    }, 1000); // Simulate 1 second network delay
  });
};

export default fetchTemperatureFromAPI;
