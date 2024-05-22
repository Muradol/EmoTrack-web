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

  // const testData = {
  //   anger: 0.02,
  //   contempt: 2.68,
  //   disgust: 0.01,
  //   fear: 0.06,
  //   happy: 80.94,
  //   neutral: 13.22,
  //   sad: 2.27,
  //   surprise: 0.81,
  // };
  const EMOTIONDATA_KEY = 'emotions-data';
  const testDataString = localStorage.getItem(EMOTIONDATA_KEY);
  const testData = testDataString ? JSON.parse(testDataString) : null;
  const size = ref('large');
  const src =
    'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';
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
  const data = [
    {
      label: '姓名',
      value: '李四',
    },
    {
      label: '年龄',
      value: '24',
    },
    {
      label: '性别',
      value: '女',
    },
    {
      label: '部门',
      value: '策划部',
    },
    {
      label: '职位',
      value: '策划设计师',
    },
  ];
</script>

<style scoped></style>
