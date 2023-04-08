<template>
    <view class="missionDetailContainer" :class="[ISForOld ? 'oldmissionDetailContainer' : '']">
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
            <uni-forms-item label="上报人员：">
              <uni-easyinput type="text" v-model="formData.name_dis" disabled />
            </uni-forms-item>
            <uni-forms-item label="上报时间：">
              <uni-easyinput type="text" v-model="formData.pubTime" disabled />
            </uni-forms-item>
            <uni-forms-item label="任务状态：">
              <uni-data-checkbox class="switchCheck" disabled v-model="formData.checkStatus" :localdata="state"></uni-data-checkbox>
            </uni-forms-item>
            <uni-forms-item name="file">
              <view class="specialFormImgTitle with20Margin">
                <text class="">现场照片：</text>
                <text class="localGreen"></text>
              </view>
              <uni-file-picker
                fileMediatype="image"
                file-extname="png,jpg,jpeg,gif"
                :image-styles="imageStyles"
                mode="grid"
                ref="files"
                v-model="formData.file"
                limit="5"
                @success="success"
                @fail="fail"
              >
              </uni-file-picker>
            </uni-forms-item>
            <uni-forms-item label="检查事项：" label-position="top" name="endContent">
              <uni-easyinput class="localTextArea" type="textarea" trim="all" v-model="formData.endContent" disabled :placeholderStyle="placeholderStyle" placeholder="请输入具体的检查事项" />
            </uni-forms-item>
            <uni-forms-item name="anotherFile">
              <view class="specialFormImgTitle with20Margin">
                <text class="">处理照片：</text>
                <text class="localGreen"></text>
              </view>
              <uni-file-picker
                fileMediatype="image"
                file-extname="png,jpg,jpeg,gif"
                :image-styles="imageStyles"
                mode="grid"
                ref="file"
                v-model="formData.anotherFile"
                limit="5"
                @success="success"
                @fail="fail"
              >
              </uni-file-picker>
            </uni-forms-item>
          </uni-forms>
        </view>
        <!-- <view class="statusCon">
          <view class="statusTitle">文化遗产科反馈状态：</view>
          <view
            class="statusBlock"
            :class="[subStatus == '待审核' ? 'colorYellow' : subStatus == '合格' ? 'colorGreen' : 'colorRed']"
          >{{ subStatus }}</view>
        </view> -->
        <view class="f-w-check">
          <span class="check-org">镇街审核:</span>
          <uni-data-checkbox class="switchCheck" v-model="zjshCheck" :localdata="zjshCheckArr" :disabled="type === '已审核' || pType === '区文物局'"  @change="radioChange"></uni-data-checkbox>
        </view>
        <view class="textArea2Con" v-if="zjshCheckFlag">
          <uni-easyinput class="localTextArea borderTextArea fakeTextAreaRequired" type="textarea"
            :disabled="type === '已审核'"
            placeholder="请输入"
            v-model="zjshText"
            maxlength="50" />
          <view class="number2Count">
            {{ (zjshText && zjshText.length) || 0 }}/50
          </view>
        </view>
        <!-- 除了镇街还没审核和taskname是日常巡检，其他都显示 -->
        <view class="f-w-check" v-if="(globalData.baseCheck && globalData.baseCheck.jdIsRunState != 0) && taskName != '日常巡检'">
          <span class="check-org">区文物局审核:</span>
          <uni-data-checkbox class="switchCheck" v-model="wwjCheck" :localdata="wwjCheckArr" :disabled="type === '已审核'"></uni-data-checkbox>
        </view>
        <view class="progressCon" v-if="type === '已审核'">
          <view class="step-item">
            <view class="step-title">事件来源</view>
            <view class="step-content">
              <view class="form-item">
                <view class="labelText">上报时间：</view>
                <view class="color-666">{{ currentData.checkCreateTime || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">文保单位：</view>
                <view class="color-666">{{ currentName || '暂无' }}</view>
              </view>
            </view>
          </view>
          <view class="step-item">
            <view class="step-title">指令下发</view>
            <view class="step-content">
              <view class="form-item">
                <view class="labelText">指令对象：</view>
                <view class="color-666">{{ (globalData.createCheckName) || '游客' }} {{ globalUserPhone && formatPhone(globalUserPhone) }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">指令时间：</view>
                <view class="color-666">{{ currentData.checkCreateTime || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">指令说明：</view>
                <view class="color-666">{{ currentData.checkName || '暂无' }}</view>
              </view>
            </view>
          </view>
          <view class="step-item">
            <view class="step-title">事件处置</view>
            <view class="step-content">
              <view class="form-item">
                <view class="labelText">处理人员：</view>
                <view class="color-666">{{ globalData.endUserName }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">处理时间：</view>
                <view class="color-666">{{ currentData.endTime || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">处理事项：</view>
                <view class="color-666">
                  <template v-for="(item, index) in bussinesArray" :key="index">
                    <view>{{ item.value }}</view>
                  </template>
                </view>
              </view>
              <view class="form-item">
                <view class="labelText">处理状态：</view>
                <view class="color-666">{{ currentData.checkStatus == '0' ? '处理中' : currentData.checkStatus == '1' ? '正常' : currentData.checkStatus == '-1' ? '异常' : '暂无' }}</view>
              </view>
            </view>
          </view>
          <view class="step2-item">
            <view class="step-title">审核结果</view>
            <view class="step-content">
              <view class="form-item">
                <view class="labelText">镇街审核人：</view>
                <view class="color-666">{{ globalData.jdIsRUnUserName || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">镇街审核结果：</view>
                <view class="color-666">{{ jdIsRunStateMap[globalData.jdIsRun] }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">镇街审核时间：</view>
                <view class="color-666">{{ currentData.jdIsRunTime || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">镇街核验说明：</view>
                <view class="color-666">{{ currentData.jdIsRunMsg ||'暂无' }}</view>
              </view>
            </view>
            <view class="step-content" v-if="globalData.isRun != '-1'">
              <view class="form-item">
                <view class="labelText">区文物局审核人：</view>
                <view class="color-666">{{ globalData.isRunName || '暂无' }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">区文物局审核结果：</view>
                <view class="color-666">{{ isRunMap[globalData.isRun] }}</view>
              </view>
              <view class="form-item">
                <view class="labelText">区文物局审核时间：</view>
                <view class="color-666">{{ currentData.isRunIime || '暂无' }}</view>
              </view>
            </view>
          </view>
        </view>
        <view class="btnsCon">
          <!-- fixme 这里按钮要根据状态判断一下 -->
          <button v-if="type === '已审核'" class="confirmBtn" @click="goBack" type="primary">返回</button>
  
          <button
            v-if="type === '未审核'"
            class="cancelBtn"
            type="default"
            @click="goBack"
          >取消</button>
          <button
            v-if="type === '未审核'"
            class="confirmBtn"
            @click="submitForm"
            type="primary"
          >确定</button>
        </view>
      </view>
    </view>
  </template>
  <script>
  import { getbaseCheckDataById, getListAndProtecteds,updateJdIsRunByCheckType3,updateJdIsRun,updateIsRun } from '@/api/api.js';
  import dayjs from 'dayjs';
  import tool from '@/utils/request.js';
import { throwStatement } from '@babel/types';
  export default {
    data() {
      return {
        currentName: '',
        bussinesArray: [],
        globalUserPhone: '',
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
        zjshCheckArr: [
          {
            text: '已处置',
            value: 1,
          },
          {
            text: '无法处置',
            value: 99,
          }
        ],
        wwjCheckArr: [
          {
            text: '完结',
            value: 1,
          },
          {
            text: '一网统管',
            value: 99,
          }
        ],
        t0: 0,
        t2: 0,
        formData: {
          checkStatus: 1,
          name: null,
          pubTime: null,
          endContent: '',
          file: [],
          anotherFile: [],
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
        subStatus: '待审核',
        currentData: {},
        globalData: {},
        zjshCheck: null,  //镇街审核radio check
        zjshText: '',
        zjshCheckFlag: null,
        wwjCheck: null,  //区文物局审核radio check
        pType: '',
        type: '',
        taskName: '',
        jdIsRunStateMap: {
          0: '待审核',
          1: '已处置',
          99: '无法处置'
        },
        isRunMap:{
          1: '完结',
          99: '一网统管',
          2: '无需审核'
        },
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
      this.type = opt?.type
      this.fetchAllData(opt);
      this.pType = uni.getStorageSync('role')
    },
    watch: {
      zjshCheck(e) {
        this.zjshCheckFlag = this.zjshCheck == 99;
      }
    },
    methods: {
      // 镇街审核radio
      radioChange(e) {
        this.zjshCheckFlag = e.detail.value == 99;
      },
      fetchAllData(opt) {
        let track = uni.getStorageSync('getListAndProtecteds');
        if (track) {
          //
        } else {
          getListAndProtecteds({
            levelName: 'all',
          })
            .then((res) => {
              if (res && res.code == 200) {
                uni.setStorageSync('getListAndProtecteds', res.data);
              }
            })
            .catch((err) => {
              console.log('err', err);
            });
        }
        this.analyseData(opt);
      },
      submitForm() {
        if(this.pType === '区文物局'){
            if (this.wwjCheck != 1 && this.wwjCheck != 99) {
              return uni.showToast({
              title: '请选择审核意见',
              icon: 'error',
              });
          }
        }else{
          if (!this.zjshCheck) {
            return uni.showToast({
              title: '请选择审核意见',
              icon: 'error',
              });
          }
          if(this.zjshCheckFlag) {
            if (!this.zjshText) {
              return uni.showToast({
                title: '请输入无法处置原因',
                icon: 'error',
                });
            }
          }
        }
        let pages = getCurrentPages()
        let beforePage = pages[pages.length - 2]
        if (beforePage) {
          beforePage.$vm.needRefresh = true
        }
      
        if(this.pType === '区文物局'){
          let params = {
              id: this.queryId,
              isRun: this.wwjCheck,
            }
            updateIsRun(params).then(res => {
              if (res && res.code == 200) {
                uni.showToast({
                  title: '提交成功',
                  icon: 'success',
                });
                uni.navigateBack();
              }
            })
        }else{
          console.log(this.taskName);
          if(this.taskName === '日常巡检') {
            let params = {
              id: this.queryId,
              jdIsRun: this.zjshCheck,
              jdIsRunMsg: this.zjshText,
            }
            updateJdIsRunByCheckType3(params).then(res => {
              if (res && res.code == 200) {
                uni.showToast({
                  title: '提交成功',
                  icon: 'success',
                });
                uni.navigateBack();
              }
            })
          }else if(this.taskName === '问题上报') {
            let params = {
              id: this.queryId,
              jdIsRun: this.zjshCheck,
              jdIsRunMsg: this.zjshText,
            }
            updateJdIsRun(params).then(res => {
              if (res && res.code == 200) {
                uni.showToast({
                  title: '提交成功',
                  icon: 'success',
                });
                uni.navigateBack();
              }
            })
          }
        }
        
        
      },
      anlaysePhone(shorter) {
        let list = uni.getStorageSync('getListAndProtecteds');
        if (list) {
          let track = list.find((ele) => {
            return ele.bumpPointBaseInfoName == shorter.publishName;
          });
          if (track) {
            if (track.userDataAndUserVOS) {
              let track2 = track.userDataAndUserVOS.find((ele) => {
                return ele.nickName == this.globalData.createCheckName;
              });
              if (track2) {
                this.globalUserPhone = track2.phone;
              }
            }
          }
        }
      },
      analyseData(opt) {
        // this.formData.name = uni.getStorageSync('name');
        // this.formData.name_dis = this.format_name(this.formData.name);
        this.formData.pubTime = dayjs().format('YYYY.MM.DD');
        this.queryId = opt.id;
        getbaseCheckDataById({
          baseCheckId: opt.id,
        })
          .then((res) => {
            if (res && res.code && res.code == 200) {
              let shorter = res.data;
              console.log('shorter', shorter);
              this.globalData = shorter;
              this.currentData = shorter.baseCheck;
              this.zjshCheck = shorter.baseCheck.jdIsRunState;
              this.zjshText = shorter.baseCheck.jdIsRunMsg
              this.wwjCheck = shorter.baseCheck.isRun;
              this.taskName = shorter.baseCheck.taskName.substring(0,4);
              this.anlaysePhone(shorter);
              this.currentName = shorter.publishName;
              this.formData.name = shorter.createCheckName;
              this.formData.name_dis = shorter.createCheckName;
              this.formData.pubTime = dayjs(shorter.baseCheck.checkCreateTime).format('YYYY.MM.DD');
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
              this.bussinesArray = shorter.baseCheckBody;
              if (shorter.baseCheckEnd && shorter.baseCheckEnd.length) {
                this.formData.checkStatus = shorter.baseCheckEnd[0].checkStatus;
                this.formData.endContent = shorter.baseCheckEnd[0].endContent;
                if (shorter.baseCheckEnd[0].startImages) {
                  let start = JSON.parse(shorter.baseCheckEnd[0].startImages);
                  let after1 = start.map((ele) => {
                    return {
                      id: ele.id,
                      url: ele.img,
                    };
                  });
                  this.formData.file = after1;
                }
                if (shorter.baseCheckEnd[0].endImages) {
                  let end = JSON.parse(shorter.baseCheckEnd[0].endImages);
                  let after2 = end.map((ele) => {
                    return {
                      id: ele.id,
                      url: ele.img,
                    };
                  });
                  this.formData.anotherFile = after2;
                }
                //   let start = [
                //     {
                //       id: '7471bf1b639569a1d0b05773c7eeafa0',
                //       url: 'https://img.hzanchu.com/acimg/bc48188dfccd22e28d4dad2c49f6ff2e.png',
                //     },
                //   ];
                //   let end = [
                //     {
                //       id: '7471bf1b639569a1d0b05773c7eeafa0',
                //       url: 'https://img.hzanchu.com/acimg/bc48188dfccd22e28d4dad2c49f6ff2e.png',
                //     },
                //   ];
                //   this.formData.file = start;
                //   this.formData.anotherFile = end;
              }
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
            pageId: 'missionDetai',
            pageName: '任务详情页面',
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
      formatPhone(val) {
        if (val) {
          return val.substring(0, 3) + '****' + val.substring(7);
        }
      },
      format_name(val) {
        const newVal = val
        // const newVal = val ? JSON.parse(val) : '' //这边和其他地方返的不一样
        let newArr = []
        if (newVal && newVal.length > 0) {
          newArr = newVal.map(item => {
            return item = '*' + item.substring(1); 
          })
          return newArr.join()
        } else {
          return '*';
        }
      },
      fail(e) {
        console.log('上传失败', e);
      },
      success(e) {},
      goBack() {
        uni.navigateBack();
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .missionDetailContainer {
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
    .is-add {
      display: none !important;
    }
    .icon-del-box {
      display: none !important;
    }
  }
  .localTextArea {
    font-size: 28rpx;
  }
  .switchCheck {
    font-size: 28rpx;
  }
  .statusCon {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20rpx;
  }
  .statusTitle {
    font-family: PingFang-SC-Medium;
    font-size: 28rpx;
    color: #666;
    letter-spacing: 0;
    line-height: 45rpx;
    font-weight: 500;
  }
  .statusBlock {
    font-family: PingFang-SC-Medium;
    font-size: 24rpx;
    color: #666;
    text-align: center;
    font-weight: 500;
  }
  .radioArea{
    margin: 20rpx 0;
  }
  .check-org{
    margin-right: 20rpx;
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
  .colorYellow {
    color: #ffb600;
  }
  .colorGreen {
    color: #00bc6e;
  }
  .colorRed {
    color: #e24c4c;
  }
  .f-w-check{
    display: flex;
  }
  .progressCon {
    margin-top: 20rpx;
  }
  .step-title {
    padding-left: 14rpx;
    height: 50rpx;
    line-height: 50rpx;
    box-sizing: border-box;
    color: #39f;
    background: linear-gradient(90deg, rgba(51, 153, 255, 0.25), rgba(51, 153, 255, 0));
  }
  .labelText {
    // width: 140rpx;
  }
  .step-item {
    padding-left: 70rpx;
    margin-bottom: 15rpx;
    position: relative;
    font-size: 28rpx;
    color: #666;
  }
  .step-item::before {
    background-image: url('@/static/images/progress.png');
    background-size: 100% 100%;
    content: '';
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    left: 0;
    top: 0;
  }
  .step2-item {
    padding-left: 30px;
    margin-bottom: 15px;
    position: relative;
    font-size: 28rpx;
    color: #666;
  }
  .step2-item::before {
    background-image: url('@/static/images/progress.png');
    background-size: 100% 100%;
    content: '';
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    left: 0;
    top: 0;
  }
  .step-item::after {
    content: '';
    width: 1px;
    height: calc(100% - 10px);
    background-color: #9cf;
    position: absolute;
    left: 10px;
    top: 25px;
  }
  .step-content {
    margin-top: 10px;
  }
  .form-item {
    display: flex;
    padding: 7px 0;
  }
  .label-text {
    flex-shrink: 0;
  }
  .color-666 {
    color: #666 !important;
  }
  .btnsCon {
    margin-top: 44rpx;
    display: flex;
    justify-content: space-around;
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
  .oldmissionDetailContainer {
    .confirmBtn {
      font-size: 44rpx !important;
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
      .uni-combox {
        font-size: 36rpx;
        .uni-input-input {
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .uni-forms-item__label {
        font-size: 32rpx !important;
        .label-text {
          font-size: 32rpx !important;
        }
      }
      .uni-textarea-textarea {
        font-size: 18px;
      }
      
    }
  }
  
  
  ::v-deep {
    .borderTextArea {
      .is-input-border {
        border: 1px solid rgb(219, 219, 219) !important;
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
  