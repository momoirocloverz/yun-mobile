<template>
  <view class="missionNewContainer" :class="[ISForOld ? 'oldMissionNewContainer' : '']">
    <uni-popup ref="previewPop" class="">
      <image :src="dynamicImgage" class="dynaimcImgStyle" mode="aspectFit" />
    </uni-popup>
    <view class="blockCon">
      <view class="formCon">
        <view class="currentName">{{ currentName }}</view>
        <uni-forms :modelValue="formData" :rules="rules" ref="formData">
          <view class="listTitle">需处理事项：</view>
          <uni-forms-item class="formItemWithPad">
            <template v-for="(item, index) in bussinesArray" :key="index">
              <view class="arrayItem">
                <view class="arrayTitle">事项{{ index + 1 }}</view
                >：
                <uni-easyinput type="textarea" style="height:100rpx" v-model="item.value" class="withBorderInput" :placeholderStyle="placeholderStyle" disabled placeholder="请输入已处理描述" />
              </view>
              <uni-file-picker v-if="item.file && item.file.length" fileMediatype="image" class="top-upload"
                file-extname="png,jpg,jpeg,gif" :image-styles="imageStyles" mode="grid" :ref="'file2s' + (index + 1)"
                v-model="item.file" limit="5"></uni-file-picker>
            </template>
          </uni-forms-item>
          <uni-forms-item label="处置人员：">
            <uni-easyinput type="text" v-model="formData.name_dis" disabled />
          </uni-forms-item>
          <uni-forms-item label="上报时间：">
            <uni-easyinput type="text" v-model="formData.pubTime" disabled />
          </uni-forms-item>
          <uni-forms-item label="任务状态：">
            <uni-data-checkbox class="switchCheck" v-model="formData.checkStatus" :localdata="state" @change="switchChange"></uni-data-checkbox>
          </uni-forms-item>
          <uni-forms-item name="file">
            <view class="specialFormImgTitle with20Margin">
              <text class="fakeRequired">现场照片：</text>
              <text class="localGreen">最多5张</text>
            </view>
            <!-- 
            <view class="uni-file-picker uni-mt-5">
                <view class="imageAreaContainer">
                  <template v-for="(jtem, jndex) in afterPick[index].copyfile" :key="jndex">
                    <view class="width333">
                      <view class="imgBorderCon">
                        <uni-icons type="clear" @click="removeCurrentImg(index,jndex)" size="30" class="removeIcon"
                          color="#444"></uni-icons>
                        <image @click="popPreview(jtem)" :src="jtem.url" mode="aspectFill" />
                      </view>
                    </view>
                  </template>
                  <view class="width333" @click="popTrigger(index)"
                    v-if="afterPick[index].copyfile && afterPick[index].copyfile.length < 5">
                    <view class="imgBorderCon">
                      <uni-icons type="plusempty" size="60" color="#ccc"></uni-icons>
                    </view>
                  </view>
                </view>
              </view> -->
            <view class="uni-file-picker uni-mt-5">
              <view class="imageAreaContainer">
                <template v-for="(item, index) in formData.file" :key="index">
                  <view class="width333">
                    <view class="imgBorderCon">
                      <uni-icons type="clear" @click="removeCurrentImg(index)" size="30" class="removeIcon" color="#444"></uni-icons>
                      <image @click="popPreview(item)" :src="item.url" mode="aspectFill" />
                    </view>
                  </view>
                </template>
                <view class="width333" @click="popTrigger" v-if="formData.file && formData.file.length < 5">
                  <view class="imgBorderCon">
                    <uni-icons type="plusempty" size="60" color="#ccc"></uni-icons>
                  </view>
                </view>
              </view>
            </view>
          </uni-forms-item>
          <uni-forms-item label="检查事项：" required label-position="top" name="endContent">
            <uni-easyinput class="localTextArea" type="textarea" trim="all" v-model="formData.endContent" :placeholderStyle="placeholderStyle" placeholder="请输入具体的检查事项" maxlength="50" />
          </uni-forms-item>
          <uni-forms-item name="anotherFile">
            <view class="specialFormImgTitle with20Margin">
              <text class="fakeRequired">处理照片：</text>
              <text class="localGreen">最多5张</text>
            </view>
            <view class="uni-file-picker uni-mt-5">
              <view class="imageAreaContainer">
                <template v-for="(item, index) in formData.anotherFile" :key="index">
                  <view class="width333">
                    <view class="imgBorderCon">
                      <uni-icons type="clear" @click="removeCurrentImgx(index)" size="30" class="removeIcon" color="#444"></uni-icons>
                      <image @click="popPreviewx(item)" :src="item.url" mode="aspectFill" />
                    </view>
                  </view>
                </template>
                <view class="width333" @click="popTriggerx" v-if="formData.anotherFile && formData.anotherFile.length < 5">
                  <view class="imgBorderCon">
                    <uni-icons type="plusempty" size="60" color="#ccc"></uni-icons>
                  </view>
                </view>
              </view>
            </view>
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="btnsCon">
        <button class="cancelBtn" type="default" @click="goBack">取消</button>
        <button class="confirmBtn" @click="submitForm" type="primary">确定</button>
      </view>
    </view>
  </view>
