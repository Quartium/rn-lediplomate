import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';


class SearchScreen extends Component {
  constructor(props) {
      super(props);
      //setting default state
      this.state = { isLoading: true, text: '' };
      this.arrayholder = [];
    }

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
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
        />
      );
    };

    renderHeader = () => {
     return (
       <SearchBar
         placeholder="Type Here..."
         lightTheme
         round
         onChangeText={text => this.searchFilterFunction(text)}
         autoCorrect={false}
         value={this.state.text}
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
      if (this.state.loading) {
       return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ActivityIndicator />
         </View>
       );
      }
      return (
        //ListView to show with textinput used as search bar
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <ListItem
                leftAvatar={{ source: { uri: item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url } }}
                title={item.title.rendered}
                onPress={() => this.itemSelectedHandler(item.id)}
              />
            )}
            keyExtractor={item => (item.id).toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            enableEmptySections={true}
          />
        </View>
      );
    }
  }

export default SearchScreen;
