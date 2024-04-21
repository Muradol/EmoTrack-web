<template>
  <div class="container">
    <Breadcrumb :items="['menu.form', 'menu.form.group']" />
    <a-card class="general-card" :title="$t('department.create.form.title')">
      <div>
        <!-- <div v-if="image">
          <video ref="video" autoplay></video>
          <button @click="capture">Capture</button>
        </div>
        <div v-else>
          <canvas ref="canvas">abc</canvas>
        </div> -->
        <div v-if="!photoTaken">
          <div class="video-wrapper">
            <video id="video" ref="video" autoplay></video>
          </div>
          <canvas ref="canvas" style="display: none" />
          <button @click="capture">Capture</button>
        </div>
        <div v-else>
          <img id="photo" :src="photo" />
          <a-button @click="retakePhoto">重新拍照</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';

  const video = ref();
  const canvas = ref();
  const photoTaken = ref(false);
  let stream: MediaStream | null = null;
  const photo = ref<string>('');

  const dataURItoBlob = (dataURI: string) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const stopStream = () => {
    stream?.getTracks().forEach((track) => track.stop());
  };

  const capture = () => {
    if (video.value) {
      canvas.value.width = video.value.videoWidth;
      canvas.value.height = video.value.videoHeight;
      const context = canvas.value.getContext('2d');
      context.drawImage(
        video.value,
        0,
        0,
        video.value.videoWidth,
        video.value.videoHeight
      );

      photo.value = canvas.value.toDataURL('image/jpeg', 0.4);
      const fileName = dataURItoBlob(photo.value);

      stopStream();

      photoTaken.value = true;
    }
  };

  const setupCamara = async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.value.srcObject = stream;
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  const retakePhoto = () => {
    setupCamara();
    photoTaken.value = false;
    photo.value = '';
  };

  onMounted(async () => {
    setupCamara();
  });

  onBeforeUnmount(() => {
    stopStream();
  });
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
  #video {
    transform: scaleX(-1); /* 反镜像 */
  }
  #photo {
    transform: scaleX(-1); /* 反镜像 */
    // border-radius: 50%;
    // width: 60vw;
    // height: 60vw;
    // @media screen and (max-width: 600px) {
    //   width: 55vw;
    //   height: 55vw;
    // }
  }
</style>
