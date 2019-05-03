import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native';
import ImageOverlay from "react-native-image-overlay";
import HTML from 'react-native-render-html';
import Moment from "moment";


import NavBar from "../../components/NavBar/NavBar";
import PostList from "../../components/PostList/PostList";
import ListPosts from "../../components/ListPosts/ListPosts";
import Label from "../../components/Label/Label";

class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      posts: [],
      isLoading: true,
    };
  }

  static navigatorStyle = {
    navBarHidden: true
  };

  onNavigatorEvent = event => {
      if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
              this.props.navigator.toggleDrawer({
                  side: "left"
              });
          }
      }
  }

  toggleDrawer() {
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    }

  componentDidMount() {
    const url= 'https://www.lediplomate.tn/wp-json/wp/v2';

    Promise.all([
      fetch(url+'/posts?filter[category_name]=a-la-une&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=tunisie&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=monde-arabe&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=europe&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=amerique&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=afrique&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=asie&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=figures-historiques&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=success-story&filter[posts_per_page]=3&_embed'),
      fetch(url+'/posts?filter[category_name]=startups&filter[posts_per_page]=3&_embed')
    ])

     .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10]) => {
        return Promise.all([
          res1.json(), res2.json(), res3.json(), res4.json(), res5.json(),
          res6.json(), res7.json(), res8.json(), res9.json(), res10.json()
        ])
     })
     .then(([res1, res2, res3, res4, res5, res6, res7, res8, res9, res10]) => {
       var postsMain = res1;
       var postsTunisie = res2
       var postsMondeArabe = res3;
       var postsEurope = res4;
       var postsAmerique = res5;
       var postsAfrique = res6;
       var postsAsie = res7;
       var postsFiguresHistoriques = res8;
       var postsSuccessStory = res9;
       var postsStartups = res10;
       this.setState({
         isLoading: false,
         posts:[postsMain,postsTunisie,postsMondeArabe,postsEurope,postsAmerique,
           postsAfrique,postsAsie,postsFiguresHistoriques,postsSuccessStory,postsStartups],
       })
     });
  }

  itemSelectedHandler = key => {
    const selItem = this.state.posts.filter((obj) => {
      for (let i = 0, length = obj.length; i < length; i++) {
        if (obj[i].id === key) {
          return(obj[i].id===key);
        }
      }
    });

    const selPost = selItem[0].find(post => {
      return post.id === key;
    });

    this.props.navigator.push({
      screen: "diplomate.PostDetailScreen",
      title: selPost.name,
      passProps: {
        selectedPost: selPost
      },
      tabBarVisible: false,
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
    console.log(this.state.posts);
    main = (
      <FlatList
        data={this.state.posts[0]}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        renderItem={(info) => (
          <View style={styles.ImageOverlay}>
            <TouchableOpacity onPress={() => this.itemSelectedHandler(info.item.id)}>
              <View>
                <ImageOverlay
                  source={{ uri: info.item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }}
                  rounded={5}
                  height={200}
                  overlayColor="black"
                  overlayAlpha={0.35}
                  contentPosition="center"
                  containerStyle={styles.containerStyle}>
                  <View style={styles.containerDetails}>
                    <View style={{alignSelf:'flex-start', marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                      <Text style={{color: 'white', fontFamily:'Rajdhani-Regular'}}>À la une</Text>
                      <HTML
                        html={info.item.title.rendered}
                        baseFontStyle={{
                          color:'white',
                          fontFamily: 'Montserrat-Bold',
                          color:'white',
                          fontSize:13
                        }}
                      />
                      <Text style={{color:'white', fontFamily:'CrimsonText-SemiBold', fontSize:14}}>Publié le {Moment(info.item.date_gmt).format('d MMM YYYY')}</Text>
                    </View>
                  </View>
                </ImageOverlay>
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(info,index) => (info.id).toString()}
      />
    );

    tunisie = (
      <PostList
        posts={this.state.posts[1]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    mondeArabe = (
      <ListPosts
        posts={this.state.posts[2]}
        renderSeparator={this.renderSeparator}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    europe = (
      <PostList
        posts={this.state.posts[3]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    ameriques = (
      <ListPosts
        posts={this.state.posts[4]}
        renderSeparator={this.renderSeparator}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    afrique = (
      <PostList
        posts={this.state.posts[5]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    asie = (
      <ListPosts
        posts={this.state.posts[6]}
        renderSeparator={this.renderSeparator}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    figuresHistoriques = (
      <PostList
        posts={this.state.posts[7]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    successStory = (
      <ListPosts
        posts={this.state.posts[8]}
        renderSeparator={this.renderSeparator}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    startups = (
      <PostList
        posts={this.state.posts[9]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    if (this.state.isLoading) {
     return (
       <View style={styles.ActivityIndicatorStyle}>
         <ActivityIndicator />
       </View>
     );
    }
    return (
      <View style={styles.fill}>
        <ScrollView>
          <View style={{marginTop:90, marginLeft:'5%'}}>
            {main}
          </View>
          <View style={{backgroundColor:'white', elevation:2}}>
            <Label name="Tunisie" />
            {tunisie}
          </View>
          <View style={{marginBottom:20}}>
            <Label name="Monde Arabe" />
            {mondeArabe}
          </View>
          <View style={{backgroundColor:'white', elevation:2}}>
            <Label name="Europe" />
            {europe}
          </View>
          <View style={{marginBottom:20}}>
            <Label name="Ameriques" />
            {ameriques}
          </View>
          <View style={{backgroundColor:'white', elevation:2}}>
            <Label name="Afrique" />
            {afrique}
          </View>
          <View style={{marginBottom:20}}>
            <Label name="Asie" />
            {asie}
          </View>
          <View style={{backgroundColor:'white', elevation:2}}>
            <Label name="Figures Historiques" />
            {figuresHistoriques}
          </View>
          <View style={{marginBottom:20}}>
            <Label name="Success Story" />
            {successStory}
          </View>
          <View style={{backgroundColor:'white', elevation:2}}>
            <Label name="Startups" />
            {startups}
          </View>
        </ScrollView>
        <NavBar
          Title="Accueil"
          Icon="ios-menu"
          customIconStyle= "#192444"
          onItemPressed={() => this.toggleDrawer()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: "#F3F2F2",
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageOverlay: {
    width: 250,
  },
  containerStyle: {
    width: '95%',
    marginBottom: 30,
  },
  containerDetails: {
    flex: 1,
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf:'flex-start'
  },
  ActivityIndicatorStyle:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#F3F2F2'
  },
});

export default NewsScreen;
