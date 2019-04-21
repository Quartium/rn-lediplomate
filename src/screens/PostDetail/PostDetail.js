import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Button, Share, TouchableOpacity } from 'react-native';
const Realm = require('realm');

import HTML from 'react-native-render-html';
import Moment from "moment";
import Icon from 'react-native-vector-icons/Ionicons';

import PostList from "../../components/PostList/PostList";

class PostDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      realm: null,
      errorFetch: false,
      saved: false,
      colorIcon: '#000'
    };
    realm = new Realm({ path: 'PostDatabase.realm' });
  }

  static navigatorStyle = {
    tabBarHidden: true
  };


  fetchData(itemsRef) {
    let postID = this.props.selectedPost.id;
    var post_details = realm.objects('Post');
    let post = post_details.filtered('id == $0', postID);
    if (typeof(post[0]) == 'object'){
      this.setState({
        saved: true,
        colorIcon: '#4F8EF7'
      })
    }else{
      this.setState({
        saved: false,
        colorIcon: '#000'
      })
    }
  }

  componentDidMount() {
    this.fetchData();

    const catId = this.props.selectedPost.categories[1];
    fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts?categories='+catId+'&filter[posts_per_page]=3&_embed')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        posts:responseJson.filter((_item)=>_item.id !== this.props.selectedPost.id),
        errorFetch: false
      })
    })
    .catch(error => {
      console.log("Error:" + error.message);
      this.setState({
        errorFetch: true
      })
    });
  }

  addBookmark= () => {
    realm.write(() => {
      let postID = this.props.selectedPost.id;
      let posts = realm.objects('Post');
      if (posts.filtered("id == $0", postID).length == 0) {
        realm.create('Post', {
          id: this.props.selectedPost.id,
          name: this.props.selectedPost.title.rendered,
          content: this.props.selectedPost.content.rendered,
          image: this.props.selectedPost._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url,
          date: this.props.selectedPost.date_gmt,
          link: this.props.selectedPost.link,
        });
      }
    });
    this.setState({ realm });
    this.setState({
      saved: true,
      colorIcon: '#4F8EF7'
    });
    console.log(this.state.saved);
  };

  removeBookmark= () => {
    let postID = this.props.selectedPost.id;
    realm.write(() => {
      var all = realm.objects('Post');
      let filterPost = all.filtered('id == $0', postID);
      realm.delete(filterPost);
    });
    this.setState({ realm });
    this.setState({
      saved: false,
      colorIcon: '#000'
    });
    console.log(this.state.saved);
  };

  sharePost= () => {
    Share.share({
      title: this.props.selectedPost.title.rendered,
      url : this.props.selectedPost.link,
      message: this.props.selectedPost.link
    },{
      dialogTitle: this.props.selectedPost.title.rendered
    })
  };

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
    let fetched =
    <View>
      <View>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>A lire aussi</Text>
        <PostList
          posts={this.state.posts}
          onItemSelected={this.itemSelectedHandler}/>
      </View>
    </View>;

    let readMore = this.state.errorFetch
    ? <Text></Text>
    :fetched;

    var saved = this.state.saved;
    Moment.locale('fr');
    var published = this.props.selectedPost.date_gmt;

    return (
      <ScrollView>
        <View>
          <View>
            <Icon
              name="ios-bookmark"
              size={30}
              color={this.state.colorIcon}
              onPress={() => saved
                ?this.removeBookmark()
                :this.addBookmark()}
            />
            <TouchableOpacity onPress={this.sharePost}>
              <View>
                <Icon
                  name="ios-share"
                  size={30}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={{uri: this.props.selectedPost._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}}
              style={{width: 100, height: 100}}
            />
          </View>
          <View>
            <Text>
            Publié le {Moment(published).format('d MMM YYYY')} par le {this.props.selectedPost._embedded.author[0].name}
            </Text>
          </View>
          <View>
            <HTML html={this.props.selectedPost.title.rendered}/>
          </View>
          <View>
            <HTML html={this.props.selectedPost.content.rendered}/>
          </View>
        </View>
        {readMore}
      </ScrollView>
      );
    }
  }

  export default PostDetailScreen;
