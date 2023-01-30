import React, { useState } from 'react';
import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword, updatePhoneNumber } from 'firebase/auth';
import TextTicker from 'react-native-text-ticker'
import { Ionicons } from "@expo/vector-icons"
import firebase from "firebase/app"
import { styles } from "../styles"

const SignIn = () => {
    const navigation = useNavigation()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth()
    const Login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password, phoneNumber).then(async(userCredential) => {
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
            <View style={styles.Background}>
                <ImageBackground
                    source={require("../image/background.jpg")}
                    blurRadius={4} style={styles.ImageBackground}>
                    <TextTicker style={styles.Ticker} duration={5000} loop bounce={false} repeatSpacer={0} marqueeDelay={0} >                                                                           Halısahaadam uygulamasına hoşgeldiniz.   </TextTicker>
                    <View style={styles.EnterAllScreen}>

                        <TextInput
                            style={styles.EnterScreen}
                            placeholder="Mail"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.EnterScreen}
                            placeholder="Şifre"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.ButtonEnter} onPress={Login}>
                            <Text> GİRİŞ YAP </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ButtonEnter} onPress={() => navigation.navigate("SignUp")}>
                            <Text> ÜYE OL </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View >
        )
    }
    export default SignIn
