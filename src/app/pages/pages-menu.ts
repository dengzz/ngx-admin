import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
   {
      title: 'Dashboard',
      icon: 'nb-home',
      link: '/dashboard',
      home: true,
   },
   {
      title: 'Producers',
      icon: 'nb-tables',
      link: '/producers/list',
   },
   {
      title: 'Blocks',
      icon: 'fa fa-lock',
      link: '/blocks/list',
   },
   {
      title: 'Transactions',
      icon: 'nb-keypad',
      link: '/trans/list',
   },
   {
      title: 'Accounts',
      icon: 'nb-person',
      link: '/accounts/list',
   },
   {
      title: 'Ram',
      icon: 'nb-cloudy',
      link: '/ram/list',
   },
   {
      title: 'Contracts',
      icon: 'nb-gear',
      link: '/contracts/list',
   },
   {
      title: 'Tokens',
      icon: 'nb-notifications',
      link: '/tokens/list',
   },
];
