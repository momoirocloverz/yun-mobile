import exp from 'constants';
import http from '../utils/method.js';
import baseUrl from '../utils/request.js';
import uploadUrl from '../utils/request.js';
import sendUploadFile from '@/utils/request.js';
// get,post对应的请求头是{'content-type': 'application/json'},
// getForm,postForm对应的请求头是{'content-type': 'application/x-www-form-urlencoded'},
// 根据接口需求选用合适的请求方式

// 登录
export function postLogin(params) {
    return http.post({
        url: 'admin/cmd/v1/auth/loginApp',
        params,
        isLoading: true,
    });
}

export function authx(params) {
    return http.get({
        url: 'cultural/authx',
        params,
        isLoading: true,
    });
}

export function authx_wechat(params) {
    return http.get({
        url: 'cultural/authx_wechat',
        params,
        isLoading: true,
    });
}

export function wechat_userinfo(params) {
    return http.get({
        url: 'cultural/wechat_userinfo',
        params,
        isLoading: true,
    });
}

// 定级总列表

export function getAllDingJiList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/listAppAllPage',
        params,
        isLoading: true,
    });
}

// 待定级列表

export function getDaiDingJiList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/listDdj/app',
        params,
        isLoading: true,
    });
}

// 已定级列表

export function getYiDingJiList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/listYdj/app',
        params,
        isLoading: true,
    });
}

// 待定级和已定级详情
export function getDingjiInfo(params) {
    return http.post({
        url: `cultural/cmd/v1/cultural/task/ddjDetail/app`,
        params,
        isLoading: true,
    });
}

// 获取评级勾选
export function getPingjiOptions(params) {
    return http.post({
        url: `cultural/cmd/v1/cultural/task/getRatingItems`,
        params,
        isLoading: true,
    });
}

// 文物定级待定级提交定级结果

export function postPingJi(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/submitDdj/app',
        params,
        isLoading: true,
    });
}

// 已定级分数值

export function getYDJScore(params) {
    return http.post({
        url: `cultural/cmd/v1/cultural/task/queryScoreInfoVO`,
        params,
        isLoading: true,
    });
}

// 体检总列表

export function getWenWuCheckAllList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/physical/listAppAllPage',
        params,
        isLoading: true,
    });
}
// 文物待体检列表
export function getWenWuCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/physical/physical/app',
        params,
        isLoading: true,
    });
}
// 文物已体检列表
export function getWenWuYiCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/physical/physicalDoing/app',
        params,
        isLoading: true,
    });
}

// 文物体检详情
export function getTiJianInfo(params) {
    return http.post({
        url: `cultural/cmd/v1/cultural/physical/physicalDetailApp`,
        params,
        isLoading: true,
    });
}

// 文物体检提交

export function postWenWuTiJiao(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/physical/physicalUploadApp',
        params,
        isLoading: true,
    });
}

// 体检提交详情
export function getSentTiJianInfo(params) {
    return http.post({
        url: `cultural/cmd/v1/cultural/physical/physicalDetailApp`,
        params,
        isLoading: true,
    });
}

// 文保资金列表

export function getWenBaoMoneyList(params) {
    return http.post({
        url: 'cultural/cmd/v1/fundApplication/list',
        params,
        isLoading: true,
    });
}

// 获取文保点列表

export function getWenbaodianList(params) {
    return http.post({
        url: 'cultural/cmd/v1/controlscreen/wbdList',
        params,
        isLoading: true,
    });
}

// 获取文物列表

export function getWenwuList(params) {
    return http.post({
        url: 'cultural/cmd/v1/controlscreen/wbdList2',
        params,
        isLoading: true,
    });
}

// 获取文保点详情
// url:`cultural/cmd/v1/controlscreen/wbdDetail`,
export function getwbdDetail(params) {
    return http.post({
        url: `cultural/cmd/v1/controlscreen/newwbdDetail`,
        params,
        isLoading: true,
    });
}

// 志愿者巡查员申请

