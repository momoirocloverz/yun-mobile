<template>
  <view class="inspectionDetailContainer" :class="[ISForOld ? 'oldinspectionDetailContainer' : '']">
    <view class="blockCon">
      <view class="formCon">
        <view class="currentName">{{ currentName }}</view>
        <uni-forms :modelValue="formData" :rules="rules" ref="formData">
          <uni-forms-item label="填表单位：">
            <uni-easyinput type="text" v-model="formData.organ" disabled />
          </uni-forms-item>
          <uni-forms-item label="被查单位：" name="bumpPointld">
            <uni-easyinput type="text" v-model="formData.bumpPointld" disabled />
          </uni-forms-item>
          <view class="addresItem">
            <view>
              <text class="addresItext1">单位地址：</text>
              <text class="addresItext2">{{ addressText }}</text>
            </view>
            <image class="imgsize" :src="addressIcon" mode="widthFix"></image>
          </view>
          <uni-forms-item label="检查时长：">
            <uni-easyinput class="redInput" type="text" v-model="formData.dynamicTime" disabled />
          </uni-forms-item>
          <view class="specialFormImgTitle with20Margin">
            <text class="">检查过程中的工作照片</text>
            <!-- <text class="localGreen">最多5张</text> -->
          </view>
          <uni-file-picker fileMediatype="image" file-extname="png,jpg,jpeg,gif" :image-styles="imageStyles" mode="grid"
            ref="file3" v-model="formData.file" limit="5" @success="success" @fail="fail"></uni-file-picker>
          <!-- <view class="addresItem" @click="toMap">
            <view>
              <text class="fakeRequired addresItext1">单位位置：</text>
              <text class="addresItext2">{{ addressText }}</text>
            </view>
            <image class="imgsize" :src="addressIcon" mode="widthFix"></image>
          </view> -->

          <uni-forms-item label="填表人员：">
            <uni-easyinput type="text" v-model="formData.name_dis" disabled />
          </uni-forms-item>
          <uni-forms-item label="填表时间：">
            <uni-easyinput type="text" v-model="formData.pubTime" disabled />
          </uni-forms-item>
          <uni-forms-item label="其他信息" class="">
            <uni-easyinput class="localTextArea otherInfo" type="textarea" v-model="formData.otherDescriptions"
              :placeholderStyle="placeholderStyle" placeholder="请输入" maxlength="50" disabled />
          </uni-forms-item>
          <!-- <uni-forms-item label="设备检查：" label-position="top" class="equipFormItem">
            <view class="equipCon">
              <view class="equipItem" v-for="(item, index) in equipArray" :key="index">
                <view class="equipTitle">{{ item.checkLabel }}</view>
                <view class="greyBg" v-if="item.checkLabel != '其他'">
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</text>
                    <view class="flexStart">
                      <text class="limitNumer">{{ item.dynamicNum }}</text>
                      <uni-data-checkbox disabled class="switchCheck" v-model="item.checkMsgFlag" :localdata="state"></uni-data-checkbox>
                    </view>
                  </view>
                  <view class="flexStart with20MarBottomgin" v-show="!item.checkMsgFlag">
                    <text class="equipItemTitle">缺失数量：</text>
                    <uni-easyinput type="text" v-model="item.checkContent" placeholder="请输入缺失数量" class="withBorderInput" :placeholderStyle="placeholderStyle" disabled />
                  </view>
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</text>
                    <uni-data-checkbox class="switchCheck" v-model="item.isCheck" :localdata="state2" disabled></uni-data-checkbox>
                  </view>
                  <view class="flexStart with20MarBottomgin" v-show="!item.isCheck">
                    <text class="equipItemTitle">原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因：</text>
                    <uni-easyinput class="localTextArea borderTextArea" type="textarea" v-model="item.otherDescriptions" :placeholderStyle="placeholderStyle" placeholder="请输入原因" disabled />
                  </view>
                  <view class="specialFormImgTitle with20Margin" v-if="item.file && item.file.length" v-show="!item.isCheck">
                    <text class="">上传照片：</text>
                    <text class="localGreen"></text>
                  </view>
                  <uni-file-picker
                    v-show="!item.isCheck"
                    fileMediatype="image"
                    file-extname="png,jpg,jpeg,gif"
                    :image-styles="imageStyles"
                    mode="grid"
                    :ref="'files' + (index + 1)"
                    v-model="item.file"
                    limit="5"
                    @success="success"
                    @fail="fail"
                  ></uni-file-picker>
                </view>
                <view class="greyBg" v-else>
                  <view class="flexStart with20MarBottomgin">
                    <text class="equipItemTitle"> 状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</text>
                    <uni-data-checkbox class="switchCheck" v-model="item.checkMsgFlag" :localdata="state3" disabled></uni-data-checkbox>
                  </view>
                  <view class="flexStart" v-show="!item.checkMsgFlag">
                    <text class="equipItemTitle">原&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;因：</text>
                    <uni-easyinput class="localTextArea borderTextArea" :placeholderStyle="placeholderStyle" type="textarea" v-model="item.otherDescriptions" placeholder="请输入原因" disabled />
                  </view>
                  <view class="specialFormImgTitle with20Margin" v-show="!item.checkMsgFlag">
                    <text class="">上传照片：</text>
                    <text class="localGreen"></text>
                  </view>
                  <uni-file-picker
                    v-show="!item.checkMsgFlag"
                    fileMediatype="image"
                    file-extname="png,jpg,jpeg,gif"
                    :image-styles="imageStyles"
                    mode="grid"
                    :ref="'files' + (index + 1)"
                    v-model="item.file"
                    limit="5"
                    @select="(e) => select1(e, index + 1)"
                    @success="success"
                    @delete="(e) => handle1Delete(e, index + 1)"
                    @fail="fail"
                  ></uni-file-picker>
                </view>
              </view>
            </view>
            <view class="addresItem">
              <view>
                <text class="addresItext1">上报位置：</text>
                <text class="addresItext2">{{ addressText }}</text>
              </view>
              <image class="imgsize" :src="addressIcon" mode="widthFix"></image>
            </view>
          </uni-forms-item> -->
          <uni-forms-item label="巡查问题" label-position="top" class="questionFormItem" v-if="afterPick && afterPick.length">
            <view class="questionItem" v-for="(item, index) in afterPick" :key="index">
              <view class="questionTitleCon">
                <view class="questionTitle">{{ index + 1 }}、{{ item.checkLabel }}</view>
              </view>

              <view v-if="item.isCheck == 10">
                <view style="color:red;">存在问题</view>
                <uni-easyinput class="localTextArea borderTextArea" type="textarea" v-model="item.otherDescriptions"
                  disabled :placeholderStyle="placeholderStyle" placeholder="请输入原因" />
              </view>
              <view v-else style="color:green">不存在问题</view>
              <view class="specialFormImgTitle with20Margin" v-if="item.file && item.file.length">
                <text class="">上传照片：</text>
                <text class="localGreen"></text>
              </view>
              <uni-file-picker v-if="item.file && item.file.length" fileMediatype="image" file-extname="png,jpg,jpeg,gif"
                :image-styles="imageStyles" mode="grid" :ref="'file2s' + (index + 1)" v-model="item.file" limit="5"
                @success="success" @fail="fail"></uni-file-picker>
            </view>
          </uni-forms-item>
        </uni-forms>
      </view>
      <!-- <view class="statusCon">
        <view class="statusTitle">文化遗产科反馈状态：</view>
        <view class="statusBlock"
          :class="[subStatus == '待审核' ? 'colorYellow' : subStatus == '合格' ? 'colorGreen' : 'colorRed']">{{ subStatus }}
        </view>
      </view> -->
      <view class="f-w-check">
        <span class="check-org">镇街审核:</span>
        <uni-data-checkbox class="switchCheck" v-model="zjshCheck" :localdata="zjshCheckArr"
          :disabled="type === '已审核' || pType === '区文物局'" @change="radioChange"></uni-data-checkbox>
      </view>
      <view class="textArea2Con" v-if="zjshCheckFlag">
        <uni-easyinput class="localTextArea borderTextArea fakeTextAreaRequired" type="textarea"
          :disabled="type === '已审核'" placeholder="请输入" v-model="zjshText" maxlength="50" />
        <view class="number2Count">
          {{ (zjshText && zjshText.length) || 0 }}/50
        </view>
      </view>
      <view v-if="pType === '区文物局'">
        处置情况: {{ czqkMap[czqk] }}
      </view>
      <view class="f-w-check" v-if="globalData.baseCheck && globalData.baseCheck.jdIsRunState != 0">
        <span class="check-org">区文物局审核:</span>
        <uni-data-checkbox class="switchCheck" v-model="wwjCheck" :localdata="wwjCheckArr"
          :disabled="type === '已审核'"></uni-data-checkbox>
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
              <view class="color-666">{{ (globalData.createCheckName) || '游客'}} {{
                globalUserPhone && formatPhone(globalUserPhone) }}</view>
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
              <view class="color-666">{{ currentData.checkStatus == '0' ? '处理中' : currentData.checkStatus == '1' ? '正常' :
                currentData.checkStatus == '-1' ? '异常' : '暂无' }}</view>
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

        <button v-if="type === '未审核'" class="cancelBtn" type="default" @click="goBack">取消</button>
        <button v-if="type === '未审核'" class="confirmBtn" @click="submitForm" type="primary">确定</button>
      </view>
    </view>
  </view>
