import React from 'react'

const Video = () => {
    return (<>
        <video src={require("../../assets/video.mp4")} autoplay controls></video>
    </>)
}

export default Video