<template>
  <a-list :bordered="false">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.password') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              {{ $t('userSetting.SecuritySettings.placeholder.password') }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-button type="text" @click="handleCreateClick">
              {{ $t('userSetting.SecuritySettings.button.update') }}
            </a-button>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.securityQuestion') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph class="tip">
              {{
                $t('userSetting.SecuritySettings.placeholder.securityQuestion')
              }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-button type="text">
              {{ $t('userSetting.SecuritySettings.button.settings') }}
            </a-button>
          </div>
          <a-modal
            v-model:visible="createVisible"
            title="修改密码"
            width="30%"
            unmount-on-close
            :on-before-ok="handleCreateBeforeOk"
            @cancel="handleCreateCancel"
          >
            <a-form
              ref="loginForm"
              :model="changePassword"
              class="login-form"
              layout="horizontal"
              :rules="rules"
            >
              <a-form-item
                field="password"
                :validate-trigger="['change', 'blur']"
                :label="$t('register.form.password')"
              >
                <a-input-password
                  v-model="changePassword.password"
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
                  v-model="changePassword.password1"
                  :placeholder="$t('register.form.password1.placeholder')"
                  allow-clear
                />
              </a-form-item>
            </a-form>
          </a-modal>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.phone') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph>
              已绑定：150******50
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-button type="text">
              {{ $t('userSetting.SecuritySettings.button.update') }}
            </a-button>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <a-typography-paragraph>
            {{ $t('userSetting.SecuritySettings.form.label.email') }}
          </a-typography-paragraph>
        </template>
        <template #description>
          <div class="content">
            <a-typography-paragraph class="tip">
              {{ $t('userSetting.SecuritySettings.placeholder.email') }}
            </a-typography-paragraph>
          </div>
          <div class="operation">
            <a-button type="text">
              {{ $t('userSetting.SecuritySettings.button.update') }}
            </a-button>
          </div>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';

  const { t } = useI18n();
  const changePassword = reactive({
    password: '',
    password1: '',
  });

  const rules = {
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
          if (value !== changePassword.password) {
            cb('two passwords do not match');
          } else {
            cb();
          }
        },
      },
    ],
  };

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
</script>

<style scoped lang="less">
  :deep(.arco-list-item) {
    border-bottom: none !important;
    .arco-typography {
      margin-bottom: 20px;
    }
    .arco-list-item-meta-avatar {
      margin-bottom: 1px;
    }
    .arco-list-item-meta {
      padding: 0;
    }
  }
  :deep(.arco-list-item-meta-content) {
    flex: 1;
    border-bottom: 1px solid var(--color-neutral-3);

    .arco-list-item-meta-description {
      display: flex;
      flex-flow: row;
      justify-content: space-between;

      .tip {
        color: rgb(var(--gray-6));
      }
      .operation {
        margin-right: 6px;
      }
    }
  }
</style>
