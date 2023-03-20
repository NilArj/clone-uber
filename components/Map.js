import { StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import MapView, { Animated, Marker } from "react-native-maps";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  // console.log(origin);
  // console.log(destination);

  // zoom & fit markers
  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      Animated: true,
    });
  }, [origin, destination]);

  // travel time
  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperia&origins=${origin.originDescription}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.originLocation.lat,
        longitude: origin.originLocation.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.originDescription}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.originLocation && (
        <Marker
          coordinate={{
            latitude: origin.originLocation.lat,
            longitude: origin.originLocation.lng,
          }}
          title="Origin"
          description={origin.originDescription}
          identifier="origin"
        />
      )}

      {destination && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
