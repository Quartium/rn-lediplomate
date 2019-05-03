import React, { Component } from 'react';
import { Switch, Text, View, StyleSheet, BackHandler, AsyncStorage } from 'react-native';

import NavBar from "../../components/NavBar/NavBar";
import startMainTabs from '../MainTabs/startMainTabs';

class NotificationSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchValue:false
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigatorStyle = {
    navBarHidden: true
  };


  showData(){
    AsyncStorage.getItem('notification').then((Value) => {
      console.log('new value: ' + Value);
    });
  }

  toggleSwitch = async (value) => {
      if (value){
        try {
          await AsyncStorage.setItem('notification', JSON.stringify(true));
        } catch (error) {
          console.log('[AsyncStorage] Error saving data');
        }
      }else{
        try {
          await AsyncStorage.setItem('notification', JSON.stringify(false));
        } catch (error) {
          console.log('[AsyncStorage] Error saving data');
        }
      }
      this.setState({switchValue: value});
      console.log(this.state.switchValue);
      this.showData();
   }


   async componentDidMount(){
     AsyncStorage.getItem('notification').then((Value) => {
       this.setState({switchValue: Value});
       console.log('state is set to: '+ Value)
     })
   }

  componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      startMainTabs();
      return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>Push Notifications</Text>
          <Switch
            onValueChange = {(value) => this.toggleSwitch(value)}
            value = {this.state.switchValue}
            style={{marginRight:'2.5%'}}
          />
        </View>
        <NavBar
          Title="Paramètres"
          Icon="md-arrow-back"
          onItemPressed={() => startMainTabs()}
          customContainerStyle={{backgroundColor:'transparent', borderBottomWidth: 0,}}
          customTitleStyle={{color:'#F3F2F2'}}
          customIconStyle= "#F3F2F2"
        />
      </View>
   );
  }
}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignItems: 'center',
   backgroundColor:'#192444'
  },
  contentContainer: {
    backgroundColor:'#F3F2F2',
    borderRadius: 16,
    height:'10%',
    width:'90%',
    marginTop:90,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  contentTitle: {
    fontFamily:'Rajdhani-Bold',
    color:'#192444',
    marginLeft:'2.5%'
  }
});

export default NotificationSettingScreen;
