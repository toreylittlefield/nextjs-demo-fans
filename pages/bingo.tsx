import Script from 'next/script';
import Image from 'next/image';
import { useEffect } from 'react';

// interface PropTypes {
//   data: {
//     access_token: string;
//     expires_in: string;
//     token_type: string;
//   };
// }

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

const Bingo = ({ clips }: PropTypes) => {
  useEffect(() => {
    const createTwitchPlayer = (clip: Clip) => {
      const options = {
        width: 480,
        height: 272,
        channel: 'roarcoders',
        // video: clip.id,
        //   collection: '',
        // only needed if your site is also embedded on embed.example.com and othersite.example.com
        // parent: ["embed.example.com", "othersite.example.com"]
      };
      if (window.Twitch) {
        const player = new window.Twitch.Player(clip.id, options);
        player.setVolume(0.5);
        return player;
      }
    };
    createTwitchPlayer(clips[0]);
    return () => {
      // cleanup
    };
  }, [clips]);
  return (
    <div>
      <Script src="https://player.twitch.tv/js/embed/v1.js" strategy="beforeInteractive" />

      <Script src="https://js.pusher.com/5.0/pusher.min.js" />
      {/* <video
        src="https://production.assets.clips.twitchcdn.net/AT-cm%7Cc4oZUkyc-4HEu-DEiXFKNA.mp4?sig=dcdf2f599db5c84bdf5beb9046c181c55df98a37&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2FAT-cm%257Cc4oZUkyc-4HEu-DEiXFKNA.mp4%22%2C%22device_id%22%3A%22ZO1jox1Zuuwjlf22WZ5ZsuMhq1Hwuvyq%22%2C%22expires%22%3A1636615060%2C%22user_id%22%3A%22689418411%22%2C%22version%22%3A2%7D"
        controls
        loop
        autoPlay
      /> */}
      {clips.map((clip) => {
        return (
          <div key={clip.id}>
            <Image src={clip.thumbnail_url} alt={clip.title} width="480" height="272" />
            <iframe
              src={`https://clips.twitch.tv/embed?clip=${clip.id}&parent=www.nextjs-demo-fans.vercel.app/bingo`}
              height="480"
              width="272"
              allowFullScreen={true}
            />
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
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const response = await fetch(`${process.env.SERVER}/api/twitch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const getToken = await response.json();

  //   const param = `search/channels?query=roarcoders`;
  const param = `clips?broadcaster_id=558724655`;

  //clips?id=689418411

  const getData = await fetch(`https://api.twitch.tv/helix/${param}`, {
    headers: {
      Authorization: `Bearer ${getToken.access_token}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    },
  });
  const clips = await getData.json();
  console.log(clips);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      clips: clips.data,
    },
  };
}

export default Bingo;
