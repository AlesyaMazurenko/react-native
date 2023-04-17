import React, {useCallback, useState, useEffect} from 'react';
import {} from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScr from './Screens/RegistrationScreen';
import Home from './Screens/Home';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  

  // useEffect(() => {
  //   const onChange = () => {
  //     const width = Dimensions.get('window').width;
  //     console.log('width', width);
  //   };
  //   Dimensions.addEventListener('change', onChange);
  //   // return () => {
  //   //   // Dimensions.removeEventListener('change', onChange);
  //   // }
  // },[])

  const loadFonts = async () => {
    await FontFace.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
  };
  
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require("./assets/fonts/Roboto-Bold.ttf"),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  })
  
  const onLayoutRootView = useCallback(async () => {
  if (fontsLoaded) {
    await SplashScreen.hideAsync();
  }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  };

     // чтобы наши шрифты загрузились до момента появления приложения на экране
  if (!isReady) {
    return (<AppLoading
      startAsync={fontsLoaded}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />);
  };

  const MainStack = createStackNavigator(); // указывает на группу навигаторов

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName='Login'>
        {/* Замена Switch */}
        <MainStack.Screen name='Registration' component={RegistrationScr} />{/* Замена Route */}
        <MainStack.Screen name='Login' component={LoginScreen} />
        <MainStack.Screen name='Home' component={Home} options={{title: 'Start screeni'}} />
      </MainStack.Navigator>
    </NavigationContainer>
    );
  
};

