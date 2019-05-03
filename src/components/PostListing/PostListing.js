import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import ImageOverlay from "react-native-image-overlay";
import HTML from 'react-native-render-html';
import HTMLView from 'react-native-htmlview';


const postListing = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.FlatListContainerStyle}>
      <View style={{flex:2}}>
        <ImageOverlay
          source={props.image}
          rounded={5}
          height={150}
          overlayColor="black"
          overlayAlpha={0.35}
          contentPosition="center"
          containerStyle={{width: '95%'}}>
        </ImageOverlay>
      </View>
      <View style={{flex:2, height:150}}>
        <HTML html={props.title} baseFontStyle={styles.titleStyle}/>
        <HTMLView
          value={props.content}
          nodeComponentProps={{numberOfLines: 3}}
          stylesheet={excerptStyle}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const excerptStyle = StyleSheet.create({
  p: {
    fontFamily:'CrimsonText-Regular',
    fontSize: 16,
    lineHeight: 16,
    marginTop: '2%',
    color: '#202F5B',
  },
});

const styles = StyleSheet.create({
  FlatListContainerStyle: {
    flex:1,
    flexDirection: 'row',
    padding:'2.5%',
    marginLeft:'2.5%',
    marginRight:'2.5%',
    backgroundColor:'#F3F2F2'
  },
  titleStyle: {
    fontFamily: 'Montserrat-Bold',
    color:'#202F5B',
    fontSize:13,
  }
});

export default postListing;
