import React, { useState } from 'react';
import Image from 'next/image';
import TwitchIframeClip from '../Components/TwitchIframeClip';
import { rgbDataURL } from '../utils';
import { Clip } from '../pages/bingo';

type PropTypes = {
  clip: Clip;
};

const TwitchClipContainer = ({ clip }: PropTypes) => {
  const [state, setstate] = useState(false);

  const handleClick = () => {
    // const { id } = e.target;
    setstate((prev) => !prev);
  };
  if (!clip) return null;
  return (
    <div style={{ cursor: 'pointer' }}>
      {!state && (
        <Image
          src={clip.thumbnail_url}
          alt={clip.title}
          id={clip.id}
          width="480"
          height="272"
          placeholder="blur"
          blurDataURL={rgbDataURL(2, 129, 210)}
          layout="responsive"
          onClick={handleClick}
        />
      )}
      {state && <TwitchIframeClip id={clip.id} />}
      <h3>{clip.title}</h3>
    </div>
  );
};

export default TwitchClipContainer;
