import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectTravelTimeInfo } from "../slices/navSlice";

const data = [
  {
    id: "Uber-X-123",
    title: "Uber X",
    multiplier: 1,
    image: require("../assets/images/UberX.jpg"),
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: require("../assets/images/UberXL.jpg"),
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../assets/images/UberLUX.jpg"),
  },
];

const RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`absolute z-50 top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>

        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, image, multiplier }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row px-4 justify-between items-center 
            ${item.id === selected?.id && "bg-gray-200"}`}
          >
            <Image
              source={image}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} </Text>
            </View>
            <Text style={tw`text-xl -mt-7`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "MNX",
              }).format(
                (travelTimeInformation?.duration.value * RATE * multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-2 m-3 ${!selected && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
