<template>
  <view class="container" :class="show=='block' ? 'showblock' : 'shownone'">
    <view class="top1">
      <view class="top">
        <view class="item" :class="current == index ? 'active' : ''" v-for="(item,index) in items"
          @click="clickItem(item,index)">
          <text>{{item}}</text>
          <view class="dian"></view>
        </view>
      </view>
    </view>
    <view class="list" v-if="title == '安全整改'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            整改单位:{{item.publishName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待整改" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '一网统管'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.title}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bump_point}}
          </view>
          <view class="card3">
            <view class="">
              {{item.create_time.substring(0,10)}}
            </view>

            <view>
              <uni-tag :text="item.handle_dept" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '文物定级'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">

          <view class="card1">
            <text class="title">文保单位:{{item.publishName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保地址:{{item.address}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view class="">
              <uni-tag text="待定级" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '信访事件'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '例行检查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.pointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '上级督查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view class="">
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '专项检查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '文物体检'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.publishName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待体检" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '隐患处理'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.bumpPointName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="18" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)	}}
            </view>
            <view>
              <uni-tag text="待处理" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>

    <tabbar :current="1" v-if="show == 'block'"></tabbar>
    <tabbarsold :current="1" v-if="show != 'block'"></tabbarsold>
  </view>

  <view class="container oldcontainer" :class="show!='block' ? 'showblock' : 'shownone'">
    <view class="top1">
      <view class="top">
        <view class="item" :class="current == index ? 'active' : ''" v-for="(item,index) in items"
          @click="clickItem(item,index)">
          <text>{{item}}</text>
          <view class="dian"></view>
        </view>
      </view>
    </view>
    <view class="list" v-if="title == '安全整改'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            整改单位:{{item.publishName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待整改" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '一网统管'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.title}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bump_point}}
          </view>
          <view class="card3">
            <view class="">
              {{item.create_time.substring(0,10)}}
            </view>

            <view>
              <uni-tag :text="item.handle_dept" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '文物定级'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">

          <view class="card1">
            <text class="title">文保单位:{{item.publishName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保地址:{{item.address}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view class="">
              <uni-tag text="待定级" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '信访事件'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '例行检查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.pointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '上级督查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view class="">
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '专项检查'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.checkName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
            文保单位:{{item.bumpPointName}}
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待检查" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '文物体检'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.publishName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card2">
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)}}
            </view>
            <view>
              <uni-tag text="待体检" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>
    <view class="list" v-if="title == '隐患处理'">
      <view class="" v-if="list.length>0">
        <uni-card v-for="item in list" @click="clickDetail(item)">
          <view class="card1">
            <text class="title">{{item.bumpPointName}}</text>
            <text class="link">
              <uni-icons type="right" color="#8E8E93" size="28" class="icon"></uni-icons>
            </text>
          </view>
          <view class="card3">
            <view class="">
              {{item.deadLine.substring(0,10)	}}
            </view>
            <view>
              <uni-tag text="待处理" class="tag" />
            </view>
          </view>

        </uni-card>
      </view>
      <view class="" v-else style="text-align: center;margin-top: 100px;">
        暂无内容
      </view>
    </view>

    <tabbar :current="1" v-if="show == 'block'"></tabbar>
    <tabbarsold :current="1" v-if="show != 'block'"></tabbarsold>
  </view>

</template>

