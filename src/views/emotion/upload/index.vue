<template>
  <div class="container">
    <Breadcrumb :items="['menu.detect', 'menu.detect.upload']" />
    <a-card class="general-card" :title="$t('emotion.detect.upload.title')">
      <div class="wrapper">
        <div v-if="photoType == 1">
          <div>
            <video
              id="video"
              ref="video"
              autoplay
              style="
                height: 450px;
                width: 600px;
                object-fit: fill;
                margin-bottom: 32px;
              "
            ></video>
          </div>

          <a-row justify="space-around">
            <a-col :span="4">
              <a-button long @click="photoType = 0">退出拍照</a-button>
            </a-col>
            <a-col :span="4">
              <a-button long type="primary" @click="capture">拍照</a-button>
            </a-col>
          </a-row>
          <canvas ref="canvas" style="display: none" />
        </div>
        <div v-else-if="photoType == 0">
          <a-col>
            <a-row justify="space-around">
              <a-col :span="4">
                <a-button long @click="$router.push('/emotion-history')"
                  >查看历史记录</a-button
                >
              </a-col>
              <a-col :span="10">
                <div
                  >上传格式为jpg，png，bmp，pbm，pgm，ppm，sr，ras，ipeg，jpe，jp2，tiff文件</div
                >
              </a-col>
              <a-col :span="4">
                <a-button long type="primary" @click="retakePhoto"
                  >拍照</a-button
                >
              </a-col>
            </a-row>
            <a-upload
              :file-list="file ? [file] : []"
              :show-file-list="false"
              style="margin-top: 32px"
              @change="onChange"
              @progress="onProgress"
            >
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
                    拖动照片到此处
                    <span style="color: #3370ff"> 点击此处上传</span>
                  </div>
                </div>
              </template>
            </a-upload>
          </a-col>
          <!-- <a-row justify="space-around">
            <a-col :span="4">
              <a-button long @click="retakePhoto">拍照</a-button>
            </a-col>
            <a-col :span="4">
              <a-button long>上传照片</a-button>
            </a-col>
          </a-row> -->
        </div>
        <div v-else-if="photoType == 3">
          <div class="success-wrap">
            <a-result
              status="success"
              :title="$t('emotion.detect.upload.success.title')"
              :subtitle="$t('emotion.detect.upload.success.subTitle')"
            />
            <a-space :size="16">
              <a-button key="view" type="primary">
                {{ $t('emotion.detect.upload.view') }}
              </a-button>
              <a-button key="again" type="secondary" @click="photoType = 0">
                {{ $t('stepForm.button.again') }}
              </a-button>
            </a-space>
          </div>
        </div>
        <div v-else>
          <a-col>
            <a-row>
              <img
                id="photo"
                :src="photo"
                style="
                  height: 450px;
                  width: 600px;
                  object-fit: fill;
                  margin-bottom: 32px;
                "
              />
            </a-row>
            <a-row justify="space-around">
              <a-col :span="4">
                <a-button long @click="photoType = 0">重新选择</a-button>
              </a-col>
              <a-col :span="4">
                <a-button long type="primary" @click="photoType = 3"
                  >上传照片</a-button
                >
              </a-col>
            </a-row>
          </a-col>
        </div>
        <!-- <div
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 300px;
            width: 900px;
            border: 1px solid #000; /* 添加边框样式 */
          "
        >
          <a-col :flex="1"> -->
        <!-- <a-upload
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
            </a-upload> -->

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

        <!-- <a-space :size="16" direction="vertical" />
            <a-row justify="space-around">
              <a-col :span="4">
                <a-button long> abc </a-button>
              </a-col>
              <a-col :span="4">
                <a-button long> efg </a-button>
              </a-col>
            </a-row>
          </a-col>
        </div> -->

        <!-- <div
          style="
            height: 900px;
            width: 900px;
            border-radius: 2;
            line-height: 158px;
            text-align: center;
          "
        >
        </div> -->
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { IconEdit, IconPlus } from '@arco-design/web-vue/es/icon';
  import { FileItem, RequestOption } from '@arco-design/web-vue';

  const video = ref();
  const canvas = ref();
  const photoType = ref<number>(0);
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

      photoType.value = 2;
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
    photoType.value = 1;
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
    photo.value = file.value.url;
    photoType.value = 2;
  };
  const onProgress = (currentFile: any) => {
    file.value = currentFile;
    photo.value = file.value.url;
    photoType.value = 2;
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
    min-height: 900px;
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
  .success-wrap {
    text-align: center;
    font-size: 24px;
    padding: 20px;
    transform: scale(1.2);
  }
  :deep(.arco-result) {
    padding-top: 0;
  }
  .details-wrapper {
    width: 895px;
    margin-top: 54px;
    padding: 20px;
    text-align: left;
    background-color: var(--color-fill-2);
  }
</style>
