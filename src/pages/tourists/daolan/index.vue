<!-- 导览列表页 -->
<template>
  <view>
    <view :style="{ '--baseFontTitle': baseFontTitle, '--baseFontContent': baseFontContent, '--baseFontTime': baseFontTime }" class="container" :class="show == 'block' ? 'showblock' : 'shownone'">
      <view class="search-co">
        <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input" placeholder="搜索文保单位" @cancel="cancel" @clear="clear"> </uni-search-bar>
      </view>
      <view class="diqu">
        <view class="diqutext" style="position: absolute; left: 0; padding-left: 20rpx; background: #fafafa; color: #999" v-if="zjflag">
          所属地区：<uni-tag text="全区" :circle="true" :class="['tag', jd ? '' : 'tagall']" @click="select('all')"></uni-tag>
        </view>
        <view class="" style="margin-left: 260rpx">
          <uni-tag :text="item.text" type="" :circle="true" v-for="item in dataTree" :key="item.id" :class="['tag', jd == item.text ? 'tagall' : '']" @click="select(item.text)"></uni-tag>
        </view>
      </view>
      <view class="diqu1">
        <view class="diqu" style="padding-bottom: 40rpx">
          <view class="diqutext" style="position: absolute; left: 0; padding-left: 20rpx; background: #fafafa; color: #999">
            保护级别：<uni-tag text="全部" :circle="true" :class="['tag', rank ? '' : 'tagall']" @click="select('all')"></uni-tag>
          </view>
          <view class="" style="margin-left: 260rpx">
            <uni-tag :text="item.text" type="" v-for="item in ranklist" :key="item.value" :circle="true" :class="['tag', rank == item.value ? 'tagall' : '']" @click="selectrank(item.value)"></uni-tag>
          </view>
        </view>
      </view>
      <view class="publicityList" v-for="(item) in publicityList" :key="item.id" @click="clickDetail(item)">
        <view class="xia">
          <view class="right">
            <image src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/76bda0d1-3ed0-49f1-9606-be107600cbc3.jpg"  v-if="item.publishName == '茅湾里窑址'"> </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/0139e06d-0064-4141-8522-3d28c993c8ef.jpg"
            
            v-else-if="item.publishName == '朱凤标故居'"
          >
          </image>


          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/8d88a7a8-7ed6-4fdd-99cd-26f947020518.jpg"
            
            v-else-if="item.publishName == '城隍山窑址'"
          >
          </image>


          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1e5b7bdc-1b87-4648-bb81-ba9ee5ed9b90.jpg"
            
            v-else-if="item.publishName == '二桥书屋'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c38d5930-c229-4ebc-8531-fa5069687f0c.jpg"
            
            v-else-if="item.publishName == '葛云飞故居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/9b7e2370-f39e-4a4b-b48a-45dd33d66c96.jpg"
            
            v-else-if="item.publishName == '华家祠堂'"
          >
          </image>


          
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/6555da92-c5fe-472c-b4af-5d21f115bff9.jpg"
            
            v-else-if="item.publishName == '欢潭老洋房'"
          >
          </image>



          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a85f351e-24bd-4acd-b7ad-d96158241e7e.jpg"
            
            v-else-if="item.publishName == '清葛壮节公故里表'"
          >
          </image>


          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ba0c132a-ca07-4c7d-ab14-445df838f441.jpg"
            
            v-else-if="item.publishName == '裘家坞裘氏宗祠'"
          >
          </image>


          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a92cfee0-eeb7-4760-bb1e-fcafd2cec1b0.jpg"
            
            v-else-if="item.publishName == '纱帽山窑遗址'"
          >
          </image>



          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/40a60581-018c-44f1-9c57-70f5d019dae3.jpg"
            
            v-else-if="item.publishName == '汤氏宗祠'"
          >
          </image>


          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/f9f52bc2-006a-4031-ba43-10ed4af79480.jpg"
            
            v-else-if="item.publishName == '汤寿潜故居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/25c3afdc-f821-4951-abf1-9c9be164bce4.jpg"
            
            v-else-if="item.publishName == '汤寿潜纪念碑'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69c169ae-0ae0-40ef-b881-7c8453ddae6a.jpg"
            
            v-else-if="item.publishName == '务本堂'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ca6d61d1-5e8e-40f7-a322-9043b37fdd33.jpg"
            
            v-else-if="item.publishName == '萧绍海塘'"
          >
          </image>
          
          

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69bd5d99-333b-4a38-bbe8-77874e6e8daa.jpg"
            
            v-else-if="item.publishName == '佳山坞62号民居'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1616087c-a723-4f2b-b204-5757e0d6f412.jpg"
            
            v-else-if="item.publishName == '田村缪家祠堂'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a5d1fb53-6b5c-4971-95f9-ff619a8fe6d0.jpg"
            
            v-else-if="item.publishName == '毋岭252～258号民居'"
          >
          </image>

          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1583b9b8-da7a-48ca-9666-d85580c6366c.jpg"
            
            v-else-if="item.publishName == '沈佩兰故居'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a23c710e-02c1-45f3-bd57-395733fa4cb8.jpg"
            
            v-else-if="item.publishName == '山阴古道（萧山段）'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c247aebf-5d73-4ec1-a95e-934dac319062.jpg"
            
            v-else-if="item.publishName == '凤坞315号民居'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/914dfd20-cb28-4e73-8b17-dd3523f46b19.jpg"
            
            v-else-if="item.publishName == '葛云飞墓'"
          >
          </image>
          <image
            src="https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/5d107e04-e281-46e1-9176-e2a70bb843fb.jpg"
            
            v-else-if="item.publishName == '许家南大房'"
          >
          </image>
       
          <image src="/static/wbimg/zdyh.png"  v-else-if="item.publishName == '浙东运河'"> </image>
          <image src="/static/wbimg/base.png"  v-else></image>
          </view>
          <view class="left">
            <view class="biaoti">
              <view class="btitle">
                {{ item.publishName }}
              </view>
              <view class="">
                <text v-for="ite in ranklist" :key="ite.id">
                  <uni-tag :text="ite.text" type="primary" :circle="true" v-if="ite.value == item.rank"> </uni-tag>
                </text>
              </view>
            </view>
            <view class="dizi">
              {{ item.address }}
            </view>
            <view class="wenzi">
              {{ item.introduce }}
            </view>
          </view>
        </view>
      </view>
      <view class="emptyHolder" v-if="!publicityList.length">没有搜索到相关的文物</view>
      <view class="btn" @tap="toTop" :style="{ display: topFlag === false ? 'none' : 'block' }">
        <image src="/static/icon/totop.png" mode="" />
      </view>
    </view>

    <view class="container oldcontainer" :class="show != 'block' ? 'showblock' : 'shownone'">
      <view class="search-co">
        <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input" placeholder="搜索文保单位" @cancel="cancel" @clear="clear"> </uni-search-bar>
      </view>
      <view class="diqu">
        <view class="" style="position: absolute; left: 0; padding-left: 20rpx; background: #fafafa; color: #999" v-if="zjflag">
          所属地区：<uni-tag text="全区" :circle="true" :class="['tag', jd ? '' : 'tagall']" @click="select('all')"></uni-tag>
        </view>
        <view class="" style="margin-left: 340rpx">
          <uni-tag :text="item.text" type="" :circle="true" v-for="item in dataTree" :key="item.value" :class="['tag', jd == item.text ? 'tagall' : '']" @click="select(item.text)"></uni-tag>
        </view>
      </view>
      <view class="diqu1">
        <view class="diqu" style="padding-bottom: 40rpx">
          <view class="" style="position: absolute; left: 0; padding-left: 20rpx; background: #fafafa; color: #999">
            保护级别：<uni-tag text="全部" :circle="true" :class="['tag', rank ? '' : 'tagall']" @click="select('all')"></uni-tag>
          </view>
          <view class="" style="margin-left: 340rpx">
            <uni-tag :text="item.text" type="" v-for="item in ranklist" :key="item.id" :circle="true" :class="['tag', rank == item.value ? 'tagall' : '']" @click="selectrank(item.value)"></uni-tag>
          </view>
        </view>
      </view>
      <view class="publicityList" v-for="(item, index) in publicityList" :key="item.id" @click="clickDetail(item)">
        <view class="xia">
          <view class="right">
            <image :src="item.img" />
          
          </view>
          <view class="left">
            <view class="biaoti">
              <view class="btitle">
                {{ item.publishName }}
              </view>
            </view>
            <view>
              <uni-tag :text="format_rank(item.rank)" type="primary" :circle="true"> </uni-tag>
            </view>
            <view class="dizi">
              {{ item.address }}
            </view>
          </view>
        </view>
      </view>
      <view class="emptyOldHolder" v-if="!publicityList.length">没有搜索到相关的文物</view>
      <view class="btn" @tap="toTop" :style="{ display: topFlag === false ? 'none' : 'block' }">
        <image src="/static/icon/totop.png" mode="" />
      </view>
    </view>
  </view>
