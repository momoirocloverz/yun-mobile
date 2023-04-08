<template>
  <view class="container" :class="[ISForOld ? 'oldcontainer' : '']">
    <uni-card>
      <view class="form">
        <uni-forms :modelValue="formData" :rules="rules" ref="formData">
          <uni-forms-item label="上报人:">
            <uni-easyinput type="text" v-model="formData.name_dis" disabled placeholder="" />
          </uni-forms-item>
          <uni-forms-item label="上报时间:">
            <uni-easyinput type="text" v-model="formData.pubTime" disabled />
          </uni-forms-item>
          <uni-forms-item label="分类类别:" required name="classify">
            <uni-data-select :localdata="rangefl" @change="changefl" v-model="formData.classify" :clear="false" placeholder="请选择隐患类型"> </uni-data-select>
          </uni-forms-item>
          <uni-forms-item label="隐患类型:" required name="hiddenTroubleType">
            <uni-data-select :localdata="range" @change="change" v-model="formData.hiddenTroubleType" :clear="false" placeholder="请选择隐患类型"> </uni-data-select>
          </uni-forms-item>
          <uni-forms-item label="文保单位:" required name="bumpPointName">
            <!-- <uni-data-select :localdata="rangewb" @change="changewb" v-model="formData.bumpPointId" placeholder="请选择文保单位"> </uni-data-select> -->
            <uni-combox :border="false" emptyTips="暂无匹配结果" :candidates="rangewb" placeholder="请选择文保单位" v-model="formData.bumpPointName"></uni-combox>
          </uni-forms-item>
          <uni-forms-item label="具体位置:" required name="hiddenLocation">
            <uni-easyinput type="text" v-model="formData.hiddenLocation" :placeholderStyle="placeholderStyle" placeholder="具体位置" />
          </uni-forms-item>
          <!-- <view class="label" v-if="type == 'xc'">
            <view class="tit"> 已处理描述： </view>
            <uni-easyinput type="textarea" v-model="formData.solvedRiskDescribes" placeholder="请输入已处理描述" />
          </view>          
          <view class="label">
            <view class="tit"> 隐患描述： </view>
            <uni-easyinput type="textarea" v-model="formData.riskDescribes" placeholder="请输入隐患描述" />
          </view>
           -->
          <uni-forms-item label="已处理描述:" label-position="top" v-if="type == 'xc'">
            <uni-easyinput type="textarea" trim="all" v-model="formData.solvedRiskDescribes" :placeholderStyle="placeholderStyle" placeholder="请输入已处理描述" />
          </uni-forms-item>
          <uni-forms-item label="隐患描述:" label-position="top">
            <uni-easyinput type="textarea" trim="all" v-model="formData.riskDescribes" :placeholderStyle="placeholderStyle" placeholder="请输入隐患描述" />
          </uni-forms-item>
          <uni-forms-item label="附件:" label-position="top" required name="file">
            <uni-file-picker
              fileMediatype="image"
              file-extname="png,jpg,jpeg,gif"
              :image-styles="imageStyles"
              mode="grid"
              ref="files"
              v-model="formData.file"
              limit="9"
              @select="select"
              @success="success"
              @delete="handleDelete"
              @fail="fail"
            >
            </uni-file-picker>
          </uni-forms-item>
        </uni-forms>
      </view>
    </uni-card>
    <view class="btn">
      <button @click="submitForm" type="primary">确认上报</button>
    </view>
  </view>
