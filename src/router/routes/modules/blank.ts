import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BLANK: AppRouteRecordRaw = {
  path: '/blank',
  name: 'Blank',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.blank',
    requiresAuth: true,
    icon: 'icon-list',
    order: 3,
  },
  children: [
    {
      path: 'test',
      name: 'Test',
      component: () => import('@/views/blank/test/index.vue'),
      meta: {
        locale: 'menu.blank.searchTable',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default BLANK;
