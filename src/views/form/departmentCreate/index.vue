<template>
  <div class="container">
    <Breadcrumb :items="['menu.form', 'menu.form.group']" />
    <a-card class="general-card" :title="$t('menu.list.employeeList')">
      <div class="wrapper">
        <a-form
          ref="loginForm"
          :model="newDepartment"
          class="step"
          layout="horizontal"
          :rules="rules"
          style="width: 580px"
        >
          <a-form-item
            field="departmentName"
            :label="$t('department.create.form.departmentName')"
          >
            <a-input
              v-model="newDepartment.departmentName"
              :placeholder="
                $t('department.create.form.departmentName.placeholder')
              "
            />
          </a-form-item>
          <a-form-item
            field="manager"
            :label="$t('department.create.form.manager')"
          >
            <a-input
              v-model="newDepartment.manager"
              :placeholder="$t('department.create.form.manager.placeholder')"
            />
          </a-form-item>
          <a-form-item
            field="managerPhone"
            :label="$t('department.create.form.managerPhone')"
          >
            <a-input
              v-model="newDepartment.managerPhone"
              :placeholder="
                $t('department.create.form.managerPhone.placeholder')
              "
            />
          </a-form-item>
          <a-form-item>
            <a-space :size="16" direction="vertical">
              <a-button
                type="primary"
                long
                :loading="loading"
                @submit="subimitCreate"
              >
                {{ $t('register.form.registerbutton') }}
              </a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { Department, DepartmentCreateForm, createDepartment, getDepartmentList } from '@/api/department';

  const { loading, setLoading } = useLoading(false);
  const { t } = useI18n();

  const newDepartment = ref<DepartmentCreateForm>({
    departmentName: '',
    manager: '',
    managerPhone: '',
  });

  const subimitCreate = async () => {
    setLoading(true);
    await createDepartment(newDepartment.value);
    setLoading(false);
  };

  const rules = {
    departmentName: [
      {
        required: true,
        message: t('department.create.form.departmentName.required'),
      },
    ],
    managerPhone: [
      {
        required: true,
        message: t('department.create.form.managerPhone.placeholder'),
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
    manager: [
      {
        required: true,
        message: t('department.create.form.manager.placeholder'),
      },
    ],
  };
</script>

<script lang="ts">
  export default {
    name: 'Group',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    background: var(--color-bg-2);
    text-align: right;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 0;
    background-color: var(--color-bg-2);
    :deep(.arco-form) {
      .arco-form-item {
        &:last-child {
          margin-top: 20px;
        }
      }
    }
  }

  .steps {
    margin-bottom: 76px;
  }
</style>
