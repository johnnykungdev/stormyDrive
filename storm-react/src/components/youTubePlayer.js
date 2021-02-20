import React, { useEffect, useRef } from 'react'

async function() {
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

function YoutubePlayer() {  
    useEffect(() => {
        
    })
    const playerEL = useRef(null)
    return (
        <div id="player" ref={playerEl}></div>
    )
}

export default YoutubePlayer