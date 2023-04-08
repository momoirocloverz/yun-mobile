<template>
  <view class="container" :class="[ISForOld ? 'oldcontainer' : '']">
    <view class="tit"> 检查事项： </view>
    <uni-card class="card">
      <view class="num"> 01 </view>
      <view class="text">
        <view class="t1"> 检查类别：{{ info.jclb }} </view>
        <view class=""> 具体检查事项：{{ info.dicDetailName }} </view>
      </view>
    </uni-card>
    <view class="form">
      <uni-forms :label-position="alignment" ref="form" :rules="rules" :modelValue="form">
        <uni-forms-item label="体检结果" required>
          <uni-data-checkbox v-model="form.haveSecurity" :localdata="state" @change="change"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label="隐患描述" required name="checkOpinion">
          <uni-easyinput v-model="form.checkOpinion" type="textarea" placeholder="请输入详细隐患描述" />
        </uni-forms-item>
        <uni-forms-item label="附件" name="file" required>
          <uni-file-picker
            fileMediatype="image"
            file-extname="png,jpg,jpeg,gif"
            :image-styles="imageStyles"
            mode="grid"
            ref="files"
            v-model="form.file"
            limit="9"
            @select="select"
            @success="success"
            @delete="handleDelete"
            @fail="fail"
          >
          </uni-file-picker>
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">确认上报</button>
    </view>
  </view>
</template>
<script>
import { upload, routineCheckPost } from '@/api/api.js';
export default {
  data() {
    return {
      alignment: 'top',
      form: {
        haveSecurity: 1,
        checkOpinion: null,
        checkContent: null,
        storageIds: '',
        file: [],
      },
      rules: {
        file: {
          rules: [
            {
              required: true,
              errorMessage: '请上传附件',
            },
          ],
        },
        checkOpinion: {
          rules: [
            {
              required: true,
              errorMessage: '请填写隐患描述',
            },
          ],
        },
      },
      imageStyles: {
        border: {
          color: '#ccc',
          width: 2,
          style: 'dashed',
          radius: '4px',
        },
      },
      state: [
        {
          text: '有隐患',
          value: 1,
        },
      ],
      show: null,
      ISForOld: false,
    };
  },
  onLoad(opt) {
    this.trace();
    this.checkMode();
    this.analyseData(opt);
  },
  methods: {
    analyseData(opt) {
      this.info = JSON.parse(opt.item);
      this.form.id = this.info.id;
      this.form.checkType = 1;
    },
    trace() {
      window.ZWJSBridge.monitorTrace({
        monitorType: 'pageIn',
        module: 'routinecheck-zjsend',
        bizInfo: {},
      })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
      } else {
        this.ISForOld = false;
      }
    },
    change(e) {
      this.form.haveSecurity = e.detail.value;
    },
    select(sec) {
      this.files = [];
      this.uploadAction(sec.tempFilePaths, 1);
    },
    uploadAction(tempFilePaths, token) {
      console.log(token);
      if (!tempFilePaths.length) return;
      const path = tempFilePaths.pop();
      this.form.file.push({ url: path, name: '' });
      upload(path)
        .then((res) => {
          console.log('res', res);
          if (res) {
            let real = JSON.parse(res);
            if (real && real.code && real.code == 200) {
              console.log('成功');
            } else {
              uni.showToast({
                title: '上传失败',
                icon: 'none',
              });
              this.form.file.pop();
              this.$refs.files.clearFiles(token - 1);
            }
          } else {
            uni.showToast({
              title: '上传失败',
              icon: 'none',
            });
            this.form.file.pop();
            this.$refs.files.clearFiles(token - 1);
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          });
          this.form.file.pop();
          this.$refs.files.clearFiles(token - 1);
        });
      this.uploadAction(tempFilePaths, token);
    },
    success(e) {},
    handleDelete(e) {
      console.log('删除', e);
      const num = this.form.file.findIndex((ele) => {
        return ele.url == e.tempFilePath;
      });
      console.log('num', num);
      this.form.file.splice(num, 1);
      console.log(this.form.file);
    },
    fail(e) {
      console.log('上传失败', e);
    },
    submit() {
      let pages = getCurrentPages();
      let beforePage = pages[pages.length - 3];
      this.$refs.form
        .validate()
        .then((res) => {
          console.log('成功', res);
        })
        .catch((err) => {
          console.log('错误：', err);
        });
      /*   routineCheckPost(this.form).then((res) => {
        let pages = getCurrentPages();
        let beforePage = pages[pages.length - 3];
        beforePage.$vm.needRefresh = true;
        uni.showToast({
          title: '反馈成功',
          icon: 'success',
        });
        uni.navigateBack({
          delta: 2,
        });
      }); */
    },
  },
};
</script>
<style lang="scss">
::v-deep {
  .uni-forms-item__label {
    width: 100% !important;
  }
  .file-picker__box-content {
    border-color: #ccc !important;
  }
  .icon-add {
    background-color: #ccc !important;
    width: 80rpx;
  }
}
.container {
  padding: 30rpx;
  .tit {
    font-size: 34rpx;
    color: #203152;
    font-weight: bold;
  }
}
.card {
  position: relative;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  margin: 0 !important;
  padding: 0 !important;
  margin-top: 20rpx !important;
  .btn {
    text-align: center;
    display: flex;
    margin-top: 15rpx;
    button {
      width: 48%;
      line-height: 100%;
      padding: 10rpx 40rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 34rpx;
      color: #203152;
      background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
      border-radius: 44rpx;
    }
  }
  .num {
    text-align: center;
    line-height: 56rpx;
    font-family: DINAlternate-Bold;
    font-size: 34rpx;
    color: #ffffff;
    letter-spacing: 0;
    font-weight: 700;
    position: absolute;
    left: 0;
    top: 0;
    width: 56rpx;
    height: 56rpx;
    background-image: linear-gradient(180deg, #00b2ff 0%, #007dff 100%);
    border-radius: 10px 0px 10px 0px;
  }
  .text {
    font-size: 30rpx;
    margin-top: 60rpx;
    padding-left: 30rpx;
    .t1 {
      margin-bottom: 15rpx;
      border-bottom: 1px dashed #ccc;
      padding-bottom: 15rpx;
    }
  }
}
.oldcontainer {
  ::v-deep {
    .label-text {
      font-size: 46rpx !important;
      color: #203152 !important;
      font-weight: bold;
      font-family: PingFangSC-Semibold;
    }
    .checklist-text {
      font-size: 46rpx !important;
      font-weight: bold;
      font-family: PingFangSC-Semibold;
    }
    .uni-easyinput__placeholder-class {
      font-size: 42rpx;
    }
  }
  .tit {
    font-size: 52rpx;
    font-family: PingFangSC-Semibold;
  }
  .card {
    position: relative;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
    border-radius: 33rpx !important;
    margin: 0 !important;
    padding: 0 !important;
    margin-top: 20rpx !important;
    .num {
      text-align: center;
      line-height: 66rpx;
      font-family: DINAlternate-Bold;
      font-size: 42rpx;
      color: #ffffff;
      letter-spacing: 0;
      font-weight: 700;
      position: absolute;
      left: 0;
      top: 0;
      width: 66rpx;
      height: 66rpx;
      background-image: linear-gradient(180deg, #00b2ff 0%, #007dff 100%);
      border-radius: 33rpx 0px 33rpx 0px;
    }
    .text {
      font-size: 42rpx;
      margin-top: 60rpx;
      padding-left: 30rpx;
      .t1 {
        margin-bottom: 15rpx;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 15rpx;
        color: #333;
      }
    }
  }
}
</style>
