import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-book", 30),
        Icon.getImageSource("md-journal", 30),
        Icon.getImageSource("ios-search", 30),
        Icon.getImageSource("ios-bookmark", 30),
        Icon.getImageSource("ios-menu", 30)
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
                          icon: sources[4],
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
                          icon: sources[4],
                          title: "Menu",
                          id: "sideDrawerToggle"
                        }
                      ]
                    }
                },
                {
                    screen: "diplomate.SearchScreen",
                    title: "Recherche",
                    icon: sources[2],
                },
                {
                    screen: "diplomate.BookmarkScreen",
                    title: "Bookmark",
                    icon: sources[3],
                    navigatorButtons: {
                      leftButtons: [
                        {
                          icon: sources[4],
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
