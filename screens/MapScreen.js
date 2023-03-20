import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw` absolute z-50 bg-gray-100 top-16 left-8 p-3 rounded-full shadow-lg `}
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <Map />
      </View>
      <View style={tw` h-1/2 `}>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: "horizontal",
          }}
        >
          <Stack.Screen name="NavigateCard" component={NavigateCard} />
          <Stack.Screen name="RideOptionsCard" component={RideOptionsCard} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