<script>
import {
  routinechecklist, //例行检查
  getSafeList, //安全整改  巡查员
  getZJSafeList, //镇街安全整改
  getDaiDingJiList, //文物定级
  getZjXinfangDJBList, //镇街信访待交办
  getXinFangXCYNoCheckList, //巡查员信访待检查
  getZjDuChaList, //镇街上级督查待交办
  getSJXCYNoCheckList, //巡查员上级督查待检查
  getSspecialCheckList, //镇街专项检查待交办
  toBeAssignedXcyList, //巡查员专项检查待检查
  getHandelHiddenTroubleList, //隐患处理
  getWenWuCheckList,
  getAllMassage,
} from "@/api/api.js";
import tabbar from "@/components/tabbar/tabbar.vue";
import tabbarsold from "@/components/tabbar/tabbarold.vue";
export default {
  components: {
    tabbar,
    tabbarsold,
  },
  data() {
    return {
      title: null,
      current: 0,
      role: null,
      currentPage: 1,
      pageSize: 20,
      list: [],
      items: [],
      show: null,
    };
  },
  onShow() {
    if (uni.getStorageSync("version") == "new") {
      this.show = "block";
    } else if (uni.getStorageSync("version") == "old") {
      this.show = "none";
    }
  },
  onLoad() {
    uni.hideTabBar({});
    this.role = uni.getStorageSync("role");

    if (this.role == "党员") {
      this.title = "例行检查";
      this.items = ["例行检查"];
      this.getRoutineCheckList();
    }
    if (this.role == "志愿者") {
      this.title = "例行检查";
      this.items = ["例行检查"];
      this.getRoutineCheckList();
    }
    if (this.role == "第三方公司" || this.role == "专家小组") {
      this.title = "文物定级";
      this.items = ["文物定级", "文物体检"];
      this.getDaiDingJiList();
    }
    if (this.role == "文物护保员") {
      this.title = "安全整改";
      this.items = [
        "安全整改",
        "例行检查",
        "专项检查",
        "信访事件",
        "上级督查",
        "一网统管",
      ];
      this.getSafeList();
    }
    if (this.role == "镇街") {
      this.title = "文物定级";
      this.items = [
        "文物定级",
        "安全整改",
        "专项检查",
        "文物体检",
        "隐患处理",
        "信访事件",
        "上级督查",
        "一网统管",
      ];
      this.getDaiDingJiList();
    }
  },
  mounted() {
    window.ZWJSBridge.monitorTrace({
      monitorType: "pageIn",
      module: "todo-index",
      bizInfo: {},
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // 隐患处理
    async getHandelHiddenTroubleList() {
      this.list = [];
      let params = {
        bumpPointName: "",
        businessKeyList: [],
        currentPage: 1,
        flag: 0,
        isDev: true,
        pageSize: 20,
        reportUserId: "",
        roleId: "",
        userId: "",
        userIdArr: [],
      };
      const res = await getHandelHiddenTroubleList(params);
      this.list = res.data.list;
    },

    // 镇街待交办列表 专项检查
    async getSspecialCheckList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
      };
      const res = await getSspecialCheckList(params);

      this.list = res.data.list;
    },
    // 巡查员待检查 专项检查
    async toBeAssignedXcyList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
      };
      const res = await toBeAssignedXcyList(params);
      this.list = res.data.list;
    },
    // 上级督查待交办列表 镇街
    async getZjDuChaList() {
      this.list = [];
      let params = {
        businessKeyList: [],
        currentPage: 1,
        flag: 0,
        id: "",
        isDev: true,
        pageSize: 20,
        roleId: "",
        status: "",
        userId: "",
      };
      const res = await getZjDuChaList(params);
      this.list = res.data.list;
    },

    // 上级督查 巡查员待检查列表
    async getSJXCYNoCheckList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
      };
      const res = await getSJXCYNoCheckList(params);
      this.list = res.data.list;
    },
    // 镇街信访带交办
    async getZjXinfangDJBList() {
      this.list = [];
      let params = {
        businessKeyList: [],
        currentPage: 1,
        flag: 0,
        id: "",
        isDev: true,
        pageSize: 20,
        roleId: "",
        status: "",
        userId: "",
      };
      const res = await getZjXinfangDJBList(params);
      this.list = res.data.list;
    },
    // 信访巡查员待检查
    async getXinFangXCYNoCheckList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
      };
      const res = await getXinFangXCYNoCheckList(params);
      this.list = res.data.list;
    },

    // 巡查员安全整改
    async getSafeList() {
      this.list = [];
      let params = {
        currentPage: 1,
        id: "",
        isDev: true,
        pageSize: 20,
        roleId: "",
        status: "1",
        userId: "",
      };
      const res = await getSafeList(params);
      this.list = res.data.list;
    },

    // 例行检查
    async getRoutineCheckList() {
      this.list = [];
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        id: "",
      };
      const res = await routinechecklist(params);
      this.list = res.data.list.filter((item) => {
        return item.checkStatus == "待检查";
      });
    },
    // 一网统管
    async getAllMassage() {
      this.list = [];
      const res = await getAllMassage();
      this.list = res.data;
    },
    // 文物体检
    async getWenWuCheckList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
      };
      const res = await getWenWuCheckList(params);

      this.list = res.data.list;
    },
    // 镇街安全整改
    async getZJSafeList() {
      this.list = [];
      let params = {
        currentPage: 1,
        pageSize: 20,
        id: "",
        isDev: true,
        roleId: "",
        sort: "",
        status: "1",
        userId: "",
      };
      const res = await getZJSafeList(params);
      this.list = res.data.list;
    },

    // 文物定级
    async getDaiDingJiList() {
      this.list = [];
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      const res = await getDaiDingJiList(params);
      this.list = res.data.list;
    },
    clickDetail(item) {
      if (this.title == "例行检查") {
        uni.navigateTo({
          url: "/pages/routinecheck/djcdetail?obj=" + JSON.stringify(item),
        });
      }
      
    },

    clickItem(item, index) {
      this.current = index;
      this.title = item;
      this.list = [];
      if (item == "例行检查") {
        this.getRoutineCheckList();
      }
      if (item == "文物定级") {
        this.getDaiDingJiList();
      }
      if (item == "文物体检") {
        this.getWenWuCheckList();
      }
      if (item == "安全整改") {
        if (this.role == "镇街") {
          this.getZJSafeList();
        }
        if (this.role == "文物护保员") {
          this.getSafeList();
        }
      }
      if (item == "专项检查") {
        if (this.role == "镇街") {
          this.getSspecialCheckList();
        }
        if (this.role == "文物护保员") {
          this.toBeAssignedXcyList();
        }
      }
  
      if (item == "隐患处理") {
        this.getHandelHiddenTroubleList();
      }

      if (item == "一网统管") {
        this.getAllMassage();
      }
    },
  },
};
</script>

