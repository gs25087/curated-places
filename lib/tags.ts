import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export interface ITag {
  id: number;
  label: string;
}

export const TAGS_KEY = 'tags';

export function getTagsFromCookies(req: NextApiRequest): ITag[] | null {
  const cookies = cookie.parse(req.headers.cookie || '');
  const tagsJson = cookies[TAGS_KEY];
  if (tagsJson) {
    return JSON.parse(tagsJson) as ITag[];
  }

  return null;
}

export function setTagsToCookies(res: NextApiResponse, tags: ITag[]): void {
  const tagsJson = JSON.stringify(tags);
  res.setHeader('Set-Cookie', cookie.serialize(TAGS_KEY, tagsJson, { path: '/' }));
}
