import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export interface GoogleMapsScreenProps {
  onLocationSelected: (location: { latitude: number; longitude: number }) => void;
  mapHeight?: number; 
  initialLocation?: { latitude: number; longitude: number }; 
}

const GoogleMapsScreen: React.FC<GoogleMapsScreenProps> = ({
  onLocationSelected,
  mapHeight = 300,
  initialLocation,
}) => {
  const defaultLocation = { latitude: 6.247972053240134, longitude: -75.55811494588852};
  const [markerPosition, setMarkerPosition] = React.useState(
    initialLocation || defaultLocation
  );

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  const handleMarkerDragEnd = (event: any) => {
    const newLocation = event.nativeEvent.coordinate;
    setMarkerPosition(newLocation);
    onLocationSelected(newLocation);
  };

  return (
    <View style={[styles.mapContainer, { height: mapHeight }]}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...markerPosition,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
  },
  map: {
    flex: 1,
  },
});

export default GoogleMapsScreen;