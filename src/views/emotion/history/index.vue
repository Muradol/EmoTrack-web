<template>
  <div class="container">
    <Breadcrumb :items="['menu.detect', 'menu.detect.history']" />
    <a-card class="general-card" :title="$t('menu.detect.history')">
      <a-row>
        <a-col :flex="1">
          <a-forms
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <!-- Todo: discuss that it should be a select or input -->
                <a-form-item
                  field="date"
                  :label="$t('emotion.detect.form.date')"
                >
                  <a-range-picker
                    v-model="formModel.date_range"
                    show-time
                    shortcuts-position="left"
                    :shortcuts="rangeShortcuts"
                  />
                </a-form-item>
              </a-col>
              <!-- Todo: maybe add range picker -->
            </a-row>
          </a-forms>
        </a-col>
        <a-button
          type="primary"
          style="margin-left: 20px; margin-right: 20px"
          @click="search"
        >
          <template #icon>
            <icon-search />
          </template>
          {{ $t('departmentList.form.search') }}
        </a-button>
        <a-button @click="reset">
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('departmentList.form.reset') }}
        </a-button>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        column-resizable
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>

        <template #operations="{ record }">
          <!-- Todo: should change the @click funtion -->
          <a-button
            v-permission="['admin']"
            type="text"
            size="small"
            style="margin-right: 10px"
            @click="showReport(record)"
          >
            {{ $t('emotion.detect.history.columns.show.button') }}
          </a-button>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import { set } from 'nprogress';
  import dayjs from 'dayjs';
  import { ReportParams, queryReportList, Report } from '@/api/report';
  import { ShortcutType } from '@arco-design/web-vue';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      date_range: [],
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<Report[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('departmentList.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      width: 120,
    },

    {
      title: t('emotion.detect.history.columns.detect.time'),
      dataIndex: 'reportDate',
      align: 'center',
    },
    {
      title: t('departmentList.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 120,
    },
  ]);

  const fetchData = async (
    // Todo: should be changed
    params: ReportParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryReportList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as ReportParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );

  const reports = ref<Report[]>();

  // Todo: 未完成修改表单与删除表单，未完成api的编写
  const showReport = async (a: any) => {};

  const rangeShortcuts: ShortcutType[] = [
    {
      label: '5分钟内',
      value: () => [dayjs().subtract(5, 'minute').toDate(), dayjs().toDate()],
    },
    {
      label: '半小时内',
      value: () => [dayjs().subtract(30, 'minute').toDate(), dayjs().toDate()],
    },
    {
      label: '一小时内',
      value: () => [dayjs().subtract(1, 'hour').toDate(), dayjs().toDate()],
    },
    {
      label: '今日内',
      value: () => [dayjs().startOf('day').toDate(), dayjs().toDate()],
    },
    {
      label: '过去七天',
      value: () => [dayjs().subtract(7, 'day').toDate(), dayjs().toDate()],
    },
    {
      label: '过去一个月',
      value: () => [dayjs().subtract(1, 'month').toDate(), dayjs().toDate()],
    },
  ];
</script>

<script lang="ts">
  export default {
    name: 'SearchTable',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }
</style>