export function zhiyuanzheapply(params) {
    return http.put({
        url: 'cultural/cmd/v1/volunteer',
        params,
        isLoading: false,
    });
}

// 党员巡查员申请

export function addDy(params) {
    return http.put({
        url: `cultural/cmd/v1/dy`,
        params,
        isLoading: true,
    });
}

// 党员心愿列表

export function dyList(params) {
    return http.post({
        url: 'cultural/cmd/v1/dy/list',
        params,
        isLoading: true,
    });
}

// 查看党员申请详情

export function getDyTaskDetail(params) {
    return http.getForm({
        url: `cultural/cmd/v1/dy/getById/${params}`,
        params,
        isLoading: true,
    });
}

// 根据巡查员id获取关联文物
export function getGuanLianWemwu(params) {
    return http.post({
        url: `cultural/cmd/v1/patroller/getBumpPoint`,
        params,
        isLoading: true,
    });
}

// 获取文物详情及风险评级

export function getWenwuDetail(params) {
    return http.getForm({
        url: `cultural/cmd/v1/cultural/getById/${params}`,
        params,
        isLoading: true,
    });
}

// 获取风险等级评分条目

export function getFengxian(params) {
    return http.getForm({
        url: `admin/cmd/v1/risk/getDiskInfoApp`,
        params,
        isLoading: true,
    });
}

// 获取待办

export function getDaiban(params) {
    return http.post({
        url: 'workflow/cmd/v1/task/queryMyTask',
        params,
        isLoading: true,
    });
}

// 巡查员总列表 安全整改

export function getxcySafeAllList(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/listAppAllPageXcy',
        params,
        isLoading: true,
    });
}

// 镇街安全整改  总
export function getZJSafeAllList(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/listAppAllPageZj',
        params,
        isLoading: true,
    });
}

// 巡查员 安全整改list

export function getSafeList(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/getHcqd',
        params,
        isLoading: true,
    });
}

// 获取巡查员详情
export function getHcxq(params) {
    return http.postForm({
        url: `cultural/cmd/v1/safetyrectify/getHcxq`,
        params,
        isLoading: true,
    });
}

// 获取检查结果

export function getJcjg(params) {
    return http.postForm({
        url: `cultural/cmd/v1/safetyrectify/getJcjg`,
        params,
        isLoading: true,
    });
}

// 巡查员上报
export function postxcytjhcrw(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/tjhcrw',
        params,
        isLoading: true,
    });
}

// 镇街 安全整改通知书

export function getZJSafeList(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/getZgqd',
        params,
        isLoading: true,
    });
}

// 镇街安全整改上报

export function postZJwczgfa(params) {
    return http.post({
        url: 'cultural/cmd/v1/safetyrectify/wczgfa',
        params,
        isLoading: true,
    });
}

// 一网统管列表

export function getAllMassage(params) {
    return http.getForm({
        url: `cultural/cmd/v1/controlscreen/handle/union_list`,
        params,
        isLoading: true,
    });
}
// 一网统管详情
// url:`cultural/cmd/v1/controlscreen/handle/union_deital`
export function getAllMassageInfo(params) {
    return http.post({
        url: `cultural/cmd/v1/controlscreen/handle/newunion_deital`,
        params,
        isLoading: true,
    });
}

// 风险等级评定结果保存 初定级(APP)

export function saveRatingResults(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/saveRatingResults',
        params,
        isLoading: true,
    });
}

export function postRatingResult(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/task/post',
        params,
        isLoading: true,
    });
}

/* export function  saveRatingResults (params){
    return http.post({
        url:'cultural/cmd/v1/cultural/saveRatingResults',
        params,
        isLoading: false,
    })
} */

// 获取文保宣传

export function getNews(params) {
    return http.post({
        url: 'cultural/cmd/v1/spread/list',
        params,
        isLoading: true,
    });
}

// 文保详情
export function newsInfo(params) {
    return http.postForm({
        url: `cultural/cmd/v1/spread/detail`,
        params,
        isLoading: true,
    });
}

// 信访事项 巡查员

