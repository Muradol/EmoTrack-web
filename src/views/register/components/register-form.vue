<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('register.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('register.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="registerData"
      class="login-form"
      layout="horizontal"
      :rules="rules"
      @submit="handleSubmit"
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
          <a-option value="0"> {{ $t('register.form.woman') }} </a-option>
          <a-option value="1"> {{ $t('register.form.man') }} </a-option>
        </a-select>
      </a-form-item>
      <a-form-item
        field="department"
        :label="$t('register.form.department')"
        :validate-trigger="['change', 'blur']"
      >
        <a-select v-model="registerData.departmentNo" placeholder="请选择部门">
          <a-option
            v-for="department in departments"
            :key="department.departmentName"
            :value="department.departmentNo"
          >
            {{ department.departmentName }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-space :size="16" direction="vertical">
          <a-button type="primary" html-type="submit" long :loading="loading">
            {{ $t('register.form.registerbutton') }}
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { RegisterData, register } from '@/api/user';
  import { Department, getDepartmentList } from '@/api/department';

  // Todo: 未完成字段校验以及mock数据
  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

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

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await register(values as RegisterData);
        router.push({ name: 'login' });
        Message.success(t('register.form.register.success'));
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };

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
    password: [
      {
        required: true,
        message: t('register.form.password.required'),
      },
    ],
    password1: [
      {
        required: true,
        message: t('register.form.password.required'),
      },
      {
        validator: (value: string, cb: (error?: string) => void) => {
          if (value !== registerData.password) {
            cb('two passwords do not match');
          } else {
            cb();
          }
        },
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
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 420px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
