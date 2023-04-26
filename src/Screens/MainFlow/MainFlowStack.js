import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Profile from "./Profile";
import List from "./List";
import Search from "./Search";
import Favorite from "./Favorite";
import { Ionicons } from "@expo/vector-icons";
import {
  FontAwesome5,
  EvilIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import Product from "./Product";

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainFlowStack() {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={26} color={color} />
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
        name="Profile"
        component={Profile}
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

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "teal",
      },
      headerTintColor: "white",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home "
      component={Home}
      options={{
        title: "Home",
      }}
    />

    <HomeStack.Screen
      name="Product "
      component={Product}
      options={{
        title: "Product",
      }}
    />
  </HomeStack.Navigator>
);
