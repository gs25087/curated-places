import { CiCirclePlus, CiUser } from 'react-icons/ci';

export const navItems = [
  /*   { href: '/', icon: IoMdHome, label: 'Home', authRequired: false },
   */ { href: '/posts/add', icon: CiCirclePlus, label: 'New post', authRequired: true },
  { href: '/register/', icon: CiUser, label: 'Profile', authRequired: true }
];
