import React, {useState} from 'react'
import YoutubePlayer from '../components/YouTubePlayer'
import spotifyAuth from '../utils/spotifyAuth'
import ChatRoom from '../container/chatRoom'

import classes from './video.module.scss'

function Video(props) {
    const [radioSrc, setSrc] = useState("https://tunein.com/embed/player/s11985?autoplay=true")
    console.log(props.router)
    const video_id = props.router.location.search.replace("?v_id=", "")
    console.log(video_id)
    window.onSpotifyWebPlaybackSDKReady = () => {
        console.log('spotify ready')
    }

    let i = document.querySelector('input')



    function sliderChange(station) {
        setSrc(station)
    }

    return (
        <div>
            <div >
                <YoutubePlayer video_id={video_id}/>
            </div>
            <div>
                <iframe class={classes.RadioPlayer} src={radioSrc} scrolling={"no"} frameBorder={"no"} title="radio"/>
            </div>
            <div>
                <p>Radio Selector</p>
            </div>
            <div>
                <input type="range" min="0" max="4" onChange={(e) => {

                        let val = e.target.value;
                        if (val == 1) {
                            sliderChange("https://tunein.com/embed/player/s31258?autoplay=true");
                        } else if (val == 2) {
                            sliderChange("https://tunein.com/embed/player/s55425?autoplay=true");
                        } else if (val == 3) {
                            sliderChange("https://tunein.com/embed/player/s31214?autoplay=true");
                        } else if (val == 4) {
                            sliderChange("https://tunein.com/embed/player/s31128?autoplay=true");
                        } else if (val == 5) {
                            sliderChange("https://tunein.com/embed/player/s11985?autoplay=true")
                        }


                    console.log(e.target.value)
                }}/>
            </div>
            <div >
                <ChatRoom user={props.user} />
            </div>
        </div>
    )
}

export default Video