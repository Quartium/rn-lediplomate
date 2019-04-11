import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
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
          date: 'date'
        }
      }]
    });
  }

  componentDidMount(){
    firebase.messaging().hasPermission()
    .then(enabled => {
      if (enabled) {
        // user has permissions
        this.timeoutHandle = setTimeout(()=>{
          startMainTabs();
        }, 2000);
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

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('[notificationDisplayedListener]');
      console.log(notification);
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log('[notificationListener]');
      console.log(notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
      console.log('[notificationOpenedListener]');
      console.log(notification);
      if (notification._data.type == "newPost"){
        const postId = notification._data.id;
        fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts/?filter[p]='+postId+'&_embed')
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson[0]);
          Navigation.startSingleScreenApp({
            passProps: { selectedPost: responseJson[0] },
            screen: {
              screen: "diplomate.PostDetailScreen",
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
      }

    });

    firebase.notifications().getInitialNotification().then((notificationOpen: NotificationOpen) => {
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        console.log('[getInitialNotification]');
        console.log(notification);
      }
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
      <Text>LandingScreen</Text>
    );
  }
}

export default LandingScreen;
