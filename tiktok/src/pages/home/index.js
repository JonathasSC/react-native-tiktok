import { 
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Platform,
    TouchableOpacity,
    Dimensions
} from "react-native";

import { useState , useRef } from "react";
import { FeedItem } from "../../components/feedItem";

export function Home(){

    let feedItems = [ 
        {
          id: '1', 
          video: 'https://i.imgur.com/Cnz1CPK.mp4',
          name: '@sujeitoprogramador',
          description: 'Criando o ShortDev do zero com RN',
         },
        {
          id: '2', 
          video: 'https://i.imgur.com/E0tK2bY.mp4',
          name: '@henriquesilva',
          description: 'Fala turma, estou aprendendo React Native com sujeito programador',
         },
        {
          id: '3', 
          video: 'https://i.imgur.com/mPFvFyX.mp4',
          name: '@sujeitoprogramador',
          description: 'Aprendendo a trabalhar com Drag and Drop no React Native',
        }
    ]

    const {height: heightScreen} = Dimensions.get("screen")

    const [showItem, setShowItem] = useState(feedItems[0])
    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems && viewableItems.length > 0){
            setShowItem(feedItems[viewableItems[0].index])
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.label}>
                <TouchableOpacity>
                    <Text style={[styles.labelText, {color: "#ddd"}]}>Seguindo</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text  style={[styles.labelText, {color: "#fff"}]}>Para você</Text>
                    <View style={styles.labelUnderline}></View>
                </TouchableOpacity>
            </View>

            <FlatList
                data={feedItems}
                renderItem={
                    ({ item }) => 
                        <FeedItem data={item} currentVisibleItem={showItem}/>
                    }
                onViewableItemsChanged={onViewRef.current}
                snapToAlignment='center'
                snapToInterval={heightScreen}
                scrollEventThrottle={200}
                decelerationRate={"fast"}
                viewabilityConfig={{
                    waitForInteraction: false,
                    viewAreaCoveragePercentThreshold: 100
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'absolute',
        top: 6,
        left: 0,
        right: 0,
        marginTop:
            Platform.OS === 'android' ? StatusBar.currentHeight+5 : 55,
        zIndex: 99,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 4,
    },
    labelUnderline: {
        height: 2,
        width: 32,
        alignSelf: 'center',
        backgroundColor: "#fff"
    }
})