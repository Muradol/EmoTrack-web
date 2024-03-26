<template>
  <div class="container">
    <Breadcrumb :items="['menu.blank', 'menu.blank.employeeList']" />
    <a-card class="general-card" :title="$t('menu.list.employeeList')">
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
                <a-form-item
                  field="number"
                  :label="$t('employeeList.form.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('employeeList.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('employeeList.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('employeeList.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('employeeList.form.contentType')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('employeeList.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="filterType"
                  :label="$t('employeeList.form.filterType')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('employeeList.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('employeeList.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('employeeList.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('employeeList.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-forms>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('employeeList.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('employeeList.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary" @click="handleCreateClick">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('employeeList.operation.create') }}
            </a-button>
            <a-modal
              v-model:visible="createVisible"
              title="add employee"
              width="30%"
              unmount-on-close
              :on-before-ok="handleCreateBeforeOk"
              @cancel="handleCreateCancel"
            >
              <a-form :model="createPolicy">
                <a-form-item label="label">
                  <a-input v-model="createPolicy.name" />
                </a-form-item>
              </a-form>
            </a-modal>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('employeeList.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('employeeList.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('employeeList.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('employeeList.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('employeeList.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #contentType="{ record }">
          <a-space>
            <a-avatar
              v-if="record.contentType === 'blue'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar
              v-else-if="record.contentType === 'happy'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar v-else :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            {{ $t(`employeeList.form.contentType.${record.contentType}`) }}
          </a-space>
        </template>
        <template #filterType="{ record }">
          {{ $t(`employeeList.form.filterType.${record.filterType}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`employeeList.form.status.${record.status}`) }}
        </template>
        <template #operations="{ record }">
          <a-button
            v-permission="['admin']"
            type="primary"
            size="small"
            @click="handleUpdateClick(0, record)"
          >
            {{ $t('employeeList.columns.operations.view') }}
          </a-button>
          <a-modal
            v-model:visible="updateVisible"
            :title="record.count"
            width="30%"
            unmount-on-close
            :on-before-ok="handleUpdateBeforeOk"
            @cancel="handleUpdateCancel"
          >
            <a-form :model="updatePolicy">
              <a-form-item label="label">
                <a-input v-model="updatePolicy.name" />
              </a-form-item>
            </a-form>
          </a-modal>
        </template>
        <template #delete="{ record }">
          <a-popconfirm
            content="Are you sure to delete this task?"
            type="warning"
            @confirm="deleteTask(record)"
          >
            <a-button type="primary" status="danger" size="small">
              delete
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import {queryPolicyList, PolicyRecord, PolicyParams, EmployeeRecord} from '@/api/list';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<EmployeeRecord[]>([]);
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
  const densityList = computed(() => [
    {
      name: t('employeeList.size.mini'),
      value: 'mini',
    },
    {
      name: t('employeeList.size.small'),
      value: 'small',
    },
    {
      name: t('employeeList.size.medium'),
      value: 'medium',
    },
    {
      name: t('employeeList.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('employeeList.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    {
      title: t('employeeList.columns.number'),
      dataIndex: 'number',
    },
    {
      title: t('employeeList.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('employeeList.columns.contentType'),
      dataIndex: 'contentType',
      slotName: 'contentType',
    },
    {
      title: t('employeeList.columns.filterType'),
      dataIndex: 'filterType',
    },
    {
      title: t('employeeList.columns.count'),
      dataIndex: 'count',
    },
    // {
    //   title: t('employeeList.columns.createdTime'),
    //   dataIndex: 'createdTime',
    // },
    // {
    //   title: t('employeeList.columns.status'),
    //   dataIndex: 'status',
    //   slotName: 'status',
    // },
    {
      title: t('employeeList.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
    },
    {
      title: t('employeeList.columns.delete'),
      dataIndex: 'delete',
      slotName: 'delete',
    },
  ]);
  const contentTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('employeeList.form.contentType.blue'),
      value: 'blue',
    },
    {
      label: t('employeeList.form.contentType.happy'),
      value: 'happy',
    },
    {
      label: t('employeeList.form.contentType.sad'),
      value: 'sad',
    },
  ]);
  const filterTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('employeeList.form.filterType.aDepartment'),
      value: 'A',
    },
    {
      label: t('employeeList.form.filterType.bDepartment'),
      value: 'B',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('employeeList.form.status.online'),
      value: 'online',
    },
    {
      label: t('employeeList.form.status.offline'),
      value: 'offline',
    },
  ]);
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
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
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
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

  const updateVisible = ref(false);
  const handleUpdateClick = (index: number, record: PolicyRecord) => {
    updatePolicy.value = record;
    updateVisible.value = true;
  };

  const handleUpdateBeforeOk = () => {
    // return new Promise((resolve) => setTimeout(() => resolve(true), 3000));
    return true;
  };

  const handleUpdateCancel = () => {
    updateVisible.value = false;
  };

  const updatePolicy = ref<PolicyRecord>({
    id: '',
    number: 0,
    name: '',
    contentType: 'img',
    filterType: 'B',
    count: 0,
    createdTime: '',
    status: 'online',
  });

  const createVisible = ref(false);

  const handleCreateClick = () => {
    createVisible.value = true;
  };

  const handleCreateBeforeOk = () => {
    return true;
  };

  const handleCreateCancel = () => {
    createVisible.value = false;
  };

  const createPolicy = ref<PolicyRecord>({
    id: '',
    number: 0,
    name: '',
    contentType: 'img',
    filterType: 'B',
    count: 0,
    createdTime: '',
    status: 'online',
  });

  const deleteTask = async (record: PolicyRecord) => {
    // await deletePolicy(record.id);
    fetchData();
  };
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
