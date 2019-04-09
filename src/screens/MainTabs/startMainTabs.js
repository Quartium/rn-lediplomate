import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("ios-book", 30),
        Icon.getImageSource("md-journal", 30),
        Icon.getImageSource("ios-search", 30),
        Icon.getImageSource("ios-bookmark", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "diplomate.NewsScreen",
                    label: "News",
                    title: "News",
                    icon: sources[0],
                },
                {
                    screen: "diplomate.CategoryScreen",
                    label: "Category",
                    title: "Category",
                    icon: sources[1],
                },
                {
                    screen: "diplomate.SearchScreen",
                    label: "Search",
                    title: "Search",
                    icon: sources[2],
                },
                {
                    screen: "diplomate.BookmarkScreen",
                    label: "Bookmark",
                    title: "Bookmark",
                    icon: sources[3],
                }
            ]
        });
    });
};

export default startTabs;