</template>
<script>
import { jdUpdataByCheckIdAndCheckType3, getbaseCheckDataById, updateIsRun } from '@/api/api.js';
import tool from '@/utils/request.js';
import listData from '../inspection/data.json';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
const fakeJson = JSON.stringify({
  code: 200,
  message: null,
  data: {
    bean: [
      {
        id: '7471bf1b639569a1d0b05773c7eeafa0',
        realName: '78651677028213_.pic.jpg',
        suffix: 'jpg',
        path: '53ab9b1f-5a0b-40e4-9264-d466db06a3d4.jpg',
        type: '图片',
        size: '129.46KB   ',
        groupDataField: null,
        groupDataId: null,
        createTime: '2023-02-22 14:18:00',
        deleted: true,
        tenantId: null,
        pointFileId: null,
      },
    ],
    ossPath: 'http://oss-cn-xiaoshan-xsqdsjpt-d01-a.cloud-xsdc.xiaoshan.gov.cn/cultural-oss/cultural-oss/',
  },
  total: null,
});
export default {
  data() {
    return {
      addressText: '请选择地址',
      lng: 0,
      lat: 0,
      afterPick: [],
      middleStage: [],
      equipArray: [],
      addressIcon: '/static/images/m-icon@2x.png',
      deleteIcon: '/static/images/close@2x.png',
      currentName: '',
      bussinesArray: [],
      type: null,
      globalUserPhone: '',
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
      zjshCheckArr: [
        {
          text: '无需处置',
          value: 4,
        },
        {
          text: '立即处置',
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
        bumpPointld: null,
        haveSecurity: 0,
        name: null,
        storageIds: '',
        pubTime: null,
        file: [],
        organ: '杭州市萧山区文化遗产科',
        otherDescriptions: '',
        dynamicTime: '00:00:00',
      },
      rules: {
        bumpPointld: {
          rules: [
            {
              required: true,
              errorMessage: '请选择文保单位',
            },
          ],
        },
        // file: {
        //   rules: [
        //     {
        //       required: true,
        //       errorMessage: '请上传附件',
        //     },
        //   ],
        // },
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
      globalData: {
        baseCheck: {}
      },
      zjshCheck: null,  //镇街审核radio check
      zjshText: '',
      zjshCheckFlag: null,
      wwjCheck: null,  //区文物局审核radio check
      pType: '',
      type: '',
      czqk: '',
      czqkMap: {
        0: '待审核',
        1: '已处置',
        4: '无需处置',
        99: '无法处置',
      },
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
    this.analyseQuery(opt);
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
    submitForm() {
      if (this.pType === '区文物局') {
        if (this.wwjCheck != 1 && this.wwjCheck != 99) {
          return uni.showToast({
            title: '请选择审核意见',
            icon: 'error',
          });
        }
      } else {
        if (!this.zjshCheck) {
          return uni.showToast({
            title: '请选择审核意见',
            icon: 'error',
          });
        }
        if (this.zjshCheckFlag) {
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

      if (this.pType === '区文物局') {
        let params = {
          id: this.queryId,
          isRun: this.wwjCheck,
        }
        if (this.currentData.jdIsRunState == 4 || this.currentData.jdIsRunState == 1 || this.currentData.jdIsRunState == 99 ) {
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
          return uni.showToast({
            title: '请等待镇街审核结束',
            icon: 'error',
          });
        }
      } else {
        let params = {
          id: this.queryId,
          jdIsRun: this.zjshCheck,
          jdIsRunMsg: this.zjshText,
        }
        jdUpdataByCheckIdAndCheckType3(params).then(res => {
          if (res && res.code == 200) {
            uni.navigateBack();
            uni.showToast({
              title: '提交成功',
              icon: 'success',
            });
          }
        })
      }
    },
    injectData(shorter) {
      console.log('shorter', shorter);
      if (shorter.baseCheck) {
        this.addressText = shorter.baseCheck.checkAddress;
      }
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
      //   let firstArray = wholeArray.filter((ele) => {
      //     if (ele.checkLabel == '灭火器') {
      //       ele.sort = 0;
      //     }
      //     if (ele.checkLabel == '消防栓') {
      //       ele.sort = 1;
      //     }
      //     if (ele.checkLabel == '消防水缸') {
      //       ele.sort = 2;
      //     }
      //     if (ele.checkLabel == '其他') {
      //       ele.sort = 3;
      //     }
      //     return ele.checkLabel == '灭火器' || ele.checkLabel == '消防栓' || ele.checkLabel == '消防水缸' || ele.checkLabel == '其他';
      //   });
      //   firstArray.sort((a, b) => {
      //     return a.sort - b.sort;
      //   });
      if (shorter.baseCheck) {
        this.addressText = shorter.baseCheck.checkAddress;
        /*        getBumpPointBaseInfoConfigByPointId({
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
          }); */
      }
      //   let secondArray = wholeArray.filter((ele) => {
      //     return ele.checkLabel != '灭火器' && ele.checkLabel != '消防栓' && ele.checkLabel != '消防水缸' && ele.checkLabel != '其他';
      //   });
      let secondArray = wholeArray.filter((ele) => {
        return ele.checkLabel;
      });
      let oneItem = wholeArray.filter((ele) => {
        return !ele.checkLabel;
      });
      if (oneItem) {
        this.formData.otherDescriptions = oneItem[0].otherDescriptions;
        this.formData.file = oneItem[0].file;
      }
      this.afterPick = secondArray && secondArray.length ? secondArray : [];
    },
    analyseTime(shorter) {
      let end = dayjs(shorter.baseCheck.checkCreateTime);
      let start = dayjs(shorter.baseCheck.bodyTime);
      let diff = end.diff(start);
      let duration = dayjs.duration(diff);
      let time = `${String(duration.hours()).length == 1 ? '0' + duration.hours() : duration.hours()}:${String(duration.minutes()).length == 1 ? '0' + duration.minutes() : duration.minutes()}:${String(duration.seconds()).length == 1 ? '0' + duration.seconds() : duration.seconds()
        }`;
      this.formData.dynamicTime = time;
    },
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
            this.globalData = shorter;
            this.currentData = shorter.baseCheck;
            this.zjshCheck = shorter.baseCheck.jdIsRunState;
            this.zjshText = shorter.baseCheck.jdIsRunMsg
            this.czqk = shorter.baseCheck.nextJdIsRunState;
            this.wwjCheck = shorter.baseCheck.isRun;
            this.currentName = shorter.publishName + '巡检上报';
            this.formData.name = shorter.createCheckName;
            this.formData.name_dis = this.format_name(shorter.userName);
            this.formData.bumpPointld = shorter.publishName;
            this.formData.pubTime = dayjs(shorter.baseCheck.checkCreateTime).format('YYYY年MM月DD日');
            this.analyseTime(shorter);
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
    buryPoints() {
      this.t2 = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'inspectionDetai',
          pageName: '巡检上报详情页面',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
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
    fail(e) {
      console.log('上传失败', e);
    },
    success(e) { },
    goBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.inspectionDetailContainer {
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

.formCon {}

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

.equipCon {}

.equipItem {}

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

  .redInput {
    .uni-input-input {
      color: #dd524d !important;
    }
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

  .is-add {
    display: none !important;
  }

  .icon-del-box {
    display: none !important;
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
}

.switchCheck {
  font-size: 28rpx;
  margin-top: 0 !important;
}

.f-w-check {
  display: flex;
  margin: 20rpx 0;
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

.radioArea {
  margin: 20rpx 0;
}

.check-org {
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

.popupCloseCon {}

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

.oldinspectionDetailContainer {
  .confirmBtn {
    font-size: 44rpx !important;
  }

  .statusTitle {
    font-size: 34rpx !important;
  }

  .statusBlock {
    font-size: 32rpx !important;
  }

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

  .confirmBtn {
    font-size: 42rpx !important;
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

    .uni-textarea-textarea {
      font-size: 18px;
    }

    .checklist-text {
      font-size: 35rpx !important;
    }

    .uni-forms-item__label {
      font-size: 32rpx !important;

      .label-text {
        font-size: 32rpx !important;
      }
    }

    .uni-select__input-text {
      font-size: 32rpx !important;
    }
  }
}
</style>
