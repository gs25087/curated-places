import { PlusCircle, User } from 'phosphor-react';

export const navItems = [
  /*   { href: '/', icon: IoMdHome, label: 'Home', authRequired: false },
   */ { href: '/posts/add', icon: PlusCircle, label: 'New post', authRequired: true },
  { href: '/register/', icon: User, label: 'Profile', authRequired: true }
];
