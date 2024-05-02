<template>
  <div class="container">
    <Breadcrumb :items="['menu.form', 'menu.form.group']" />
    <a-card class="general-card" :title="$t('department.create.form.title')">
      <div class="wrapper">
        <!-- <div v-if="image">
          <video ref="video" autoplay></video>
          <button @click="capture">Capture</button>
        </div>
        <div v-else>
          <canvas ref="canvas">abc</canvas>
        </div> -->
        <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            /* height: 100%; */
            height: 300px;
            width: 900px;
            border: 1px solid #000; /* 添加边框样式 */
          "
        >
          <a-col :flex="1">
            <a-upload
              action="/"
              :file-list="file ? [file] : []"
              :show-file-list="false"
              style="
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 500px;
                width: 900px;
                transform: scale(3);
              "
              @change="onChange"
              @progress="onProgress"
            >
              <template #upload-button>
                <div
                  :class="`arco-upload-list-item${
                    file && file.status === 'error'
                      ? ' arco-upload-list-item-error'
                      : ''
                  }`"
                >
                  <div
                    v-if="file && file.url"
                    class="arco-upload-list-picture custom-upload-avatar"
                  >
                    <img :src="file.url" />
                    <div class="arco-upload-list-picture-mask">
                      <IconEdit />
                    </div>
                    <a-progress
                      v-if="file.status === 'uploading' && file.percent < 100"
                      :percent="file.percent"
                      type="circle"
                      size="mini"
                      :style="{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                      }"
                    />
                  </div>
                  <div v-else class="arco-upload-picture-card">
                    <div class="arco-upload-picture-card-text">
                      <IconPlus />
                      <div style="margin-top: 10px; font-weight: 600"
                        >Upload</div
                      >
                    </div>
                  </div>
                </div>
              </template>
            </a-upload>

            <!-- <a-upload action="/">
              <template #upload-button>
                <div
                  style="
                    background-color: var(--color-fill-2);
                    color: var(--color-text-1);
                    border: 1px dashed var(--color-fill-4);
                    height: 300px;
                    width: 900px;
                    border-radius: 2;
                    line-height: 158px;
                    text-align: center;
                  "
                >
                  <div>
                    Drag the file here or
                    <span style="color: #3370ff"> Click to upload</span>
                  </div>
                </div>
              </template>
            </a-upload> -->

            <a-space :size="16" direction="vertical" />
            <a-row justify="space-around">
              <a-col :span="4">
                <a-button long> abc </a-button>
              </a-col>
              <a-col :span="4">
                <a-button long> efg </a-button>
              </a-col>
            </a-row>
          </a-col>
        </div>
        <!-- <div v-if="!photoTaken">
          <div class="video-wrapper">
            <video id="video" ref="video" autoplay></video>
          </div>
          <canvas ref="canvas" style="display: none" />
          <button @click="capture">Capture</button>
        </div>
        <div v-else>
          <img id="photo" :src="photo" />
          <a-button @click="retakePhoto">重新拍照</a-button>
        </div> -->
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
  import { FileItem } from '@arco-design/web-vue';

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

  const file = ref();
  const onChange = (_: FileItem[], currentFile: FileItem) => {
    file.value = {
      ...currentFile,
      // url: URL.createObjectURL(currentFile.file),
    };
  };
  const onProgress = (currentFile: any) => {
    file.value = currentFile;
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
    min-height: 600px;
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
