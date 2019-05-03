import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Linking, TouchableOpacity } from 'react-native';
import { Navigation } from "react-native-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons';

class SideDrawer extends Component {
  navigateTo = () => {
    this.toggleDrawer();

    Navigation.startSingleScreenApp({
      screen: {
        screen: "diplomate.NotificationSettingScreen",
        title: "Paramètres"
      }
    });
  }


  toggleDrawer() {
        this.props.navigator.toggleDrawer({
            to: 'closed',
            side: 'left',
            animated: true
        });
    }

  render () {
    const aboutUs="https://www.lediplomate.tn/qui-sommes-nous/";
    const termsOfUse="https://www.lediplomate.tn/mentions-legales/"
    const contactUs="https://www.lediplomate.tn/contactez-nous/"

    return (
      <View style={styles.container}>
        <View style={{alignSelf:'flex-end', marginRight:'5%', marginBottom: '5%'}}>
          <Ionicons
            name="md-close"
            color="#FFF"
            size={30}
            onPress={() => this.toggleDrawer()}/>
        </View>

        <Image style={styles.image} source = {require('../../assets/images/logo.png')} />
        <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <Text style={styles.title} onPress={() => Linking.openURL(aboutUs)}>Qui sommes-nous?</Text>
          <Text style={styles.title} onPress={() => Linking.openURL(termsOfUse)}>Mentions légales</Text>
          <Text style={styles.title} onPress={() => Linking.openURL(contactUs)}>Contactez-nous</Text>
          <TouchableOpacity onPress={() => this.navigateTo()}>
            <Text style={styles.title}>Paramètres</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#192444",
    flex: 1,
    width: Dimensions.get("window").width * 1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 30
  },
  image: {
    width: '80%',
    resizeMode: 'contain'
  },
  title:{
    fontSize:14,
    color: 'white',
    textAlign:'center',
    marginBottom:'5%',
    fontFamily:'Rajdhani-Bold'
  }
});

export default SideDrawer;
