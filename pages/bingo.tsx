import Script from 'next/script';
import { getAuth } from './api/twitch/auth';
import useLiveTwitchPlayer from '../Hooks/useLiveTwitchPlayer';
import TwitchClipContainer from '../Components/TwitchClipContainer';
import { GetStaticProps } from 'next';

export type Clip = {
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

type GetClipsApiRes = {
  data: Clip[];
  pagination?: {
    cursors: string;
  };
};

const Bingo = ({ clips = [] }: PropTypes) => {
  const [twitchLivePlayerId] = useLiveTwitchPlayer('live-twitch-player');

  return (
    <div>
      <Script src="https://player.twitch.tv/js/embed/v1.js" strategy="beforeInteractive" />

      <Script src="https://js.pusher.com/5.0/pusher.min.js" />
      <div id={twitchLivePlayerId} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(33%,480px))',
          placeContent: 'center',
        }}
      >
        {clips?.map((clip) => (
          <TwitchClipContainer key={clip.id} clip={clip} />
        ))}
      </div>
      <div>{JSON.stringify(clips, null, 2)}</div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PropTypes> | any = async () => {
  const authRes = await getAuth();
  if (authRes.status === 'success') {
    //   const param = `search/channels?query=roarcoders`;
    const param = `clips?broadcaster_id=${process.env.TWITCH_BROADCASTER_ID}&first=100`;

    const getClips = await fetch(`https://api.twitch.tv/helix/${param}`, {
      headers: {
        Authorization: `Bearer ${authRes.access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID || '',
      },
    });
    const res: GetClipsApiRes = await getClips.json();

    return {
      props: {
        clips: res.data,
      },
    };
  }
  if (authRes.status === 'fail')
    return {
      redirect: {
        destination: '/',
      },
    };
};

export default Bingo;
