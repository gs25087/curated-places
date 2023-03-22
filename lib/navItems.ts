import { Plus, User, MapPin } from '@phosphor-icons/react';

export const navItems = [
  { href: '/', icon: MapPin, label: 'Location', authRequired: false },
  { href: '/posts/add', icon: Plus, label: 'New post', authRequired: true },
  { href: '/login/', icon: User, label: 'Login', authRequired: false }
];
