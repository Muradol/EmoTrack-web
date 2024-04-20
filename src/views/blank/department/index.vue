<template>
  <div class="container">
    <Breadcrumb :items="['menu.blank', 'menu.list.departmentList']" />
    <a-card class="general-card" :title="$t('menu.list.departmentList')">
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
                  field="name"
                  :label="$t('departmentList.update.form.name')"
                >
                  <a-input
                    v-model="formModel.departmentName"
                    :placeholder="$t('departmentList.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="phone"
                  :label="$t('departmentList.form.phone')"
                >
                  <a-input
                    v-model="formModel.phoneNumber"
                    :placeholder="$t('departmentList.form.phone.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Todo: discuss that it should be a select or input -->
                <a-form-item
                  field="manager"
                  :label="$t('departmentList.form.manager')"
                >
                  <a-input
                    v-model="formModel.manager"
                    :placeholder="$t('departmentList.form.manager.placeholder')"
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
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <!-- <a-button
              v-permission="['admin']"
              type="primary"
              @click="handleCreateClick"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('departmentList.operation.create') }}
            </a-button>
            <a-modal
              v-model:visible="createVisible"
              :title="$t('departmentList.operation.create.title')"
              width="30%"
              unmount-on-close
              :on-before-ok="handleCreateBeforeOk"
              @cancel="handleCreateCancel"
            >
              <a-form
                ref="loginForm"
                :model="registerData"
                class="login-form"
                layout="horizontal"
                :rules="rules"
              >
                <a-form-item
                  field="username"
                  :label="$t('register.form.userName')"
                  :validate-trigger="['change', 'blur']"
                >
                  <a-input
                    v-model="registerData.username"
                    :placeholder="$t('register.form.userName.placeholder')"
                  />
                </a-form-item>
                <a-form-item
                  field="password"
                  :validate-trigger="['change', 'blur']"
                  :label="$t('register.form.password')"
                >
                  <a-input-password
                    v-model="registerData.password"
                    :placeholder="$t('register.form.password.placeholder')"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item
                  field="password1"
                  :validate-trigger="['change', 'blur']"
                  :label="$t('register.form.confirmPassword')"
                >
                  <a-input-password
                    v-model="registerData.password1"
                    :placeholder="$t('register.form.password1.placeholder')"
                    allow-clear
                  />
                </a-form-item>
                <a-form-item
                  field="phoneNumber"
                  :label="$t('register.form.phoneNumber')"
                  :validate-trigger="['change', 'blur']"
                >
                  <a-input
                    v-model="registerData.phoneNumber"
                    :placeholder="$t('register.form.phoneNumber.placeholder')"
                  />
                </a-form-item>
                <a-form-item
                  field="birthday"
                  :label="$t('register.form.birthday')"
                  :validate-trigger="['change', 'blur']"
                >
                  <a-date-picker v-model="registerData.birthday" />
                </a-form-item>
                <a-form-item
                  field="gender"
                  :label="$t('register.form.gender')"
                  :validate-trigger="['change', 'blur']"
                >
                  <a-select
                    v-model="registerData.gender"
                    :placeholder="$t('register.form.gender.placeholder')"
                  >
                    <a-option value="0">
                      {{ $t('register.form.woman') }}
                    </a-option>
                    <a-option value="1">
                      {{ $t('register.form.man') }}
                    </a-option>
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="department"
                  :label="$t('register.form.department')"
                  :validate-trigger="['change', 'blur']"
                >
                  <a-select
                    v-model="registerData.departmentNo"
                    placeholder="请选择部门"
                    :field-names="departmentFieldName"
                    :options="departments"
                  >
                    <a-option
                      v-for="department in departments"
                      :key="department.departmentName"
                      :value="department.departmentNo"
                    >
                      {{ department.departmentName }}
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-form>
            </a-modal> -->
            <a-upload action="/">
              <template #upload-button>
                <a-button v-permission="['admin']">
                  {{ $t('departmentList.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button v-permission="['admin']">
            <template #icon>
              <icon-download />
            </template>
            {{ $t('departmentList.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('departmentList.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('departmentList.actions.density')">
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
          <a-tooltip :content="$t('departmentList.actions.columnSetting')">
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

        <template #gender="{ record }">
          <div v-if="record.gender === 0">
            {{ $t('departmentList.columns.women') }}
          </div>
          <div v-else>
            {{ $t('departmentList.columns.man') }}
          </div>
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
            {{ $t(`departmentList.form.contentType.${record.contentType}`) }}
          </a-space>
        </template>
        <template #filterType="{ record }">
          {{ $t(`departmentList.form.filterType.${record.filterType}`) }}
        </template>
        <template #status="{ record }">
          <span v-if="record.status === 'offline'" class="circle"></span>
          <span v-else class="circle pass"></span>
          {{ $t(`departmentList.form.status.${record.status}`) }}
        </template>
        <template #operations="{ record }">
          <a-button
            v-permission="['admin']"
            type="primary"
            size="small"
            style="margin-right: 10px"
            @click="handleUpdateClick(0, record)"
          >
            {{ $t('departmentList.columns.operations.view') }}
          </a-button>

          <!-- Todo: should change the @click funtion -->
          <a-button
            v-permission="['admin']"
            type="primary"
            size="small"
            style="margin-right: 10px"
            @click="showReport"
          >
            {{ $t('departmentList.columns.operations.checkEmotion') }}
          </a-button>

          <!-- delete button -->
          <a-popconfirm
            :content="$t('departmentList.columns.operation.delete.warning')"
            type="warning"
            @confirm="deleteTask(record)"
          >
            <a-button
              v-permission="['admin']"
              type="primary"
              status="danger"
              size="small"
              style="margin-right: 10px"
            >
              {{ $t('departmentList.columns.operation.delete') }}
            </a-button>
          </a-popconfirm>

          <a-modal
            v-model:visible="updateVisible"
            :title="$t('departmentList.operation.update.information')"
            width="40%"
            unmount-on-close
            :on-before-ok="handleUpdateBeforeOk"
            @cancel="handleUpdateCancel"
          >
            <a-form
              ref="departmentUpdateForm"
              :model="updateRecord"
              class="login-form"
              layout="horizontal"
            >
              <a-form-item
                field="departmentName"
                :label="$t('departmentList.update.form.name')"
                :validate-trigger="['change', 'blur']"
              >
                <a-input
                  v-model="updateRecord.departmentName"
                  :placeholder="
                    $t('departmentList.update.form.name.placeholder')
                  "
                />
              </a-form-item>
              <a-form-item
                field="manager"
                :label="$t('departmentList.update.form.manager')"
                :validate-trigger="['change', 'blur']"
              >
                <a-input
                  v-model="updateRecord.manager"
                  :placeholder="
                    $t('departmentList.update.form.manager.placeholder')
                  "
                  disabled
                />
              </a-form-item>
              <a-form-item
                field="phoneNumber"
                :label="$t('departmentList.update.form.phone')"
                :validate-trigger="['change', 'blur']"
              >
                <a-input
                  v-model="updateRecord.managerPhone"
                  :placeholder="
                    $t('departmentList.update.form.phone.placeholder')
                  "
                  style="margin-right: 10px"
                />
                <a-button type="primary" @click="findEmployee"> 查询 </a-button>
              </a-form-item>
            </a-form>
          </a-modal>
        </template>
        <template #delete="{ record }">
          <a-popconfirm
            :content="$t('departmentList.columns.operation.delete.warning')"
            type="warning"
            @confirm="deleteTask(record)"
          >
            <a-button
              v-permission="['admin']"
              type="primary"
              status="danger"
              size="small"
            >
              {{ $t('departmentList.columns.operation.delete') }}
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
  import {
    queryPolicyList,
    PolicyParams,
    EmployeeRecord,
    getEmployeeInfo,
  } from '@/api/employee';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';
  import {
    Department,
    DepartmentInfo,
    DepartmentUpdateForm,
    getDepartmentList,
    queryDepartmentList,
  } from '@/api/department';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      departmentName: '',
      phoneNumber: '',
      manager: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<DepartmentInfo[]>([]);
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
      name: t('departmentList.size.mini'),
      value: 'mini',
    },
    {
      name: t('departmentList.size.small'),
      value: 'small',
    },
    {
      name: t('departmentList.size.medium'),
      value: 'medium',
    },
    {
      name: t('departmentList.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('departmentList.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
    },
    // {
    //   title: t('departmentList.columns.id'),
    //   dataIndex: 'id',
    // },
    {
      title: t('departmentList.columns.name'),
      dataIndex: 'departmentName',
    },
    {
      title: t('departmentList.columns.manager'),
      dataIndex: 'manager',
    },
    {
      title: t('departmentList.columns.managerPhone'),
      dataIndex: 'managerPhone',
    },
    {
      title: t('departmentList.columns.peopleNum'),
      dataIndex: 'peopleNum',
    },
    {
      title: t('departmentList.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      width: 300,
    },
    // {
    //   title: t('departmentList.columns.delete'),
    //   dataIndex: 'delete',
    //   slotName: 'delete',
    // },
  ]);

  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryDepartmentList(params);
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
  const handleUpdateClick = async (index: number, record: DepartmentInfo) => {
    updateRecord.value = cloneDeep(record);
    updateVisible.value = true;
  };

  const handleUpdateBeforeOk = () => {
    // return new Promise((resolve) => setTimeout(() => resolve(true), 3000));
    return true;
  };

  const handleUpdateCancel = () => {
    updateVisible.value = false;
  };

  const updateRecord = ref<DepartmentUpdateForm>({
    departmentNo: 0,
    departmentName: '',
    manager: '',
    managerPhone: '',
  });

  const deleteTask = async (record: EmployeeRecord) => {
    // await deletePolicy(record.id);
    fetchData();
  };

  const genderSelectOptions = reactive([
    {
      label: '女',
      value: 0,
    },
    {
      label: '男',
      value: 1,
    },
  ]);

  const departmentFieldName = {
    value: 'departmentNo',
    label: 'departmentName',
  };

  const registerData = reactive({
    username: '',
    password: '',
    password1: '',
    phoneNumber: '',
    birthday: undefined,
    gender: undefined,
    role: undefined,
    departmentNo: undefined,
  });
  const departments = ref<Department[]>();
  const getDepartment = async () => {
    const { data } = await getDepartmentList();
    departments.value = data;
  };

  getDepartment();

  const rules = {
    username: [
      {
        required: true,
        message: t('register.form.userName.required'),
      },
    ],
    phoneNumber: [
      {
        required: true,
        message: t('register.form.phoneNumber.required'),
      },
      {
        validator: (phoneNumber: string, cb: (error?: string) => void) => {
          const pattern = /^1[3-9]\d{9}$/; // 这是一个简单的中国手机号码的正则表达式
          if (!pattern.test(phoneNumber)) {
            cb(t('register.form.phoneNumber.formatError'));
          } else {
            cb();
          }
        },
      },
    ],
    birthday: [
      {
        message: t('register.form.birthday.required'),
      },
      {
        validator: (_: any, cb: (error?: string) => void) => {
          if (registerData.birthday === undefined) {
            cb(t('register.form.birthday.required'));
          } else {
            cb();
          }
        },
      },
    ],
    gender: [
      {
        required: true,
        message: t('register.form.gender.required'),
      },
    ],
    department: [
      {
        message: t('register.form.department.required'),
      },
      {
        validator: (_: any, cb: (error?: string) => void) => {
          if (registerData.departmentNo === undefined) {
            cb(t('register.form.department.required'));
          } else {
            cb();
          }
        },
      },
    ],
  };
  const findEmployee = async () => {
    // 查询员工
    // get phone from departmentCreateForm and fill the departmentCreateForm.manager
    const res = await getEmployeeInfo({
      phone: updateRecord.value.managerPhone,
    });
    updateRecord.value.manager = res.data.name;
  };
  // Todo: 未完成修改表单与删除表单，未完成api的编写
  const showReport = async () => {};
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
