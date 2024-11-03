import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

//Funcional sin pasarle la nueva ubicación para el marcador
// interface GoogleMapsScreenProps {
//   onLocationSelected: (location: { latitude: number; longitude: number }) => void;
// }

// const GoogleMapsScreen: React.FC<GoogleMapsScreenProps> = ({ onLocationSelected }) => {
//   return (
//     <View style={styles.containerMap}>
//       <MapView
//         style={styles.map}
//         region={{
//           latitude: 6.250028,
//           longitude: -75.566469,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}>
//         <Marker
//           coordinate={{ latitude: 6.250028, longitude: -75.566469 }}
//           draggable
//           onDragEnd={(e) => onLocationSelected(e.nativeEvent.coordinate)}
//         />
//       </MapView>
//     </View>
//   );
// };

// export default GoogleMapsScreen;

// const styles = StyleSheet.create({
//   containerMap: {
//     height: 300,
//     width: 400,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
// Fin de funcional


//funcional pero no permite mover el marcador para actualizar la ubicación
// export interface GoogleMapsScreenProps {
//   onLocationSelected: (location: { latitude: number; longitude: number }) => void;
//   mapHeight?: number; // Altura opcional del mapa
//   initialLocation?: { latitude: number; longitude: number }; // Agregamos initialLocation como propiedad opcional
// }

// const GoogleMapsScreen: React.FC<GoogleMapsScreenProps> = ({
//   onLocationSelected,
//   mapHeight = 150, // Valor predeterminado para la altura del mapa
//   initialLocation,
// }) => {
//   const [markerPosition, setMarkerPosition] = React.useState(
//     initialLocation || { latitude: 37.78825, longitude: -122.4324 } // Usa initialLocation si está disponible
//   );

//   // Efecto para centrar el mapa en la ubicación inicial cuando se carga el componente
//   useEffect(() => {
//     if (initialLocation) {
//       setMarkerPosition(initialLocation);
//     }
//   }, [initialLocation]);

//   const handleMapPress = (event: any) => {
//     const newLocation = event.nativeEvent.coordinate;
//     setMarkerPosition(newLocation);
//     onLocationSelected(newLocation); // Llamada a la función pasada en props
//   };

//   return (
//     <View style={[styles.mapContainer, { height: mapHeight }]}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           ...markerPosition,
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         }}
//         onPress={handleMapPress}
//       >
//         <Marker coordinate={markerPosition} />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mapContainer: {
//     width: '100%',
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default GoogleMapsScreen;

export interface GoogleMapsScreenProps {
  onLocationSelected: (location: { latitude: number; longitude: number }) => void;
  mapHeight?: number; // Altura opcional del mapa
  initialLocation?: { latitude: number; longitude: number }; // Agregamos initialLocation como propiedad opcional
}

const GoogleMapsScreen: React.FC<GoogleMapsScreenProps> = ({
  onLocationSelected,
  mapHeight = 300,
  initialLocation,
}) => {
  // Usa una ubicación predeterminada si initialLocation es null o undefined
  const defaultLocation = { latitude: 6.247972053240134, longitude: -75.55811494588852};
  const [markerPosition, setMarkerPosition] = React.useState(
    initialLocation || defaultLocation
  );

  useEffect(() => {
    if (initialLocation) {
      setMarkerPosition(initialLocation);
    }
  }, [initialLocation]);

  // Manejar el evento de desplazamiento del marcador
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