<template>
  <view class="examinationPaperCon" :class="[ISOld ? 'forOld' : '']">
    <view class="borderCon">
      <view class="countDownCon">
        <uni-icons type="info" size="24" color="#f00"></uni-icons>
        <text class="dynamicTime">{{ dynamicTimeText }}</text>
      </view>
      <view class="questionCon">
        <view class="topCon">
          <view class="topSubCon">
            <view class="topTitle">生活常识在线考试</view>
            <view class="topContent">本套试卷共10个题目，每次考试随机抽取5个题目进行考试，每题20分，共100分。考试时间5分钟。</view>
          </view>
        </view>
        <template v-for="(item, index) in questionArray" :key="index">
          <view class="questionItem">
            <view class="questionTitle" :class="[item.required ? 'Required' : '']"> {{ index + 1 }}.{{ item.title }} </view>
            <view class="questionBody">
              <radio-group @change="(event) => radioChange(event, item)">
                <uni-table border>
                  <label v-for="(sub, subIndex) in item.mainArray" :key="subIndex" class="resetLabel">
                    <uni-td>
                      <radio :value="sub.value" style="transform: scale(0.7)" /><view class="radioDescribe">{{ sub.title }}</view>
                    </uni-td>
                  </label>
                </uni-table>
              </radio-group>
            </view>
          </view>
        </template>
        <view class="submitBtn" @click="submitForm">提交</view>
      </view>
    </view>
  </view>
</template>
<script>
import { zhiyuanzheapply, addDy, upload } from '@/api/api.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
export default {
  data() {
    return {
      dynamicTimeText: '00:05:00',
      countDownNumber: 5000,
      startTime: new Date(),
      endTime: new Date(),
      current: 0,
      timer: null,
      questionArray: [
        {
          title: '我国少数民族分布最多的省份是',
          required: true,
          current: 0,
          mainArray: [
            { title: 'A、云南', value: 1 },
            { title: 'B、广西', value: 2 },
            { title: 'C、四川', value: 3 },
            { title: 'D、浙江', value: 4 },
          ],
        },
        {
          title: '下半旗是把旗子下降到',
          required: true,
          current: 0,
          mainArray: [
            { title: 'A、1/3处', value: 1 },
            { title: 'B、1米', value: 2 },
            { title: 'C、1/2处', value: 3 },
          ],
        },
        {
          title: '世界上最长的运河是哪一条？',
          required: true,
          current: 0,
          mainArray: [
            { title: 'A、巴拿马运河', value: 1 },
            { title: 'B、京杭大运河', value: 2 },
            { title: 'C、苏伊士运河', value: 3 },
          ],
        },
        {
          title: '以前见过狗狗铺床的',
          required: false,
          current: 0,
          mainArray: [
            { title: 'A、doge', value: 1 },
            { title: 'B、cat', value: 2 },
            { title: 'C、mouse', value: 3 },
          ],
        },
        {
          title: '注意自己存放的路径',
          required: true,
          current: 0,
          mainArray: [
            { title: 'A、天堂', value: 1 },
            { title: 'B、地上', value: 2 },
            { title: 'C、阴间', value: 3 },
          ],
        },
      ],
      ISOld: false,
      globalStart: null,
      globalEnd: null,
    };
  },
  onLoad() {
    if (uni.getStorageSync('version') == 'old') {
      this.ISOld = true;
    } else {
      this.ISOld = false;
    }
  },
  onShow() {
    this.globalStart = Date.now();
  },
  onHide() {
    this.buryPoints();
  },
  mounted() {
    this.coutDownAction();
  },
  onReady() {},
  created() {},
  methods: {
    coutDownAction() {
      clearInterval(this.timer);
      this.timer = null;
      this.startTime = new Date().getTime();
      this.endTime = this.startTime + 5 * 60 * 1000 + 1000;
      let end = dayjs(this.endTime);
      this.timer = setInterval(() => {
        this.startTime = new Date().getTime();
        let start = dayjs(this.startTime);
        let diff = end.diff(start);
        let duration = dayjs.duration(diff);
        let ms = duration.$ms;
        let time = `00:${String(duration.minutes()).length == 1 ? '0' + duration.minutes() : duration.minutes()}:${
          String(duration.seconds()).length == 1 ? '0' + duration.seconds() : duration.seconds()
        }`;
        this.dynamicTimeText = time;
        if (ms < 0) {
          this.dynamicTimeText = '00:00:00';
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    radioChange(event, item) {
      item.current = event.detail.value;
    },
    submitForm() {
      if (this.timer) {
        let filter = this.questionArray.filter((ele) => {
          return ele.required && !ele.current;
        });
        if (filter && filter.length) {
          uni.showToast({
            title: '请填写完整',
            icon: 'error',
            duration: 2000,
          });
        }
      } else {
        uni.showToast({
          title: '已超时',
          icon: 'error',
          duration: 2000,
        });
      }
    },
    buryPoints() {
      this.globalEnd = Date.now();
      zwlog.onReady(() => {
        zwlog.sendPV({
          miniAppId: '2002282040',
          miniAppName: '永兴护保',
          pageId: 'register-index',
          pageName: '考试试卷',
          t2: this.globalEnd,
          t0: this.globalStart,
          log_status: '02',
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.examinationPaperCon {
  padding: 20px;
  .borderCon {
    border: 1px solid #e3e2e2;
  }
  .countDownCon {
    border-bottom: 1px solid #e3e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    .dynamicTime {
      margin-left: 10px;
      font-size: 22px;
      width: 95px;
      display: inline-block;
    }
  }
  .questionCon {
    .topCon {
      margin-bottom: 40px;
      padding-top: 30px;
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
    }
    .topSubCon {
      border-bottom: 1px dashed #e3e2e2;
      padding-bottom: 30px;
      box-sizing: border-box;
    }
    .topTitle {
      text-align: center;
      margin-bottom: 20px;
      font-size: 23px;
      color: #0b8cf4;
    }
    .topContent {
      font-size: 15px;
    }
  }
  .questionItem {
    margin-bottom: 40px;
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    .questionTitle {
      margin-bottom: 8px;
    }
    .Required {
      &:before {
        margin-right: 2px;
        color: rgb(238, 10, 36);
        content: '*';
      }
    }
    .questionBody {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: center;
      .resetLabel {
        width: 50%;
        height: 100%;
        box-sizing: border-box;
        display: inline-block;
      }
      .radioSelf {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        box-sizing: border-box;
        padding-top: 6px;
        padding-bottom: 6px;
        padding-left: 6px;
      }
      .radioDescribe {
        color: #656363;
        font-size: 14px;
      }
    }
  }
  .submitBtn {
    width: 200px;
    margin: 0 auto;
    margin-bottom: 40px;
    padding: 10px;
    font-size: 18px;
    box-sizing: border-box;
    background-color: #0b8cf4;
    color: #fff;
    border-radius: 4px;
    text-align: center;
  }
}
.forOld {
  .dynamicTime {
    font-size: 28px !important;
    width: 110px !important;
  }
  .topTitle {
    font-size: 28px !important;
  }
  .topContent {
    font-size: 18px !important;
  }
  .questionTitle {
    font-size: 20px !important;
  }
  .radioDescribe {
    font-size: 18px !important;
  }
  .submitBtn {
    font-size: 26px !important;
  }
}
::v-deep {
  uni-radio-group {
    width: 100%;
  }
  .uni-table-td {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .table--border {
    border-right: 1px #ebeef5 solid;
  }
  .uni-table-loading {
    display: none;
  }
}
</style>
