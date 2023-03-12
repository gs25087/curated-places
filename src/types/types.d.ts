import { ACTIONS } from '@/context/MapContext/MapReducer';

export interface IPost {
  author: string;
  id: string;
  title: string;
  address: string;
  photos: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  tags: number[];
}

export interface IFormStatusMessage {
  message: string;
  status: 'success' | 'error' | '';
}

export interface IAddPostFormData {
  title: string;
  address: string;
  photos: string;
  latitude: number | null;
  longitude: number | null;
  description: string;
  tags: number[];
}

export interface IRole {
  role: 'viewer' | 'editor' | 'admin';
}

export interface IUser {
  id: string;
  username: string | '';
  first_name: string | '';
  last_name: string | ' ';
  full_name: string | ' ';
  website: string | ' ';
  role: IRole['role'];
  avatar_filename: string | ' ';
}

export interface IAuthor {
  first_name: string | '';
  last_name: string | '';
}

export interface IUserPosts {
  user: IUser;
  posts: IPost[];
}

export type IProfileFormData = {
  id: string;
  username: string | '';
  first_name: string | '';
  last_name: string | ' ';
  website: string | ' ';
  submit: undefined;
};

export interface NavItem {
  label: string;
  icon: Reactnode;
  authRequired: boolean;
  href: string;
}

export interface IPostPhotosProps {
  photoUrls: string[];
}

export interface IPostCardProps {
  post: IPost;
  tags: Tags[];
}

export interface ITags {
  tags: number[];
}

export interface ITag {
  id: number;
  label: string;
  created_at: string;
  posts: number[];
}

export interface ILocality {
  localities: string[];
}

export interface IMapContext {
  tag: number | null;
  openLocalitiesPopup: boolean;
  tags: ITags[];
  localities: string[];
}

export type Action =
  | { type: typeof ACTIONS.SET_TAG; payload: string }
  | { type: typeof ACTIONS.OPEN_LOCALITIESPOPUP; payload: boolean }
  | { type: typeof ACTIONS.SAVE_TAGS; payload: ITag[] }
  | { type: typeof ACTIONS.SAVE_LOCALITIES; payload: string[] };

export interface IAvatarProps {
  avatarFilePath: string | null;
  size: number;
  onUpload: (filePath: string, file: File) => void;
}
