import { useEffect, useState, useRef } from 'react';

interface AirtableApiTypes {
  records: Record[];
}

interface Record {
  id: string;
  fields: Fields;
  createdTime: string;
}

interface Fields {
  id?: string;
  Attachments?: Attachment[];
}

interface Attachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}

declare global {
  interface Window {
    webkitAudioContext: Object;
  }
}

export default function Custom404({ records = [] }: AirtableApiTypes) {
  const [audioContextState, setAudioContextState] = useState<null | AudioContext>(null);
  const [audioURL, setAudioURL] = useState('');
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    setAudioContextState(audioContext);
    return () => {
      audioContext.close();
    };
  }, []);

  useEffect(() => {
    if (records[0]?.fields?.Attachments) {
      const { Attachments } = records[0].fields;
      if (Attachments.length) {
        setAudioURL(Attachments[0].url);
      }
    }
  }, [records]);

  const handleClick = () => {
    ref.current?.play();
  };

  const handlePlaying = () => {
    setTimeout(() => {
      alert(console.log(new Error('What happened????')));
      alert('Why Am I undefined?');
      alert('handle this error${new Error()}');
      alert('better check my AWS bill');
    }, 2000);
    audioContextState?.close();
  };

  return (
    <div>
      <h1>404 - WOAHHH WHERE AM I???</h1>
      <button onClick={handleClick}>Help ME!</button>
      <audio onPlaying={handlePlaying} src={audioURL} ref={ref}></audio>
    </div>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  console.log(`${process.env.AIRTABLE_API_URL}${process.env.AIRTABLE_AUDIO}`);
  const response = await fetch(`${process.env.AIRTABLE_API_URL}${process.env.AIRTABLE_AUDIO}`, {
    method: 'GET',
    headers: {
      Authorization: `${process.env.AIRTABLE_API_KEY}`,
    },
  });
  const res: AirtableApiTypes = await response.json();
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      records: res.records,
    },
  };
}
interface RootObject {
  records: Record[];
}

interface Record {
  id: string;
  fields: Fields;
  createdTime: string;
}

interface Fields {
  id?: string;
  Attachments?: Attachment[];
}

interface Attachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
}
