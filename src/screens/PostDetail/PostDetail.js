import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Button, Share, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const Realm = require('realm');

import HTML from 'react-native-render-html';
import Moment from "moment";
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';

import PostList from "../../components/PostList/PostList";
import Label from "../../components/Label/Label";

const MIN_HEIGHT = 64;
const MAX_HEIGHT = 250;

class PostDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      realm: null,
      errorFetch: false,
      saved: false,
      colorIcon: '#192444'
    };
    realm = new Realm({ path: 'PostDatabase.realm' });
  }

  static navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true
  };


  fetchData(itemsRef) {
    let postID = this.props.selectedPost.id;
    var post_details = realm.objects('Post');
    let post = post_details.filtered('id == $0', postID);
    if (typeof(post[0]) == 'object'){
      this.setState({
        saved: true,
        colorIcon: '#D91F3C'
      })
    }else{
      this.setState({
        saved: false,
        colorIcon: '#192444'
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
      colorIcon: '#D91F3C'
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
      colorIcon: '#192444'
    });
    console.log(this.state.saved);
  };

  sharePost= () => {
    const message = this.props.selectedPost.title.rendered + ' ' + this.props.selectedPost.link;
    Share.share({
      title: this.props.selectedPost.title.rendered,
      url : this.props.selectedPost.link,
      message: message
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

    let readMore = this.state.errorFetch
    ? <Text></Text>
    : <View style={{marginBottom: 20}}>
        <View>
          <Label name="A lire aussi"/>
          <PostList
            posts={this.state.posts}
            onItemSelected={this.itemSelectedHandler}/>
        </View>
      </View>;

    var saved = this.state.saved;
    var published = this.props.selectedPost.date_gmt;

    return (
      <View style={{ flex: 1}}>
        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <Image source={{uri: this.props.selectedPost._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}} style={styles.image} />}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <View style={styles.navTitle}>
                <View style={{flex: 1, marginLeft: '5%'}}>
                  <Ionicons
                    name="md-arrow-back"
                    color="#333333"
                    size={30}
                  onPress={ () => { this.props.navigator.pop() } } />
                </View>
              </View>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center'}}>
              <View style={{
                alignSelf:'flex-start',
                marginTop: '5%',
                marginLeft: '5%'}}>
                <Ionicons
                  name="md-arrow-back"
                  color="#fff"
                  size={30}
                  onPress={ () => { this.props.navigator.pop() } } />
              </View>
            </View>
          )}
        >
          <TriggeringView
            style={styles.section}
            onHide={() => this.navTitleView.fadeInUp(200)}
            onDisplay={() => this.navTitleView.fadeOut(100)}
          >
            <HTML html={this.props.selectedPost.title.rendered} baseFontStyle={styles.sectionTitle}/>

          </TriggeringView>

          <View style={[styles.section,styles.sectionDetails]}>
            <View style={{flexGrow: 1, alignSelf:'center'}}>
                <Text style={styles.name}>Publié le {Moment(published).format('d MMM YYYY')}</Text>
            </View>
            <View>
                <Ionicons
                  name="ios-heart"
                  size={30}
                  color={this.state.colorIcon}
                  onPress={() => saved
                    ?this.removeBookmark()
                    :this.addBookmark()}
                />
            </View>
            <TouchableOpacity onPress={this.sharePost} style={{marginLeft: '5%'}}>
              <View>
                <Ionicons
                  name="md-share"
                  size={30}
                  color='#192444'
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.section,{elevation:2}]}>
            <HTML
              html={this.props.selectedPost.content.rendered}
              baseFontStyle={styles.sectionContent}
              tagsStyles={tagsStyle}
              alterChildren = { (node) => {
                  if (node.name === 'iframe') {
                      delete node.attribs.width;
                      delete node.attribs.height;
                  }
                  return node.children;
              }}
              staticContentMaxWidth={Dimensions.get('window').width-'2.5%'}
              imagesMaxWidth={Dimensions.get('window').width}
            />
          </View>
          {readMore}
        </HeaderImageScrollView>
      </View>
      );
    }
  }


  var tagsStyle = {
    a: {
      color: '#192444',
      textDecorationLine: 'none',
    },
    strong: {
      fontFamily:'CrimsonText-SemiBold',
      fontSize:14
    }
  }

  const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    color: '#192444'
  },
  name: {
    color: '#192444',
    fontFamily:'CrimsonText-SemiBold',
    fontSize: 16
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
    backgroundColor: '#F3F2F2',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#192444',
    fontFamily: 'Montserrat-Bold'
  },
  sectionContent: {
    fontSize: 18,
    textAlign: 'justify',
    color: '#192444',
    fontFamily:'CrimsonText-Regular',
  },
  navTitleView: {
    height: MIN_HEIGHT,
    opacity: 0,
    alignItems: 'center',
    backgroundColor: '#F3F2F2',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  navTitle: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sectionLarge: {
    height: 600,
  },
  sectionDetails: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'flex-start'
  }
});


  export default PostDetailScreen;
