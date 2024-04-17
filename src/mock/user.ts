import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import qs from 'query-string';
import { isLogin } from '@/utils/auth';

setupMock({
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin';
        return successResponseWrap({
          name: '王立群',
          avatar:
            '//lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role,
        });
      }
      return failResponseWrap(null, '未登录', 50008);
    });

    // 登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', 'admin');
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', 'user');
        return successResponseWrap({
          token: '54321',
        });
      }
      if (username === 'manager' && password === 'manager') {
        window.localStorage.setItem('userRole', 'manager');
        return successResponseWrap({
          token: '67890',
        });
      }
      return failResponseWrap(null, '账号或者密码错误', 50000);
    });

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });

    // 用户的服务端菜单
    Mock.mock(new RegExp('/api/user/menu'), () => {
      const menuList = [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            locale: 'menu.server.dashboard',
            requiresAuth: true,
            icon: 'icon-dashboard',
            order: 1,
          },
          children: [
            {
              path: 'workplace',
              name: 'Workplace',
              meta: {
                locale: 'menu.server.workplace',
                requiresAuth: true,
              },
            },
            {
              path: 'https://arco.design',
              name: 'arcoWebsite',
              meta: {
                locale: 'menu.arcoWebsite',
                requiresAuth: true,
              },
            },
          ],
        },
      ];
      return successResponseWrap(menuList);
    });
    // 获取部门信息
    // departmentNo 0 is NECESSARY
    Mock.mock(new RegExp('/api/department/list'), () => {
      const departmentList = [
        {
          departmentNo: 0,
          departmentName: '安全部',
        },
        {
          departmentNo: 1,
          departmentName: '技术部',
        },
        {
          departmentNo: 2,
          departmentName: '产品部',
        },
        {
          departmentNo: 3,
          departmentName: '市场部',
        },
        {
          departmentNo: 4,
          departmentName: '运营部',
        },
        {
          departmentNo: 5,
          departmentName: '设计部',
        },
        {
          departmentNo: 6,
          departmentName: '策划部',
        },
        {
          departmentNo: 7,
          departmentName: '宣传部',
        },
        {
          departmentNo: 8,
          departmentName: '行政部',
        },
        {
          departmentNo: 9,
          departmentName: '开发部',
        },
        {
          departmentNo: 10,
          departmentName: '财务部',
        },
        {
          departmentNo: 11,
          departmentName: '人力资源部',
        },
        {
          departmentNo: 12,
          departmentName: '销售部',
        },
        {
          departmentNo: 13,
          departmentName: '客户服务部',
        },
        {
          departmentNo: 14,
          departmentName: '采购部',
        },
        {
          departmentNo: 15,
          departmentName: '物流部',
        },
        {
          departmentNo: 16,
          departmentName: '研发部',
        },
        {
          departmentNo: 17,
          departmentName: '法务部',
        },
        {
          departmentNo: 18,
          departmentName: '公关部',
        },
        {
          departmentNo: 19,
          departmentName: 'IT部',
        },
      ];

      return successResponseWrap(departmentList);
    });
    // 注册mock
    Mock.mock(new RegExp('/api/user/register'), (params: MockParams) => {
      const {
        username,
        password,
        phoneNumber,
        birthday,
        gender,
        departmentNo,
      } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, '用户名不能为空', 50000);
      }
      if (!password) {
        return failResponseWrap(null, '密码不能为空', 50000);
      }
      if (!phoneNumber) {
        return failResponseWrap(null, '手机号不能为空', 50000);
      }
      if (!birthday) {
        return failResponseWrap(null, '生日不能为空', 50000);
      }
      if (!gender) {
        return failResponseWrap(null, '性别不能为空', 50000);
      }
      if (!departmentNo) {
        return failResponseWrap(null, '部门不能为空', 50000);
      }
      return successResponseWrap(null);
    });
    Mock.mock(new RegExp('/api/employee/info'), (params: MockParams) => {
      const { phone } = qs.parseUrl(params.url).query;
      console.log(params.url);
    
      if (phone === '12345678910') {
        return successResponseWrap({
          id: '1',
          name: '王立群',
          phoneNumber: '12345678910',
          birthday: '1999-01-01',
        });
      }
      return successResponseWrap({
        id: '1',
        name: '王小美',
        phoneNumber: '15012345678',
        birthday: '1999-01-01',
      });
    });
  },
});
