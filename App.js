import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput,
  Keyboard, // импорт компонента клавиатуры
  KeyboardAvoidingView, // Фикс перекрытия
  TouchableWithoutFeedback, // импорт компонента обертки
  Platform,
  Alert,
  Button, 
} from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

const loadFonts = async () => {
  await Font.useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

// const [loadAsync] = useFonts{(

// )} 

export default function App() {
  // const [value, setValue] = useState("");
  // const inputHandler = (text) => setValue(text);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...Platform.select({
        ios: {
          backgroundColor: '#000000'
        },
        android: {
          backgroundColor: '#ffffff'
        },
      }),
    },
  });
  
  // чтобы наши шрифты загрузились до момента появления приложения на экране
  const [isReady, setIsReady] = useState(false) 
  if (!isReady) {
    return <AppLoading
      startAsync={loadFonts}
      onFinish={() => setIsReady(true)}
      onError={console.warn} />
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
        <KeyboardAvoidingView // определяем ОС и настраиваем поведение клавиатуры
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={name}
            onChangeText={nameHandler}
            placeholder='Username'
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder='Password'
            secureTextEntry={true}
            style={styles.input}
          />
          <Button title={'Login'} style={styles.input} onPress={onLogin} />
          {/* <TextInput
              placeholder="Type text"
              value={value}
              onChangeText={inputHandler}
            /> */}
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    fontFamily:"Roboto-Regular",
  },
});

