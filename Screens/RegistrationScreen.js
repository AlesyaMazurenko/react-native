import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet, Text, View, TextInput,
  Keyboard, // импорт компонента клавиатуры
  KeyboardAvoidingView, // обертка Фикс перекрытия
  TouchableWithoutFeedback, // импорт компонента обертки
  Platform,
  Alert,
  Button, 
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

const initialState = {
  login: '',
  email: '',
  password: '',
}

SplashScreen.preventAutoHideAsync();

export default function RegistrationScr() {

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      console.log('width', width);
    };
    Dimensions.addEventListener('change', onChange);
    // return () => {
    //   // Dimensions.removeEventListener('change', onChange);

    // }
  },[])

  console.log('platform', Platform.OS);

  const loadFonts = async () => {
    await FontFace.loadAsync({
      // 'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
  };
  
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require("../assets/fonts/Roboto-Bold.ttf"),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
  })
  
  const onLogin = () => {
    Alert.alert("Credentials", `${name} + ${password}`);
  };
  
  const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
    await SplashScreen.hideAsync();
  }
  }, [fontsLoaded]);
  
  // if (!fontsLoaded) {
  //   return null;
  // };

     // чтобы наши шрифты загрузились до момента появления приложения на экране
  if (!isReady) {
    return (<AppLoading
      startAsync={fontsLoaded}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />);
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    console.log(state);
    setState(initialState);
  }

    return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground
            style={styles.image}
            source={require('../assets/background.jpg')}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={-40}
            >
              <View style={{
                ...styles.box,
                // height: isShowKeyboard ? 374 : 549,         
                marginBottom: isShowKeyboard ? -175 : 0,  
              }}
              >

                <Text style={styles.title}>Реєстрація</Text>
                <View>
                  {/* <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 43 }}> */}
                  <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 32 : 0 }}>                     
                    <TextInput
                      style={styles.input}
                      placeholder='Логiн'
                      value={state.login}
                      onFocus={() => setIsShowKeyboard(true)}
                      onChangeText={(value) =>
                        setState((prevState) => ({ ...prevState, login: value }))
                      } />
                    <TextInput
                      style={styles.input}
                      placeholder='Адреса электронної пошти'
                      value={state.email}
                      onFocus={() => setIsShowKeyboard(true)}
                      onChangeText={(value) =>
                        setState((prevState) => ({ ...prevState, email: value }))
                      } />
                    
                    <View style={{position: 'relative'}}>
                      <TextInput
                        style={styles.input}
                        placeholder='Пароль'
                        secureTextEntry={isSecureEntry}
                        value={state.password}
                        onFocus={() => setIsShowKeyboard(true)}
                        onChangeText={(value) =>
                          setState((prevState) => ({ ...prevState, password: value }))
                        } />
                      <TouchableOpacity
                        style={styles.showButton}
                        activeOpacity={0.7}
                        onPress={() => setIsSecureEntry(!isSecureEntry)}
                      >
                      
                      <Text style={styles.txtShowButton}>
                        {isSecureEntry ? 'Показати' : 'Сховати'}
                      </Text>
                      </TouchableOpacity> 
                    </View>
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btnReg} onPress={handleSubmit}>
                    <Text style={styles.btnText}>
                      Зареєструватися
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} style={styles.btnLink} onPress={() => setIsShowKeyboard(false)}>
                    <Text style={styles.btnLinkText}>
                      Вже є аккаунт? Увійти</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </KeyboardAvoidingView>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: {
    marginHorizontal: 16,
  },
  
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    marginTop: 92,
    marginBottom: 17,
    marginHorizontal: 110,
    alignItems: 'center',
  },
  input: {
    padding: 16,
    paddingBottom: 15,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8E8',
    marginTop: 16,
    fontSize: 16,
    placeholderTextColor: '#BDBDBD',

    fontFamily: 'Roboto-Regular',
  },
  btnReg: {
    backgroundColor: '#FF6C00',
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {},
      android:{},
    }),
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  btnLink: {
    color: 'transparent',
    marginTop: 16,
    marginBottom: 78,
    alignItems: 'center',
  },
   btnLinkText: {
    color: '#1B4371',
     fontSize: 16,
  },
  showButton: {
    position: 'absolute',
    top: 35,
    right: 16,
  },
  txtShowButton: {
    color: '#1B4371',

  }
});
