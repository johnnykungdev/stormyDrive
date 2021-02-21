import React from 'react'
import YoutubePlayer from '../components/YoutubePlayer'
import spotifyAuth from '../utils/spotifyAuth'
import ChatRoom from '../container/chatRoom'

function Video(props) {
    console.log(props.router)
    const video_id = props.router.location.search.replace("?v_id=", "")
    console.log(video_id)
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('spotify ready')
    }

    return (
        <div>
            <div >
                <YoutubePlayer video_id={video_id}/>
            </div>
            <div >
            </div>
            <div >
                <ChatRoom />
            </div>
        </div>
    )
}

export default Video