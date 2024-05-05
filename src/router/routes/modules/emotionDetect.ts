import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const FORM: AppRouteRecordRaw = {
  path: '',
  name: '',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.detect',
    icon: 'icon-file',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'emotion-detect',
      name: 'dectect',
      component: () => import('@/views/emotion/upload/index.vue'),
      meta: {
        locale: 'menu.detect.upload',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'emotion-history',
      name: 'history',
      component: () => import('@/views/emotion/history/index.vue'),
      meta: {
        locale: 'menu.detect.history',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default FORM;