export function getxinfang(params) {
    return http.post({
        url: 'cultural/petitionCases/list',
        params,
        isLoading: true,
    });
}

// 上级督查 巡查员

export function getShangjiDuCha(params) {
    return http.post({
        url: 'cultural/superiorSupervision/list',
        params,
        isLoading: true,
    });
}

// 获取事项通知

export function getNotice(params) {
    return http.post({
        url: 'cultural/cmd/v1/notice/notice',
        params,
        isLoading: true,
    });
}

// 获取联系人

export function getContact(params) {
    return http.post({
        url: 'cultural/cmd/v1/contact/list',
        params,
        isLoading: true,
    });
}

// 动态获取工作台

export function getAppEntry(params) {
    return http.post({
        url: 'cultural/cmd/v1/workspace/entry',
        params,
        isLoading: true,
    });
}

// 获取工作指标
export function getWorkIndex(params) {
    return http.post({
        url: 'cultural/cmd/v1/workspace/work_index',
        params,
        isLoading: true,
    });
}

// 获取工作指标列表

export function getWorkIndexList(params) {
    return http.postForm({
        url: `cultural/cmd/v1/workspace/work_index_list/${params}`,
        params,
        isLoading: true,
    });
}

// 获取智能感知设备

export function getDeviceList(params) {
    return http.getForm({
        url: `cultural/cmd/v1/device/list/${params}`,
        params,
        isLoading: true,
    });
}
// 获取智能感知设备详情

export function getDeviceInfo(params) {
    return http.getForm({
        url: `cultural/cmd/v1/device/detail/${params}`,
        params,
        isLoading: true,
    });
}

// 隐患上报列表

export function getHiddenTroubleList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/isReportList',
        params,
        isLoading: true,
    });
}

//隐患上报

export function postHiddenTrouble(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/report',
        params,
        isLoading: true,
    });
}

//  隐患上报详情

export function getHiddenTroubleInfo(params) {
    return http.postForm({
        url: `cultural/cmd/v1/cultural/hiddentrouble/isReportDetail`,
        params,
        isLoading: true,
    });
}

// 镇街隐患处理列表

export function getHandelHiddenTroubleList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/deptPending',
        params,
        isLoading: true,
    });
}

// 镇街处理并反馈

export function postFeedback(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/deptFeedback',
        params,
        isLoading: true,
    });
}

// 镇街我的处理
export function getMyHandelList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/deptSolved',
        params,
        isLoading: true,
    });
}

//现场处理

export function getXcHandelList(params) {
    return http.post({
        url: 'cultural/cmd/v1/cultural/hiddentrouble/deptSolvedPatroller',
        params,
        isLoading: true,
    });
}

// 获取工作动态

export function getWorkLog(params) {
    return http.getForm({
        url: `cultural/cmd/v1/workspace/work_log`,
        params,
        isLoading: true,
    });
}

//获取定级事项
export function getHealthItems(params) {
    return http.getForm({
        url: `cultural/cmd/v1/cultural/task/getRatingItems/${params}`,
        params,
        isLoading: true,
    });
}

//获取常规检查

export function getCheckItems(params) {
    return http.postForm({
        url: `cultural/cmd/v1/routinecheck/items/${params}`,
        params,
        isLoading: true,
    });
}

//获取体检事项

export function getPhysicalItems(params) {
    return http.postForm({
        url: `cultural/cmd/v1/physical/items/${params}`,
        params,
        isLoading: true,
    });
}

//获取整改事项
export function getRectifyItems(params) {
    return http.postForm({
        url: `cultural/cmd/v1/rectify/items/${params}`,
        params,
        isLoading: true,
    });
}

//提交体检检查
export function postPhysicalCheck(params) {
    return http.postForm({
        url: `cultural/cmd/v1/cultural/physical/post`,
        params,
        isLoading: true,
    });
}

//提交整改事项
export function postRectify(params) {
    return http.postForm({
        url: `cultural/cmd/v1/rectify/post`,
        params,
        isLoading: true,
    });
}

