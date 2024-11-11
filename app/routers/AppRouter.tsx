import React, {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../pages/Home';
import DetailsScreen from '../pages/Details';
import ImgScreen from '../pages/ImgView';
import SectionScreen from '../pages/Section';
import CommentScreen from '../pages/Comment';
import DrawerScreen from '../pages/Drawer';
import SettingScreen from '../pages/Setting';
import AboutScreen from '../pages/About';
import FeedbackScreen from '../pages/Feedback';
import LoginScreen from '../pages/Login';
import SignInScreen from '../pages/Login/SignIn';
import RegisteredScreen from '../pages/Registered';
import JoinScreen from '../pages/Registered/Join';
import useStores from '../store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

/*
 * 主导航栈
 */
const MainScreen = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#00a2ed',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 16,
      },
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      initialParams={{id: 0}} // 默认的路径参数
    />
    <Stack.Screen name="ImgView" component={ImgScreen} />
    <Stack.Screen name="Section" component={SectionScreen} />
    <Stack.Screen name="Comment" component={CommentScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Feedback" component={FeedbackScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="Registered" component={RegisteredScreen} />
    <Stack.Screen name="Join" component={JoinScreen} />
    <Stack.Screen name="Setting" component={SettingScreen} />
  </Stack.Navigator>
);

/*
 * 抽屉导航
 */
const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Main" drawerContent={DrawerScreen}>
    <Drawer.Screen name="Main" component={MainScreen} />
    <Drawer.Screen name="Drawer" component={DrawerScreen} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const {app} = useStores(); // 使用从store中获取的状态

  useEffect(() => {
    const unsubscribe = DeviceEventEmitter.addListener('drawerState', event => {
      app.isDrawerOpen = event.focus; // 使用 store 中的 action 来修改状态
    });

    return () => {
      unsubscribe.remove();
    };
  }, [app]); // 确保 app 在变化时重新执行副作用

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
