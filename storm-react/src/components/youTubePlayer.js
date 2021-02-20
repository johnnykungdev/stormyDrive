import React, { useEffect, useRef } from 'react'

async function downloadYTCode() {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = () => await window.YT
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        playerVars: {
            controls : 0,
            autoplay : 1,
            disablekb : 1, // disable keyboard
            rel : 0, // disable related videos
            cc_load_policy : 0,
            iv_load_policy : 3,
            autohide : 0,
            modestbranding : 1,
            playsinline : 0
        },
        height: window.innerHeight,
        width: window.innerWidth,
        videoId: 'VavFXix6J2s',
        events: {
            'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

function YoutubePlayer() {  
    useEffect(() => {
        if (window.YT) {
            downloadYTCode()
            .then
        }
    })
    const playerEL = useRef(null)
    return (
        <div id="player" ref={playerEl}></div>
    )
}

export default YoutubePlayer