//提交复核结果
export function postRecheck(params) {
    return http.postForm({
        url: `cultural/cmd/v1/rectify/recheck`,
        params,
        isLoading: true,
    });
}

//提交常规检查
export function postRoutineCheck(params) {
    return http.postForm({
        url: `cultural/cmd/v1/routinecheck/post`,
        params,
        isLoading: true,
    });
}

export function upload(params) {
    return http.upload(params);
}

export function uploadNew(params) {
    return http.uploadNew(params);
}

export function uploadWithDtDream(params) {
    return http.postUploadForm({
        url: `admin/cmd/v1/storage/app_upload_dtdream`,
        params,
        isLoading: true,
    });
}

//获取整改事项
export function getRectificationItems(params) {
    return http.postForm({
        url: `cultural/cmd/v1/rectify/items`,
        params,
        isLoading: true,
    });
}

// 获取镇街
export function getSszj(params) {
    return http.getForm({
        url: `cultural/cmd/v1/controlscreen/szzj`,
        params,
        isLoading: true,
    });
}

// 新增资金申请

export function addZj(params) {
    return http.put({
        url: 'cultural/cmd/v1/fundApplication',
        params,
        isLoading: false,
    });
}

// 资金申请列表

export function zjshenqing(params) {
    return http.post({
        url: 'cultural/cmd/v1/fundApplication/list',
        params,
        isLoading: true,
    });
}

// 获取申请资金详情
export function getzjDetail(params) {
    return http.post({
        url: `cultural/cmd/v1/fundApplication/getById`,
        params,
        isLoading: true,
    });
}

// 获取用户详情

export function getUserInfo(params) {
    return http.post({
        url: `admin/cmd/v1/user/queryApp`,
        params,
        isLoading: true,
    });
}

// 获取角色id

export function getroleTreeId(params) {
    return http.post({
        url: `admin/cmd/v1/role/treeApp`,
        params,
        isLoading: true,
    });
}

// 获取角色列表

export function getroleTree(params) {
    return http.getForm({
        url: `admin/cmd/v1/role/roleTree`,
        params,
        isLoading: true,
    });
}

// 修改用户资料

export function updateUser(params) {
    return http.put({
        url: 'admin/cmd/v1/user',
        params,
        isLoading: true,
    });
}

// 移除应用

// 例行检查总列表

export function routineCheckAllList(params) {
    return http.post({
        url: 'cultural/cmd/v1/routinecheck/listAppAllPage',
        params,
        isLoading: true,
    });
}
// 例行检查

export function routinechecklist(params) {
    return http.post({
        url: 'cultural/cmd/v1/routinecheck/list',
        params,
        isLoading: true,
    });
}

// 例行检查任务清单
export function routineCheckInfo(params) {
    return http.postForm({
        url: `cultural/cmd/v1/routinecheck/items`,
        params,
        isLoading: true,
    });
}

// 提交例行检查事项
export function routineCheckPost(params) {
    return http.post({
        url: 'cultural/cmd/v1/routinecheck/subBaseCheckDetailNewApp',
        params,
        isLoading: true,
    });
}

// 获取待办数量

export function queryMyNeedCountByToken(params) {
    return http.postForm({
        url: `workflow/cmd/v1/task/queryMyNeedCountByToken`,
        params,
        isLoading: true,
    });
}

// 信访开始

// 信访镇街待交办
export function getZjXinfangDJBList(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/toBeAssignedList',
        params,
        isLoading: true,
    });
}

// 信访详情
export function zjXinFangDetail(params) {
    return http.postForm({
        url: `cultural/cmd/v1/petition/detailInfoById`,
        params,
        isLoading: true,
    });
}

// 信访可交办的巡查员

export function zjXingFangXCYList(params) {
    return http.postForm({
        url: `cultural/cmd/v1/petition/queryXcyById`,
        params,
        isLoading: true,
    });
}

// 信访待交办提交
export function postXinFangHandTask(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/handTask',
        params,
        isLoading: true,
    });
}

// 信访已交办
export function getXinFangYJBList(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/toActionList',
        params,
        isLoading: true,
    });
}

