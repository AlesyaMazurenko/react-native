import React, {useCallback, useState, useEffect} from 'react';
import {} from 'react-native';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';

import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { useRoute } from './router';

SplashScreen.preventAutoHideAsync();

 const loadFonts = async () => {
    await FontFace.loadAsync({
      'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    });
 };

  
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(true);
  // console.log('start');

  const [fontsLoaded] = useFonts({
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'Roboto-Bold': require("./assets/fonts/Roboto-Bold.ttf"),
  'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  });
  
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

  

  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
    );
  
};

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