<template>
  <a-card>
    <template #cover>
      <div
        style="
          display: flex;
          width: 800px;
          margin-top: 20px;
          padding: 16px;
          text-align: center;
        "
      >
        <a-image
          width="40%"
          style="align-content: center; justify-content: center"
          :src="src"
        />
        <a-descriptions
          style="flex-grow: 1"
          align="left"
          :data="data"
          :size="size"
          column="2"
          bordered
        />
      </div>
    </template>
    <a-card-meta>
      <template #description>
        <a-table :columns="columns" :data="emotionData" :pagination="false" />
      </template>
    </a-card-meta>
  </a-card>
</template>

<script setup>
  import { ref } from 'vue';
  import { useUserStore } from '@/store';

  const userStore = useUserStore();
  const EMOTIONDATA_KEY = 'emotions-data';
  const testDataString = localStorage.getItem(EMOTIONDATA_KEY);
  const testData = testDataString ? JSON.parse(testDataString) : null;
  const size = ref('large');
  const src = userStore.employeeAvatar;
  const columns = [
    {
      title: '情绪',
      dataIndex: 'emotion',
    },
    {
      title: '测试值',
      dataIndex: 'value',
    },
  ];
  const emotionData = [
    {
      key: '1',
      emotion: '愤怒',
      value: testData.anger,
    },
    {
      key: '2',
      emotion: '冷漠',
      value: testData.contempt,
    },
    {
      key: '3',
      emotion: '厌恶',
      value: testData.disgust,
    },
    {
      key: '4',
      emotion: '担忧',
      value: testData.fear,
    },
    {
      key: '5',
      emotion: '愉悦',
      value: testData.happy,
    },
    {
      key: '6',
      emotion: '中立',
      value: testData.neutral,
    },
    {
      key: '7',
      emotion: '忧伤',
      value: testData.sad,
    },
    {
      key: '8',
      emotion: '惊喜',
      value: testData.surprise,
    },
  ];
  // Todo: employeeGender's type is string
  const data = [
    {
      label: '姓名',
      value: userStore.employeeName,
    },
    {
      label: '工号',
      value: userStore.employeeId,
    },
    {
      label: '性别',
      value: userStore.employeeGender === '1' ? '男' : '女',
    },
    {
      label: '部门',
      value: userStore.employeeJob,
    },
    {
      label: '职位',
      value: userStore.employeeJob,
    },
  ];
</script>

<style scoped></style>
