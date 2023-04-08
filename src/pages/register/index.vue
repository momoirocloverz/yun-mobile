<template>
  <view class="container" :class="[ISForOld ? 'oldcontainer' : '']">
    <view class="topImg">
      <image src="/static/index/hbhww.png" mode="scaleToFill"></image>
    </view>
    <view class="register">
      <view class="content">
        <view>
          <uni-forms ref="form" :rules="rules" :modelValue="formData">
            <uni-forms-item label="姓名" name="name_dis" required>
              <uni-easyinput disabled v-model="formData.name_dis" :placeholderStyle="placeholderStyle" placeholder="请输入姓名" />
            </uni-forms-item>
            <uni-forms-item label="联系电话" required name="phone_dis">
              <uni-easyinput disabled v-model="formData.phone_dis" :placeholderStyle="placeholderStyle" placeholder="请输入手机号" />
            </uni-forms-item>
            <uni-forms-item label="所属镇街" name="townStreetName" required>
              <view class="combOuter">
                <uni-combox emptyTips="暂无匹配结果" :candidates="streetRange" placeholder="请选择所属镇街" v-model="formData.townStreetName"></uni-combox>
              </view>
            </uni-forms-item>
            <uni-forms-item label="党员" required name="party">
              <uni-data-select placeholder="请选择是否是党员" v-model="formData.party" :localdata="range" @change="selectChange"></uni-data-select>
            </uni-forms-item>
            <uni-forms-item required label="备注" class="" label-position="top" name="remark">
              <uni-easyinput class="localTextArea" type="textarea" v-model="formData.remark" :placeholderStyle="placeholderStyle" placeholder="请输入备注" maxlength="50" />
            </uni-forms-item>
          </uni-forms>
          <button class="sumitBtn" @click="checkValidate">确认提交申请</button>
        </view>
      </view>
      <uni-popup ref="alertDialog" type="dialog" title=" ">
        <uni-popup-dialog @confirm="confirmAction">
          <view class="dialog">
            <view class="">
              <image src="../../static/index/duihao.png" mode="" class="img"></image>
            </view>
            <view class="shang1"> 申请成功 </view>
            <view class="shang2"> 欢迎您加入萧山区文保志愿者队伍 </view>
          </view>
        </uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>
