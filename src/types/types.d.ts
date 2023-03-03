export interface IPost {
  id: string;
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
