import React from "react";
import { Text, View, Animated, StyleSheet, Platform } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });



const navBar = props => (
    <Animated.View style={[styles.navbar, props.customContainerStyle]}>
      <View style={styles.navbarContainer}>
        <Animated.Text style={styles.icon}>
          <Ionicons
            name={props.Icon}
            color={props.customIconStyle}
            size={30}
            onPress={props.onItemPressed}/>
        </Animated.Text>
        <Animated.Text style={[styles.title, props.customTitleStyle]}>
          {props.Title}
        </Animated.Text>
      </View>
    </Animated.View>
);

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#F3F2F2',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: 20
  },
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginLeft: '5%',
  },
  title: {
    color: '#192444',
    flex: 1,
    marginRight: '10%',
    textAlign:'center',
    fontFamily: 'Rajdhani-Bold',
    fontSize:18
  }
});

export default navBar;
