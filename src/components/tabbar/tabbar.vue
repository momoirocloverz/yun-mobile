
<template>
  <view class="TabBar">
    <view
      class="tab"
      v-for="(item,index) in TabBarList"
      :key="index"
      @tap="navigatorTo(item.url)"
    >
      <!-- 判断是否有点击，如果没有就不是激活样式，点击就是激活的样式 -->
      <image
        class="imgsize"
        v-if="item.type == 0"
        :src="current == index ? item.selectIcon : item.icon"
        mode="widthFix"
      ></image>
      <!-- 设置一个状态值（type），判断加号是否展示 -->
      <image
        class="addimgsize"
        v-if="item.type == 1"
        :src="item.icon"
        mode="widthFix"
      ></image>
      <view :class="current == index ?'active':'text'">{{item.name}}</view>
    </view>
  </view>
</template>
 
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0, //默认第一个页面tabbar激活
    },
  },
  data() {
    return {
      TabBarList: [
        {
          type: 0,
          icon: '/static/tabbarimg/icon_workspace.png',
          selectIcon: '/static/tabbarimg/icon_workspace_active.png',
          name: '首页',
          // url: '/pages/index/index',
          url: '/pages/newIndex/index',
        },
        {
          type: 0,
          icon: '/static/tabbarimg/icon_todo.png',
          selectIcon: '/static/tabbarimg/icon_todo_active.png',
          name: '待办',
          url: '/pages/todo/index',
        },
        {
          type: 0,
          icon: '/static/tabbarimg/icon_self.png',
          selectIcon: '/static/tabbarimg/icon_self_active.png',
          name: '我的',
          url: '/pages/self/index',
        },
      ],
    }
  },
  methods: {
    navigatorTo(e) {
      console.log(this.current)
      // uni.switchTab({
      //   url: e,
      // })
      uni.navigateTo({
        url: e,
      })
    },
  },
}
</script>



<style scoped>
.TabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  /* background: url('/static/image/tabbar.svg') no-repeat; */
  background-size: 750rpx 88rpx;
  width: 100%;

  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  height: 70px;
  border-top: 1px solid #ccc;
}
.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.imgsize {
  width: 42rpx;
  height: 42rpx;
}
.addimgsize {
  width: 98rpx;
  height: 98rpx;
  margin-top: -30rpx;
}
.text {
  margin-top: 10rpx;
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bfc4c8ff;
  line-height: 20rpx;
}
.active {
  margin-top: 10rpx;
  font-size: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #609eff;
  line-height: 20rpx;
}
</style>