</template>
<script>
import { getWenbaodianList, getSszj } from '@/api/api.js';
export default {
  data() {
    return {
      //字体本地存储
      baseFontTitle: '',
      baseFontContent: '',
      baseFontTime: '',
      rank: null,
      ranklist: [
        {
          text: '国保',
          value: '14da5819da904c4ab1d9d94a961ca27a',
        },
        {
          text: '省保',
          value: 'cef2a80fbea6df89578ad5599b67b71f',
        },
        {
          text: '市保',
          value: '2bf3be523de944ec3ee1ad832a7a2587',
        },
        {
          text: '市保点',
          value: 'b16db07f34112b9b0fc6d2b54214e0aa',
        },
        {
          text: '一般文物',
          value: 'ac38ee765b5e5155b8bb3eadc1b5aa8d',
        },
      ],
      jd: null,
      dataTree: [],
      searchValue: null,
      zjflag: false,
      topFlag: false,
      total: null,
      scrollTop: 0,
      currentPage: 1,
      pageSize: 80,
      title: '文物导览',
      publicityList: [],
      show: null,
      //埋点01 相关数据
      browseTime: 0, // 增长时长
      clearTimeSet: null, //定时器
      t0: 0,
      t2: 0,
      //埋点01结束 相关数据
    };
  },
  onLoad() {
    //字体本地存储
    this.baseFontTitle = uni.getStorageSync('baseFontTitle');
    this.baseFontContent = uni.getStorageSync('baseFontContent');
    this.baseFontTime = uni.getStorageSync('baseFontTime');
    this.getWenbaodianList();
    this.getZhenJie();
    if (uni.getStorageSync('version') == 'new') {
      this.show = 'block';
    } else if (uni.getStorageSync('version') == 'old') {
      this.show = 'none';
    }
    this.t2 = (Date.now() - this.browseTime) / 1000.0;
    var that = this;
    clearInterval(that.clearTimeSet); // 离开页面后清除定时器
    zwlog.onReady(function () {
      //sendPV，上报一个日志，它接收一个⾃定义 PV 参数 key-value 键值对（只能是这种平铺的json，不能做多层嵌套）
      zwlog.sendPV({
        miniAppId: '2002282040',
        miniAppName: '永兴护保',
        pageId: 'guid-list',
        pageName: '文物导览列表',
        t2: that.t2,
        t0: that.t0,
        log_status: '02',
      });
    });
    //埋点04
  },
  //埋点02  埋点相关代码开始
  created() {
    this.setTime();
  },
  //埋点02
  mounted() {
    //埋点03
    this.t0 = (Date.now() - this.browseTime) / 1000.0;
    //埋点03
  },
  onPageScroll(e) {
    //根据距离顶部距离是否显示回到顶部按钮
    if (e.scrollTop > 1000) {
      //当距离大于1000时显示回到顶部按钮
      this.topFlag = true;
      this.scrollTop = e.scrollTop;
    } else {
      this.topFlag = false;
    }
  },
  onReachBottom() {
    if (this.currentPage * this.pageSize < this.total) {
      this.currentPage += 1;
      this.getWenbaodianList();
    } else {
      uni.showToast({
        title: '没有更多了！',
        icon: 'error',
      });
    }
  },
  methods: {
    //埋点05
    setTime() {
      this.browseTime = Date.now();
    },
    //埋点05
    format_rank(val) {
      for (var i = 0; i < this.ranklist.length; i++) {
        if (this.ranklist[i].value == val) {
          return this.ranklist[i].text;
        }
      }
      return '暂未评定';
    },
    select(type) {
      this.jd = type;
      if (this.jd == 'all') {
        this.jd = "进化镇";
        this.rank = null;
        this.publicityList = [];
        this.getWenbaodianList();
      } else {
        this.publicityList = [];
        this.getWenbaodianList();
      }
    },
    selectrank(rank) {
      this.rank = rank;
      this.publicityList = [];
      this.getWenbaodianList();
    },
    change(e) {},
    // 获取镇街
    getZhenJie() {
      getSszj().then((res) => {
        this.zjflag = true;
        this.range = res.data;
        this.dataTree = res.data.map((item) => {
          return {
            text: item.name,
            value: item.id,
          };
        });
      });
    },
    cancel() {
      this.publicityList = [];
      this.getWenbaodianList();
    },
    async search() {
      this.publicityList = [];
      this.getWenbaodianList();
    },
    // 返回顶部
    toTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 100,
      });
    },
    // 获取文保点
    async getWenbaodianList() {
      var jd="";
      if(this.jd==""||this.jd==null){
        jd="进化镇"
      }else{
        jd=this.jd;
      }
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        publishName: this.searchValue,
        jd: jd,
        rank: this.rank,
      };
      const res = await getWenbaodianList(params);
      this.total = res.data.total;




      var offset_res =[];
      
      var allow_ids = [10, 11, 12, 2, 21, 22, 26, 4, 43, 45, 5, 8, 38, 55];
      for (var i = 0; i < res.data.list.length; i++) {
        if (allow_ids.indexOf(parseInt(res.data.list[i].id))>-1) {
          offset_res.push(res.data.list[i]);
        }

       
      }


      console.log("offset_res1",offset_res);


      for(var i=0;i<offset_res.length;i++){
        if(offset_res[i].id=="10"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/1e5b7bdc-1b87-4648-bb81-ba9ee5ed9b90.jpg';
        }else  if(offset_res[i].id=="11"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/69c169ae-0ae0-40ef-b881-7c8453ddae6a.jpg';

        }else  if(offset_res[i].id=="12"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/6555da92-c5fe-472c-b4af-5d21f115bff9.jpg';
        }else  if(offset_res[i].id=="2"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/76bda0d1-3ed0-49f1-9606-be107600cbc3.jpg';
        }else  if(offset_res[i].id=="21"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/40a60581-018c-44f1-9c57-70f5d019dae3.jpg';

        }else  if(offset_res[i].id=="22"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/9b7e2370-f39e-4a4b-b48a-45dd33d66c96.jpg';
        }else  if(offset_res[i].id=="26"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/8d88a7a8-7ed6-4fdd-99cd-26f947020518.jpg';
        }else  if(offset_res[i].id=="4"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ca6d61d1-5e8e-40f7-a322-9043b37fdd33.jpg';
        }else  if(offset_res[i].id=="43"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/25c3afdc-f821-4951-abf1-9c9be164bce4.jpg';
        }else  if(offset_res[i].id=="45"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/f9f52bc2-006a-4031-ba43-10ed4af79480.jpg';
        }else  if(offset_res[i].id=="5"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/c38d5930-c229-4ebc-8531-fa5069687f0c.jpg';
        }else  if(offset_res[i].id=="8"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a92cfee0-eeb7-4760-bb1e-fcafd2cec1b0.jpg';
        }else  if(offset_res[i].id=="38"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/a85f351e-24bd-4acd-b7ad-d96158241e7e.jpg';
        }else  if(offset_res[i].id=="55"){
          offset_res[i].img = 'https://cultural-app.xiaoshan.gov.cn:8888/admin/cmd/v1/storage/view1/ba0c132a-ca07-4c7d-ab14-445df838f441.jpg';
        }
      }


      console.log("offset_res2",offset_res);

      this.publicityList = this.publicityList.concat(offset_res);
    },
    clickDetail(item) {
      uni.navigateTo({
        url: `./detail?item=${JSON.stringify(item)}&scrollTop=${this.scrollTop}`,
      });
    },
    leftClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>
