import { View, Text, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { styles } from "../styles"
import { getAuth, onAuthStateChanged } from "firebase/auth"
const Account = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const auth = getAuth()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log(user)
      setEmail(user.email)
      setName(user.displayName)
    })
  }, [name])
  return (
    <View style={styles.Background}>
      <ImageBackground source={require("../image/background.jpg")} blurRadius={25} style={styles.ImageBackground}>
      <Text style={styles.AccountScreen}>Ad Soyad:    {name}</Text>
      <Text style={styles.AccountScreen}>Mail adresi: {email}</Text>
      </ImageBackground>
    </View>
  )
}

export default Account