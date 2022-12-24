
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
  const navigation = useNavigation()
  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth,(user) => {
      if (!user) {
        navigation.navigate("SignIn")
      } else {
        navigation.navigate("Main")
      }

    })
  }, [])
}
export default Auth