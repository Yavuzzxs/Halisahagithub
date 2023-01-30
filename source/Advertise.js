import { View, TouchableOpacity, TextInput, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Menu, Text, Provider, Modal } from 'react-native-paper';
import { styles } from "../styles"
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, query, where, onSnapshot, getDocs, setDoc, doc } from "firebase/firestore";

import Mevkii from './Mevkii';
import cities from '../city'
import { db } from '../config';
import { uuidv4 } from '@firebase/util';


const Advertise = () => {
  const auth = getAuth()

  const [visibleHalisaha, setVisibleHalisaha] = useState(false);
  const [visibleSehir, setVisibleSehir] = useState(false);
  const [visibleIlce, setVisibleIlce] = useState(false);
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  const [visibleadambul, setVisibleAdambul] = useState(false);
  const [aciklama, setAciklama] = useState('')

  const [name, setName] = useState();
  const [mail, setMail] = useState();

  const [locations, setLocations] = useState();
  const [location, setLocation] = useState("Halısaha Seç");
  const [city, setCity] = useState("Şehir Seç");
  const [county, setCounty] = useState("İlçe Seç");
  const [adambul, setAdambul] = useState("Aranan adamın mevkiisi");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [counties, setCounties] = useState();

  const openHalisahaMenu = () => setVisibleHalisaha(true);
  const closeHalisahaMenu = () => setVisibleHalisaha(false);
  const openSehirMenu = () => setVisibleSehir(true);
  const closeSehirMenu = () => setVisibleSehir(false);
  const openIlceMenu = () => setVisibleIlce(true);
  const closeIlceMenu = () => setVisibleIlce(false);
  const openAdambulMenu = () => setVisibleAdambul(true);
  const closeAdambulMenu = () => setVisibleAdambul(false);

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Haziran", "Eylül", "Ekim", "Kasım", "Aralık"
  ];
   const getAreas = async (ilce) => {

    const q = query(collection(db,"halisahalar"),where("Ilce","==",ilce))
        const data = await getDocs(q)
       setLocations(data.docs)
   }

  const set = async () => {
    if (county == "İlçe Seç" || location == "Halısaha Seç") {
      alert("Lütfen alanları seçiniz")
    } else {
      alert("Başarıyla ayarlandı")
      const uid = uuidv4()
      var hour = time?.getHours() < 10 ? "0" + time?.getHours() : time?.getHours()
      var min = time?.getMinutes() < 10 ? "0" + time?.getMinutes() : time?.getMinutes()
      var year = date?.getFullYear()
      var month = monthNames[date?.getMonth()]
      var day = date?.getDate()

      await setDoc(doc(db, "adambulmailanlari", uid), {
        locations: location,
        name: name,
        mail: mail,
        date: day + " " + month + " " + year,
        time: hour + ":" + min,
        city: city,
        county: county,
        adambul: adambul,
        aciklama: aciklama,
      });
    }
  }
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setMail(user.email)
      setName(user.displayName)
    })
  }, [])

  return (
    <Provider>
      <ImageBackground source={require("../image/background.jpg")} blurRadius={25} style={styles.ImageBackground}>
        <Text style={styles.AdvertiseScreen}>Halısahaya adam bulma ekranına hoşgeldiniz aşağıdaki bilgileri doldurarak eksik oyuncu için ilan verebilirsiniz</Text>
        <View style={styles.BookingScreenView1}>
          <Menu
            visible={visibleSehir}
            contentStyle={styles.BookingButtonInside}
            onDismiss={closeSehirMenu}
            anchor={<Button style={styles.BookingScreenButtonYer} onPress={openSehirMenu}>{city}</Button>}>
            {cities && cities.map(item => {
              return (<Menu.Item key={item.il} onPress={() => {
                setCounties(item.ilceler)
                setCity(item.il)
                closeSehirMenu()
              }} title={item.il} />)
            })}
          </Menu>
          <Menu
            visible={visibleIlce}
            contentStyle={styles.BookingButtonInside}
            onDismiss={closeIlceMenu}
            anchor={<Button style={styles.BookingScreenButtonYer} onPress={openIlceMenu}>{county}</Button>}>
            {counties && counties.map(item => {
              return (<Menu.Item key={item} onPress={() => {
                setCounty(item)
                getAreas(item)
                closeIlceMenu()
              }} title={item} />)
            })}
          </Menu>
        </View>
        <Menu
          visible={visibleHalisaha}
          contentStyle={styles.BookingButtonInside}
          onDismiss={closeHalisahaMenu}
          anchor={<Button style={styles.BookingScreenHalisahaSecme} onPress={openHalisahaMenu}>{location}</Button>}>
          {locations && locations.map(item => {
            return (<Menu.Item key={item.data()["Id"]} onPress={() => {
              setLocation(item.data()["Adi"])
              closeHalisahaMenu()
            }} title={item.data()["Adi"]} />)
          })}
        </Menu>
        <View style={styles.BookingScreenView2}>
          <Button style={styles.BookingScreenButtonTime} onPress={() => setVisibleDate(true)}><Text>{date?.getDate() + " " + monthNames[date?.getMonth()] + " " + date?.getFullYear()}</Text></Button>
          <Modal visible={visibleDate} >
            <RNDateTimePicker
              minimumDate={new Date()}
              value={date}
              onChange={(dt) => {
                t = new Date(dt.nativeEvent.timestamp)
                setDate(t)
                setVisibleDate(false)
              }} />

          </Modal>
          <Button style={styles.BookingScreenButtonTime} onPress={() => setVisibleTime(true)}><Text>{time?.getHours() < 10 ? "0" + time?.getHours() : time?.getHours()}:{time?.getMinutes() < 10 ? "0" + time?.getMinutes() : time?.getMinutes()}</Text></Button>
          <Modal visible={visibleTime} >
            <RNDateTimePicker
              minimumDate={new Date()}
              value={time}
              minuteInterval={30}
              is24Hour={true}
              mode={"time"}
              onChange={(dt) => {
                t = new Date(dt.nativeEvent.timestamp)
                setTime(t)
                setVisibleTime(false)
              }} />
          </Modal>
        </View>
        <View
          style={styles.BookingScreenHalisaha}>
          <Menu
            visible={visibleadambul}
            contentStyle={styles.BookingScreenSelect2}
            onDismiss={closeAdambulMenu}
            anchor={<Button onPress={openAdambulMenu}>{adambul}</Button>}>
            {Mevkii && Mevkii.map(item => {
              return (<Menu.Item key={item.mevkii} onPress={() => {
                setAdambul(item.mevkii)
                closeAdambulMenu()
              }} title={item.mevkii} />)
            })}
          </Menu>
        </View>
        <TextInput
          style={styles.BookingScreenHalisaha}
          placeholder="Açıklama girin ve iletişim bilgisi girin."
          value={aciklama}
          onChangeText={setAciklama}
        />
        <TouchableOpacity style={styles.BookingButton} onPress={set}>
          <Text> İlan ver </Text>
        </TouchableOpacity>
      </ImageBackground>
    </Provider>
  )
}
export default Advertise