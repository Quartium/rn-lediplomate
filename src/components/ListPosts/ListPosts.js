import React from "react";
import { StyleSheet, FlatList } from "react-native";

import PostListing from "../PostListing/PostListing";

const listPosts = props => {
  return (
    <FlatList
      data={props.posts}
      style={props.style}
      renderItem={(info) => (
        <PostListing
          onItemPressed={() => props.onItemSelected(info.item.id)}
          image={{ uri: info.item._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }}
          title={info.item.title.rendered}
          content={info.item.excerpt.rendered}
        />
      )}
      ItemSeparatorComponent={props.renderSeparator}
      ListHeaderComponent={props.renderHeader}
      enableEmptySections={true}
      keyExtractor={(info,index) => (info.id).toString()}
    />
  );
};

export default listPosts;
