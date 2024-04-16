import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;
// 姓氏池
const surnamePool = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
// 名字池
const namePool = ['伟', '芳', '娜', '静', '睿', '强', '磊', '军'];
const data = Mock.mock({
  'list|55': [
    {
      'manager': ()=>Random.pick(surnamePool) + Random.pick(namePool),
      'managerPhone|9': /[3-9]/,
      'departmentName|1': ['技术部', '策划部', '宣传部', '行政'],
      'peopleNum|1-100': 1,
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/list/department'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      });
    });
  },
});
