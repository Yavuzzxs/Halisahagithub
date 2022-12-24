import { View, SafeAreaView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles } from "../styles"
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const SignUp = () => {
    const navigation = useNavigation()
    const auth = getAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [firstname, setFirstname] = useState('')
    const [surname, setSurname] = useState('')

    const Register = async () => {
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            navigation.navigate("App")
            userCredential.user.displayName = firstname + " " + surname
            userCredential.user.phoneNumber = phone
        })
            .catch((error) => {
                Alert.alert("Lütfen boşluk bırakmayın.")
            })
    }
    return (
        <View style={styles.background}>
            <ImageBackground source={require("../image/background.jpg")} blurRadius={4} style={styles.ImageBackground}>
                <View style={styles.enterallscreen}>
                    <TextInput style={styles.Enterscreen} placeholder="Adınız"
                        value={firstname}
                        onChangeText={txt => setFirstname(txt)}
                    />
                    <TextInput style={styles.Enterscreen} placeholder="Soyadınız"
                        value={surname}
                        onChangeText={txt => setSurname(txt)} />
                    <TextInput style={styles.Enterscreen} placeholder="Telefon"
                        value={phone}
                        onChangeText={txt => setPhone(txt)}
                    />
                    <TextInput style={styles.Enterscreen} placeholder="Mail"
                        value={email}
                        onChangeText={txt => setEmail(txt)}
                    />
                    <TextInput style={styles.Enterscreen} placeholder="Şifre"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={txt => setPassword(txt)}
                    />

                    <TouchableOpacity style={styles.buttonenter} onPress={Register}>
                        <Text> ÜYE OL </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignUp