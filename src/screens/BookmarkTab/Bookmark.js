import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { ListView } from 'realm/react-native';
import HTML from 'react-native-render-html';
import Moment from "moment";
import ImageOverlay from "react-native-image-overlay";
import Icon from 'react-native-vector-icons/Ionicons';

const NAVBAR_HEIGHT = 64;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 20, android: 24 });
const AnimatedListView = Animated.createAnimatedComponent(ListView);
const Realm = require('realm');

let realm = new Realm({ path: 'PostDatabase.realm' });

class BookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      ),
    };
  }

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

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
       categories: [75],
       link: final[0].link
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

  componentDidMount() {
    this.fetchData();
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT - STATUS_BAR_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > NAVBAR_HEIGHT &&
      this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2
      ? this._offsetValue + NAVBAR_HEIGHT
      : this._offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  _renderRow = (rowData, sectionId, rowId) => {
    return (
      <View style={styles.ImageOverlay}>
        <TouchableOpacity onPress={() => this.itemSelectedHandler(rowData.id)}>
          <View>
            <ImageOverlay
              source={{ uri: rowData.image }}
              rounded={5}
              height={150}
              overlayColor="black"
              overlayAlpha={0.35}
              contentPosition="center"
              containerStyle={styles.containerStyle}>
              <View style={styles.containerDetails}>
                <View style={{alignSelf:'flex-end', marginTop: 10, marginRight: 10}}>
                  <Icon
                    name="ios-heart"
                    color="#D91F3C"
                    size={30}
                    onPress={() => this.delete_Post(rowData.id)}
                  />
                </View>
                <View style={{alignSelf:'flex-start', marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                  <HTML html={rowData.name} baseFontStyle={{color:'white', fontFamily:'Montserrat-Bold', fontSize:13}}/>
                  <Text style={{color:'white', fontFamily:'CrimsonText-SemiBold', fontSize:14}}>Publié le {Moment(rowData.date).format('d MMM YYYY')}</Text>
                </View>
              </View>
            </ImageOverlay>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [0, -(NAVBAR_HEIGHT - STATUS_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });
    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT - STATUS_BAR_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.fill}>
        {this.state.dataSource._cachedRowCount > 0 // condition
          ? // if true
          <AnimatedListView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            scrollEventThrottle={1}
            onMomentumScrollBegin={this._onMomentumScrollBegin}
            onMomentumScrollEnd={this._onMomentumScrollEnd}
            onScrollEndDrag={this._onScrollEndDrag}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              { useNativeDriver: true },
            )}
          />
          : // if false
          <View style={styles.emptyIcon}>
            <Icon
              name="md-heart-empty"
              color="#d91f3c"
              size={200}/>
            <Text style={styles.emptyText}>Les posts que vous avez enregistrés apparaitront ici</Text>
          </View>
        }
        <Animated.View style={[styles.navbar, { transform: [{ translateY: navbarTranslate }], paddingBottom: 20 }]}>
          <View style={styles.navbarContainer}>
            <Animated.Text style={[styles.icon, {opacity: navbarOpacity}]}>
              <Icon
                name="ios-menu"
                color="#192444"
                size={30}
                onPress={() => this.toggleDrawer()}/>
            </Animated.Text>
            <Animated.Text style={[styles.title,{opacity: navbarOpacity}]}>
              Bookmark
            </Animated.Text>
          </View>
        </Animated.View>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%'
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: '#F3F2F2',
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    height: NAVBAR_HEIGHT,
    justifyContent: 'center',
    paddingTop: STATUS_BAR_HEIGHT,
  },
  contentContainer: {
    paddingTop: NAVBAR_HEIGHT + 30
  },
  navbarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginLeft: '5%'
  },
  title: {
    color: '#192444',
    flex: 1,
    marginRight: '10%',
    textAlign:'center',
    fontFamily: 'Rajdhani-Bold',
    fontSize:18
  },
  containerStyle: {
    width: '95%',
    marginBottom: 30,
  },
  containerDetails: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emptyIcon: {
    justifyContent:'center',
    alignSelf:'center',
    flex: 1,
    alignItems:'center'
  },
  emptyText: {
    fontFamily:'Montserrat-Medium',
    color:'#d91f3c',
    margin: '5%',
    textAlign:'center',
    fontSize:18
  }

});

export default BookmarkScreen;
