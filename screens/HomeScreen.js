import { SafeAreaView, Text, StyleSheet, View, Image } from "react-native";
import tw from "twrnc";
import React, { useEffect, useState, useRef } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full p-4`}>
      <Image
        style={styles.logo}
        source={require("../assets/images/Uber-Logo.png")}
      />
      <GooglePlacesAutocomplete
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              originLocation: details.geometry.location,
              originDescription: data.description,
            })
          );

          dispatch(setDestination(null));

          // console.log(details.geometry.location);
        }}
        placeholder="Search"
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: "en",
        }}
        fetchDetails={true}
        minLength={2}
        returnKeyType={"search"}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
      />
      <NavOptions />
      <NavFavourites />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
