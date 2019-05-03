import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet,Text, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import ImageOverlay from "react-native-image-overlay";

import NavBar from "../../components/NavBar/NavBar";

class PoliticsScreen extends Component {
  constructor(props) {
      super(props);
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
      this.state = {
        categories: [],
        isLoading: true
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

    static navigatorStyle = {
      navBarHidden: true
    };

    toggleDrawer() {
          this.props.navigator.toggleDrawer({
              side: 'left',
              animated: true
          });
      }

    componentDidMount() {
      fetch('https://www.lediplomate.tn/wp-json/wp/v2/categories?per_page=100&_fields=id,name,img')
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson.filter((item) => item.img != false).map(({id, name, img}) => ({id, name, img}));
        this.setState({
          isLoading: false,
          categories:data
        })
      })
      .catch((error) => {
      console.error(error);
      });
    }


      itemSelectedHandler = key => {
         const selCategory = Object.values(this.state.categories).find(category => {
           return category.id === key;
         });

        console.log(key);

        this.props.navigator.push({
          screen: "diplomate.CategoryPostsScreen",
          title: selCategory.name,
          passProps: {
           selectedCategory: selCategory
          }
        });
      };


    render() {
      console.log(this.state.categories);
      if (this.state.isLoading) {
       return (
         <View style={styles.ActivityIndicatorStyle}>
           <ActivityIndicator />
         </View>
       );
      }
      return (
        <View style={styles.fill}>
          <FlatList
            data={this.state.categories}
            contentContainerStyle={{
              flexDirection: 'column',
              paddingTop:'23%'
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.itemSelectedHandler(item.id)}>
              <View style={{margin: 5, elevation: 5}}>
                <View style={{}}>
                  <ImageOverlay
                    source={{ uri: item.img }}
                    rounded={5}
                    height={Dimensions.get('window').width / 2}
                    overlayColor="black"
                    overlayAlpha={0}
                    containerStyle={{width: Dimensions.get('window').width / 2.25}}>
                  </ImageOverlay>
                </View>
              </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => (item.id).toString()}
          />

          <NavBar
            Title="Partis Politiques"
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
    ActivityIndicatorStyle:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:'#F3F2F2'
    },
  });


export default PoliticsScreen;