// 信访已交办详情
export function zjXinFangIsCheckDetail(params) {
    return http.postForm({
        url: `cultural/cmd/v1/petition/zjIsCheckDetail`,
        params,
        isLoading: true,
    });
}

// 信访巡查员 待检查 list
export function getXinFangXCYNoCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/toBeAssignedXcyList',
        params,
        isLoading: true,
    });
}

// 信访巡查员提交

export function xingFangCheckItemSubmit(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/petitionItemSubmit',
        params,
        isLoading: true,
    });
}

// 信访巡查员 已检查
export function xcyXinFangIsCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/xcyIsCheck',
        params,
        isLoading: true,
    });
}

// 信访已检查 镇街
export function zjXinFangIsCheck(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/zjIsCheck',
        params,
        isLoading: true,
    });
}

// 信访总上报
export function zjXinFangReport(params) {
    return http.postForm({
        url: `cultural/cmd/v1/petition/zjReport`,
        params,
        isLoading: true,
    });
}
// 信访已上报列表
export function zjXinFangIsReport(params) {
    return http.post({
        url: 'cultural/cmd/v1/petition/zjIsReport',
        params,
        isLoading: true,
    });
}

// 上级督查镇街待交办

export function getZjDuChaList(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/toBeAssignedList',
        params,
        isLoading: true,
    });
}

// 上级督查详情
export function zjSjdcDetail(params) {
    return http.postForm({
        url: `cultural/cmd/v1/supervise/detailInfoById`,
        params,
        isLoading: true,
    });
}

// 上级督查可交办的巡查员

export function zjShangjiXCYList(params) {
    return http.postForm({
        url: `cultural/cmd/v1/supervise/queryXcyById`,
        params,
        isLoading: true,
    });
}

// 上级督查  待交办提交

export function postSJHandTask(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/handTask',
        params,
        isLoading: true,
    });
}

// 上级督查已交办列表

export function getSJYJBList(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/toActionList',
        params,
        isLoading: true,
    });
}

// 上级督查已检查详情

export function zjSJDCIsCheckDetail(params) {
    return http.postForm({
        url: `cultural/cmd/v1/supervise/zjIsCheckDetail`,
        params,
        isLoading: true,
    });
}

// 上级督查巡查员 待检查 list
export function getSJXCYNoCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/toBeAssignedXcyList',
        params,
        isLoading: true,
    });
}

// 上级督查巡查员提交

export function sjdcCheckItemSubmit(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/superviseItemSubmit',
        params,
        isLoading: true,
    });
}

// 上级督查已检查 镇街
export function zjSJDCIsCheck(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/zjIsCheck',
        params,
        isLoading: true,
    });
}

// 镇街已检查 总上报 上级督查
export function zjSJDCReport(params) {
    return http.postForm({
        url: `cultural/cmd/v1/supervise/zjReport`,
        params,
        isLoading: true,
    });
}

//镇街已上报列表 上级督查
export function zjSJDCIsReport(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/zjIsReport',
        params,
        isLoading: true,
    });
}

// 巡查员已检查列表 上级督查

export function xcySJDCIsCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/supervise/xcyIsCheck',
        params,
        isLoading: true,
    });
}

// 专项检查待交办列表 镇街
export function getSspecialCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/toBeAssignedList',
        params,
        isLoading: true,
    });
}

// 镇街已检查列表

export function zjIsCheck(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/zjIsCheck',
        params,
        isLoading: true,
    });
}

// 镇街已检查 总上报 专项检查
export function zjReport(params) {
    return http.postForm({
        url: `cultural/cmd/v1/specialcheck/zjReport`,
        params,
        isLoading: true,
    });
}

//镇街已上报列表
export function zjIsReport(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/zjIsReport',
        params,
        isLoading: true,
    });
}

// 专项检查待交办列表巡查员
export function toBeAssignedXcyList(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/toBeAssignedXcyList',
        params,
        isLoading: true,
    });
}
// 已交办列表
export function gettoActionList(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/toActionList',
        params,
        isLoading: true,
    });
}

