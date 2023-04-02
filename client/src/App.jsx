import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import VideoPlayer from './components/VideoPlayer'

function App() {
  const [videoId, setVideoId] = useState(null)

  function playVideo(e,videoId) {
    e.preventDefault();
    console.log(videoId);
    setVideoId(videoId);
  }

  return (
    <>
      <Navbar/>
    <article className="container">
        {videoId && <VideoPlayer videoId={videoId} />}
        <div className="btn-container">
          <button onClick={(e) => { playVideo(e, 'lukas') }}>player video 1</button>
          <button onClick={(e) => { playVideo(e, 'nf') }}>player video 2</button>
          <button onClick={(e) => { playVideo(e, 'sasha') }}>player video 3</button>
          <button onClick={(e) => { playVideo(e, 'james') }}>player video 4</button>
        </div>
      </article>
    </>
  );
};

export default App
