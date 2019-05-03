import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-elements";
import HTML from 'react-native-render-html';
import Moment from "moment";


const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <Card
       image={props.postImage}
       containerStyle={{ width: 180, backgroundColor:'#F3F2F2', borderColor: '#F3F2F2', borderRadius: 10, borderWidth:1, elevation:0, marginBottom:20}}
       imageStyle={{
         borderTopLeftRadius: 10,
         borderTopRightRadius:10,
         overflow: 'hidden'
       }}>
       <View style={{alignItems:'flex-start', alignSelf:'flex-start'}}>
         <HTML
          html={props.postName}
          baseFontStyle={{fontFamily:'Montserrat-Bold', fontSize:13, textAlign:'left', color:'#192444'}}
         />
         <Text style={{textAlign:'left', marginTop:5, color:'#192444', fontFamily:'CrimsonText-SemiBold', fontSize:14}}>Publié le {Moment(props.postDate).format('d MMM YYYY')}</Text>
       </View>
     </Card>
  </TouchableOpacity>
);

export default listItem;
