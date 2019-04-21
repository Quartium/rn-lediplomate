import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import HTML from 'react-native-render-html';


const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <HTML html={props.postName}/>
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