<style lang="scss">
.showblock {
  display: block;
}

.shownone {
  display: none;
}

.top1 {
  height: 60rpx;
  padding-bottom: 40rpx;
  overflow: hidden;
  .top {
    display: flex;
    overflow-x: auto;
    align-items: center;
    height: 100rpx;
    padding-bottom: 40rpx;
    .item {
      flex: none;
      padding: 0 20rpx;
      text-align: center;
      min-width: 160rpx;
      height: 84rpx;
      line-height: 84rpx;
      position: relative;
      font-size: 36rpx;
      border: 1rpx solid rgba(221, 221, 221, 1);
      border-right: none;
      box-sizing: border-box;
    }
    .item:last-child {
      border-right: 1rpx solid rgba(221, 221, 221, 1);
    }
    .active {
      color: #108ee9;
      text {
        border-bottom: 8rpx solid #108ee9;
        height: 92%;
        display: inline-block;
      }
      .dian {
        position: absolute;
        top: 5rpx;
        right: 5rpx;
        width: 14rpx;
        height: 14rpx;
        border-radius: 50%;
        background: #108ee9;
      }
    }
  }
}
.list {
  font-size: 30rpx;
  color: #203152;
  margin-bottom: 80px;
  .card1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rpx;
    .title {
      font-size: 36rpx;
      color: #203152;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .card2 {
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
    padding-bottom: 10rpx;
    margin-bottom: 20rpx;
  }

  .card3 {
    display: flex;
    justify-content: space-between;
  }
}

.tag {
  background: #d9a572 !important;
  border-radius: 15px !important;
  width: 76px;
  height: 30px;
}

::v-deep .uni-card {
  background: #ffffff !important;
  border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
  border-radius: 10px !important;
  margin: 0 !important;
  padding: 0;
  margin-top: 40rpx !important;
}

.oldcontainer {
  .top1 {
    height: 60rpx;
    padding-bottom: 40rpx;
    overflow: hidden;
    .top {
      display: flex;
      overflow-x: auto;
      align-items: center;
      height: 100rpx;
      padding-bottom: 40rpx;
      .item {
        flex: none;
        padding: 0 30rpx;
        text-align: center;
        min-width: 160rpx;
        height: 84rpx;
        line-height: 84rpx;
        position: relative;
        font-size: 40rpx;
        border: 1rpx solid rgba(221, 221, 221, 1);
        border-right: none;
      }
      .item:last-child {
        border-right: 1rpx solid rgba(221, 221, 221, 1);
      }
      .active {
        color: #108ee9;

        .dian {
          position: absolute;
          top: 5rpx;
          right: 5rpx;
          width: 14rpx;
          height: 14rpx;
          border-radius: 50%;
          background: #108ee9;
        }
      }
    }
  }
  .list {
    font-size: 30rpx;
    color: #203152;
    margin-bottom: 80px;;
    .card1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;
      .title {
        font-size: 48rpx;
        color: #203152;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .card2 {
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
      padding-bottom: 10rpx;
      margin-bottom: 20rpx;
      font-size: 42rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .card3 {
      display: flex;
      justify-content: space-between;
      font-size: 36rpx;
      .tag {
        background: #d9a572 !important;
        border-radius: 15px !important;
        width: 76px;
        height: 30px;
        font-size: 36rpx !important;
      }
    }
  }

  ::v-deep .uni-card {
    background: #ffffff !important;
    border: 0.5px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05) !important;
    border-radius: 10px !important;
    margin: 0 !important;
    padding: 0;
    margin-top: 40rpx !important;
  }
}
</style>
