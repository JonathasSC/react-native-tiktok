import { View, StyleSheet, Text } from "react-native";

export function Profile(){
    return (
        <View style={styles.container} >
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
})