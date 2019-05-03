import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

import startMainTabs from '../MainTabs/startMainTabs';

const slides = [
  {
    key: 'intro1',
    title: 'Discover',
    text: 'Explore thousands of \nfascinating articles',
    icon: 'ios-compass',
    backgroundColor: '#ea1f3d',
  },
  {
    key: 'intro2',
    title: 'Stay Informed',
    text: 'Get notified when our \nbest articles go viral',
    icon: 'ios-notifications',
    backgroundColor: '#ea1f3d',
  },
  {
    key: 'intro3',
    title: 'Save and Share',
    text: 'Save articles that you \n love to read',
    icon: 'ios-heart',
    backgroundColor: '#ea1f3d',
  },
];

export default class IntroScreen extends Component {
  async componentDidMount(){
    try {
      await AsyncStorage.setItem('notification', JSON.stringify(true));
    } catch (error) {
      console.log('[AsyncStorage] Error saving data');
    }
  }

  _renderItem = props => (
      <View style={styles.container}>
        <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={200} color="#ea1f3d" />
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
  );

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  _onDone = async () => {
    try {
      await AsyncStorage.setItem('intro', 'done');
      startMainTabs();
    } catch (error) {
      console.log('[AsyncStorage] Error saving data');
    }
  }

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this._onDone}
        activeDotStyle={{backgroundColor: '#ea1f3d'}}
      />
    );
  }
}

IntroScreen.navigatorStyle = {
 navBarHidden: true,
};



const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F3F2F2',
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: '90%',
    resizeMode: 'contain'
  },
  title: {
    color: '#192444',
    textAlign: 'center',
    fontSize: 20,
    fontFamily:'Rajdhani-Bold',
    paddingTop: 30
  },
  text: {
    color: '#192444',
    textAlign: 'center',
    fontSize: 16,
    fontFamily:'Montserrat-Regular',
    paddingTop: 10
  }
});
