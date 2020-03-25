import React from 'react'

const Video = () => {
    return (<>
        <video src={require("../../assets/video.mp4")} autoPlay controls></video>
    </>)
}

export default Video