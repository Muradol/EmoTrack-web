<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :rules="rules"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <!-- <a-form-item
      field="advertisingSource"
      :label="$t('stepForm.form.label.advertisingSource')"
      :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.advertisingSource.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.advertisingSource"
        :placeholder="$t('stepForm.placeholder.advertisingSource')"
      />
    </a-form-item>
    <a-form-item
      field="advertisingMedia"
      :label="$t('stepForm.form.label.advertisingMedia')"
      :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.advertisingMedia.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.advertisingMedia"
        :placeholder="$t('stepForm.placeholder.advertisingMedia')"
      />
    </a-form-item>
    <a-form-item
      field="keyword"
      :label="$t('stepForm.form.label.keyword')"
      :rules="[
        { required: true, message: $t('stepForm.form.error.keyword.required') },
      ]"
    >
      <a-select
        v-model="formData.keyword"
        :placeholder="$t('stepForm.placeholder.keyword')"
        multiple
      >
        <a-option>今日头条</a-option>
        <a-option>火山</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="pushNotify"
      :label="$t('stepForm.form.label.pushNotify')"
      :rules="[{ required: true }]"
    >
      <a-switch v-model="formData.pushNotify" />
    </a-form-item>
    <a-form-item
      field="advertisingContent"
      :label="$t('stepForm.form.label.advertisingContent')"
      :rules="[
        {
          required: true,
          message: $t('stepForm.form.error.advertisingContent.required'),
        },
        {
          maxLength: 200,
          message: $t('stepForm.form.error.advertisingContent.maxLength'),
        },
      ]"
      row-class="keep-margin"
    >
      <a-textarea
        v-model="formData.advertisingContent"
        :placeholder="$t('stepForm.placeholder.advertisingContent')"
      />
    </a-form-item> -->
    <a-form-item
      field="department"
      :label="$t('register.form.department')"
      :validate-trigger="['change', 'blur']"
    >
      <!-- Todo: should fix the problem that just show the departmentNumber instead of name -->
      <a-select
        v-model="formData.departmentNo"
        placeholder="请选择部门"
        :field-names="departmentFieldName"
        :options="departments"
      />
    </a-form-item>
    <!-- Todo: discuss that it should be a select or input -->
    <a-form-item field="role" :label="$t('employeeList.form.role')">
      <!-- <a-select
                    v-model="formModel.role"
                    :options="statusOptions"
                    :placeholder="$t('employeeList.form.selectDefault')"
                  /> -->
      <a-input
        v-model="formData.role"
        :placeholder="$t('employeeList.form.role.placeholder')"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="secondary" @click="goPrev">
          {{ $t('stepForm.button.prev') }}
        </a-button>
        <a-button type="primary" @click="onNextClick">
          {{ $t('stepForm.button.next') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { EmployeeWorkInfoModel } from '@/api/form';
  import { Department, getDepartmentList } from '@/api/department';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const emits = defineEmits(['changeStep']);

  const formRef = ref<FormInstance>();
  const formData = ref<EmployeeWorkInfoModel>({
    departmentNo: 0,
    role: '',
  });

  const departments = ref<Department[]>();
  const getDepartment = async () => {
    const { data } = await getDepartmentList();
    departments.value = data;
  };
  getDepartment();

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      emits('changeStep', 'submit', { ...formData.value });
    }
  };
  const goPrev = () => {
    emits('changeStep', 'backward');
  };

  const departmentFieldName = {
    value: 'departmentNo',
    label: 'departmentName',
  };
  const rules = {
    department: [
      {
        message: t('register.form.department.required'),
      },
      {
        validator: (_: any, cb: (error?: string) => void) => {
          if (formData.value.departmentNo === undefined) {
            cb(t('register.form.department.required'));
          } else {
            cb();
          }
        },
      },
    ],
  };
</script>

<style scoped lang="less">
  .container {
    .keep-margin {
      margin-bottom: 20px;
    }
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
  }

  .steps {
    margin-bottom: 36px;
  }

  .form {
    width: 540px;
  }

  .form-content {
    padding: 8px 50px 0 30px;
  }
</style>
