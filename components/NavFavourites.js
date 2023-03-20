import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import React from "react";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "Merida, Yucatan, Mexico",
  },
  {
    id: "1234",
    icon: "briefcase",
    location: "Work",
    destination: "Telchac, Yucatan, Mexico",
  },
];

const NavFavourites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, { height: 0.6 }]} />
      )}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity style={tw` flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

const styles = StyleSheet.create({});
