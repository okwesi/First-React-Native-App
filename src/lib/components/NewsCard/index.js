import { ScrollView, StyleSheet, View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import { colors } from "../../constant/colors";
import { Button } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
const NewsCard = ({
    title,
    description,
    image,
    url,
    source,
    publishedAt,
    content,
}) => {
    const navigation = useNavigation()
    const originalDate = publishedAt;
    const date = new Date(originalDate);

    const formattedDate = date.toLocaleString();
    return (
            <TouchableOpacity
                onPress={() => [
                    navigation.navigate('Details', {
                        title: title,
                        description: description,
                        image: image,
                        url: url,
                        source: source,
                        publishedAt: publishedAt,
                        content: content,
                    })
                ]}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} numberOfLines={1}>{description}</Text>
                        <Text style={styles.source}>{source}</Text>
                    <Text style={styles.publishedAt}>{formattedDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
    );
}

export default NewsCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    contentContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.black,
    },
    description: {
        fontSize: 14,
        color: colors.black,
    },
    source: {
        fontSize: 12,
        color: colors.black,
    },
    publishedAt: {
        fontSize: 12,
        color: colors.black,
    },
});
