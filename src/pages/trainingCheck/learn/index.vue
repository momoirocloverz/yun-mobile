<template>
    <view>
        <view class="switchCon">
            <uni-segmented-control :current="current" :values="items" styleType="text" @clickItem="onClickItem"
                :activeColor="'#1677FF'" />
        </view>
        <view class="contentCon">
            <view v-if="dataList && dataList.length">
                <view class="itemCon" v-for="(item, index) in dataList" :key="item.id" @click="jumpTo(item.id)">
                    {{ item.title }}
                </view>
            </view>
            <view class="emptyCon" v-else>
                <view class="emptyInner">
                    <image :src="emptyImage" mode="widthFix" class="emptyImg" />
                    <view class="emptyText">暂无数据</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getKnowledgeChannelList, getKnowledgeList } from '@/api/api.js';
export default {
    data() {
        return {
            emptyImage: '/static/images/img2@2x.png',
            queryParams: {
                currentPage: 1,
                pageSize: 10
            },
            current: 0,
            total: 0,
            items: [],
            itemsList: [], //用来存整个tab数组 后来要取id
            dataList: []
        }
    },
    onLoad() {
        this.initTabData();
    },
    onPullDownRefresh() {
        this.dataList = [];
        this.queryParams.currentPage = 1;
        this.initListData(this.itemsList[this.current].id)  //在哪个tab就刷新哪个
        setTimeout(function () {
            uni.stopPullDownRefresh();
        }, 1000);
    },
    onReachBottom() {
        if (this.queryParams.currentPage * this.queryParams.pageSize < this.total) {
            this.queryParams.currentPage += 1;
            this.initListData(this.itemsList[this.current].id)  //在哪个tab就加载哪个
        } else {
            uni.showToast({
                title: '没有更多了！',
                icon: 'error',
            });
        }
    },
    methods: {
        async initTabData() {
            const { data } = await getKnowledgeChannelList();
            this.items = data.map(item => {
                return item.title
            })
            this.itemsList = data
            this.initListData(data[0]?.id)
        },
        async initListData(id) {
            const { data } = await getKnowledgeList({ ...this.queryParams, knowledgeChannelId: id });
            this.dataList = this.dataList.concat(data.records);
            this.total = data.total
        },
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
                this.currentPage = 1;
                this.dataList = [];
                this.total = 0;
                this.initListData(this.itemsList[e.currentIndex].id);
            }
        },
        jumpTo(id) {
            uni.navigateTo({
                url: `/pages/trainingCheck/learn/detail?id=${id}`,
            });
        }
    },
}
</script>
<style lang = "scss" scoped >
.switchCon {
    position: fixed;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
}

.contentCon {
    margin-top: 42px;
    padding: 32rpx;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    width: 100%;
    overflow-y: scroll;

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