<script>
import { ding_userinfo, wechat_userinfo, applicationNotExamine } from '@/api/api.js';
export default {
  data() {
    return {
      ISForOld: false,
      range: [
        { value: '2', text: '是' },
        { value: '3', text: '否' },
      ],
      streetRange: [
        '临浦镇',
        '义桥镇',
        '党湾镇',
        '北干街道',
        '南阳街道',
        '城厢街道',
        '戴村镇',
        '所前镇',
        '新塘街道',
        '新湾街道',
        '楼塔镇',
        '河上镇',
        '浦阳镇',
        '瓜沥镇',
        '益农镇',
        '红山农场',
        '蜀山街道',
        '衙前镇',
        '进化镇',
        '闻堰街道',
        '靖江街道',
      ],
      rangeWithId: [],
      placeholderStyle: 'color:#666;font-size:28rpx',
      formData: {
        remark: '',
        party: '',
        townStreetName: '',
        userName: '',
        name_dis: '',
        name: '',
        phone: '',
        phone_dis: '',
        dzz: '',
        address: '',
      },
      rules: {
        party: {
          rules: [
            {
              required: true,
              errorMessage: '请选择是否是党员',
            },
          ],
        },
        remark: {
          rules: [
            {
              required: true,
              errorMessage: '备注不能为空',
            },
          ],
        },
        phone: {
          rules: [
            {
              required: true,
              errorMessage: '手机号不能为空',
            },
            {
              format: 'number',
              errorMessage: '手机号只能输入数字',
            },
            {
              validateFunction(rule, value, data, callback) {
                let iphoneReg = /^1[3,5,6,7,8,9][0-9]{9}$/;
                if (!iphoneReg.test(value)) {
                  callback('手机号码格式不正确');
                }
                return true;
              },
            },
          ],
        },
        townStreetName: {
          rules: [
            {
              required: true,
              errorMessage: '地址不能为空',
            },
          ],
        },
      },
      t0: 0,
      t2: 0,
    };
  },
  onLoad() {},
  onShow() {
    this.t0 = Date.now();
    this.checkMode();
  },
  onHide() {
    this.buryPoints();
  },
  mounted() {
    this.get_ding_userinfo();
  },
  methods: {
    confirmAction() {
      this.$refs.alertDialog.close();
      //   uni.reLaunch({
      //     url: '/pages/login/index',
      //   });
      this.jumpAction();
    },
    selectChange(e) {
      if (e) {
        console.log('e:', e);
      }
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
    buryPoints() {
      this.t2 = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'register-index',
          pageName: '注册护保员',
          t2: this.t2,
          t0: this.t0,
          log_status: '02',
        });
      });
    },
    jumpAction() {
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      window.onpageshow = (event) => {
        if (event.persisted || (window.performance && window.performance.navigation.type == 2)) {
          ZWJSBridge.close();
        }
      };
      window.location.replace(
        'https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=BCDSGA_b38b713eace4aefe14e896f3a43a009b&redirectUrl=https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2002282040/reserved/index.html%23/pages/login/auth',
      );
    },
    async get_ding_userinfo() {
      //   console.log(this.formData);
      const sUserAgent = window.navigator.userAgent.toLowerCase();
      const bIsAlipayMini = sUserAgent.indexOf('miniprogram') > -1 && sUserAgent.indexOf('alipay') > -1;
      const bIsDtDreamApp = sUserAgent.indexOf('dtdreamweb') > -1; // 浙里办APP
      console.log('bIsDtDreamApp浙里办app', bIsDtDreamApp);
      const ssoFlag = await ZWJSBridge.ssoTicket({});
      if (ssoFlag && ssoFlag.result && !bIsAlipayMini && !bIsDtDreamApp) {
        var ding_token = uni.getStorageSync('ding_token');
        const res = await wechat_userinfo({ ding_token: ding_token });
        var result = JSON.parse(res.data);
        console.log('weixin result', result);
        if (result && result.data && result.data.personInfo) {
          if (result.data.personInfo.userId) {
            this.formData.userName = result.data.personInfo.userId;
          }
          if (result.data.personInfo.userName) {
            this.formData.name = result.data.personInfo.userName;
            this.formData.name_dis = '*' + result.data.personInfo.userName.substring(1);
          }
          if (result.data.personInfo.phone) {
            this.formData.phone = result.data.personInfo.phone;
            var mobile = result.data.personInfo.phone;
            this.formData.phone_dis = mobile.substring(0, 3) + '****' + mobile.substring(7);
          }
        }
        // console.log("mobile：" + mobile);
        // console.log("formData:", this.formData);
      } else {
        var ding_token = uni.getStorageSync('ding_token');
        const res = await ding_userinfo({ ding_token: ding_token });
        var result = JSON.parse(res.data);
        console.log('normal result', result);
        if (result.username) {
          this.formData.userName = result.username;
          this.formData.name = result.username;
          this.formData.name_dis = '*' + result.username.substring(1);
        } else {
          this.jumpAction();
        }
        if (result.mobile) {
          this.formData.phone = result.mobile;
          var mobile = result.mobile;
          this.formData.phone_dis = mobile.substring(0, 3) + '****' + mobile.substring(7);
        }
        // console.log("mobile：" + mobile);
        // console.log("formData:", this.formData);
        // console.log(
        //   "mobile change:",
        //   mobile.substring(0, 3) + "****" + mobile.substring(7)
        // );
        // console.log("formData change:", this.formData);
      }
    },
    dialogConfirm() {
      uni.switchTab({
        url: '/pages/tourists/index',
      });
    },
    change1(e) {
      for (let i in this.range) {
        if (this.range[i].value == e) {
          this.formData.bumpPointName = this.range[i].text;
        }
      }
    },
    checkValidate() {
      this.$refs.form
        .validate()
        .then((res) => {
          //   this.formData.dingOpenid = uni.getStorageSync('ding_id');
          let data = {
            remark: this.formData.remark,
            dingOpenid: uni.getStorageSync('ding_id'),
            street: this.formData.townStreetName,
            userType: this.formData.party,
            nickName: this.formData.name,
            phone: this.formData.phone,
          };
          console.log('data', data);
          applicationNotExamine(data)
            .then((res) => {
              console.log('res', res);
              if (res && res.code == 200) {
                this.$refs.alertDialog.open();
              }
            })
            .catch((err) => {
              console.log('err', err);
            });
        })
        .catch((err) => {
          console.log('err', err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.combOuter {
}
::v-deep {
  .uni-popup__error {
    display: none;
  }
  .uni-combox {
    font-size: 30rpx;
    // height: 44px;
    // width: 90%;
    // .uni-input-input {
    //   white-space: nowrap;
    //   text-overflow: ellipsis;
    //   -o-text-overflow: ellipsis;
    //   overflow: hidden;
    // }
  }
  .uni-dialog-button {
    display: none;
    text-align: center;
    line-height: 45px;
  }
  .uni-border-left {
    display: block !important;
    border: none !important;
  }
  .file-picker__box {
    width: 25% !important;
    padding-top: 25% !important;
  }
  .file-picker__box-content {
    border-color: #ccc !important;
  }
  .uni-forms-item__label .label-text {
    font-size: 28rpx;
    color: #000;
  }
  .uni-stat__select {
    padding: 0 !important;
  }
  .uni-forms-item__label {
    width: 200rpx !important;
  }
  .uni-select__input-text {
    width: 430rpx !important;
  }
}
.dialog {
  text-align: center;
  .img {
    width: 95rpx;
    height: 95rpx;
    margin-bottom: 20rpx;
  }
  .shang1 {
    font-size: 36rpx;
    color: #000000;
    margin-bottom: 20rpx;
  }
  .shang2 {
    font-size: 30rpx;
    color: #888888;
  }
}
.zhuyi {
  margin-left: 40rpx;
  font-size: 28rpx;
  color: #888888;
}
.topImg {
  image {
    width: 100%;
    height: 320rpx;
  }
}
.button-group {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-around;
}
.form-item {
  display: flex;
  align-items: center;
}
button {
  color: #fff;
  width: 590rpx;
  height: 110rpx;
  line-height: 110rpx;
  background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
  box-shadow: 0px 20px 30px 0px rgba(86, 128, 250, 0.25);
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 27.5px;
}
.oldcontainer {
  .sumitBtn {
    font-size: 40rpx !important;
  }
  ::v-deep {
    .uni-forms-item__label .label-text {
      font-size: 35rpx !important;
      color: #000 !important;
    }
    .uni-easyinput__content-input {
      font-size: 30rpx !important;
    }
    .uni-select {
      font-size: 30rpx !important;
    }
    .uni-combox {
      font-size: 35rpx !important;
      .uni-input-input {
        white-space: nowrap !important;
        text-overflow: ellipsis !important;
        -o-text-overflow: ellipsis !important;
        overflow: hidden !important;
      }
    }
    .uni-textarea-textarea {
      font-size: 35rpx !important;
    }
  }
}
</style>
