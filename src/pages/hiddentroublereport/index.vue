<template>
  <view class="hiddenTroubleContainer" :class="[ISForOld ? 'oldHiddenTroubleContainer' : '']">
    <image class="headBack" :src="headImg" mode="widthFix"></image>
    <view class="scrollCon">
      <view>
        <view class="commonTitle fakeRequired">涉及文物</view>
        <view class="inputWrap uni-mt-5" @click="iconClick">
          <view v-if="formData.bumpPointld" class="choosenItem">
            <view>{{ chossen.publishName }}</view>
            <view class="flexBorder">
              <view class="borderGreen">{{ chossen.rank && rankFilter(chossen.rank) }}</view>
              <view class="borderGreen">{{ chossen.category }}</view>
            </view>
          </view>
          <uni-easyinput v-else class="" suffixIcon="bottom" v-model="value" placeholder="请选择文保单位"
            disabled></uni-easyinput>
        </view>
        <view class="commonTitle uni-mt-5 fakeRequired">举报类型</view>
        <view>
          <view class="uni-list">
            <view class="uni-list-cell">
              <view class="uni-list-cell-db">
                <picker @change="bindPickerChange" :value="index" :range="array">
                  <uni-easyinput class="uni-mt-5" suffixIcon="bottom" v-model="formData.checkLabel"
                    placeholder="请选择举报类型" disabled></uni-easyinput>
                </picker>
              </view>
            </view>
          </view>
        </view>
        <view class="textAreaCon">
          <view class="commonTitle uni-mt-5 fakeRequired">问题情况</view>
          <uni-easyinput class="localTextArea uni-mt-5" type="textarea" v-model="formData.checkMsg"
            :placeholderStyle="placeholderStyle" placeholder="请输入问题情况" maxlength="200" />
          <view class="numberCount">{{ formData.checkMsg.length }}/200</view>
        </view>
        <view class="specialFormImgTitle uni-mt-5">
          <text class="fakeRequired">附件资料</text>
          <text class="localGreen">最多9张</text>
        </view>
        <view class="uni-file-picker uni-mt-5">
          <view class="imageAreaContainer">
            <template v-for="(item, index) in formData.fileArray" :key="index">
              <view class="width333">
                <view class="imgBorderCon">
                  <uni-icons type="clear" @click="removeCurrentImg(index)" size="30" class="removeIcon"
                    color="#444"></uni-icons>
                  <image @click="popPreview(item)" :src="item.url" mode="aspectFill" />
                </view>
              </view>
            </template>
            <view class="width333" @click="popTrigger" v-if="formData.fileArray && formData.fileArray.length < 9">
              <view class="imgBorderCon">
                <uni-icons type="plusempty" size="60" color="#ccc"></uni-icons>
              </view>
            </view>
          </view>
        </view> 
        <uni-popup ref="previewPop" class="">
          <image :src="dynamicImgage" class="dynaimcImgStyle" mode="aspectFit" />
        </uni-popup>
      </view>
    </view>
    <view class="fixBottom fixPaddingBottom">
      <view class="addBtn" @click="addAction">确认提交</view>
    </view>
  </view>
