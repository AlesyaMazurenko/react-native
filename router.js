import React from "react";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screens/LoginScreen';
import RegistrationScr from './Screens/RegistrationScreen';
import Home from './Screens/main/Home';  
import PostsScreen from './Screens/main/PostsScreen';
import CreatePosts from './Screens/main/CreatePostsScreen';
import Profile from './Screens/main/ProfileScreen';

// icons import https://icons.expo.fyi
import { Ionicons, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const MainStack = createStackNavigator(); // указывает на группу навигаторов
const MainTab = createBottomTabNavigator(); // Нижняя навигация

export const useRoute = (isAuth) => {
    if (!isAuth) {
        // auth
        return (
            <MainStack.Navigator initialRouteName='Login'>
                {/* Замена Switch */}
                <MainStack.Screen name='Registration' options={{headerShown: false}} component={RegistrationScr} />{/* Замена Route */}
                <MainStack.Screen name='Login' options={{headerShown: false}} component={LoginScreen} />
                <MainStack.Screen name='Home' component={Home} options={{ title: 'Start screen' }} />
            </MainStack.Navigator>)
    }
    return (
        <MainTab.Navigator >
            <MainTab.Screen
                name='Posts'
                component={PostsScreen}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <Ionicons name="grid-outline" size={24} color='#212121CC' />),
                    headerTitle: 'Posts', //(props) => <LogoTitle {...props} />,
                    headerRight: () => (
                        <TouchableOpacity activeOpacity={0.7} style={{ paddingRight: 10 }}
                         onPress={() => alert('Do you really want to logout?')}>
                            <MaterialIcons name="logout"
                            size={24} color='#BDBDBD' margin='100' /> 
                        </TouchableOpacity>
                        
                    ),
                }}
            />
            <MainTab.Screen name='Create'
                component={CreatePosts}
                options={{
                    title: 'Create Post',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                        <AntDesign name="plus" size={24} color='#212121CC' />),
                    
                    
                }}
            />
            <MainTab.Screen name='Profile'
                component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused, size, color }) => (
                       <Feather name="user" size={24} color='#212121CC' />)
                }}
            />
        </MainTab.Navigator>
    )
};