</template>
<script>
import { uploadNew, uploadWithDtDream, getbaseCheckDataById, basecheckendCreate } from '@/api/api.js';
import dayjs from 'dayjs';
import tool from '@/utils/request.js';
export default {
  data() {
    return {
      currentName: '',
      bussinesArray: [],
      type: null,
      state: [
        {
          text: '正常',
          value: 1,
        },
        {
          text: '异常',
          value: 2,
        },
      ],
      t0: 0,
      t2: 0,
      formData: {
        checkStatus: 1,
        name: null,
        pubTime: null,
        endContent: null,
        file: [],
        anotherFile: [],
        fileCopy: [],
        anotherFileCopy: [],
      },
      rules: {
        // file: {
        //   rules: [
        //     {
        //       required: true,
        //       errorMessage: '请上传附件',
        //     },
        //   ],
        // },
        // anotherFile: {
        //   rules: [
        //     {
        //       required: true,
        //       errorMessage: '请上传附件',
        //     },
        //   ],
        // },
        endContent: {
          rules: [
            {
              required: true,
              errorMessage: '请输入检查事项',
            },
          ],
        },
      },
      placeholderStyle: 'color:#666;font-size:28rpx',
      imageStyles: {
        border: {
          color: '#ccc',
          width: 0.5,
          style: 'solid',
          radius: '4px',
        },
      },
      show: null,
      ISForOld: false,
      queryId: '',
    };
  },
  onShow() {
    this.t0 = Date.now();
    this.checkMode();
  },
  onHide() {
    this.buryPoints();
  },
  onLoad(opt) {
    this.analyseData(opt);
  },
  methods: {
    popTrigger(index) {
      ZWJSBridge.chooseImage({
        upload: true,
      })
        .then((result) => {
          console.log(result);
          uploadWithDtDream({
            path: result.picPath[0],
          }).then((res) => {
            if (res) {
              let real = res;
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.path;
                let innerId = real.data.id;
                this.formData.file.push({ url: innerPath, name: innerId, id: innerId });
                this.formData.fileCopy.push({ url: innerPath, name: innerId, id: innerId });
              } else {
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                });
              }
            } else {
              uni.showToast({
                title: '上传失败',
                icon: 'none',
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.commonUploadApi();
        });
    },
    commonUploadApi() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          let blob = res.tempFilePaths[0];
          uploadNew(blob).then((res) => {
            if (res) {
              let real = JSON.parse(res);
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.bean[0].path;
                let innerId = real.data.bean[0].id;
                this.formData.file.push({ url: innerPath, name: innerId, id: innerId });
                this.formData.fileCopy.push({ url: innerPath, name: innerId, id: innerId });
              } else {
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                });
              }
            }
          });
        },
      });
    },
    popTriggerx() {
      ZWJSBridge.chooseImage({
        upload: true,
      })
        .then((result) => {
          console.log(result);
          uploadWithDtDream({
            path: result.picPath[0],
          }).then((res) => {
            if (res) {
              let real = res;
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.path;
                let innerId = real.data.id;
                this.formData.anotherFileCopy.push({ url: innerPath, name: innerId, id: innerId });
                this.formData.anotherFile.push({ url: innerPath, name: innerId, id: innerId });
              } else {
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                });
              }
            } else {
              uni.showToast({
                title: '上传失败',
                icon: 'none',
              });
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.commonXUploadApi();
        });
    },
    commonXUploadApi() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          let blob = res.tempFilePaths[0];
          uploadNew(blob).then((res) => {
            if (res) {
              let real = JSON.parse(res);
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.bean[0].path;
                let innerId = real.data.bean[0].id;
                this.formData.anotherFileCopy.push({ url: innerPath, name: innerId, id: innerId });
                this.formData.anotherFile.push({ url: innerPath, name: innerId, id: innerId });
              } else {
                uni.showToast({
                  title: '上传失败',
                  icon: 'none',
                });
              }
            }
          });
        },
      });
    },
    removeCurrentImg(index) {
      this.formData.file.splice(index, 1);
      this.formData.fileCopy.splice(index, 1);
    },
    removeCurrentImgx(index) {
      this.formData.anotherFile.splice(index, 1);
      this.formData.anotherFileCopy.splice(index, 1);
    },
    popPreview(item) {
      this.$refs.previewPop.open('center');
      this.dynamicImgage = item.url;
    },
    submitForm() {
      let pages = getCurrentPages();
      let beforePage = pages[pages.length - 2];
      if (beforePage) {
        beforePage.$vm.needRefresh = true;
      }
      this.$refs.formData
        .validate()
        .then((res) => {
          console.log('成功', res);
          let after1 = this.formData.fileCopy.map((ele) => {
            return {
              id: ele.id,
              img: ele.url,
            };
          });
          let jsonStr1 = '';
          if (after1 && after1.length) {
            jsonStr1 = JSON.stringify(after1);
          } else {
            jsonStr1 = '';
          }
          let after2 = this.formData.anotherFileCopy.map((ele) => {
            return {
              id: ele.id,
              img: ele.url,
            };
          });
          let jsonStr2 = '';
          if (after2 && after2.length) {
            jsonStr2 = JSON.stringify(after2);
          } else {
            jsonStr2 = '';
          }
          let finalData = {
            baseCheckId: this.queryId,
            endContent: this.formData.endContent,
            startImages: jsonStr1,
            endImages: jsonStr2,
            endMsg: '',
            checkStatus: this.formData.checkStatus,
          };
          console.log('finalData', finalData);
          basecheckendCreate(finalData)
            .then((res) => {
              console.log('res', res);
              if (res && res.code && res.code == 200) {
                uni.showToast({
                  title: '添加成功 ',
                  icon: 'success',
                });
                uni.navigateBack();
              }
            })
            .catch((err) => {
              console.log('err', err);
            });
        })
        .catch((err) => {
          console.log('错误：', err);
        });
    },
    analyseData(opt) {
      this.formData.name_dis = uni.getStorageSync('name');
      this.formData.pubTime = dayjs().format('YYYY.MM.DD');
      this.queryId = opt.id;
      getbaseCheckDataById({
        baseCheckId: opt.id,
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            this.currentName = shorter.publishName;
            this.formData.name = shorter.createCheckName;
            // this.formData.name_dis = this.format_name(shorter.userName);
            shorter.baseCheckBody.forEach((ele) => {
              ele.value = ele.checkNameType;
              ele.file = ele.storageId ? JSON.parse(ele.storageId) : [];
            });
            shorter.baseCheckBody.forEach((ele) => {
              if (ele.file) {
                ele.file.forEach((sub) => {
                  sub.url = sub.img;
                });
              }
            });
            this.bussinesArray = shorter.baseCheckBody;
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    buryPoints() {
      this.t2 = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'missionNew',
          pageName: '新增任务页面',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
    },
    switchChange(e) {
      //   this.form.checkStatus = e.detail.value;
    },
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
        this.placeholderStyle = 'color:#666;font-size:30rpx';
      } else {
        this.ISForOld = false;
        this.placeholderStyle = 'color:#666;font-size:28rpx';
      }
    },
    format_name(val) {
      if (val && val.length > 0) {
        return '*' + val.join()?.substring(1);
      } else {
        return '*';
      }
    },
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.missionNewContainer {
  padding: 30rpx;
  box-sizing: border-box;
}
.blockCon {
  border: 1rpx solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.05);
  border-radius: 16rpx;
  padding: 47rpx 32rpx 87rpx 32rpx;
  box-sizing: border-box;
}
.formCon {
}
.currentName {
  color: #333;
  font-size: 36rpx;
  font-weight: 700;
  margin-bottom: 30rpx;
  line-height: 50rpx;
  font-family: PingFang-SC-Bold;
}
.withBorderInput {
  border: 2rpx solid rgba(238, 238, 238, 1);
  font-size: 28rpx;
}
.listTitle {
  color: #666;
  font-size: 28rpx;
  line-height: 45rpx;
  font-weight: 500;
  font-family: PingFang-SC-Medium;
  border-bottom: 1rpx solid #ddd;
  padding-bottom: 17rpx;
  box-sizing: border-box;
}
.arrayItem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30rpx;
  box-sizing: border-box;
  margin-bottom: 16rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
