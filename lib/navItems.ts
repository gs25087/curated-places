import { IoMdAdd, IoMdHome, IoMdPerson } from 'react-icons/io';

export const navItems = [
  /*   { href: '/', icon: IoMdHome, label: 'Home', authRequired: false },
   */ { href: '/posts/add', icon: IoMdAdd, label: 'New post', authRequired: true },
  { href: '/user/', icon: IoMdPerson, label: 'Profile', authRequired: true }
];
