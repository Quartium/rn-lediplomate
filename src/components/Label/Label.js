import React from "react";
import { Text, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const label = props => (
  <View
    style={{
      flex: 1,
      flexDirection:'row',
      alignItems:'center',
      marginLeft:'4.5%',
      marginTop: 10
    }}>
    <MaterialCommunityIcons
      name="label"
      color="#D91F3C"
      size={30}/>
    <Text
      style={{
        fontSize: 18,
        fontFamily:'Rajdhani-Bold',
        color: '#D91F3C',
        marginLeft:'2.5%'
      }}>{props.name}</Text>
  </View>
);

export default label;
