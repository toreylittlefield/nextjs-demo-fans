import React from 'react';

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    parent?: string;
    autoPlay?: boolean;
    preload?: 'none' | 'metadata' | 'auto';
  }
}

type PropTypes = {
  id: string;
};

const TwitchIframeClip = ({ id = '' }: PropTypes) => {
  return (
    <iframe
      src={`https://clips.twitch.tv/embed?clip=${id}&parent=localhost&parent=nextjs-demo-fans.vercel.app`}
      parent="localhost,nextjs-demo-fans.vercel.app"
      height="100%"
      width="100%"
      allowFullScreen={true}
      preload="metadata"
      autoPlay
    />
  );
};

export default TwitchIframeClip;
