// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await fetch(`https://www.tronalddump.io/random/quote`, {
      method: 'GET',
      headers: {
        Accept: 'application/hal+json',
      },
    });
    const data = await response.json();
    console.log(data);
    res.status(200).json(data || { name: 'hello from the API YOU!!' });
  } catch (error) {}
};
