import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import Profile from "./Profile";
import List from "./List";
import BidProduct from "./BidProduct";
import FixProduct from "./FixProduct";

import Favorite from "./Favorite";
import Product from "./Product";
import SellerProfile from "./SellerProfile";
import BecomeSeller from "./BecomeSeller";
import { Color } from "../../Components/Shared/Color";
import { FontAwesome5, Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import FeaturePost from "./FeaturePost";
import Inspection from "./Inspection";
import EditPost from "./EditPost";

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainFlowStack() {
  return (
    <Tab.Navigator
      initialRouteName="Bidders Bay"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: Color.black },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Color.white,
        headerTitleAlign: "center",
        headerShown: false,
        tabBarHideOnKeyboard: true,
        headerStyle: {
          backgroundColor: Color.black,
        },
        headerTitleStyle: {
          color: Color.white,
        },
      }}
    >
      <Tab.Screen
        name="Bidders Bay"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: "Favorite",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="heart" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarLabel: "List",
          tabBarIcon: ({ color }) => (
            <Feather name="plus-circle" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
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
        title: "Home",
      }}
    />

    <HomeStack.Screen name="Product" component={Product} />
    <HomeStack.Screen name="BidProduct" component={BidProduct} />
    <HomeStack.Screen name="FixProduct" component={FixProduct} />
    <HomeStack.Screen name="SellerProfile" component={SellerProfile} />
    <HomeStack.Screen name="FeaturePost" component={FeaturePost} />
    <HomeStack.Screen name="Inspection" component={Inspection} />
    <HomeStack.Screen name="EditPost" component={EditPost} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <ProfileStack.Screen
      name="Profile "
      component={Profile}
      options={{
        title: "Profile",
      }}
    />

    <ProfileStack.Screen name="BecomeSeller" component={BecomeSeller} />
  </ProfileStack.Navigator>
);
