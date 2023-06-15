import { 
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    TouchableOpacity,
    Platform
} from "react-native"

import { useRef, useState, useEffect } from "react"
import { Video } from 'expo-av'

import Ionicons from '@expo/vector-icons/Ionicons';



const { height: heightScreen } = Dimensions.get("screen")

export function FeedItem({ data, currentVisibleItem }){
    const video = useRef(null);
    const [status, setStatus] = useState({})
    
    useEffect(() => {
        if(currentVisibleItem?.id === data?.id){
            video.current?.playAsync();
        } else {
            video.current?.pauseAsync();
        }

    }, [currentVisibleItem])

    function handlerPlayer(){
        status.isPlaying ? video.current?.pauseAsync() : video.current.playAsync()
    }

    return (
        <Pressable onPress={handlerPlayer}>
            <View style={[styles.info, {bottom: 100}]}>
                <Text style={styles.name}>
                    {data?.name}
                </Text>

                <Text numberOfLines={2} style={styles.description}>
                    {data?.description}
                </Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionsRightButton}>
                    <Ionicons name="heart" size={35} color='#fff'/>
                    <Text style={styles.labelRight}>30.3k</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionsRightButton}>
                    <Ionicons name="chatbubble-ellipses" size={35} color='#fff'/>
                    <Text style={styles.labelRight}>23</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionsRightButton}>
                    <Ionicons name="bookmark" size={35} color='#fff'/>
                </TouchableOpacity>
            </View>
            <Video
            ref={video}
            style={{width: '100%', height: heightScreen}}
            source={{uri: data.video }}
            resizeMode="cover"
            shouldPlay= {false}
            isMuted= {false}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    info: {
        position: 'absolute',
        padding: 8,
        zIndex: 99,
        left: 8,
    },
    name: {
        color: '#fff',
        marginBottom: 4,
        fontWeight: 'bold',
        textShadowRadius: 8,
        textShadowColor: 'rgba(0,0,0, 0.70)',
        textShadowOffset: { width: -1, height: 1.5},
    },
    description: {
        color: '#fff',
        marginRight: 50,
        textShadowRadius: 8,
        textShadowColor: 'rgba(0,0,0, 0.70)',
        textShadowOffset: { width: -1, height: 1.5},
    },
    actions: {
        position: 'absolute',
        zIndex: 99,
        right: 0,
        gap: 0,
        bottom: Platform.OS === 'android' ? 120 : 170,
    },
    labelRight: {
        color: '#fff',
        textAlign: 'center'
    }
})