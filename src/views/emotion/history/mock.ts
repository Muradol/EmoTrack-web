import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|20': [
    {
      reportNO: () => Random.increment(1),
      reportDate: () => {
        let date = Random.date('yyyy-MM-dd-HH-mm-ss');
        while (new Date(date) > new Date()) {
          date = Random.date('yyyy-MM-dd-HH-mm-ss');
        }
        return date;
      },
      reportVal: () => Random.pick(['blue', 'happy', 'sad']),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/list/report'), (params: GetParams) => {
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
