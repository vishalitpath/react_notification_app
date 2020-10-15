import React, { Component, useEffect, useState } from 'react'
import { Text, View, Alert,Image } from 'react-native'
import messaging from '@react-native-firebase/messaging';

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async res => {
      setMessage(res.notification.body);
      setImageUrl(res.notification.android.imageUrl);
      console.log("res---------",res.notification.android.imageUrl)
      if (res.notification.body != "")
        setMessages(message => [...message, res.notification.body]);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().setBackgroundMessageHandler(async res => {
      console.log(res,"-----------------------log from background..................")
      setMessage(res.notification.body);
      setImageUrl(res.notification.android.imageUrl);
      if (res.notification.body != "")
        setMessages(message => [...message, res.notification.body]);
    
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ color: 'green', fontSize: 18 }}>New message from firebase : {message}</Text>
      </View>
      <View>
        <Image source={{uri:imageUrl}} style={{width:250,height:250}}/>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ marginBottom: 5 }}>.................................</Text>
        {
          messages.map((item, index) => {
            return <Text key={index} style={{ color: 'blue', fontSize: 15 }}>{item + " ,"}</Text>
          })
        }
      </View>
    </View>
  )
}

export default App
