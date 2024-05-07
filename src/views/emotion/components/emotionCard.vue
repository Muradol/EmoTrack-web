<template>
  <a-card :style="{ width: '360px' }">
    <template #actions>
      <span class="icon-hover"> <IconMore /> </span>
    </template>
    <template #cover>
      <div
          :style="{
          height: '204px',
          overflow: 'hidden',
        }"
      >
<!--        <img-->
<!--            :style="{ width: '50%',height: '80%', transform: 'translate(50%,15%)' }"-->
<!--            alt="dessert"-->
<!--            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"-->
<!--        />-->
        <Chart style="width: 100%; height: 300px" :option="chartOption" />
      </div>
    </template>
    <a-card-meta title="2024年5月7日">
      <template #description>
        愤怒 87.5%<br>
        <br>
        <b>可能会导致：</b> <br>
        极端和危险的行为，如严重的暴力或破坏行为，需要立即的专业干预。<br>
      </template>
      <template #avatar>
        <div
            :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
          <a-avatar :size="24" :style="{ marginRight: '8px'}">
            A
          </a-avatar>
          <a-typography-text style="user-select: none">Username</a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
  import {
    IconMore,
  } from '@arco-design/web-vue/es/icon';
  import useChartOption from '@/hooks/chart-option';
  // Todo: 仪表盘
  const { chartOption } = useChartOption((isDark) => {
    const graphicElementStyle = {
      textAlign: 'center',
      fill: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
      fontSize: 14,
      lineWidth: 10,
      fontWeight: 'bold',
    };
    return {

  };
});

  export default {
    components: { IconMore },
  };
</script>
<style scoped>
  .icon-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.1s;
  }
  .icon-hover:hover {
    background-color: rgb(var(--gray-2));
  }
</style>
