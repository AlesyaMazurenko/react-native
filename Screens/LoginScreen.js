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

import * as SplashScreen from 'expo-splash-screen';

const initialState = {
  login: '',
  email: '',
  password: '',
}

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ navigation }) {
  console.log('navigation', navigation);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  
  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  
  const onLogin = () => {
    Alert.alert("Credentials", `${email} + ${password}`);
  };


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
                marginBottom: isShowKeyboard ? -175 : 0,  
              }}
              >

                <Text style={styles.title}>Увійти</Text>
                <View>
                  <View style={{ ...styles.form, marginBottom: isShowKeyboard ? 32 : 0 }}>                     
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
                    <TouchableOpacity activeOpacity={0.7} style={styles.btnLog} onPress={handleSubmit}>
                    <Text style={styles.btnText}>
                      Увійти
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} style={styles.btnReg} onPress={() => setIsShowKeyboard(false)}>
                    <Text onPress={() => navigation.navigate('Registration')} style={styles.btnRegText}>
                        Немає аккаунта? Зареєструватися
                  
                    </Text>
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
    marginHorizontal: 144,
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
  btnLog: {
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
  btnReg: {
    color: 'transparent',
    marginTop: 16,
    marginBottom: 78,
    alignItems: 'center',
  },
   btnRegText: {
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
