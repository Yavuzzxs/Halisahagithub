import React from 'react'
import { styles } from "../styles"
import { useNavigation } from "@react-navigation/native";
import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()
const Football = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.background}>
      <ImageBackground source={require("../image/background.jpg")} blurRadius={25} style={styles.ImageBackground}>
        <Text style={styles.footballscreen}>Halısaha uygulamamıza hoşgeldiniz! Aşağıdan halısaha ayarlayabilir veya eksik oyuncu bulmak için ilan oluşturup ilanlara bakabilirsiniz</Text>
        <TouchableOpacity style={styles.buttonenter} >
          <Text>İlan ver </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonenter}>
          <Text>İlan bul </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonenter} onPress={() => {
                navigation.navigate('Booking');
              }}>
          <Text>Randevu al </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Football