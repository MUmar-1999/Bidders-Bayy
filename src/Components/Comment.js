import { View, Text, Image, StyleSheet } from "react-native";
import { getTimeDifference, normalizeImage } from "../Utils/functions"
import { Color } from "./Shared/Color";

function Comment({ item }) {
    console.log("Co:::", JSON.stringify(item, null, 2));
    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={item.userId.dp ? {
                    uri: normalizeImage(item.userId.dp)
                } : require("../Images/dp.png")}
            />
            <View style={styles.textContainer}>
                <View style={styles.nameTime}>
                    <Text style={styles.profileTitle}>{`${item.userId.firstName} ${item.userId.lastName}`}</Text>
                    <Text style={styles.timeStamp
                    }>{getTimeDifference(item.timestamp)}</Text>
                </View>
                <Text style={styles.commentText}>{item.comment}</Text>
            </View>
        </View>
    );
}

export default Comment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        minHeight: 80,
        borderBottomWidth: 0.1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderColor: "#F2F3F4",
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
    },
    profileImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    profileTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    nameTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%"
    },
    timeStamp: {
        fontSize: 13,
        color: Color.grey
    },
    commentText: {
        fontSize: 16,
    },
});
