import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {useTemperature} from '../hooks/useTemperature';
import {updateTemperature} from '../helpers/temperatureHelpers';
import {manageTimeout} from '../helpers/timeoutHelpers';
import {renderTemperatureText} from '../helpers/uiHelpers';

const Home = React.memo(() => {
  const {data: fetchedTemperature, isLoading} = useTemperature();
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isManual, setIsManual] = useState(false);
  const manualTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update temperature using helper
  useEffect(() => {
    if (!isManual) {
      setTemperature(updateTemperature(temperature, fetchedTemperature));
    }
  }, [fetchedTemperature, isManual, temperature]);

  // Clean up timeout using helper
  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current !== null) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, []);

  // Memoize slider change handler
  const handleSliderChange = useCallback((value: number) => {
    const roundedValue = Math.round(value);
    setTemperature(prevTemperature => {
      if (prevTemperature === roundedValue) return prevTemperature; // Prevent unnecessary updates
      return roundedValue;
    });
    setIsManual(true);

    // Manage timeout using helper
    manageTimeout(manualTimeoutRef, setIsManual);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.temperatureText}>
        Temperature: {renderTemperatureText(isLoading, temperature)}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={30}
        value={temperature ?? 20}
        onValueChange={handleSliderChange}
        minimumTrackTintColor="red"
        maximumTrackTintColor="blue"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  temperatureText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  slider: {
    width: 200,
    height: 40,
  },
});

export default Home;