// 巡查员已检查列表

export function xcyIsCheckList(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/xcyIsCheck',
        params,
        isLoading: true,
    });
}

// 已检查详情
export function zjIsCheckDetail(params) {
    return http.postForm({
        url: `cultural/cmd/v1/specialcheck/zjIsCheckDetail`,
        params,
        isLoading: true,
    });
}

// 专项检查详情

export function getSspecialCheckInfo(params) {
    return http.postForm({
        url: `cultural/cmd/v1/specialcheck/detailInfoById`,
        params,
        isLoading: true,
    });
}
// 获取交办巡查员列表
export function getJiaoBanList(params) {
    return http.postForm({
        url: `cultural/cmd/v1/specialcheck/queryXcyById`,
        params,
        isLoading: true,
    });
}
// 体检待交办任务 镇街

export function postHandTask(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/handTask',
        params,
        isLoading: true,
    });
}

// 体检待交办任务提交 巡查员

export function specialCheckItemSubmit(params) {
    return http.post({
        url: 'cultural/cmd/v1/specialcheck/specialCheckItemSubmit',
        params,
        isLoading: true,
    });
}

// 累计指标

export function queryMyProgressIndicators(params) {
    return http.postForm({
        url: `workflow/cmd/v1/task/queryMyProgressIndicators`,
        params,
        isLoading: true,
    });
}

// 消防设施
export function getFacilitiesList(params) {
    return http.post({
        url: 'hik/cmd/v1/facilities/list/facilities',
        params,
        isLoading: true,
    });
}

// 消防设备

export function getFiredeviceList(params) {
    return http.post({
        url: 'hik/cmd/v1/firedevice/list/firedevice',
        params,
        isLoading: true,
    });
}

// 火灾危险源

export function getFireDangerList(params) {
    return http.post({
        url: 'hik/cmd/v1/danger/list/danger',
        params,
        isLoading: true,
    });
}

// 向后台发送定位
export function postLocaltion(params) {
    return http.post({
        url: 'cultural/cmd/v1/patroller/createPatrollerLocus',
        params,
        isLoading: false,
    });
}

export function getrealTimePosition(params) {
    return http.getForm({
        url: `cultural/cmd/v1/patroller/realTimePosition`,
        params,
        isLoading: false,
    });
}

export function valid_token(params) {
    return http.post({
        url: `cultural/valid`,
        params,
        isLoading: false,
    });
}

export function ding_userinfo(params) {
    return http.get({
        url: `cultural/userInfo`,
        params,
        isLoading: false,
    });
}
export function basecheckCreate(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheck/create_v1',
        params,
        isLoading: true,
    });
}
export function basecheckNotTokenCreate(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheck/createNotTokenV1',
        params,
        isLoading: true,
    });
}
export function getMyBumpPointBaseInfo(params) {
    return http.get({
        url: 'admin/cmd/v1/bumpPointBaseInfo/getMyBumpPointBaseInfo  ',
        params,
        isLoading: true,
    });
}
export function getMyBaseCheckList(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheck/getMyBaseCheckList',
        params,
        isLoading: true,
    });
}
export function getbaseCheckDataById(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheck/getbaseCheckDataById',
        params,
        isLoading: true,
    });
}
export function getBumpPointBaseInfoConfigByPointId(params) {
    return http.get({
        url: `hik/cmd/v1/firefacilitiescconfig/getBumpPointBaseInfoConfigByPointId/${params.pointId}`,
        params: {},
        isLoading: true,
    });
}
export function getImagePath(params) {
    return http.get({
        url: `admin/cmd/v1/storage/view1/${params.path}`,
        params: {},
        isLoading: true,
    });
}
export function getMyBaseCheckListByCheckType(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheck/getMyBaseCheckListByCheckType',
        params,
        isLoading: true,
    });
}
export function basecheckdetailSaveList(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheckdetail/saveList',
        params,
        isLoading: true,
    });
}
export function basecheckendCreate(params) {
    return http.post({
        url: 'admin/cmd/v1/basecheckend/create',
        params,
        isLoading: true,
    });
}
export function myUserData(params) {
    return http.get({
        url: 'admin/cmd/v1/fwuserData/myUserData',
        params: {},
        isLoading: true,
    });
}
export function applicationNotExamine(params) {
    return http.postTest({
        url: 'cultural/cmd/v1/volunteer/examine/applicationNotExamine',
        params,
        isLoading: true,
    });
}

