
import React from 'react'
import { Text, View } from 'react-native'
import VideoPlayer from './screens/VideoPlayer'


const App = () => {
  return (
    <View>
      
      <VideoPlayer
          url={{ uri: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4' }} 
          vidWidth={"100%"}
          vidHeight={300}
        />
          {/* vidWidth & vidHeight are Optianal */}
          {/*     1.  url='../../abc.mp4'   */}
          {/*     2.  url={  {uri : 'https://abc/xxx.mp4}  }  */}
    </View>
  )
}

export default App




