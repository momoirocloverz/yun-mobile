<template>
  <view class="inspectionEquiparrayDetailContainer" :class="[ISForOld ? 'oldinspectionEquiparrayDetailContainer' : '']">
    <view class="blockCon">
      <view class="formCon">
        <uni-forms :modelValue="formData" :rules="rules" ref="formData">
          <uni-forms-item label="填表单位：">
            <uni-easyinput type="text" v-model="formData.organ" disabled />
          </uni-forms-item>
          <uni-forms-item label="被查单位：" name="bumpPointld">
            <uni-easyinput type="text" v-model="formData.bumpPointld" disabled />
          </uni-forms-item>
          <view class="addresItem" @click="toMap">
            <view>
              <text class="addresItext1">单位地址：</text>
              <text class="addresItext2">{{ addressText }}</text>
            </view>
            <image class="imgsize" :src="addressIcon" mode="widthFix"></image>
          </view>
          <uni-forms-item label="填表人员：">
            <uni-easyinput type="text" v-model="formData.name_dis" disabled />
          </uni-forms-item>
          <uni-forms-item label="填表时间：">
            <uni-easyinput type="text" v-model="formData.pubTime" disabled />
          </uni-forms-item>
          <uni-forms-item label="设备检查：" label-position="top" class="equipFormItem">
            <view class="equipCon">
              <view class="equipItem" v-for="(item, index) in equipArray" :key="index">
                <view class="equipTitle">{{ item.checkLabel }}</view>
                <view class="greyBg" v-if="item.checkLabel != '其他'">
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</text>
                    <view class="flexStart">
                      <text class="limitNumer">{{ item.dynamicNum }}</text>
                      <uni-data-checkbox disabled class="switchCheck" v-model="item.checkMsgFlag" :localdata="state" @change="switchChange"></uni-data-checkbox>
                    </view>
                  </view>
                  <view class="flexStart with20MarBottomgin" v-show="!item.checkMsgFlag">
                    <text class="equipItemTitle">缺失数量：</text>
                    <uni-easyinput type="number" v-model="item.checkContent" placeholder="请输入缺失数量" class="withBorderInput" :placeholderStyle="placeholderStyle" maxlength="5" disabled />
                  </view>
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</text>
                    <uni-data-checkbox class="switchCheck" v-model="item.isCheck" :localdata="state2" @change="switchChange" disabled></uni-data-checkbox>
                  </view>
                  <view class="flexStart with20MarBottomgin" v-show="!item.isCheck">
                    <text class="equipItemTitle">原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因：</text>
                    <uni-easyinput
                      class="localTextArea borderTextArea"
                      type="textarea"
                      v-model="item.otherDescriptions"
                      :placeholderStyle="placeholderStyle"
                      placeholder="请输入原因"
                      maxlength="50"
                      disabled
                    />
                  </view>
                  <view class="uni-file-picker uni-mt-5">
                    <view class="imageAreaContainer">
                      <template v-for="(jtem, jndex) in equipArray[index].file" :key="jndex">
                        <view class="width333">
                          <view class="imgBorderCon">
                            <image @click="popPreview(jtem)" :src="jtem.url" mode="aspectFill" />
                          </view>
                        </view>
                      </template>
                    </view>
                  </view>
                </view>
                <view class="greyBg" v-else>
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle"> 状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</text>
                    <uni-data-checkbox class="switchCheck" v-model="item.checkMsgFlag" :localdata="state3" @change="switchChange" disabled></uni-data-checkbox>
                  </view>
                  <view class="flexStart" v-show="!item.checkMsgFlag">
                    <text class="equipItemTitle">原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因：</text>
                    <uni-easyinput
                      class="localTextArea borderTextArea"
                      :placeholderStyle="placeholderStyle"
                      type="textarea"
                      v-model="item.otherDescriptions"
                      placeholder="请输入原因"
                      maxlength="50"
                      disabled
                    />
                  </view>
                  <view class="uni-file-picker uni-mt-5">
                    <view class="imageAreaContainer">
                      <template v-for="(jtem, jndex) in equipArray[index].file" :key="jndex">
                        <view class="width333">
                          <view class="imgBorderCon">
                            <image @click="popPreview(jtem)" :src="jtem.url" mode="aspectFill" />
                          </view>
                        </view>
                      </template>
                    </view>
                  </view>
                </view>
              </view>
              <view class="btnsCon">
                <button class="cancelBtn" type="default" @click="goBack">返回</button>
              </view>
            </view>
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>
    <uni-popup ref="previewPop" class="">
      <image :src="dynamicImgage" class="dynaimcImgStyle" mode="aspectFit" />
    </uni-popup>
  </view>
