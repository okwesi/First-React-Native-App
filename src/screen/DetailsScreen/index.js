import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../lib/constant/colors';
import { IconButton } from "@react-native-material/core";
import AppHeader from '../../lib/components/AppHeader';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from '@react-navigation/native';

const DetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const { title,
        description,
        image,
        url,
        source,
        publishedAt,
        content, } = route.params;

    const originalDate = publishedAt;
    const date = new Date(originalDate);

    const formattedDate = date.toLocaleString();

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                title=<Text style={{ fontSize: 20 }}>CoinStelly</Text>
                leading=<IconButton icon={props => <Icon name="arrow-left" size={20} onPress={() => navigation.goBack()} />} />
                trailing=<IconButton icon={props => <Icon name="share" size={20}  />} />
            />
            <ScrollView style={styles.scrollConntainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.source}>{source.name}</Text>
                    <Text style={styles.publishedAt}>{formattedDate}</Text>
                    <View style={styles.contentSpace}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>
                    <View style={styles.contentSpace}>
                        <Text style={styles.sectionTitle}>Content</Text>
                        <Text style={styles.content}>{content}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollConntainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    contentContainer: {
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000', // Updated title color
    },
    source: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 8,
    },
    publishedAt: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 8,
    },
    contentSpace: {
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000', // Updated section title color
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666', // Updated description color
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#000', // Updated content color
    },
});
