import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Drawer } from 'react-native-paper'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { Ionicons } from "@expo/vector-icons"
import { Alert } from 'react-native'
import { getAuth, signOut } from "firebase/auth";


export function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Ionicons name={'home-outline'} size={25} color={'green'} />
              )}
              label="Anasayfa"
              onPress={() => {
                props.navigation.navigate('Football');
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name={'person-outline'}
                  size={25}
                  color={'green'}
                />
              )}
              label="Hesabım"
              onPress={() => {
                props.navigation.navigate('Hesabım');
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name={'chatbox-outline'}
                  size={25}
                  color={'green'}
                />
              )}
              label="Mesajlarım"
              onPress={() => {
                props.navigation.navigate('Mesajlarım');
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name={'reader-outline'}
                  size={25}
                  color={'green'}
                />
              )}
              label="İlanlarım"
              onPress={() => {
                props.navigation.navigate('İlanlarım');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={() => (
            <Ionicons name={'exit-outline'} size={25} color={'red'} />
          )}
          label="Çıkış"
          onPress={async () => {

            Alert.alert("Gerçekten çıkış yapılsın mı?", "", [
              { text: "İptal", onPress: null },
              {
                text: "Evet", onPress: () => {
                  const auth = getAuth()
                  signOut(auth).then(() => {
                    // Sign-out successful.
                  }).catch((error) => {
                    // An error happened.
                  });
                }
              },
            ])
          }}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});