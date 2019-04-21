import React, { Component } from 'react';
import { View, Text, Image, FlatList, ScrollView } from 'react-native';

import PostList from "../../components/PostList/PostList";


class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      posts: [],
    };
  }

  onNavigatorEvent = event => {
      if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
              this.props.navigator.toggleDrawer({
                  side: "left"
              });
          }
      }
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
         posts:[postsMain,postsTunisie,postsMondeArabe,postsEurope,postsAmerique,
           postsAfrique,postsAsie,postsFiguresHistoriques,postsSuccessStory,postsStartups],
       })
     });

    // fetch('https://www.lediplomate.tn/wp-json/wp/v2/posts/?filter[posts_per_page]=4&_embed')
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   this.setState({
    //     posts:responseJson,
    //   })
    // })
    // .catch((error) => {
    // console.error(error);
    // });
  }

  itemSelectedHandler = key => {
    // const selPost = this.state.posts.find(post => {
    //   return post.id === key;
    // });

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

  render () {
    console.log(this.state.posts);
    main = (
      <PostList
        posts={this.state.posts[0]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    tunisie = (
      <PostList
        posts={this.state.posts[1]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    mondeArabe = (
      <PostList
        posts={this.state.posts[2]}
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
      <PostList
        posts={this.state.posts[4]}
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
      <PostList
        posts={this.state.posts[6]}
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
      <PostList
        posts={this.state.posts[8]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    startups = (
      <PostList
        posts={this.state.posts[9]}
        onItemSelected={this.itemSelectedHandler}
      />
    );

    return (
      <View>
      <ScrollView>
        <View>
          <View>
            <Text>À la une</Text>
          </View>
          {main}
        </View>
        <View>
          <View>
            <Text>Tunisie</Text>
          </View>
          {tunisie}
        </View>
        <View>
          <View>
            <Text>Monde Arabe</Text>
          </View>
          {mondeArabe}
        </View>
        <View>
          <View>
            <Text>Europe</Text>
          </View>
          {europe}
        </View>
        <View>
          <View>
            <Text>Ameriques</Text>
          </View>
          {ameriques}
        </View>
        <View>
          <View>
            <Text>Afrique</Text>
          </View>
          {afrique}
        </View>
        <View>
          <View>
            <Text>Asie</Text>
          </View>
          {asie}
        </View>
        <View>
          <View>
            <Text>Figures Historiques</Text>
          </View>
          {figuresHistoriques}
        </View>
        <View>
          <View>
            <Text>Success Story</Text>
          </View>
          {successStory}
        </View>
        <View>
          <View>
            <Text>Startups</Text>
          </View>
          {startups}
        </View>
      </ScrollView>
      </View>
    );

    // const postImage = this._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    // console.log(postImage);
    // if (this.state.isLoading==true) {
    //   return(
    //     <View>
    //       <Text>isLoading</Text>
    //     </View>
    //   )
    // }else{
    //   return (
    //     <FlatList
    //       onEndReachedThreshold="0"
    //       data={this.state.posts}
    //       renderItem={( item ) => (
    //         <View>
    //           <Text>{item.title.rendered}</Text>
    //           <Image source={{uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}}/>
    //         </View>
    //       )}
    //       keyExtractor={(item,index) => (item.id).toString()}
    //     />
    //   )
    // }
  }
}

export default NewsScreen;
