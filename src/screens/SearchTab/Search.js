import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListPosts from "../../components/ListPosts/ListPosts";

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });

class SearchScreen extends Component {
  constructor(props) {
      super(props);
      //setting default state
      this.state = { isLoading: true, text: '' };
      this.arrayholder = [];
    }

    static navigatorStyle = {
      navBarHidden: true
    };

    componentDidMount() {
      return fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts?filter[posts_per_page]=5&_embed')
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              isLoading: false,
              dataSource: responseJson
            },
            function() {
              this.arrayholder = responseJson;
            }
          );
        })
        .catch(error => {
          console.error(error);
        });
    }

    searchFilterFunction = text => {
      this.setState({
        value: text,
      });

      const newData = this.arrayholder.filter(item => {
        const itemData = item.title.rendered ? item.title.rendered.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        dataSource: newData,
        text: text
      });
    };

    renderSeparator = () => {
      //Item sparator view
      return (
        <View
        style={{
          alignSelf:'center',
          height: 1,
          width: '86%',
          backgroundColor: '#dedede',
        }}
        />
      );
    };

    renderHeader = () => {
     return (
       <SearchBar
         placeholder="Rechercher.."
         lightTheme
         round
         onChangeText={text => this.searchFilterFunction(text)}
         autoCorrect={false}
         value={this.state.text}
         searchIcon={<Ionicons
           name="ios-search"
           color="#192444"
           size={25}/>}
         inputStyle={styles.SearchBarInputStyle}
         containerStyle={styles.SearchBarContainer}
         inputContainerStyle={styles.SearchBarInputContainer}
       />
     );
   };

   itemSelectedHandler = key => {
     const selPost = this.state.dataSource.find(post => {
        return post.id === key;
     });

     console.log(selPost);
     console.log(key);

     this.props.navigator.push({
       screen: "diplomate.PostDetailScreen",
       title: selPost.name,
       passProps: {
         selectedPost: selPost
       }
     });
    };

    render() {
      if (this.state.isLoading) {
       return (
         <View style={styles.ActivityIndicatorStyle}>
           <ActivityIndicator />
         </View>
       );
      }
      return (
        <View style={styles.ListViewContainerStyle}>
          <ListPosts
            posts={this.state.dataSource}
            renderSeparator={this.renderSeparator}
            renderHeader={this.renderHeader}
            onItemSelected={this.itemSelectedHandler}
          />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    SearchBarContainer: {
      height: NAVBAR_HEIGHT,
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      margin:'2.5%'
    },
    SearchBarInputContainer: {
      backgroundColor:'white',
      borderRadius: 0,
      paddingLeft: '2.5%'
    },
    SearchBarInputStyle: {
      fontFamily: 'Rajdhani-Medium',
      fontSize:16
    },
    ListViewContainerStyle: {
      flex: 1,
      backgroundColor:'#F3F2F2'
    },
    ActivityIndicatorStyle:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#F3F2F2'
    },
  });


export default SearchScreen;
