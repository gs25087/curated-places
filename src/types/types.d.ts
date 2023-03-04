export interface IPost {
  id: string;
  title: string;
  address: string;
  photos: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
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

export type IProfileFormData = {
  username: string | '';
  first_name: string | '';
  last_name: string | ' ';
  website: string | ' ';
  submit: undefined;
};

export interface NavItem {
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
