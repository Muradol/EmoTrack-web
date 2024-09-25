<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-sub-title">{{ $t('login.form.title') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: $t('login.form.userName.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('login.form.userName.placeholder')"
        >
          <template #prefix>
            <icon-phone />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('login.form.password.errMsg') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('login.form.password.placeholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword as any"
          >
            {{ $t('login.form.rememberPassword') }}
          </a-checkbox>
          <a-link>Contact us</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('login.form.login') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import useLoading from '@/hooks/loading';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  // 使用本地存储保存登录配置信息
  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: 'admin', // 默认账号
    password: '123456', // 默认密码
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
  });

  // 模拟登录函数
  const mockLogin = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> => {
    return new Promise((resolve, reject) => {
      const defaultUsername = 'admin';
      const defaultPassword = '123456';

      if (username === defaultUsername && password === defaultPassword) {
        resolve(); // 登录成功
      } else {
        reject(new Error(t('login.form.errorMessage'))); // 登录失败
      }
    });
  };

  // 处理表单提交
  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, any> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await mockLogin({
          username: values.username,
          password: values.password,
        });
        // 登录成功后跳转到指定路由
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Test',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));

        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;

        // 将账号和密码存入本地存储
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };

  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
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
  }
</style>
