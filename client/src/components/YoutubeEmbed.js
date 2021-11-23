import React from "react";
import '../styles/components/YoutubeEmbed.scss';

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    {console.log("id", embedId)}
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;