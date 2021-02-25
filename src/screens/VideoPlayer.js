
import React, { useState, useRef } from 'react';
import { StyleSheet, View, Platform, Text ,TouchableHighlight} from 'react-native';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Feather from 'react-native-vector-icons/Feather';

// const screenHeight = Dimensions.get('screen').height;
// const screenWidth = Dimensions.get('screen').width;

// import Our constants propeties module
import { dimensions , _getShadows } from '../constant/constants';

const screenHeight = dimensions.fullHeight;
const screenWidth = dimensions.fullWidth;

const VideoPlayer = () => {
    const video = require('../assets/abc.mp4');
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
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
    const [isLoading, setIsLoading] = useState(true);

    // This function is triggered when the user released the player slider.
    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    // This function is triggered when the user interact with the player slider.
    const onSeeking = (currentVideoTime) => setCurrentTime(currentVideoTime);

    // This function is triggered when the play/pause button is pressed.
    const onPaused = (newState) => {
        setPaused(!paused);
        setPlayerState(newState);
    };

    /**
     * This function is triggered when the replay button is pressed.
     * There is a minmial bug on Android devices that does not allow the player to replay the video if changing the state to PLAYING, so we have to use the 'Platform' to fix that.
     */
    const onReplay = () => {
        videoPlayer?.current.seek(0);
        setCurrentTime(0);
        if (Platform.OS === 'android') {
            setPlayerState(PLAYER_STATES.PAUSED);
            setPaused(true);
        } else {
            setPlayerState(PLAYER_STATES.PLAYING);
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
        setPlayerState(PLAYER_STATES.ENDED);
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

    const backgroundVideo = {
        height : isFullScreen ? '100%' : 300,
        width: '100%',
    }
    const frontShadowLayer01={
        position : 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
        alignItems: 'center',

        top: '125%', 
        left: '12%',
          
        
    }

     const  frontShadowLayer02 = {
        position : 'absolute',
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,0,0,0)',
        justifyContent: 'center',
          alignItems: 'center',
        
          top: '125%', 
          right : '12%'
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
                // source={{uri : 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4'}}
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
                mainColor={'red'}
                playerState={playerState}
                style={isFullScreen ? styles.backgroundVideoFullScreen :backgroundVideo}
                // sliderStyle={isFullScreen ? { containerStyle: styles.mediaControls, thumbStyle: {}, trackStyle: {} } : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            >

                <MediaControls.Toolbar>
                    
                    <TouchableHighlight onPress={()=> console.log('clicked 1')}   style={frontShadowLayer01}  underlayColor= 'rgba(0,0,0,0.2)' >
                        <View>
                            <Feather name="chevrons-left" style={{ fontSize : 48, color : 'rgba(0,0,0,0.9)'}}/>
                        </View>
                    </TouchableHighlight>
                    
                    <TouchableHighlight onPress={()=> console.log('clicked 2')}   style={frontShadowLayer02}  underlayColor= 'rgba(0,0,0,0.2)' >
                        <View>
                            <Feather name="chevrons-right" style={{ fontSize : 48, color : 'rgba(0,0,0,0.9)'}}/>
                        </View>
                    </TouchableHighlight>
                            
                </MediaControls.Toolbar>

            </MediaControls>




         

{/* 
            {
                isLoading ?
                    <>

                        <TouchableHighlight onPress={()=> console.log('clicked 1')}   style={frontShadowLayer01}  underlayColor= 'rgba(0,0,0,0.1)' >
                        <View>
                            <Feather name="chevrons-left" style={{ fontSize : 48, color : 'rgba(0,0,0,0.4)'}}/>
                        </View>
                      </TouchableHighlight>
            
                    <TouchableHighlight onPress={()=> console.log('clicked 2')}   style={frontShadowLayer02}  underlayColor= 'rgba(0,0,0,0.1)' >
                        <View>
                            <Feather name="chevrons-right" style={{ fontSize : 48, color : 'rgba(0,0,0,0.4)'}}/>
                        </View>
                    </TouchableHighlight>



                    </>   : null
            }
             */}



       
 

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        ..._getShadows,
        borderWidth: 0.2,
        borderColor : 'rgba(0,0,0,0.5)'
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