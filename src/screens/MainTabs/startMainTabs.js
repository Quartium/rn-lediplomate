import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconEntypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const startTabs = () => {
    Promise.all([
        Ionicons.getImageSource("md-home", 30),
        IconEntypo.getImageSource("grid", 30),
        IconFoundation.getImageSource("torsos-all", 30),
        Ionicons.getImageSource("ios-search", 30),
        Ionicons.getImageSource("ios-heart", 30),
        Ionicons.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "diplomate.NewsScreen",
                    title: "Accueil",
                    icon: sources[0],
                    navigatorButtons: {
                      leftButtons: [
                        {
                          icon: sources[5],
                          title: "Menu",
                          id: "sideDrawerToggle"
                        }
                      ]
                    }
                },
                {
                    screen: "diplomate.CategoryScreen",
                    title: "Categories",
                    icon: sources[1],
                    navigatorButtons: {
                      leftButtons: [
                        {
                          icon: sources[5],
                          title: "Menu",
                          id: "sideDrawerToggle"
                        }
                      ]
                    }
                },
                {
                    screen: "diplomate.PoliticsScreen",
                    title: "Partis Politiques",
                    icon: sources[2],
                    navigatorButtons: {
                      leftButtons: [
                        {
                          icon: sources[5],
                          title: "Menu",
                          id: "sideDrawerToggle"
                        }
                      ]
                    }
                },
                {
                    screen: "diplomate.SearchScreen",
                    title: "Recherche",
                    icon: sources[3],
                },
                {
                    screen: "diplomate.BookmarkScreen",
                    title: "Bookmark",
                    icon: sources[4],
                    navigatorButtons: {
                      leftButtons: [
                        {
                          icon: sources[5],
                          title: "Menu",
                          id: "sideDrawerToggle"
                        }
                      ]
                    }
                }
            ],
            appStyle: {
              tabBarBackgroundColor: '#192444',
              tabBarButtonColor: '#F3F2F2',
              tabBarSelectedButtonColor: '#D91F3C',
            },
            drawer: {
              left: {
                screen: "diplomate.SideDrawer"
              }
            }
        });
    });
};

export default startTabs;
