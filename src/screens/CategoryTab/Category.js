import React, { Component } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';

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
        relationsInternationales: {id: 54, name: "Relations internationales"},
        vieDiplomatique: {id: 12, name: "Vie diplomatique"}
      }
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
      editorial = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.editorial.id)}>
           <View>
             <Text>{this.state.categories.editorial.name}</Text>
           </View>
        </TouchableOpacity>
      );

      opinions = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.opinions.id)}>
           <View>
             <Text>{this.state.categories.opinions.name}</Text>
           </View>
        </TouchableOpacity>
      );

      actualites = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.actualites.id)}>
           <View>
             <Text>{this.state.categories.actualites.name}</Text>
           </View>
        </TouchableOpacity>
      );

      dossiers = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.dossiers.id)}>
           <View>
             <Text>{this.state.categories.dossiers.name}</Text>
           </View>
        </TouchableOpacity>
      );

      relationsInternationales = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.relationsInternationales.id)}>
           <View>
             <Text>{this.state.categories.relationsInternationales.name}</Text>
           </View>
        </TouchableOpacity>
      );

      vieDiplomatique = (
        <TouchableOpacity onPress={() => this.itemSelectedHandler(this.state.categories.vieDiplomatique.id)}>
           <View>
             <Text>{this.state.categories.vieDiplomatique.name}</Text>
           </View>
        </TouchableOpacity>
      );

        return (
          <View style={{flex: 1}}>
          <ScrollView>
            <View>
              {editorial}
            </View>
            <View>
              {opinions}
            </View>
            <View>
              {actualites}
            </View>
            <View>
              {dossiers}
            </View>
            <View>
              {relationsInternationales}
            </View>
            <View>
              {vieDiplomatique}
            </View>
          </ScrollView>
          </View>
        );
    }
}

export default CategoryScreen;
