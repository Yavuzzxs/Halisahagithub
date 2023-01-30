import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, ImageBackground } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { styles } from "../styles"
import { db } from '../config';

const Search = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'adambulmailanlari'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setData(data);
    });
    return unsubscribe;
  }, [data]);
  return (
    <ImageBackground source={require("../image/background.jpg")} blurRadius={25} style={styles.ImageBackground}>
      <View style={styles.SearchScreen}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.SearchScreenTextAciklama}>
              <Text style={styles.SearchScreenTextBilgi}>Açıklama:           {item.aciklama}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Aranan mevkii:   {item.adambul}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Şehir:                   {item.city}</Text>
              <Text style={styles.SearchScreenTextBilgi}>İlçe:                      {item.county}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Tarih:                   {item.date}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Zaman:               {item.time}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Halısaha adı:      {item.locations}</Text>
              <Text style={styles.SearchScreenTextBilgi}>Mail:                    {item.mail}</Text>
              <Text style={styles.SearchScreenTextBilgi}>İsim:                    {item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};
export default Search;
