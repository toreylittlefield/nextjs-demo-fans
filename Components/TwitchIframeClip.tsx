import React from 'react';

declare module 'react' {
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    parent?: string;
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
      width="50%"
      allowFullScreen={true}
    />
  );
};

export default TwitchIframeClip;
