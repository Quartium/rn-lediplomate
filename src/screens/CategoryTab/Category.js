import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import NavBar from "../../components/NavBar/NavBar";

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state = {
      categories: {
        editorial: {id: 29, name: "Editorial"},
        opinions: {id: 55, name: "Opinions"},
        actualites: {id: 5, name: "Actualités"},
        dossiers: {id: 85, name: "Dossiers"},
        relationsInternationales: {id: 54, name: "Relations Internationales"},
        vieDiplomatique: {id: 12, name: "Vie Diplomatique"}
      }
    };
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

  onNavigatorEvent = event => {
      if (event.type === "NavBarButtonPress") {
          if (event.id === "sideDrawerToggle") {
              this.props.navigator.toggleDrawer({
                  side: "left"
              });
          }
      }
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

  render () {
      return (
        <View style={{flex: 1, backgroundColor:'#F3F2F2'}}>
          <ScrollView>
              <TouchableOpacity
                style={[styles.containerStyle,{marginTop:90}]}
                onPress={() => this.itemSelectedHandler(this.state.categories.editorial.id)}>
                 <View>
                   <Text style={styles.overlayed}>E.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.editorial.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerStyle}
                onPress={() => this.itemSelectedHandler(this.state.categories.opinions.id)}>
                 <View>
                  <Text style={styles.overlayed}>O.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.opinions.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerStyle}
                onPress={() => this.itemSelectedHandler(this.state.categories.actualites.id)}>
                 <View>
                   <Text style={styles.overlayed}>A.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.actualites.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerStyle}
                onPress={() => this.itemSelectedHandler(this.state.categories.dossiers.id)}>
                 <View>
                   <Text style={styles.overlayed}>D.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.dossiers.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerStyle}
                onPress={() => this.itemSelectedHandler(this.state.categories.relationsInternationales.id)}>
                 <View>
                   <Text style={[styles.overlayed,{left: '22%'}]}>RI.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.relationsInternationales.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerStyle}
                onPress={() => this.itemSelectedHandler(this.state.categories.vieDiplomatique.id)}>
                 <View>
                   <Text style={[styles.overlayed,{left: '20%'}]}>VD.</Text>
                   <Text style={styles.textStyle}>{this.state.categories.vieDiplomatique.name.toUpperCase()}</Text>
                 </View>
              </TouchableOpacity>
          </ScrollView>
          <NavBar
            Title="Catégories"
            Icon="ios-menu"
            customIconStyle= "#192444"
            onItemPressed={() => this.toggleDrawer()}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor:'#D91F3C',
    justifyContent:'center',
    borderRadius:10,
    height: 150,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 32,
    marginRight: 32,
  },
  textStyle: {
    color: '#F3F2F2',
    textAlign:'center',
    fontSize: 20,
    fontFamily: 'Rajdhani-Bold',
  },
  overlayed: {
    position: 'absolute',
    top: '-300%',
    left: '32%',
    fontSize: 150,
    fontFamily: 'Rajdhani-Bold',
    color: 'black',
    opacity: 0.3
  }
});

export default CategoryScreen;
