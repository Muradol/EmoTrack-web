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
              <a-col :span="3">
                <a-button long @click="$router.push('/emotion-history')"
                  >查看历史记录</a-button
                >
              </a-col>
              <a-col :span="16" style="font-size: 0.9em">
                <div style="text-align: center; user-select: none">
                  上传格式为jpg，png，bmp，pbm，pgm，ppm，sr，ras，ipeg，jpe，jp2，tiff文件
                </div>
              </a-col>
              <a-col :span="3">
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
                  <div style="user-select: none">
                    拖动照片到此处
                    <span style="color: #3370ff"> 点击此处上传</span>
                  </div>
                </div>
              </template>
            </a-upload>
          </a-col>
        </div>
        <div v-else-if="photoType == 3">
          <div class="success-wrap">
            <a-result
              status="success"
              :title="$t('emotion.detect.upload.success.title')"
              :subtitle="$t('emotion.detect.upload.success.subTitle')"
            />
            <a-space :size="16">
              <a-button key="view" type="primary" @click="showReport">
                {{ $t('emotion.detect.upload.view') }}
              </a-button>
              <a-button key="again" type="secondary" @click="photoType = 0">
                {{ $t('emotion.detect.upload.button.again') }}
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
                <a-button long type="primary" @click="uploadFile"
                  >上传照片</a-button
                >
              </a-col>
            </a-row>
          </a-col>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount, h } from 'vue';
  import { FileItem, Modal } from '@arco-design/web-vue';
  import { uploadPhoto } from '@/api/upload';
  import { useStorage } from '@vueuse/core';
  import EmotionCard from '../components/emotionCard.vue';

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
      stopStream();

      photoType.value = 2;
    }
  };

  const uploadFile = async () => {
    try {
      let file;
      if (photo.value.startsWith('blob:')) {
        // 直接上传会得到blob，而拍照会得到data
        // 如果photo.value是Blob URL，则将其转换为Blob对象
        const blob = await fetch(photo.value).then((response) =>
          response.blob()
        );
        // 创建一个File对象，为文件指定一个名字和类型
        file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      } else if (photo.value.startsWith('data:')) {
        // 如果photo.value是data URI字符串，则直接使用dataURItoBlob函数将其转换为Blob对象
        const blob = dataURItoBlob(photo.value);
        // 创建一个File对象，为文件指定一个名字和类型
        file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      } else {
        console.error('Unsupported photo format');
        return;
      }
      // 然后上传文件
      const response = await uploadPhoto(file);
      const regex = /emotion_response\((.*?)\)/;
      const match = response.data.emotionData.match(regex);

      if (match && match[1]) {
        // 提取匹配到的内容，并根据逗号和等号进行分割
        const parts = match[1].split(/,\s*/);

        // 定义一个类型，描述每个情绪和对应值的键值对
        interface EmotionValuePair {
          [key: string]: number;
        }
        // 创建一个空对象，用于存储情绪数据
        const emotions: EmotionValuePair = {};

        // 遍历分割后的部分，将每个情绪和对应值存储到对象中
        parts.forEach((part: string) => {
          const [key, value] = part.split('=');
          emotions[key] = parseFloat(value); // 将字符串值转换为浮点数
        });
        console.log(emotions);
        localStorage.removeItem('emotions-testdata');
        useStorage('emotions-testdata', emotions);
      } else {
        console.log('No emotion data found'); // 如果匹配失败，则输出错误信息
      }
    } catch (error) {
      console.log(error);
    } finally {
      photoType.value = 3;
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

  // Todo: 未完成情绪卡片数据跨页面
  const showReport = async (a: any) => {
    Modal.info({
      onBeforeOpen() {
        // Todo: 完成api请求报告
      },
      title: '情绪报告',
      content: () => h(EmotionCard),
      width: 'auto',
    });
  };

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
