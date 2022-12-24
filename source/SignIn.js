import React, { useState } from 'react';
import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import TextTicker from 'react-native-text-ticker'
import { Ionicons } from "@expo/vector-icons"
import firebase from "firebase/app"
import { styles } from "../styles"

const SignIn = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth()
    const Login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password).then(() => {
                console.log("Giriş yapıldı")
                navigation.navigate("Main")
            })
                .catch((error) => {
                    
                    Alert.alert("Kullanıcı adı veya şifre hatalı!")
                });
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <View style={styles.background}>
            <ImageBackground
                source={require("../image/background.jpg")}
                blurRadius={4} style={styles.ImageBackground}>
                <TextTicker style={styles.ticker} duration={5000} loop bounce={false} repeatSpacer={0} marqueeDelay={0} >                                                                           Halısahaadam uygulamasına hoşgeldiniz.   </TextTicker>
                <View style={styles.enterallscreen}>

                    <TextInput
                    style={styles.Enterscreen}
                    placeholder="Mail"
                    value={email}
                    onChangeText={setEmail}
                    />
                    <TextInput
                    style={styles.Enterscreen}
                     placeholder="Şifre"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.buttonenter} onPress={Login}>
                        <Text> GİRİŞ YAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonenter} onPress={() => navigation.navigate("SignUp")}>
                        <Text> ÜYE OL </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View >
    )
}

export default SignIn

