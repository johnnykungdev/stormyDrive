import React from 'react'
import YoutubePlayer from '../components/YoutubePlayer'
import spotifyAuth from '../utils/spotifyAuth'

function Video() {
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('spotify ready')
    }

    return (
        <div>
            <div >
                <YoutubePlayer />
            </div>
            <div >
            </div>
            <div >

            </div>
        </div>
    )
}

export default Video