export function getWenbaodianAppList(params) {
    return http.postTest({
        url: 'cultural/cmd/v1/controlscreen/appwbdList',
        params,
        isLoading: true,
    });
}
export function getListAndProtecteds(params) {
    return http.getTest({
        url: 'admin/cmd/v1/bumpPointBaseInfo/getListAndProtecteds',
        params,
        isLoading: true,
    });
}

// 通知公告列表
export function getculturalMsgList(params) {
    return http.postTest({
        url: 'cultural/cmd/v1/msg/list',
        params,
        isLoading: true,
    });
}

// 通知公告已读
export function readCulturalMsg(params) {
    return http.postTest({
      url: 'cultural/cmd/v1/msg/read',
      params,
      isLoading: true,
    });
  }
  
  // 通知公告删除
  export function deleteCulturalMsg(params) {
    return http.postTest({
      url: 'cultural/cmd/v1/msg/delete',
      params,
      isLoading: true,
    });
  }
  
// 培训考核-学习-tab
export function getKnowledgeChannelList(params) {
    return http.getTest({
        url: 'cultural/cmd/v1/knowledge_channel/data',
        params,
        isLoading: true,
    });
}

// 培训考核-学习-列表
export function getKnowledgeList(params) {
    return http.postTest({
      url: 'cultural/cmd/v1/knowledge/data',
      params,
      isLoading: true,
    });
  }
  

// 培训考核-学习-详情
export function getKnowledgeDetail(params) {
    return http.getTest({
        url: 'cultural/cmd/v1/knowledge/detail',
        params,
        isLoading: true,
    });
}

// 培训考核-学习-学习记录新增
export function logLearningRead(params) {
    return http.postTest({
        url: 'cultural/cmd/v1/log_learning/read',
        params,
        isLoading: true,
    });
}

// 培训考核-培训-列表
export function trainingList(params) {
    return http.postTest({
      url: 'cultural/cmd/v1/training/available',
      params,
      isLoading: true,
    });
  }
  
  // 培训考核-培训-报名
  export function trainingSign(params) {
    return http.postTest({
      url: 'cultural/cmd/v1/training_sign/sign',
      params,
      isLoading: true,
    });
  }

// 判断手机与文保点的直线距离
export function getPhoneToPointDistance(params) {
    return http.postTest({
        url: 'cultural/cmd/v1/cultural/getCulturalDistancePosition',
        params,
        isLoading: true,
    });
}

/************************镇街**********************/

// 问题上报审核列表
export function jdGetListByCheckType8(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/jdGetListByCheckType8',
        params,
        isLoading: true,
    });
}

// 问题上报审核提交
export function jdUpdataByCheckIdAndCheckType8(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/jdUpdataByCheckIdAndCheckType8',
        params,
        isLoading: true,
    });
}

// 日常巡检审核提交
export function jdUpdataByCheckIdAndCheckType3(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/jdUpdataByCheckIdAndCheckType3',
        params,
        isLoading: true,
    });
}

// 审核专项整改列表---镇街审核---来源: 问题上报
export function updateJdIsRun(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/updateJdIsRun',
        params,
        isLoading: true,
    });
}

// 亩核专项整改列表--文旅局审核
export function updateIsRun(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/updateIsRun',
        params,
        isLoading: true,
    });
}

// 审核专项整改列表---镇街审核---来源: 日常巡检
export function updateJdIsRunByCheckType3(params) {
    return http.postTest({
        url: 'admin/cmd/v1/basecheck/updateJdIsRunByCheckType3',
        params,
        isLoading: true,
    });
}