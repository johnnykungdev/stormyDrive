class spotifyAuth {
    static auth() {
        window.onSpotifyWebPlaybackSDKReady = () => {
            console.log('spotify ready')
        }
    }
}

export default spotifyAuth