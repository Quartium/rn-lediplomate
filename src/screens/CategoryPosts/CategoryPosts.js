import React, { Component } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';

import PostList from "../../components/PostList/PostList";


class CategoryPostsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const catId = this.props.selectedCategory.id;
    fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts?categories='+catId+'&_embed')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        posts:responseJson
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

  render () {
    console.log(this.state.posts);
    main = (
      <PostList
        posts={this.state.posts}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    return (
      <View>
      <ScrollView>
        <View>
          {main}
        </View>
      </ScrollView>
      </View>
    );
  }
}

export default CategoryPostsScreen;
