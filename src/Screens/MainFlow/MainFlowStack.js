import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Profile from './Profile';
import List from './List';
import BidProduct from './BidProduct';
import FixProduct from './FixProduct';
import MyProducts from './MyProducts';
import Favorite from './Favorite';
import { Ionicons } from '@expo/vector-icons';
import {
  FontAwesome5,
  EvilIcons,
  Feather,
  AntDesign,
  Fontisto,
} from '@expo/vector-icons';
import Product from './Product';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainFlowStack() {
  return (
    <Tab.Navigator
      initialRouteName="Bidders Bay"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 12 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Bidders Bay"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color }) => (
            <Feather name="plus-circle" size={32} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="My Products"
        component={MyProducts}
        options={{
          tabBarLabel: 'My Products',
          tabBarIcon: ({ color }) => (
            <Fontisto name="shopping-bag-1" size={26} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainFlowStack;

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <HomeStack.Screen
      name="Home "
      component={Home}
      options={{
        title: 'Home',
      }}
    />

    <HomeStack.Screen name="Product" component={Product} />
    <HomeStack.Screen name="BidProduct" component={BidProduct} />
    <HomeStack.Screen name="FixProduct" component={FixProduct} />
  </HomeStack.Navigator>
);
