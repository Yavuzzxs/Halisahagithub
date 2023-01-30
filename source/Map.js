import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../config';
import { Ionicons } from '@expo/vector-icons';

const Main = () => {
  const navigation = useNavigation()
  const [initialPosition, setInitialPosition] = useState()
  const [locations, setLocations] = useState()
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setInitialPosition({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    })
  }
  const getAreas = async () => {
    onSnapshot(query(collection(db, "halisahalar"), where("Durum", '==', "1")), async (snapshot) => {
      setLocations(snapshot.docs)
    })
  }
  useEffect(() => {
    getLocation()
    const subscribe = onSnapshot(query(collection(db, "halisahalar"), where("Durum", '==', "1")), async (snapshot) => {
      setLocations(snapshot.docs)

    })
    return subscribe;
  }, [locations])

  return (
    <SafeAreaView style={{ flex: 2 }}>
      <MapView
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        initialRegion={initialPosition}
        showsMyLocationButton={true}
        style={{ left: 0, right: 0, top: 0, bottom: 0, position: 'absolute' }}
        mapType="standard">
        {locations && locations.map(item => {
          return (<Marker
            key={item.data()["Id"]}
            coordinate={{
              latitude: parseFloat(item.data()["Konum"].split(",")[0]),
              longitude: parseFloat(item.data()["Konum"].split(",")[1])
            }}>
            <View style={{ alignSelf: 'center' }}>
              <View style={{ backgroundColor: "#ED7B1A", borderRadius: 10, padding: 5, alignItems: 'center' }}>
                <Ionicons name="md-football" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>{item.data()["Adi"]}</Text>
              </View>
            </View>
          </Marker>)
        })}
      </MapView>
    </SafeAreaView>
  )
}


export default Main
