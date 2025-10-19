import React from 'react';
import { View, StyleSheet, Pressable, Text,Image,Linking,Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router } from 'expo-router';

export default function App() {


  const openMaps = async (latitude: number, longitude: number, label: string) => {
  try {
    const encodedLabel = encodeURIComponent(label);
    const url =
      Platform.OS === 'ios'
        ? `http://maps.apple.com/?daddr=${latitude},${longitude}`
        : `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=walking`;

    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.warn('Cannot open maps for this URL:', url);
    }
  } catch (err) {
    console.warn('Map opening error (safe to ignore if map opens):', err);
  }
};


  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.6173,
          longitude: -96.3414,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >


        {/* Loading Dock Metal Ledge */}
        <Marker
          coordinate={{ latitude: 30.6125, longitude: -96.3375 }}
          title="Loading Dock Metal Ledge"
          description="A popular ledge spot located at the loading dock area of the university"
          onPress={() => openMaps(30.6125, -96.3375, "Loading Dock Metal Ledge")}
          >

          <Image
            source={require('../../assets/images/AppImages/SkateBoard.png')} // your custom icon
            style={{ width: 60, height: 40 }}
          />

          </Marker>
        

        {/* G. Hysmith Skate Park */}
        <Marker
          coordinate={{ latitude: 30.5815, longitude: -96.293}}
          title="G. Hysmith Skate Park"
          description="An outdoor skatepark located in College Station, TX with various ramps and rails."
          onPress={() => openMaps(30.5815, -96.293, "G. Hysmith Skate Park")}

          >

          <Image
            source={require('../../assets/images/AppImages/SkateBoard.png')} // your custom icon
            style={{ width: 60, height: 40 }}
          />


          </Marker>
        

          {/*Fountain by HECC*/}
        <Marker
          coordinate={{ latitude: 30.617650, longitude: -96.340668}}
          title="Fountain by HECC"
          description="Good Skating spot by the fountain near HECC."
          onPress={() => openMaps(30.617650, -96.340668, "Fountain by HECC")}


          >

          <Image
            source={require('../../assets/images/AppImages/SkateBoard.png')} // your custom icon
            style={{ width: 60, height: 40 }}
          />

          </Marker>


          {/*Commons*/}
        <Marker
          coordinate={{ latitude:  30.615549, longitude:  -96.336583}}
          title="Ramp infront of Commons"
          description="Good Ramp to go up and down"

          onPress={() => openMaps(30.615549, -96.336583, "Commons Ramp")}

          >

          <Image
            source={require('../../assets/images/AppImages/SkateBoard.png')} // your custom icon
            style={{ width: 60, height: 40 }}
          />


          </Marker>

          

          {/*Tunnel when walking to the ILSQ*/}
        <Marker
          coordinate={{ latitude:  30.612483, longitude:   -96.345050}}
          title="Tunnel when walking to the ILSQ"
          description="Good Ramp to go up and down"
          onPress={() => openMaps(30.612483, -96.345050, "Commons Ramp")}

          >

          <Image
            source={require('../../assets/images/AppImages/SkateBoard.png')} // your custom icon
            style={{ width: 60, height: 40 }}
          />


          </Marker>



      </MapView>





      {/* Back Button */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#ff5151',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});