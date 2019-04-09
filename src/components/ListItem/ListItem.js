import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Text>{props.postName}</Text>
      <Image source={props.postImage} style={{width: 100, height: 100}}/>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "#eee",
    height: '10%'
  }
});

export default listItem;
