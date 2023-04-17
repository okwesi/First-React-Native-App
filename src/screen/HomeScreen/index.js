import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, IconButton } from "@react-native-material/core";
import { colors } from '../../lib/constant/colors';
import AppHeader from '../../lib/components/AppHeader';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import NewsCard from '../../lib/components/NewsCard';
import axios from 'axios';


const HomeScreen = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        // Fetch data from API
        setLoading(true);
        axios
            .get('https://newsapi.org/v2/top-headlines?country=us&apiKey=6de1f55b35c84528945092be6da07ab2')
            .then(response => {
                setData(response.data["articles"]);
                // console.log(response.data["articles"]);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .then(() => {
                // Stop loading
                setLoading(false);
            });

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                title=<Text style={{ fontSize: 20 }}>CoinStelly</Text>
                leading=<IconButton icon={props => <Icon name="menu" size={20} />} />
                trailing=<IconButton icon={props => <Icon name="bell-alert" size={20} />} />
            />
            {loading ?
                <View style={[styles.activityIndicator, styles.horizontal]}>
                    <ActivityIndicator size="large" color={colors.black} />
                </View>
                : null
            }
            {data ? (
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <NewsCard
                            navigation={navigation}
                            title={item.title}
                            publishedAt={item.publishedAt}
                            source={item.source["name"]}
                            description={item.description}
                            image={item.urlToImage}
                            content={item.content}
                        />
                    )}
                    keyExtractor={(item) => item.title}
                />
            ) : (
                <Text>Loading...</Text>
            )}


        </SafeAreaView>
    );
};



export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollConntainer: {
        backgroundColor: colors.white,
        paddingTop: 20,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});
