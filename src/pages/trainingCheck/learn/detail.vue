<template>
    <view class="detail-wrapper">
        <view class="title">
            {{ dataView.title }}
        </view>
        <view>
            {{ dataView.content }}
        </view>
    </view>
</template>
<script>
import { getKnowledgeDetail, logLearningRead } from '@/api/api.js';
export default {
    data() {
        return {
            dataView: {}
        }
    },
    onLoad(query) {
        if (query.id) {
            this.initData(query.id)
            this.AddLearningRecord(query.id)
        }
    },
    methods: {
        async initData(id) {
            const { data } = await getKnowledgeDetail({ knowledgeId: id });
            this.dataView = data
        },
        // 新增学习记录
        AddLearningRecord(id) {
            logLearningRead({ knowledgeId: id }).then(res => {

            })
        }
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
}
</style>