<style lang="scss">
.emptyHolder {
  text-align: center;
  padding-top: 90rpx;
  color: #666;
}
.emptyOldHolder {
  text-align: center;
  padding-top: 90rpx;
  color: #666;
  font-size: 40rpx;
}
.showblock {
  display: block;
}

.shownone {
  display: none;
}

.diqutext {
  font-size: var(--baseFontContent) !important;
}

.search-co {
  margin-bottom: 50rpx;
}

.diqu {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  margin-top: 20rpx;

  .tag {
    height: 50rpx;
    line-height: 50rpx;
    padding: 0rpx 20rpx !important;
    margin-right: 18rpx;
    display: inline-block;
    white-space: nowrap;
    color: #333;
    border: none;
    // font-size: 28rpx;
    font-size: var(--baseFontContent) !important;

    background-color: #fff;
    border: 1rpx solid rgba(0, 0, 0, 0.05) !important;
  }

  .tagall {
    background-image: linear-gradient(90deg, #50a3ff 0%, #0b8cf4 100%);
    box-shadow: 0px 2rpx 6rpx 0px rgba(51, 153, 245, 0.4);
    border-radius: 30rpx;
    color: #fff;
    border: none !important;
    // font-size: 28rpx;
    font-size: var(--baseFontContent) !important;
  }
}

.diqu1 {
  height: 30rpx;
  padding-bottom: 60rpx;
  overflow: hidden;
  margin-bottom: 20rpx;
  margin-top: 10rpx;
}

::v-deep .uni-searchbar {
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 27.5px;
}

::v-deep .uni-searchbar__box {
  background: none !important;
}

::v-deep .uni-icons {
  font-size: 22px !important;
  color: #5680fa !important;
}

.biaoti {
  display: flex;
  justify-content: space-between;
  // font-size: 36rpx;
  font-size: var(--baseFontTitle) !important;
  margin-bottom: 8rpx;

  // font-weight: 600;
  .btitle {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 58%;
  }

  ::v-deep .uni-tag {
    padding: 4rpx 10rpx;
  }
}

.dizi {
  font-size: 28rpx;

  overflow: hidden;
  /*文字超出用省略号*/
  text-overflow: ellipsis;
  /*盒子模型*/
  display: -webkit-box;
  /*显示的文本行数,3行*/
  -webkit-line-clamp: 1;
  /*子元素的垂直排列方式*/
  -webkit-box-orient: vertical;
  color: #666;
  margin-bottom: 6rpx;
}

.xia {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 50rpx 0px;
  align-items: center;

  .left {
    flex: 1;
    box-sizing: border-box;
    padding-right: 20rpx;
    width: 170rpx !important;
    height: 160rpx !important;

    .wenzi {
      color: #999;
      overflow: hidden;
      /*文字超出用省略号*/
      text-overflow: ellipsis;
      /*盒子模型*/
      display: -webkit-box;
      /*显示的文本行数,3行*/
      -webkit-line-clamp: 2;
      /*子元素的垂直排列方式*/
      -webkit-box-orient: vertical;
      font-size: 24rpx;
      line-height: normal;
    }
  }

  .right {
    image {
      width: 185rpx !important;
      height: 190rpx !important;
      border-radius: 19rpx;
      margin-right: 18rpx;
    }
  }
}

.btn {
  position: fixed;
  z-index: 9999;
  right: 32rpx;
  bottom: 100px;
  padding: 5px;
  display: none;
  border-radius: 4px;

  image {
    width: 60rpx;
    height: 60rpx;
  }
}

.oldcontainer {
  ::v-deep .uni-searchbar__box-search-input {
    font-size: 36rpx;
  }

  .diqu {
    font-size: 42rpx;

    .tag {
      font-size: 42rpx !important;
      padding: 10rpx 20rpx !important;
    }

    .tagall {
      font-size: 42rpx !important;
      padding: 10rpx 20rpx !important;
    }
  }

  .diqu1 {
    height: 30rpx;
    padding-bottom: 60rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    margin-top: 10rpx;
  }

  .xia {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 50rpx 0px;
    align-items: center;

    .left {
      flex: 1;
      box-sizing: border-box;
      padding-right: 20rpx;
      width: 170rpx !important;
      height: 160rpx !important;

      .biaoti {
        display: flex;
        justify-content: space-between;
        font-size: 56rpx;
        margin-bottom: 8rpx;

        // font-weight: 600;
        .btitle {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
          font-size: 1.25rem;
        }

        .wwdtype {
          margin-top: -20rpx;
        }

        ::v-deep .uni-tag {
          padding: 4rpx 10rpx;
          font-size: 32rpx !important;
        }
      }

      .dizi {
        font-size: 42rpx;

        overflow: hidden;
        /*文字超出用省略号*/
        text-overflow: ellipsis;
        /*盒子模型*/
        display: -webkit-box;
        /*显示的文本行数,3行*/
        -webkit-line-clamp: 1;
        /*子元素的垂直排列方式*/
        -webkit-box-orient: vertical;
        color: #666;
        margin-bottom: 6rpx;
      }

      .wenzi {
        color: #999;
        overflow: hidden;
        /*文字超出用省略号*/
        text-overflow: ellipsis;
        /*盒子模型*/
        display: -webkit-box;
        /*显示的文本行数,3行*/
        -webkit-line-clamp: 2;
        /*子元素的垂直排列方式*/
        -webkit-box-orient: vertical;
        font-size: 36rpx;
        line-height: normal;
      }
    }

    .right {
      image {
        width: 185rpx !important;
        height: 190rpx !important;
        border-radius: 19rpx;
        margin-right: 18rpx;
      }
    }
  }
}
</style>
