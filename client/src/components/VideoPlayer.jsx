import React,{useRef,useEffect} from 'react'

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  })

  return (
    <video ref={videoRef}
        controls
        autoPlay
      >
        <source src={`https://stream-video-hokn.onrender.com/videos/${videoId}`} type="video/mp4" />
        Your browser does not support the video tag 
      </video>
  )
}

export default VideoPlayer