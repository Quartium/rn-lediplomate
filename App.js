import React, {Component} from 'react';
import {Text, View} from 'react-native';
import { Navigation } from "react-native-navigation";

import HomeScreen from "./src/screens/Landing/Landing";
import NewsScreen from "./src/screens/NewsTab/News";
import CategoryScreen from "./src/screens/CategoryTab/Category";
import CategoryPostsScreen from "./src/screens/CategoryPosts/CategoryPosts";
import SearchScreen from "./src/screens/SearchTab/Search";
import BookmarkScreen from "./src/screens/BookmarkTab/Bookmark";
import PostDetailScreen from "./src/screens/PostDetail/PostDetail";


Navigation.registerComponent(
  "diplomate.LandingScreen",
  () => HomeScreen,
);

Navigation.registerComponent(
  "diplomate.NewsScreen",
  () => NewsScreen,
);

Navigation.registerComponent(
  "diplomate.CategoryScreen",
  () => CategoryScreen,
);

Navigation.registerComponent(
  "diplomate.CategoryPostsScreen",
  () => CategoryPostsScreen,
);

Navigation.registerComponent(
  "diplomate.SearchScreen",
  () => SearchScreen,
);

Navigation.registerComponent(
  "diplomate.BookmarkScreen",
  () => BookmarkScreen,
);

Navigation.registerComponent(
  "diplomate.PostDetailScreen",
  () => PostDetailScreen,
);

Navigation.startSingleScreenApp({
  screen: {
    screen: "diplomate.LandingScreen",
    title: "LandingScreen"
  }
});
