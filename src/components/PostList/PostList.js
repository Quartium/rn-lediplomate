import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const postList = props => {
  return (
    <FlatList
      data={props.posts}
      renderItem={(info) => (
        <ListItem
          postName={info.item.title.rendered}
          postImage={{uri: info.item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url}}
          onItemPressed={() => props.onItemSelected(info.item.id)}
        />
      )}
      keyExtractor={(info,index) => (info.id).toString()}
    />
  );
};

export default postList;
