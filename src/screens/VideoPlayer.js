
import React, { useEffect , useState, useRef } from 'react';
import { StyleSheet, View, Platform, Text ,TouchableHighlight} from 'react-native';
// import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import MediaControls, { PLAYER_STATES } from '../components/react-native-media-controls_2.3.0/src/index.tsx';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const screenHeight = Dimensions.get('screen').height;
// const screenWidth = Dimensions.get('screen').width;

// import Our constants propeties module
import { dimensions , _getShadows } from '../constant/constants';

const screenHeight = dimensions.fullHeight;
const screenWidth = dimensions.fullWidth;





const VideoPlayer = ({url , vidWidth="100%" , vidHeight=300 } ) => {
  
    // const video = require('../assets/abc.mp4');
    let video=url
    const skipTime_seconds = 10;



    // We will use this hook to get video current time and change it throw the player bar.
    const videoPlayer = useRef(null);
    /**
     * The following useState hooks are created to control the vide duration, if the video
     * is paused or not, the current time video, if the player is PLAYING/PAUSED/ENDED and if the video
     * is loading.
     */
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(true);

    const [currentTime, setCurrentTime] = useState(0);
    // const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (currentTime === duration) {
            videoPlayer?.current.seek(0);
            setPaused(true)
        }
    }, [currentTime])




    // This function is triggered when the user released the player slider.
    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
        
    };

    // This function is triggered when the user interact with the player slider.
    const onSeeking = (currentVideoTime) => {
        setCurrentTime(currentVideoTime);
    }

    // This function is triggered when the play/pause button is pressed.
    const onPaused = (newState) => {
        setPaused(!paused);
        // setPlayerState(newState);
    };

    /**
     * This function is triggered when the replay button is pressed.
     * There is a minmial bug on Android devices that does not allow the player to replay the video if changing the state to PLAYING, so we have to use the 'Platform' to fix that.
     */
    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            // setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            // setPlayerState(PLAYER_STATES.PLAYING);
            setPaused(false);
        }
    };

    // This function is triggered while the video is playing.
    const onProgress = (data) => {
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    /**
     * This function and the next one allow us doing something while the video is loading.
     * For example we could set a preview image while this is happening.
     */
    const onLoad = (data) => {
        setDuration(Math.round(data.duration));
        setIsLoading(false);
    };

    const onLoadStart = () => setIsLoading(true);

    // This function is triggered when the player reaches the end of the media.
    const onEnd = () => {
        // setPlayerState(PLAYER_STATES.ENDED);
        setCurrentTime(duration);
    };

    // useState hook to check if the video player is on fullscreen mode

    const [isFullScreen, setIsFullScreen] = useState(false);

    // This function is triggered when the user press on the fullscreen button or to come back from the fullscreen mode.
    const onFullScreen = () => {
        if (!isFullScreen) {
            Orientation.lockToLandscape();
        } else {
            if (Platform.OS === 'ios') {
                Orientation.lockToPortrait();
            }
            Orientation.lockToPortrait();
        }
        setIsFullScreen(!isFullScreen);
    };


    // for backword button
    const goBackword = () =>{
        let newTime = (duration-10) > 0 ? currentTime - skipTime_seconds : currentTime;
        //call the onSeek function with update time
        onSeek(newTime);

    }
    // for forwad button
    const goForward= () =>{
        let newTime = (duration-10) >currentTime ? currentTime + skipTime_seconds : currentTime;
        //call the onSeek function with update time
        onSeek(newTime);
    }

    

    // for style the components
    const backgroundVideo = {
        height : isFullScreen ? '100%' :vidHeight,
        width: vidWidth,
    }

    // for style the components
    const frontShadowLayer01={
        position : 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        top: isFullScreen ? '208%' : '201%',
        left: isFullScreen ? '27%' : '26%',
        padding: 10,
        paddingHorizontal : 18,
    }

    // for style the components
     const  frontShadowLayer02 = {
        position : 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        top: isFullScreen ? '207%' : '201%',
        right : isFullScreen ? '27%' : '26%',
        padding: 10,
        paddingHorizontal : 18,
    }

     // for style the components
     const  frontShadowLayer03 = {
        position : 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',
        top:  !isFullScreen ?'190%' : '199%',
        right :  !isFullScreen ?'40%' : '45%',
        paddingBottom : 20,
        paddingTop : 20,
        paddingHorizontal : 25,
    }

    return (
        <View style={styles.container}>   
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                posterResizeMode={'cover'}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={isFullScreen ? 'contain' : 'cover'}
                source={video}
                style={backgroundVideo}
            />
            <MediaControls
                isFullScreen={isFullScreen}
                duration={duration}
                isLoading={isLoading}
                progress={currentTime}
                onFullScreen={onFullScreen}
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                mainColor={'rgba(0,0,0,0)'}
                style={isFullScreen ? styles.backgroundVideoFullScreen :backgroundVideo}
                // sliderStyle={isFullScreen ? { containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            >

                <MediaControls.Toolbar>
            {/* forwad and backword buttons         */}
                    <TouchableHighlight onPress={ goBackword }   style={frontShadowLayer01}  underlayColor= 'rgba(0,0,0,0.2)' >
                        <View>
                            <MaterialCommunityIcons name="rewind-10" style={{ fontSize : 25, color : 'rgba(255,255,255,0.9)'}}/>
                        </View>
                    </TouchableHighlight>
                    
                    <TouchableHighlight onPress={ goForward }   style={frontShadowLayer02}  underlayColor= 'rgba(0,0,0,0.2)' >
                        <View>
                            <MaterialCommunityIcons name="fast-forward-10" style={{ fontSize : 25, color : 'rgba(255,255,255,0.9)'}}/>
                        </View>
                    </TouchableHighlight>

                     <TouchableHighlight onPress={ onPaused }   style={frontShadowLayer03}  underlayColor= 'rgba(0,0,0,0.2)' >
                        <View>
                            <MaterialCommunityIcons name={ !paused ? "drag-vertical-variant" : "play"} style={{ fontSize : 30, color : 'rgba(255,255,255,0.9)'}}/>
                        </View>
                    </TouchableHighlight>
                            
                </MediaControls.Toolbar>

            </MediaControls>



        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth : 1,
        borderColor: 'rgba(0,0,0,0.5)',
        paddingVertical : 0,
        paddingHorizontal : 0,
       
    },
 
    mediaControls: {
        width: screenHeight - 170,
        height: '100%',
        flex: 1,
        alignSelf: Platform.OS === 'android' ? screenHeight < 800 ? 'center' : 'flex-start' : 'center',
    },
    backgroundVideoFullScreen: {
        height: screenHeight,
        width: screenWidth,
        // height: dimensions.fullHeight,
        // width : dimensions.fullWidth,
    },

});


export default VideoPlayer