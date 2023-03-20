import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import { Icon } from "@rneui/base";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: require("../assets/images/Uber.png"),
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: require("../assets/images/food.png"),
    screen: "FoodScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <View>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 `}
            disabled={!origin}
          >
            <View>
              <Image style={styles.image} source={item.image} />
            </View>
            <Text style={tw`mt-2 text-lg  `}>{item.title}</Text>
            <Icon
              style={tw` p-2 bg-black rounded-full w-10 mt-4 `}
              type="antdesign"
              name="arrowright"
              color="white"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
});
