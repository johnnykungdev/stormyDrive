import React, { useEffect } from 'react'

function videoList() {
    window.onYouTubeIframeAPIReady = () => {
        console.log(window.YT)
    }
    const list = [ "fCuMb330bfo", "SAuimMaON_Y", "svR_pijHljw&t=20s" ]

    useEffect(() => {
        function downloadYT() {
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            console.log('tag')
        }
        if (!window.YT) {
            console.log('download')
            downloadYT()
        } else {
            const YT = window.YT
            console.log(window.YT)
            const player = new YT.Player(playerEl.current, {
                playerVars: {
                    controls : 0,
                    autoplay : 1,
                    disablekb : 1, // disable keyboard
                    rel : 0, // disable related videos
                    cc_load_policy : 0,
                    iv_load_policy : 3,
                    autohide : 0,
                    modestbranding : 1,
                    playsinline : 0,
                    allowfullscreen: 1
                },
                height: window.innerHeight / 3,
                width: "100%",
                videoId: 'svR_pijHljw',
                events: {
                    'onReady': onPlayerReady,
                    // 'onStateChange': onPlayerStateChange
                }
            })
        }
    }, [])

    list.map(videoId => {
        return (
            <div ref={}>
            </div>
        )
    })
}

export default videoList