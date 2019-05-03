import React, { Component } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

import ListPosts from "../../components/ListPosts/ListPosts";
import NavBar from "../../components/NavBar/NavBar";

class CategoryPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      isLoading: true
    };
  }

  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true
  };

  componentDidMount() {
    const catId = this.props.selectedCategory.id;
    fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts?categories='+catId+'&_embed')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        posts:responseJson,
        isLoading: false
      })
    })
    .catch((error) => {
    console.error(error);
    });
  }

  itemSelectedHandler = key => {
    const selPost = this.state.posts.find(post => {
      return post.id === key;
    });

    this.props.navigator.push({
      screen: "diplomate.PostDetailScreen",
      title: selPost.name,
      passProps: {
        selectedPost: selPost
      }
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

  render () {
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
          posts={this.state.posts}
          renderSeparator={this.renderSeparator}
          onItemSelected={this.itemSelectedHandler}
          style={{marginTop:90}}
        />
        <NavBar
          Title={this.props.selectedCategory.name}
          Icon="md-arrow-back"
          customIconStyle= "#192444"
          onItemPressed={ () => { this.props.navigator.pop() } }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default CategoryPostsScreen;
