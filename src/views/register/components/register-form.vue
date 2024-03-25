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
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :label="$t('register.form.userName')"
        :rules="[
          { required: true, message: $t('register.form.userName.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="registerData.username"
          :placeholder="$t('register.form.userName.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[
          { required: true, message: $t('register.form.password.errMsg') },
        ]"
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
        :rules="[
          { required: true, message: $t('register.form.password.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
        :label="$t('register.form.confirmPassword')"
      >
        <a-input-password
          v-model="registerData.password"
          :placeholder="$t('register.form.password.placeholder')"
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="phoneNumber"
        :label="$t('register.form.phoneNumber')"
        :rules="[
          { required: true, message: $t('register.form.userName.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="registerData.username"
          :placeholder="$t('register.form.userName.placeholder')"
        />
      </a-form-item>
      <a-form-item
        field="birthDay"
        :label="$t('register.form.birthDay')"
        :rules="[
          { required: true, message: $t('register.form.userName.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-date-picker v-model="registerData.birthday" />
      </a-form-item>
      <a-form-item
        field="gender"
        :label="$t('register.form.gender')"
        :rules="[
          { required: true, message: $t('register.form.userName.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-select placeholder="register.form.gender">
          <a-option> {{ $t('register.form.woman') }} </a-option>
          <a-option> {{ $t('register.form.man') }} </a-option>
        </a-select>
      </a-form-item>
      <!-- <a-form-item>
        <a-input>
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item> -->
      <a-form-item
        field="department"
        :label="$t('register.form.department')"
        :rules="[
          { required: true, message: $t('register.form.userName.errMsg') },
        ]"
        :validate-trigger="['change', 'blur']"
      >
        <a-select
          v-model="registerData.departmentNo"
          placeholder="register.form.department"
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
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData, RegisterData } from '@/api/user';
  import { Department, getDepartmentList } from '@/api/department';

  // Todo: 未完成字段校验以及mock数据
  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'admin', // 演示默认值
    password: 'admin', // demo default value
  });

  const registerData = reactive({
    username: '',
    password: '',
    password1: '',
    phoneNumber: '',
    birthday: new Date('2000-01-01'),
    gender: 0,
    role: 0,
    departmentNo: 0,
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
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('register.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };

  const departments = ref<Department[]>([
    { departmentNo: 0, departmentName: '技术部' },
    { departmentNo: 1, departmentName: '产品部' },
    { departmentNo: 2, departmentName: '市场部' },
    { departmentNo: 3, departmentName: '运营部' },
    { departmentNo: 4, departmentName: '人事部' },
    { departmentNo: 5, departmentName: '财务部' },
  ]);
  const getDepartment = async () => {
    const { data } = await getDepartmentList();
    departments.value = data;
  };
  getDepartment();
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