</template>
<script>
import { getBumpPointBaseInfoConfigByPointId, getbaseCheckDataById } from '@/api/api.js';
import dayjs from 'dayjs';
export default {
  name: 'demo1',
  data() {
    return {
      range: [],
      rules: {
        bumpPointld: {
          rules: [
            {
              required: true,
              errorMessage: '请选择文保单位',
            },
          ],
        },
      },
      formData: {
        dynamicTime: '00:00:00',
        organ: '杭州市萧山区文化遗产科',
        otherDescriptions: '',
        bumpPointld: null,
        haveSecurity: 0,
        name: null,
        storageIds: '',
        pubTime: null,
        startTime: null,
        file: [],
      },
      placeholderStyle: 'color:#666;font-size:28rpx',
      addressText: '请选择地址',
      lng: 0,
      lat: 0,
      addressIcon: '/static/images/m-icon@2x.png',
      imageStyles: {
        border: {
          color: '#ccc',
          width: 0.5,
          style: 'solid',
          radius: '4px',
        },
      },
      ISForOld: false,
      state3: [
        {
          text: '正常',
          value: 1,
        },
        {
          text: '异常',
          value: 0,
        },
      ],
      state2: [
        {
          text: '合格',
          value: 1,
        },
        {
          text: '不合格',
          value: 0,
        },
      ],
      state: [
        {
          text: '正常',
          value: 1,
        },
        {
          text: '缺失',
          value: 0,
        },
      ],
      equipArray: [
        {
          dynamicNum: '',
          checkMsg: '正确',
          checkMsgFlag: 1,
          checkMsgStatus: 1,
          checkLabel: '灭火器',
          checkContent: '',
          otherDescriptions: '',
          isCheck: 1,
          imagesId: '',
          file: [],
        },
        {
          dynamicNum: '',
          checkMsg: '正确',
          checkMsgFlag: 1,
          checkMsgStatus: 1,
          checkLabel: '消防栓',
          checkContent: '',
          otherDescriptions: '',
          isCheck: 1,
          imagesId: '',
          file: [],
        },
        {
          dynamicNum: '',
          checkMsg: '正确',
          checkMsgFlag: 1,
          checkMsgStatus: 1,
          checkLabel: '消防水缸',
          checkContent: '',
          otherDescriptions: '',
          isCheck: 1,
          imagesId: '',
          file: [],
        },
        {
          dynamicNum: '',
          checkMsg: '',
          checkMsgFlag: 1,
          checkLabel: '其他',
          checkContent: '',
          otherDescriptions: '',
          isCheck: 1,
          imagesId: '',
          file: [],
        },
      ],
      ZLBAPIAble: false,
      dynamicImgage: '',
      locationObj: {},
      addressLegal: false,
    };
  },
  onLoad(opt) {
    clearInterval(this.timer);
    this.timer = null;
    this.analyseQuery(opt);
  },
  onShow() {
    this.t0 = Date.now();
    this.checkMode();
  },
  onHide() {
    this.buryPoints();
  },
  methods: {
    analyseQuery(opt) {
      this.queryId = opt.id;
      // this.formData.name = uni.getStorageSync('name');
      // this.formData.name_dis = this.format_name(this.formData.name);
      this.formData.pubTime = dayjs().format('YYYY年MM月DD日');
      getbaseCheckDataById({
        baseCheckId: opt.id,
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            this.injectData(shorter);
            this.currentName = shorter.publishName + '巡检上报';
            this.formData.name = shorter.createCheckName;
            if (shorter.userName) {
              this.formData.name_dis = this.format_name(shorter.userName.join(''));
            }
            this.formData.bumpPointld = shorter.publishName;
            this.formData.pubTime = dayjs(shorter.baseCheck.checkCreateTime).format('YYYY年MM月DD日');
            let isRun = shorter.baseCheck.isRun;
            if (isRun) {
              switch (isRun) {
                case 1:
                  this.subStatus = '合格';
                  break;
                case -1:
                  this.subStatus = '待审核';
                  break;
                case 99:
                  this.subStatus = '不合格';
                  break;
              }
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
    injectData(shorter) {
      let wholeArray = [];
      if (shorter && shorter.baseCheckBody) {
        shorter.baseCheckBody.forEach((ele) => {
          ele.checkMsg = ele.dicDetailName;
          ele.checkMsgFlag = ele.dicDetailName == '正确' ? 1 : 0;
          ele.checkLabel = ele.checkNameType;
          ele.file = ele.storageId ? JSON.parse(ele.storageId) : [];
        });
        shorter.baseCheckBody.forEach((ele) => {
          if (ele.file) {
            ele.file.forEach((sub) => {
              sub.url = sub.img;
            });
          }
        });
        wholeArray = shorter.baseCheckBody;
      }
      let firstArray = wholeArray.filter((ele) => {
        if (ele.checkLabel == '灭火器') {
          ele.sort = 0;
        }
        if (ele.checkLabel == '消防栓') {
          ele.sort = 1;
        }
        if (ele.checkLabel == '消防水缸') {
          ele.sort = 2;
        }
        if (ele.checkLabel == '其他') {
          ele.sort = 3;
        }
        return ele.checkLabel == '灭火器' || ele.checkLabel == '消防栓' || ele.checkLabel == '消防水缸' || ele.checkLabel == '其他';
      });
      firstArray.sort((a, b) => {
        return a.sort - b.sort;
      });
      if (shorter.baseCheck) {
        this.addressText = shorter.baseCheck.checkAddress;
        getBumpPointBaseInfoConfigByPointId({
          pointId: shorter.baseCheck.bumpPointId,
        })
          .then((res) => {
            if (res && res.code && res.code == 200) {
              let shorter = res.data;
              let track3 = shorter.find((ele) => {
                return ele.facilitiesType == '消防水缸';
              });
              let track1 = shorter.find((ele) => {
                return ele.facilitiesType == '灭火器';
              });
              let track2 = shorter.find((ele) => {
                return ele.facilitiesType == '消防栓';
              });
              if (track1) {
                firstArray[0].dynamicNum = track1.facilitiesConfigNumber;
              }
              if (track2) {
                firstArray[1].dynamicNum = track2.facilitiesConfigNumber;
              }
              if (track3) {
                firstArray[2].dynamicNum = track3.facilitiesConfigNumber;
              }
              this.equipArray = firstArray && firstArray.length ? firstArray : [];
            }
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    },
    switchChange(e) {},
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
        this.placeholderStyle = 'color:#666;font-size:30rpx';
      } else {
        this.ISForOld = false;
        this.placeholderStyle = 'color:#666;font-size:28rpx';
      }
    },
    buryPoints() {
      this.t2 = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'inspectionNew',
          pageName: '新增巡检页面',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
    },
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
      } else {
        return '*';
      }
    },
    goBack() {
      uni.navigateBack();
    },
    setDynamicNumber(val) {
      getBumpPointBaseInfoConfigByPointId({
        pointId: val,
      })
        .then((res) => {
          if (res && res.code && res.code == 200) {
            let shorter = res.data;
            let track3 = shorter.find((ele) => {
              return ele.facilitiesType == '消防水缸';
            });
            let track1 = shorter.find((ele) => {
              return ele.facilitiesType == '灭火器';
            });
            let track2 = shorter.find((ele) => {
              return ele.facilitiesType == '消防栓';
            });
            if (track1) {
              this.equipArray[0].dynamicNum = track1.facilitiesConfigNumber;
            } else {
              this.equipArray[0].dynamicNum = '';
            }
            if (track2) {
              this.equipArray[1].dynamicNum = track2.facilitiesConfigNumber;
            } else {
              this.equipArray[1].dynamicNum = '';
            }
            if (track3) {
              this.equipArray[2].dynamicNum = track3.facilitiesConfigNumber;
            } else {
              this.equipArray[2].dynamicNum = '';
            }
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.hideLoading();
        });
    },
    selectChange(val) {
      if (val) {
        this.formData.bumpPointld = val;
        this.setDynamicNumber(val);
      }
    },
    toMap() {},
    popPreview(item) {
      this.$refs.previewPop.open('center');
      this.dynamicImgage = item.url;
    },
  },
};
</script>
<style lang="scss" scoped>
.inspectionEquiparrayDetailContainer {
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
.flexStart {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
.equipCon {
}
.equipItem {
}
.equipTitle {
  box-sizing: border-box;
  padding-left: 32rpx;
  font-family: PingFang-SC-Bold;
  font-size: 32rpx;
  color: #1677ff;
  letter-spacing: 0;
  line-height: 45rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
  margin-top: 20rpx;
}
.with20MarBottomgin {
  margin-bottom: 20rpx;
}
.greyBg {
  background-color: rgba(240, 240, 240, 0.6);
  box-sizing: border-box;
  padding-left: 32rpx;
  padding-right: 32rpx;
  padding-top: 20rpx;
  padding-bottom: 20rpx;
}
.equipItemTitle {
  font-family: PingFang-SC-Medium;
  font-size: 28rpx;
  color: #666666;
  letter-spacing: 0;
  line-height: 45rpx;
  font-weight: 500;
}
.equipFormItem {
  margin-bottom: 20rpx;
}
.limitNumer {
  font-size: 28rpx;
  margin-right: 10rpx;
  color: #333;
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
.addresItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
  margin-top: 20rpx;
}
.addresItext1 {
  font-size: 28rpx;
  color: #666;
}
.addresItext2 {
  font-size: 28rpx;
  color: #333;
  padding-left: 10px;
}
.imgsize {
  width: 44rpx;
  height: 44rpx;
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
  position: relative;
  &::before {
    content: '*';
    position: absolute;
    left: -15rpx;
    color: #dd524d;
    font-weight: bold;
    font-size: 34rpx;
  }
}
.fakeTextAreaRequired {
  position: relative;
  &::before {
    position: absolute;
    left: -16rpx;
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
.questionFormItem {
  ::v-deep {
    .uni-forms-item__label {
      margin-bottom: 20rpx;
    }
  }
}
.questionItem {
  margin-bottom: 30rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
.questionTitleCon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.radioArea {
  margin: 20rpx 0;
  uni-label {
    margin: 0 20rpx;
  }
}
.questionTitle {
  font-family: PingFang-SC-Medium;
  font-size: 24rpx;
  color: #666;
  letter-spacing: 0;
  line-height: 45rpx;
  font-weight: 500;
  width: 550rpx;
}
.questionImage {
  width: 48rpx !important;
  height: 48rpx !important;
}
.with20Margin {
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.localGreen {
  color: #1677ff;
}
::v-deep {
  .is-required {
    position: relative;
    &::before {
      content: '*';
      position: absolute;
      left: -15rpx;
      color: #dd524d;
      font-weight: bold;
      font-size: 34rpx;
    }
  }
  .uni-select {
    border: none !important;
  }
  .uni-select__input-text {
    width: 420rpx !important;
    font-size: 28rpx;
  }
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
  .borderTextArea {
    .is-input-border {
      border: 1px solid rgb(219, 219, 219) !important;
    }
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
  .redInput {
    .uni-input-input {
      color: #dd524d !important;
    }
  }
  .uni-stat__select {
    padding: 0 !important;
  }
  .uni-textarea-textarea {
    font-size: 28rpx;
  }
  .uni-easyinput__content-textarea {
    // padding: 0 !important;
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
  .uni-checkbox-input {
    border-radius: 50% !important;
  }
  .checkBoxActive {
    .uni-checkbox-input {
      background-color: #1677ff;
      path {
        fill: #fff;
      }
    }
  }
  .file-picker__box-content {
    background-color: #fff;
  }
}
.withBorderInput {
  border: 2rpx solid rgba(238, 238, 238, 1);
  font-size: 28rpx;
  background-color: #fff;
}
.localTextArea {
  font-size: 28rpx;
  background-color: #fff;
}
.otherInfo {
  margin-top: 10rpx;
  ::v-deep {
    .is-input-border {
      border: none !important;
    }
  }
}
.textAreaCon {
  position: relative;
}
.numberCount {
  position: absolute;
  right: 5rpx;
  bottom: -7rpx;
  font-size: 20rpx;
  color: #007aff;
}
.textArea2Con {
  position: relative;
}
.number2Count {
  position: absolute;
  right: 5rpx;
  bottom: 7rpx;
  font-size: 20rpx;
  color: #007aff;
}
.switchCheck {
  font-size: 28rpx;
  margin-top: 0 !important;
}
.popupTitle {
  position: relative;
  height: 98rpx;
  text-align: center;
  line-height: 98rpx;
  border-bottom: 1rpx solid #eee;
}
.popupTitleText {
  font-family: PingFang-SC-Bold;
  font-size: 36rpx;
  color: #333333;
  text-align: center;
  font-weight: 700;
}
.popupTitleClose {
  position: absolute;
  right: 36rpx;
  top: 0;
}
.popupCloseCon {
}
.addMarginBottom {
  padding-bottom: 20rpx !important;
}
.poplistText {
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
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
  margin: 0 auto;
  margin-top: 10rpx;
  margin-bottom: 64rpx;
}
.uni-list-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 32rpx;
  padding-right: 32rpx;
  box-sizing: border-box;
  height: 100rpx;
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
.btnsCon {
  margin-top: 44rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .cancelBtn {
    width: 100%;
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
}

.oldinspectionEquiparrayDetailContainer {
  .equipTitle {
    font-size: 38rpx !important;
  }
  .equipItemTitle {
    font-size: 35rpx !important;
  }
  .poplistText {
    font-size: 32rpx !important;
  }
  .addresItext1 {
    font-size: 35rpx !important;
  }
  .addresItext2 {
    font-size: 35rpx !important;
  }
  .cancelBtn {
    font-size: 42rpx !important;
  }
  .specialFormImgTitle {
    font-size: 35rpx !important;
  }
  .questionTitle {
    font-size: 30rpx !important;
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
    .uni-combox {
      font-size: 36rpx;
      .uni-input-input {
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    // .uni-forms-item {
    //   border-bottom: 1rpx solid #ddd !important;
    //   height: 107rpx;
    // }
    // .uni-easyinput__placeholder-class {
    //   font-size: 36rpx;
    // }
    .uni-forms-item__label {
      font-size: 32rpx !important;
      .label-text {
        font-size: 32rpx !important;
      }
    }
    .uni-select__input-text {
      font-size: 32rpx !important;
    }
    .uni-textarea-textarea {
      font-size: 18px;
    }
  }
}
</style>
