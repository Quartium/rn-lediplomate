import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
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
         this.timeoutHandle = setTimeout(()=>{
              startMainTabs();
         }, 5000);
    }

    componentWillUnmount(){
         clearTimeout(this.timeoutHandle);
    }

    render() {
      return (
        <Text>LandingScreen</Text>
      );
  }
}

export default LandingScreen;
