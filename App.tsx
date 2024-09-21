import React, { useEffect } from 'react';
import { StatusBar, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Router from './src/navigation/root'
navigator.geolocation = require('@react-native-community/geolocation');
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Current location:', position.coords);
      },
      (error) => {
        console.log('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission(); // Request location permission for Android
    } else {
      Geolocation.requestAuthorization(); // Request location permission for iOS
      getCurrentLocation(); // Get current location for iOS
    }
  }, []);

  return (
    <>
     <Router/>
    </>
  );
}

export default App;