</template>
<script>
import { upload, getWenwuList, postHiddenTrouble } from '@/api/api.js';
import util from '@/utils/util.js';
export default {
  data() {
    return {
      title: null,
      type: null,
      files: [],
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
      formData: {
        name: null,
        storageIds: '',
        pubTime: null,
        hiddenTroubleType: null,
        bumpPointId: '',
        bumpPointName: '',
        hiddenLocation: null,
        riskDescribes: null,
        solvedRiskDescribes: null,
        handleType: 0,
        classify: null,
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
        classify: {
          rules: [
            {
              required: true,
              errorMessage: '分类类别不能为空',
            },
          ],
        },
        hiddenTroubleType: {
          rules: [
            {
              required: true,
              errorMessage: '隐患类型不能为空',
            },
          ],
        },
        bumpPointName: {
          rules: [
            {
              required: true,
              errorMessage: '文保单位不能为空',
            },
          ],
        },
        hiddenLocation: {
          rules: [
            {
              required: true,
              errorMessage: '具体位置不能为空',
            },
          ],
        },
      },
      placeholderStyle: 'color:#666;font-size:14px',
      imageStyles: {
        border: {
          color: '#ccc',
          width: 2,
          style: 'dashed',
          radius: '4px',
        },
      },
      range: [
        {
          value: '消防设施安全隐患',
          text: '消防设施安全隐患',
        },
        {
          value: '厨灶间安全隐患',
          text: '厨灶间安全隐患',
        },
      ],
      rangefl: [
        {
          value: 0,
          text: '可用电器',
        },
        {
          value: 1,
          text: '不可用电器',
        },
        {
          value: 2,
          text: '厨灶间明火',
        },
      ],
      rangewb: [],
      rangeWithId: [],
      show: null,
      ISForOld: false,
    };
  },
  created() {
    this.setTime();
  },
  onShow() {
    // this.show = 'block';
  },
  onLoad(opt) {
    this.checkMode();
    this.t0 = (Date.now() - this.browseTime) / 1000.0;
    this.t2 = (Date.now() - this.browseTime) / 1000.0;
    var that = this;
    clearInterval(that.clearTimeSet);
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'hidden-add',
        pageName: '隐患上报页面',
        t2: that.t2,
        t0: that.t0,
        log_status: '02',
      });
    });
    this.formData.name = uni.getStorageSync('name');
    this.formData.name_dis = this.format_name(this.formData.name);
    this.formData.pubTime = util.getTime();
    this.type = opt.type;
    if (opt.type == 'xc') {
      this.title = '新增隐患上报（已现场处理）';
      this.formData.handleType = 0;
    }
    if (opt.type == 'zj') {
      this.title = '新增隐患上报（需镇街协助）';
      this.formData.handleType = 1;
    }
    this.getWenwuList();
  },
  methods: {
    checkMode() {
      if (uni.getStorageSync('version') && uni.getStorageSync('version') == 'old') {
        this.ISForOld = true;
        this.placeholderStyle = 'color:#666;font-size:18px';
      } else {
        this.ISForOld = false;
        this.placeholderStyle = 'color:#666;font-size:14px';
      }
    },
    setTime() {
      this.browseTime = Date.now();
    },
    format_name(val) {
      if (val != null && val.length > 0) {
        return '*' + val.substring(1);
      } else {
        return '*';
      }
    },
    async getWenwuList() {
      let params = {
        currentPage: 1,
        pageSize: 600,
      };
      const res = await getWenwuList(params);
      this.rangeWithId = res.data.list.map((item) => {
        return {
          text: item.publishName,
          value: item.id,
        };
      });
      this.rangewb = res.data.list.map((item) => {
        return item.publishName;
      });
    },
    change(e) {
      // console.log(e);
      // if (e == 0) {
      // 	this.formData.hiddenTroubleType = '消防设施安全隐患'
      // } else {
      // 	this.formData.hiddenTroubleType = '厨灶间安全隐患'
      // }
    },
    changewb(e) {},
    changefl(e) {},
    leftClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    select(sec) {
      //   this.files = [];
      //   if (res.tempFilePaths.length > 0) {
      //     for (let i in res.tempFilePaths) {
      //       let resp = await upload(res.tempFilePaths[i]);
      //       let ss = JSON.parse(resp);
      //       this.files.push(ss.data[0].id);
      //     }
      //     if (this.formData.storageIds) {
      //       this.formData.storageIds = this.formData.storageIds + ',' + this.files.toString();
      //     } else {
      //       this.formData.storageIds = this.files.toString();
      //     }
      //   } else {
      //   }
      this.files = [];
      this.uploadAction(sec.tempFilePaths, 1);
    },
    uploadAction(tempFilePaths, token) {
      console.log(token);
      if (!tempFilePaths.length) return;
      const path = tempFilePaths.pop();
      this.formData.file.push({ url: path, name: '' });
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
              this.formData.file.pop();
              this.$refs.files.clearFiles(token - 1);
            }
          } else {
            uni.showToast({
              title: '上传失败',
              icon: 'none',
            });
            this.formData.file.pop();
            this.$refs.files.clearFiles(token - 1);
          }
        })
        .catch((err) => {
          console.log('err', err);
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          });
          this.formData.file.pop();
          this.$refs.files.clearFiles(token - 1);
        });
      this.uploadAction(tempFilePaths, token);
    },
    fail(e) {
      console.log('上传失败', e);
    },
    handleDelete(e) {
      console.log('删除', e);
      const num = this.formData.file.findIndex((ele) => {
        return ele.url == e.tempFilePath;
      });
      console.log('num', num);
      this.formData.file.splice(num, 1);
      console.log(this.formData.file);
    },
    success(e) {},
    submitForm() {
      this.$refs.formData
        .validate()
        .then((res) => {
          console.log('成功', res);
        })
        .catch((err) => {
          console.log('错误：', err);
        });
      /* if (this.formData.bumpPointName && this.formData.classify != null && this.formData.hiddenTroubleType != null && this.formData.hiddenLocation) {
        let trackIdItem = this.rangeWithId.find((ele) => {
          return ele.text == this.formData.bumpPointName;
        });
        if (trackIdItem) {
          this.formData.bumpPointId = trackIdItem.value;
        }
        postHiddenTrouble(this.formData).then((res) => {
          if (res.code == 200) {
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            beforePage.$vm.needRefresh = true;
            uni.showToast({
              title: '上报成功',
              icon: 'success',
            });
            uni.navigateBack({
              delta: 1,
            });
          }
        });
      } else {
        uni.showToast({
          title: '请填写完整信息',
        });
      } */
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .uni-forms-item__inner {
    padding: 0 !important;
  }
  .is-disabled {
    color: #666;
  }
  .uni-forms-item {
    border-bottom: 1rpx solid #ddd !important;
    // height: 77rpx;
    &:last-child {
      border: none !important;
    }
  }
  .uni-select {
    border: none !important;
  }
  .uni-select__input-text {
    width: 170px !important;
  }
  .uni-stat__actived {
    outline: none !important;
  }
  .uni-select__selector-item {
    font-size: 36rpx;
    uni-text {
      white-space: nowrap;
      padding-right: 15rpx;
    }
  }
  .uni-select__selector {
    width: auto;
  }
  .uni-combox {
    padding-left: 5px;
  }
  .uni-combox__input {
    width: 170px !important;
    flex: unset !important;
  }
  .is-input-border {
    border: none;
  }
  .icon-add {
    background-color: #ccc !important;
  }
  .uni-forms-item__label {
    width: auto !important;
    font-size: 34rpx;
    .label-text {
      font-size: 34rpx;
      color: #000000;
    }
  }
  .uni-stat__select {
    padding: 0 !important;
  }
  .uni-card {
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
    border-radius: 10px;
    overflow: visible;
    margin: 0 !important;
    padding: 0 !important;
  }
  .uni-textarea-textarea {
  }
  .uni-easyinput__content-textarea {
    padding: 0 !important;
  }
  .is-input-error-border {
    padding-bottom: 20px;
    // margin-top: 20px;
  }
}
.form {
  padding-bottom: 50px;
}
.btn {
  margin-top: 30rpx;
  button {
    width: 70%;
    background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 27.5px;
  }
}
.oldcontainer {
  ::v-deep {
    .uni-select {
      font-size: 36rpx;
    }
    .uni-input-input {
      font-size: 36rpx;
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
    // .uni-select__selector-item {
    //   uni-text {
    //     white-space: nowrap;
    //     padding-right: 15rpx;
    //   }
    // }
    .uni-forms-item__label {
      .label-text {
        font-size: 42rpx;
        color: #000000;
      }
    }
    .uni-textarea-textarea {
      font-size: 18px;
    }
  }
  .btn {
    margin-top: 30rpx;
    button {
      width: 70%;
      background-image: linear-gradient(137deg, #00b2ff 0%, #007aff 100%);
      box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
      border-radius: 27.5px;
      font-size: 48rpx;
    }
  }
}
</style>
