import { NextApiRequest, NextApiResponse } from 'next';
// import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('-------', req.body);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const placeId = req.body.placeId;
  const fields = req.body.fields;

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;
  /*   const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.body.placeId}&fields=photos&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`; */
  console.log('url', url);
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
}
