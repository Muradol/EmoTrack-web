import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
// 姓氏池
const surnamePool = ['张', '李', '王', '刘', '陈', '杨', '赵', '黄', '周', '吴'];
// 名字池
const namePool = ['伟', '芳', '娜', '敏', '静', '秀英', '丽', '强', '磊', '军'];
const { Random } = Mock;

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[0-9]/,
      'name': ()=>Random.pick(surnamePool) + Random.pick(namePool),
      'contentType|1': ['blue', 'happy', 'sad'],
      'phoneNumber|9': /[3-9]/,
      'gender|1': [0, 1],
      'birthday': Random.date(),
      'departmentName|1': ['技术部', '策划部', '宣传部', '行政'],
      'role|1': ['员工', '主管', '经理', '总监'],
      'departmentNo|1': /[0-5]/,
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/list/employee'), (params: GetParams) => {
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
