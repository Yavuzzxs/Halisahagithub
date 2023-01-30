import React, { useEffect } from 'react'
import { styles } from "../styles"
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";

const Football = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.Background}>
      <ImageBackground source={require("../image/background.jpg")} blurRadius={25} style={styles.ImageBackground}>
        <Text style={styles.FootballScreen}>Halısaha uygulamamıza hoşgeldiniz! Aşağıdan halısaha ayarlayabilir veya eksik oyuncu bulmak için ilan oluşturup ilanlara bakabilirsiniz</Text>
        <TouchableOpacity style={styles.ButtonEnter} onPress={()=>navigation.navigate("Advertise")}>
          <Text>İlan ver </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonEnter}  onPress={()=>navigation.navigate("Search")}>
          <Text>İlan bul </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ButtonEnter}  onPress={()=>navigation.navigate("Booking")}>
          <Text>Randevu al </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Football