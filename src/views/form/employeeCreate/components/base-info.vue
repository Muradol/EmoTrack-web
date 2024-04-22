<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :rules="rules"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="name"
      :label="$t('register.form.name')"
      :validate-trigger="['change', 'blur']"
    >
      <a-input
        v-model="formData.name"
        :placeholder="$t('register.form.name.placeholder')"
      />
    </a-form-item>
    <a-form-item
      field="gender"
      :label="$t('register.form.gender')"
      :validate-trigger="['change', 'blur']"
    >
      <!-- <a-select
        v-model="formData.gender"
        :placeholder="$t('register.form.gender.placeholder')"
        :options="genderSelectOptions"
      /> -->
      <a-radio-group v-model="formData.gender">
        <a-radio :value="0">女</a-radio>
        <a-radio :value="1">男</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      field="birthday"
      :label="$t('register.form.birthday')"
      :validate-trigger="['change', 'blur']"
    >
      <a-date-picker v-model="formData.birthday" />
    </a-form-item>
    <a-form-item
      field="phoneNumber"
      :label="$t('register.form.phoneNumber')"
      :validate-trigger="['change', 'blur']"
    >
      <a-input
        v-model="formData.phoneNumber"
        :placeholder="$t('register.form.phoneNumber.placeholder')"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" @click="onNextClick">
        {{ $t('stepForm.button.next') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { EmployeeBaseInfoModel } from '@/api/form';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const emits = defineEmits(['changeStep']);
  const formRef = ref<FormInstance>();
  const formData = ref<EmployeeBaseInfoModel>({
    name: '',
    phoneNumber: '',
    birthday: '',
    gender: 0,
  });

  const onNextClick = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      emits('changeStep', 'forward', { ...formData.value });
    }
  };
  const rules = {
    name: [
      {
        required: true,
        message: t('register.form.name.required'),
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
          if (formData.value.birthday === '') {
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
</script>

<style scoped lang="less">
  .container {
    padding: 20px;
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
    width: 500px;
  }

  .form-content {
    padding: 8px 50px 0 30px;
  }
</style>
