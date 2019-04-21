import React, { Component } from 'react';
import { View, Alert, Image, StyleSheet, AsyncStorage } from 'react-native';
import type { Notification, NotificationOpen } from 'react-native-firebase';
import firebase from 'react-native-firebase'
import { Navigation } from "react-native-navigation";
const Realm = require('realm');

import startMainTabs from '../MainTabs/startMainTabs';



class LandingScreen extends Component {
  constructor(props) {
    super(props);

    realm = new Realm({
      path: 'PostDatabase.realm',
      schema: [{
        name: 'Post',
        properties: {
          id: 'int',
          name: 'string',
          content: 'string',
          image: 'string',
          date: 'date',
          link: 'string'
        }
      }]
    });
  }

  viewPostHandler = (params) => {
    Navigation.startSingleScreenApp({
      passProps: { selectedPost: params },
      screen: {
        screen: "diplomate.PostDetailScreen",
      }
    });
  };

  componentDidMount(){
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        // user has permissions
        AsyncStorage.getItem('intro').then((Value) => {
          if (Value){
            this.timeoutHandle = setTimeout(()=>{
              startMainTabs();
            }, 2000);
          }else{
            this.timeoutHandle = setTimeout(()=>{
              Navigation.startSingleScreenApp({
                screen: {
                  screen: "diplomate.IntroScreen"
                }
              });
            }, 2000);
          }
        });
      } else {
        // user doesn't have permission
        firebase.messaging().requestPermission()
        .then(() => {
          // User has authorised
        })
        .catch(error => {
          // User has rejected permissions
        });
      }
    });

    AsyncStorage.getItem('notification').then((Value) => {
      if(Value == 'true'){
        firebase.messaging().subscribeToTopic("News");
      }else{
        firebase.messaging().unsubscribeFromTopic("News");
      }
    });

    this.notificationDisplayedListener = AsyncStorage.getItem('notification').then((Value) => {
      if(Value == 'true'){
        firebase.notifications().onNotificationDisplayed((notification: Notification) => {
          // Process your notification as required
          // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
          console.log('[notificationDisplayedListener]');
          console.log(notification);
        });
      }else{
        console.log('[notificationDisplayedListener] Please allow notifications');
      }
    });

    this.notificationListener = AsyncStorage.getItem('notification').then((Value) => {
      if(Value == 'true'){
        firebase.notifications().onNotification((notification: Notification) => {
          // Process your notification as required
          console.log('[notificationListener]');
          console.log(notification);
          if (notification._data.type == "newPost"){
            const postId = notification._data.id;
            fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts/?filter[p]='+postId+'&_embed')
            .then((response) => response.json())
            .then((responseJson) => {
              if (typeof responseJson[0] != "undefined"){
                Alert.alert(
                    notification._title,
                    notification._body,
                    [{
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      {
                        text: 'View Post',
                        onPress: () => this.viewPostHandler(responseJson[0])
                    }],
                    {cancelable: false},
                );
              }else{
                console.log('Wrong postId')
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }
        });
      }else{
        console.log('[notificationListener] Please allow notifications');
      }
    });

    this.notificationOpenedListener = AsyncStorage.getItem('notification').then((Value) => {
      if(Value == 'true'){
        firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
          console.log(Value);
          console.log('[notificationOpenedListener]');
          console.log(notification);
          if (notification._data.type == "newPost"){
            const postId = notification._data.id;

            fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts/?filter[p]='+postId+'&_embed')
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson[0]);
              if (typeof responseJson[0] != "undefined"){
                this.viewPostHandler(responseJson[0]);
              }else{
                console.log('Wrong postId')
              }
            })
            .catch((error) => {
              console.error(error);
            });
          }

        });
      }else{
        console.log('[notificationOpenedListener] Please allow notifications');
      }
    });

    firebase.notifications().getInitialNotification().then((notificationOpen: NotificationOpen) => {
      AsyncStorage.getItem('notification').then((Value) => {
        if(Value == 'true'){
          if (notificationOpen) {
            // App was opened by a notification
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            console.log('[getInitialNotification]');
            console.log(notification);
          }else{
            console.log('[getInitialNotification] Please allow notifications');
          }
        }
      });
    });

  }

  componentWillUnmount(){
    clearTimeout(this.timeoutHandle);
    // this.notificationDisplayedListener();
    // this.notificationListener();
    // this.notificationOpenedListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source = {require('../../assets/images/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#192444",
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    width: '90%',
    resizeMode: 'contain'
  }
});

export default LandingScreen;
