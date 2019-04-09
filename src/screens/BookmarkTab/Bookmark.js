import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
const Realm = require('realm');

import { ListView } from 'realm/react-native';



let realm = new Realm({ path: 'PostDatabase.realm' });

class BookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
          dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          })
      };
  }

   fetchData(itemsRef) {
     var post_details = realm.objects('Post');

       this.setState({
           dataSource: this.state.dataSource.cloneWithRows(post_details),
       });

       this.syncData(post_details);
   }

   syncData(post_details) {
      realm.addListener('change', () => {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(post_details),
        });
      });
   }

   componentDidMount() {
      this.fetchData();
   }

   itemSelectedHandler = key => {

     var all = realm.objects('Post');
     let filterPost = all.filtered('id =' + key);

     console.log(filterPost);
     let final = JSON.parse(JSON.stringify(filterPost));

     const selPost = {
        id: final[0].id,
        title: {
          "rendered": final[0].name
        },
        content: {
          "rendered": final[0].content
        },
        _embedded: {
          "wp:featuredmedia": [{
            "media_details": {
              "sizes": {
                "full": {
                  "source_url": final[0].image
                }
              },
            },
          }],
          "author": [{"name": "lediplomate"}],
        },
        date_gmt: final[0].date,
        categories: [75]
     }

     console.log(selPost);

     this.props.navigator.push({
       screen: "diplomate.PostDetailScreen",
       title: selPost.name,
       passProps: {
         selectedPost: selPost
       }
     });
   };

   delete_Post= (key) => {
       realm.write(() => {
         var all = realm.objects('Post');
         let filterPost = all.filtered('id =' + key);
         realm.delete(filterPost);
       });
   };

    render () {
        return (
            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={rowData => (
                  <TouchableOpacity onPress={() => this.itemSelectedHandler(rowData.id)}>
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                      <Text>Name: {rowData.name}</Text>
                      <Button title="delete" onPress={() => this.delete_Post(rowData.id)} />
                    </View>
                  </TouchableOpacity>
                )}
            />
            </View>
        );
    }
}

export default BookmarkScreen;