.formItemWithPad {
  padding-top: 20rpx;
  padding-bottom: 20rpx;
  box-sizing: border-box;
  font-size: 28rpx;
}
.arrayTitle {
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #666666;
  letter-spacing: 0;
  line-height: 45rpx;
  font-weight: 500;
  width: 80rpx;
}
.fakeRequired {
  &::before {
    content: '*';
    color: #dd524d;
    font-weight: bold;
    font-size: 34rpx;
  }
}
.specialFormImgTitle {
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #666;
  letter-spacing: 0;
  line-height: 45rpx;
  font-weight: 500;
}
.with20Margin {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.localGreen {
  color: #1677ff;
}
::v-deep {
  .uni-forms-item__inner {
    padding: 0 !important;
  }
  .is-disabled {
    color: #666 !important;
    border: none !important;
    background-color: unset !important;
  }
  .uni-file-picker {
    margin-bottom: 20rpx;
  }
  .uni-forms-item {
    border-bottom: 1rpx solid #ddd !important;
    &:last-child {
      border: none !important;
    }
  }
  .uni-stat__actived {
    outline: none !important;
  }
  .is-input-border {
    border: none;
  }
  .icon-add {
    background-color: #ccc !important;
  }
  .uni-forms-item__label {
    width: auto !important;
    font-size: 28rpx;
    .label-text {
      font-size: 28rpx;
      color: #666;
      font-weight: 500;
    }
  }
  .uni-stat__select {
    padding: 0 !important;
  }
  .uni-textarea-textarea {
    font-size: 28rpx;
  }
  .uni-easyinput__content-textarea {
    padding: 0 !important;
  }
  .is-input-error-border {
    padding-bottom: 20px;
    // margin-top: 20px;
  }
  .checklist-text {
    font-size: 28rpx !important;
  }
  .uni-input-input {
    font-size: 28rpx !important;
  }
}
.localTextArea {
  font-size: 28rpx;
}
.switchCheck {
  font-size: 28rpx;
}

.btnsCon {
  margin-top: 44rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cancelBtn {
    width: 280rpx;
    height: 88rpx;
    line-height: 88rpx;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    border-radius: 55rpx;
    border: 2rpx solid rgba(229, 229, 229, 1);
    box-shadow: 0 10rpx 30rpx 0 rgba(0, 0, 0, 0.1);
    &:after {
      border: none !important;
    }
  }
  .confirmBtn {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
    width: 280rpx;
    height: 88rpx;
    line-height: 88rpx;
    background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
    box-shadow: 0 10rpx 30rpx 0 rgba(86, 128, 250, 0.6);
    border-radius: 55rpx;
    &:after {
      border: none !important;
    }
  }
}

.dynaimcImgStyle {
  width: 100vw !important;
  height: 50vh !important;
}
.width333 {
  width: 33.33%;
  height: 0;
  padding-top: 33.33%;
  position: relative;
}
.imgBorderCon {
  margin: 5px;
  border: 1px #ccc solid;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .removeIcon {
    position: absolute;
    top: 10rpx;
    right: 10rpx;
    z-index: 10;
  }
}
.imageAreaContainer {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.popupItem {
  font-size: 28rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background-color: #fff;
  box-sizing: border-box;
  &:nth-child(1) {
    border-bottom: 1px solid #f4f0f0;
  }
}
.popupcontent {
  background-color: #f4f0f0;
}
.popupCancel {
  margin-top: 20rpx;
  font-size: 28rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background-color: #fff;
}
.hiddenTroubleContainer {
  position: relative;
  .headBack {
    width: 100vw;
    height: 260rpx;
  }
  .scrollCon {
    position: absolute;
    top: 220rpx;
    border-radius: 32rpx 32rpx 0 0;
    width: 100vw;
    background-color: #fff;
    padding: 30rpx;
    box-sizing: border-box;
    padding-bottom: 250rpx;
  }
  .commonTitle {
    color: #333;
    font-size: 26rpx;
    font-weight: 500;
  }
}
.borderTextArea {
  .is-input-border {
    border: 1px solid rgb(219, 219, 219) !important;
  }
}
.specialFormImgTitle {
  font-size: 26rpx;
  color: #666;
  letter-spacing: 0;
  font-weight: 500;
}

.oldMissionNewContainer {
  .confirmBtn {
    font-size: 42rpx !important;
  }
  .cancelBtn {
    font-size: 42rpx !important;
  }
  .specialFormImgTitle {
    font-size: 34rpx !important;
  }
  .currentName {
    font-size: 44rpx !important;
  }
  .statusTitle {
    font-size: 34rpx !important;
  }
  .statusBlock {
    font-size: 32rpx !important;
  }
  .arrayTitle {
    font-size: 30rpx !important;
  }
  .listTitle {
    font-size: 32rpx !important;
  }
  ::v-deep {
    .checklist-text {
      font-size: 35rpx !important;
    }
    .uni-input-input {
      font-size: 36rpx !important;
      height: 48px;
    }
    .uni-combox__input-plac {
      font-size: 36rpx;
    }
    .uni-forms-item__label {
      font-size: 32rpx !important;
      .label-text {
        font-size: 32rpx !important;
      }
    }
    .uni-combox {
      font-size: 36rpx;
      .uni-input-input {
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .uni-textarea-textarea {
      font-size: 18px;
    }
  }
}
::v-deep .top-upload{
  .is-add {
    display: none !important;
  }
  .icon-del-box {
    display: none !important;
  }
}
</style>
