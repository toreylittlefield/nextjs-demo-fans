import Script from 'next/script';
import Image from 'next/image';
import { getAuth } from './api/twitch/auth';
import useLiveTwitchPlayer from '../Hooks/useLiveTwitchPlayer';
import TwitchIframeClip from '../Components/TwitchIframeClip';
import { rgbDataURL } from '../utils';

type Clip = {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: 'en';
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
  duration: number;
};

type PropTypes = {
  clips: Clip[];
};

declare global {
  interface Window {
    Twitch: any;
  }
}

const Bingo = ({ clips = [] }: PropTypes) => {
  const [twitchLivePlayerId] = useLiveTwitchPlayer('live-twitch-player');

  return (
    <div>
      <Script src="https://player.twitch.tv/js/embed/v1.js" strategy="beforeInteractive" />

      <Script src="https://js.pusher.com/5.0/pusher.min.js" />
      <div id={twitchLivePlayerId} />
      {clips?.map((clip) => {
        return (
          <div key={clip.id}>
            <Image
              src={clip.thumbnail_url}
              alt={clip.title}
              width="480"
              height="272"
              placeholder="blur"
              blurDataURL={rgbDataURL(2, 129, 210)}
              layout="responsive"
            />
            <p>{clip.embed_url}</p>
            <TwitchIframeClip id={clip.id} />
            <div id={clip.id}></div>
            <h3>{clip.title}</h3>
          </div>
        );
      })}
      <div>{JSON.stringify(clips, null, 2)}</div>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const authRes = await getAuth();
    if (authRes.status === 'success') {
      //   const param = `search/channels?query=roarcoders`;
      const param = `clips?broadcaster_id=558724655`;

      const getData = await fetch(`https://api.twitch.tv/helix/${param}`, {
        headers: {
          Authorization: `Bearer ${authRes.access_token}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID || '',
        },
      });
      const clips = await getData.json();

      return {
        props: {
          clips: clips.data,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export default Bingo;
