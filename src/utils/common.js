import Mta from "@/utils/myMta.js";
 // tabbar页面使用
function Init(e) {
    this.myMta = (...ev) => {
        Mta.myMta(...ev)
    }
}

export default {
	Init
}