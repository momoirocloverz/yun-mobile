<template>
    <view class="detail-wrapper">
        <view class="title">
            {{ title }}
        </view>
        <view>
            {{ content }}
        </view>
        <view class="btnsCon">
            <button type="default" class="cancelBtn" @click="deleteBtn">删除</button>
            <button class="confirmBtn" @click="goBack" type="primary">返回</button>
        </view>
    </view>
</template>
<script>
import { readCulturalMsg, deleteCulturalMsg } from '@/api/api.js';
export default {
    data() {
        return {
        }
    },
    onLoad(query) {
        if (query) {
            this.title = query.title
            this.content = query.content
            this.id = query.id
            this.initData(query.id)
        }
    },
    methods: {
        async initData(id) {
            const { data } = await readCulturalMsg({ id: id });
            // this.dataView = data
        },
        // 新增学习记录
        deleteBtn() {
            uni.showModal({
                content: "是否确认删除此条消息？",
                confirmText: "确定",
                cancelText: "取消",
                success: async (res) => {
                    if (res.confirm) {
                        const { code } = await deleteCulturalMsg({ id: this.id });
                        // if (code === 0) {
                        //     this.goBack()
                        //     uni.showToast({
                        //         title: "已删除"
                        //     })
                        // }
                    }
                }
            })
        },
        goBack() {
            uni.navigateBack()
        },
    }
}
</script>


<style lang = "scss" scoped>
.detail-wrapper {
    padding: 32rpx;

    .title {
        text-align: center;
        font-size: 36rpx;
        margin-bottom: 30rpx;
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
}
</style>