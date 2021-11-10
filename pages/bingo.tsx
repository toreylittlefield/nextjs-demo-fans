import Script from 'next/script';

const Bingo = () => {
  return (
    <div>
      <Script src="https://js.pusher.com/5.0/pusher.min.js" />
      <video
        src="https://production.assets.clips.twitchcdn.net/AT-cm%7Cc4oZUkyc-4HEu-DEiXFKNA.mp4?sig=dcdf2f599db5c84bdf5beb9046c181c55df98a37&token=%7B%22authorization%22%3A%7B%22forbidden%22%3Afalse%2C%22reason%22%3A%22%22%7D%2C%22clip_uri%22%3A%22https%3A%2F%2Fproduction.assets.clips.twitchcdn.net%2FAT-cm%257Cc4oZUkyc-4HEu-DEiXFKNA.mp4%22%2C%22device_id%22%3A%22ZO1jox1Zuuwjlf22WZ5ZsuMhq1Hwuvyq%22%2C%22expires%22%3A1636615060%2C%22user_id%22%3A%22689418411%22%2C%22version%22%3A2%7D"
        autoPlay
        controls
        loop
      />
    </div>
  );
};

export default Bingo;
