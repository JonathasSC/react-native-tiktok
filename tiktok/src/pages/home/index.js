import { View, StyleSheet, Text } from "react-native";

export function Home(){
    return (
        <View style={styles.container}>
            <Text>Página Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})