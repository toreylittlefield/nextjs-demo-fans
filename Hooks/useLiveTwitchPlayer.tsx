import { useEffect } from 'react';

const useLiveTwitchPlayer = (twitchLivePlayerId: string = 'liveplayerid') => {
  useEffect(() => {
    const createTwitchPlayer = () => {
      const options = {
        width: '100%',
        height: 480,
        channel: 'roarcoders',
        // video: ''
        //   collection: '',
        // only needed if your site is also embedded on embed.example.com and othersite.example.com
        // parent: ["embed.example.com", "othersite.example.com"]
      };
      if (window.Twitch) {
        const player = new window.Twitch.Player('live-twitch-player', options);
        player.setVolume(0.5);
        return player;
      }
    };
    createTwitchPlayer();
    return () => {
      if (window.Twitch) {
        document.getElementById(twitchLivePlayerId)?.remove();
      }
    };
  }, []);

  return [twitchLivePlayerId];
};

export default useLiveTwitchPlayer;
