import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/store';

const RoleTypeToRole: { [key: string]: string } = {
  'none': '',
  '0': '*',
  '1': 'admin',
  '2': 'user',
  '3': 'manager',
};

export default function usePermission() {
  const userStore = useUserStore();
  return {
    accessRouter(route: RouteLocationNormalized | RouteRecordRaw) {
      const role = RoleTypeToRole[String(userStore.employeeRole ?? 'none')];
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.roles ||
        route.meta?.roles?.includes('*') ||
        route.meta?.roles?.includes(role)
      );
    },
    findFirstPermissionRoute(_routers: any, employeeRole = 1) {
      const cloneRouters = [..._routers];
      const role = RoleTypeToRole[String(employeeRole ?? 'none')];
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift();
        if (
          firstElement?.meta?.roles?.find((el: string[]) => {
            return el.includes('*') || el.includes(role);
          })
        )
          return { name: firstElement.name };
        if (firstElement?.children) {
          cloneRouters.push(...firstElement.children);
        }
      }
      return null;
    },
    // You can add any rules you want
  };
}