</template>
<script>
import { uploadNew, uploadWithDtDream, basecheckCreate, basecheckNotTokenCreate } from '@/api/api.js';
import tool from '@/utils/request.js';
import fuiDropdownMenu from '@/components/fui-dropdown-menu/fui-dropdown-menu.vue';
export default {
  components: {
    fuiDropdownMenu,
  },
  data() {
    return {
      t0: 0,
      t2: 0,
      ISForOld: false,
      headImg: '/static/images/headerbg.png',
      formData: {
        checkMsg: '',
        file: [],
        copyfile: [],
        bumpPointld: '',
        checkLabel: '',
        fileArray: [],
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
      array: ['消防火灾', '文物盗窃', '文物破坏'],
      index: 0,
      chossen: {},
      rankArray: [
        { text: '全部', value: '', checked: true },
        { text: '国护', value: '14da5819da904c4ab1d9d94a961ca27a' },
        {
          text: '省保',
          value: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          text: '市保',
          value: '2bf3be523de944ec3ee1ad832a7a2587',
        },
        {
          text: '市级文保点',
          value: 'b16db07f34112b9b0fc6d2b54214e0aa',
        },
        {
          text: '一般文物',
          value: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
        },
      ],
    };
  },
  mounted() {},
  onLoad(opt) {},
  onShow() {
    this.t0 = Date.now();
    this.checkMode();
    this.analyseData();
  },
  onHide() {
    this.t2 = Date.now();
    zwlog.onReady(() => {
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'hidden-index',
        pageName: '隐患上报列表',
        t2: this.t2,
        t0: this.t0,
        log_status: '02',
      });
    });
  },
  methods: {
    popPreview(item) {
      this.$refs.previewPop.open('center');
      this.dynamicImgage = item.url;
    },
    popTrigger() {   
      ZWJSBridge.chooseImage({
        upload: true,
      })
        .then((result) => {
          console.log(result);
          uploadWithDtDream({
            path:result.picPath[0]
          }).then((res) => {
            if (res) {
              let real = res;
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.path;
                let innerId = real.data.id;
                this.formData.fileArray.push({ url: innerPath, name: innerId, id: innerId });
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
              console.log(real);
              if (real && real.code && real.code == 200) {
                let innerPath = tool.uploadUrl + tool.imgCommon + real.data.bean[0].path;
                let innerId = real.data.bean[0].id;
                this.formData.fileArray.push({ url: innerPath, name: innerId, id: innerId });
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
      this.formData.fileArray.splice(index, 1);
    },
    chaPopnge() {}, 
    rankFilter(val) {
      if (val) {
        let track = this.rankArray.find((ele) => {
          return ele.value == val;
        });
        if (track) {
          return track.text;
        }
      }
    },
    analyseData() {
      let track1 = uni.getStorageSync('hiddenSelectObject');
      if (track1) {
        this.formData.bumpPointld = track1.id;
        this.chossen = track1;
      }
      let track2 = uni.getStorageSync('hiddenTroubleForm');
      if (track2) {
        // if (track2.file) {
        //   this.formData.file = track2.file;
        //   this.formData.copyfile = track2.file;
        // }
        if (track2.fileArray && track2.fileArray.length) {
          this.formData.fileArray = track2.fileArray;
        }
        if (track2.checkLabel) {
          this.formData.checkLabel = track2.checkLabel;
        }
        if (track2.checkMsg) {
          this.formData.checkMsg = track2.checkMsg;
        }
      }
    },
    addAction() {
      this.requestAction();
    },
    requestAction() {
      // if (!this.formData.copyfile.length) {
      //   return uni.showToast({
      //     title: '请检查输入项',
      //     icon: 'error',
      //   });
      // }

      if (!this.formData.fileArray.length) {
        return uni.showToast({
          title: '请检查输入项',
          icon: 'error',
        });
      }

      if (!this.formData.checkMsg) {
        return uni.showToast({
          title: '请检查输入项',
          icon: 'error',
        });
      }
      if (!this.formData.bumpPointld) {
        return uni.showToast({
          title: '请检查输入项',
          icon: 'error',
        });
      }
      const img3Generator = () => {
        /*         if (this.formData.copyfile && this.formData.copyfile.length) {
          let middle = this.formData.copyfile.map((ele) => {
            return {
              id: ele.id,
              img: ele.url,
            };
          });
          return JSON.stringify(middle);
        } else {
          return '';
        } */

        if (this.formData.fileArray && this.formData.fileArray.length) {
          let middle = this.formData.fileArray.map((ele) => {
            return {
              id: ele.id,
              img: ele.url,
            };
          });
          return JSON.stringify(middle);
        } else {
          return '';
        }
      };
      let fixArray1 = [
        {
          checkContent: '',
          checkLabel: this.formData.checkLabel,
          checkMsg: this.formData.checkMsg,
          isCheck: 0,
          otherDescriptions: '',
          imagesId: img3Generator(),
        },
      ];
      //   let trackSelect = {
      //     publishName: '塘头629～633号民居',
      //   };
      console.log(this.chossen);
      let id = uni.getStorageSync('id') || '';
      let finalData = {
        organization: '杭州市萧山区文化遗产科',
        checkDeadLine: '',
        checkType: '8',
        checkFeedback: '',
        checkName: this.chossen ? this.chossen.publishName + '问题上报' : '问题上报',
        checkcontent: '',
        poi: '',
        checkAddress: '',
        bumpPointData: [
          {
            bumpPointId: this.formData.bumpPointld,
            userId: [id],
          },
        ],
        checkBody: [...fixArray1],
      };
      console.log('finalData', finalData);
      if (id) {
        basecheckCreate(finalData)
          .then((res) => {
            console.log('res', res);
            if (res && res.code && res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'success',
              });
              uni.removeStorageSync('hiddenSelectObject');
              uni.removeStorageSync('hiddenTroubleForm');
              uni.navigateBack();
            }
          })
          .catch((err) => {
            console.log('err', err);
            uni.hideLoading();
          });
      } else {
        basecheckNotTokenCreate(finalData)
          .then((res) => {
            console.log('res', res);
            if (res && res.code && res.code == 200) {
              uni.showToast({
                title: '提交成功',
                icon: 'success',
              });
              uni.removeStorageSync('hiddenSelectObject');
              uni.removeStorageSync('hiddenTroubleForm');
              uni.navigateBack();
            }
          })
          .catch((err) => {
            console.log('err', err);
            uni.hideLoading();
          });
      }
    },
    sel3ect(sec) {
      console.log(this.$refs.file3);
      this.upload3Action(sec.tempFilePaths, 1);
    },
    upload3Action(tempFilePaths, token) {
      if (!tempFilePaths.length) return;
      console.log(token);
      const path = tempFilePaths.pop();
      uploadNew(path)
        .then((res) => {
          console.log('res', res);
          if (res) {
            let real = JSON.parse(res);
            if (real && real.code && real.code == 200) {
              let innerPath = tool.uploadUrl + tool.imgCommon + real.data.bean[0].path;
              let innerId = real.data.bean[0].id;
              this.formData.file.push({ url: innerPath, name: innerId, id: innerId, blobPath: path });
              this.formData.copyfile.push({ url: innerPath, name: innerId, id: innerId, blobPath: path });
            } else {
              uni.showToast({
                title: '上传失败',
                icon: 'none',
              });
              this.$refs['file3'].clearFiles(token - 1);
            }
          } else {
            uni.showToast({
              title: '上传失败',
              icon: 'none',
            });
            this.$refs['file3'].clearFiles(token - 1);
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          });
          this.$refs['file3'].clearFiles(token - 1);
        });
      this.upload3Action(tempFilePaths, token);
    },
    handle3Delete(e) {
      const num = this.formData.copyfile.findIndex((ele) => {
        return ele.url == e.tempFilePath;
      });
      this.formData.copyfile.splice(num, 1);
      console.log(' this.formData.copyfile', this.formData.copyfile);
    },
    iconClick() {
      uni.setStorageSync('hiddenTroubleForm', {
        // file: this.formData.file,
        fileArray: this.formData.fileArray,
        checkLabel: this.formData.checkLabel,
        checkMsg: this.formData.checkMsg,
      });
      uni.navigateTo({
        url: '/pages/hiddentroublereport/list',
      });
    },
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value);
      //   this.index = e.detail.value;
      this.formData.checkLabel = this.array[e.detail.value];
    },
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
      } else {
        this.ISForOld = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
.textAreaCon {
  position: relative;
}
.numberCount {
  position: absolute;
  right: 0;
  bottom: -10rpx;
  font-size: 20rpx;
  color: #007aff;
}
.fakeRequired {
  &::before {
    content: '*';
    color: #dd524d;
    font-weight: bold;
    font-size: 34rpx;
  }
}
.localGreen {
  color: #1677ff;
}
::v-deep {
  .cusPopCon {
    .uni-popup__wrapper {
      border-top-left-radius: 50rpx !important;
      border-top-right-radius: 50rpx !important;
      background-color: #fff !important;
      overflow: hidden !important;
    }
  }
  .uni-select {
    border: none !important;
  }
  .icon-add {
    background-color: #ccc !important;
  }
  .is-disabled {
    color: #666;
    border: none !important;
    background-color: unset !important;
  }
  .is-input-border {
    border: none !important;
  }
  .uni-input-input {
    color: #333 !important;
    font-weight: 500 !important;
  }
}
.fixBottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: #fff;
  height: 130rpx;
  box-sizing: border-box;
}
.addBtn {
  width: 670rpx;
  height: 90rpx;
  line-height: 90rpx;
  color: #fff;
  background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
  box-shadow: 0px 20px 30px 0px rgba(86, 128, 250, 0.25);
  border-radius: 55rpx;
  text-align: center;
  font-family: PingFang-SC-Bold;
  font-size: 36rpx;
  font-weight: 700;
}
.choosenItem {
  padding: 24rpx;
  background: #fafcff;
  box-shadow: inset 0 8rpx 8rpx 0 rgba(31, 120, 255, 0.04);
  border-radius: 16rpx;
  border: 1rpx solid #c2daff;
}
.flexBorder {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10rpx;
}
.borderGreen {
  padding: 0 14rpx;
  height: 42rpx;
  line-height: 42rpx;
  background: #fbfff7;
  border-radius: 8rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  margin-right: 16rpx;
  color: #29cc6a;
  border: 1rpx solid #29cc6a;
}
.oldHiddenTroubleContainer {
}
</style>
