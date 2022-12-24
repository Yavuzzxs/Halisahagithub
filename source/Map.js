import { View, SafeAreaView, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Main = () => {
  const navigation = useNavigation()
  const [location, setLocation] = useState(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <SafeAreaView style={{ flex: 2 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        followsUserLocation={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        initialRegion={{
          latitude: 39.609937,
          longitude: 35.149271,
          latitudeDelta: 15,
          longitudeDelta: 15,
        }}
        showsMyLocationButton={true}
        style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }}
        mapType="standard">
      </MapView>
    </SafeAreaView>
  )
}


export default Main
