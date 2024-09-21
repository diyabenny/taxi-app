import React from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC2UTgVYWcirXvwstn9wNrZrmw0t8HRU1s';

const RouteMap = ({ origin, destination }) => {
  // Safe checking for nested properties
  const originLoc = origin?.details?.geometry?.location ? {
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  } : null;

  const destinationLoc = destination?.details?.geometry?.location ? {
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  } : null;

  // Check if origin location is valid before rendering the map
  if (!originLoc) {
    return <Text>No origin location found</Text>; // Fallback if origin data is not available
  }

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: originLoc.latitude,
        longitude: originLoc.longitude,
        latitudeDelta: 0.005,  // Smaller delta for closer focus
        longitudeDelta: 0.005,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker
        coordinate={originLoc}
        title={'Origin'}
      />
      <Marker
        coordinate={destinationLoc}
        title={"Destination"}
      />
    </MapView>
  );
};

export default RouteMap;
