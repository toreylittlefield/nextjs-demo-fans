// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type AuthResponseType = {
  access_token?: string;
  expires_in?: number;
  token_type?: 'bearer';
  status: 'success' | 'fail';
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<AuthResponseType>) => {
  const data = await getAuth();
  if (data.status === 'success') res.status(200).json(data);
  if (data.status === 'fail') res.status(400).json(data);
};

export async function getAuth(): Promise<AuthResponseType> {
  try {
    const response = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    const data = await response.json();
    data.status = 'success';
    return data;
  } catch (error) {
    console.log(error);
    return { status: 'fail' };
  }
}
