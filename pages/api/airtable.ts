// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const response = await fetch(`${process.env.AIRTABLE_API_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `${process.env.AIRTABLE_API_KEY}`,
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {}
};
