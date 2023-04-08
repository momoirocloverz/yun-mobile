<template>
    <view>
        <view class="contentCon">
            <view class="contentCon-item" @click="jumpTo(   )">
                <image src="/static/images/img2@2x.png"></image>
                <view class="item-right">
                    <view>
                        培训1
                    </view>
                    <view class="item-num">
                        <span>11/20</span>
                        <view class="sign-btn">已报名</view>
                    </view>
                </view>
            </view>
            <!-- <view class="itemCon" v-if="dataList && dataList.length">
                <view v-for="(item, index) in dataList" :key="item.id">
                    {{ item.title }}
                </view>
            </view>
            <view class="emptyCon" v-else>
                <view class="emptyInner">
                    <image :src="emptyImage" mode="widthFix" class="emptyImg" />
                    <view class="emptyText">暂无数据</view>
                </view>
            </view> -->
        </view>
    </view>
</template>
<script>
import { trainingList } from '@/api/api.js';
export default {
    data() {
        return {
            emptyImage: '/static/images/img2@2x.png',
            queryParams: {
                currentPage: 1,
                pageSize: 10
            },
            total: 0,
            dataList: []
        }
    },
    onLoad() {
        this.initListData();
    },
    // onPullDownRefresh() {
    //     this.dataList = [];
    //     this.queryParams.page = 1;
    //     this.initListData(this.itemsList[this.current].id)  //在哪个tab就刷新哪个
    //     setTimeout(function () {
    //         uni.stopPullDownRefresh();
    //     }, 1000);
    // },
    // onReachBottom() {
    //     if (this.queryParams.page * this.queryParams.size < this.total) {
    //         this.queryParams.page += 1;
    //         this.initListData(this.itemsList[this.current].id)  //在哪个tab就加载哪个
    //     } else {
    //         uni.showToast({
    //             title: '没有更多了！',
    //             icon: 'error',
    //         });
    //     }
    // },
    methods: {
        async initListData() {
            const { data } = await trainingList(this.queryParams);
            // this.dataList = data.records
            // this.total = data.total
        },
        jumpTo(id) {
            uni.navigateTo({
                url: `/pages/trainingCheck/train/detail`,
            });
        }
    },
}
</script>
<style lang = "scss" scoped >
.contentCon {
    padding: 32rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 100%;
    overflow-y: scroll;

    .contentCon-item {
        width: 100%;
        height: 200rpx;
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        background-color: #fff;

        image {
            width: 260rpx;
            height: 100%;
        }
        .item-right{
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 20rpx;
            .item-num{
                font-size: 20rpx;
                display: flex;
                justify-content: space-between;
                .sign-btn{
                    background-color: #f5f5f5;
                    color: #999;
                    padding: 10rpx 20rpx;
                }
            }
        }
    }

    .itemCon {
        background-color: #fff;
        position: relative;
        box-sizing: border-box;
        margin-bottom: 32rpx;
        border: 1rpx solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 3rpx 8rpx 0 rgba(0, 0, 0, 0.05);
        border-radius: 16rpx;
        overflow: hidden;
        padding: 32rpx;
    }
}

.emptyCon {
    display: flex;
    justify-content: center;
    padding-top: 200rpx;
    box-sizing: border-box;

    .emptyImg {
        width: 600rpx;
    }

    .emptyText {
        font-family: PingFang-SC-Medium;
        font-size: 28rpx;
        color: #c2c2c2;
        text-align: center;
        font-weight: 500;
        margin-top: -100rpx;
    }
}
</style >