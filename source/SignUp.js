import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles } from "../styles"
import { createUserWithEmailAndPassword, getAuth, PhoneAuthCredential, updateCurrentUser, updatePhoneNumber, updateProfile } from 'firebase/auth';


const SignUp = () => {
    const navigation = useNavigation()
    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')

    const Register = async () => {
        await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(auth.currentUser,{displayName:firstname + " " + surname})
        console.log(email)
    }   
    return (
        <View style={styles.Background}>
            <ImageBackground source={require("../image/background.jpg")} blurRadius={4} style={styles.ImageBackground}>
                <View style={styles.EnterAllScreen}>
                    <TextInput style={styles.EnterScreen} placeholder="Adınız"
                        value={firstname}
                        onChangeText={txt => setFirstname(txt)}
                    />
                    <TextInput style={styles.EnterScreen} placeholder="Soyadınız"
                        value={surname}
                        onChangeText={txt => setSurname(txt)} />
                    <TextInput style={styles.EnterScreen} placeholder="Telefon"
                        value={phone}
                        onChangeText={txt => setPhone(txt)}
                    />
                    <TextInput style={styles.EnterScreen} placeholder="Mail"
                        value={email}
                        onChangeText={txt => setEmail(txt)}
                    />
                    <TextInput style={styles.EnterScreen} placeholder="Şifre"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={txt => setPassword(txt)}
                    />
                    <TouchableOpacity style={styles.ButtonEnter} onPress={Register}>
                        <Text> ÜYE OL </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignUp