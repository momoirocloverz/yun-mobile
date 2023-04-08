import Mta from "@/utils/myMta.js";
import {getCurrentPages} from '@dcloudio/uni-h5'
var nav = {
	navigateTo: ({
		url
	}) => {
		
		var link = getCurrentPages()[getCurrentPages().length - 1].route;
		Mta.myMta('leaveStr', link)
		console.log('navigateTo', link, '-', url)
		uni.navigateTo({
			url: url,
			success: function(res) {
				Mta.myMta('entryStr', url)
			}
		});
	},
	redirectTo: ({
		url
	}) => {
		var link = getCurrentPages()[getCurrentPages().length - 1].route;
		Mta.myMta('leaveStr', link)
		console.log('redirectTo', link, '-', url)
		uni.redirectTo({
			url: url,
			success: function(res) {
				Mta.myMta('entryStr', url)
			}
		});
	},
	reLaunch: ({
		url
	}) => {
		var link = getCurrentPages()[getCurrentPages().length - 1].route;
		Mta.myMta('leaveStr', link)
		console.log('reLaunch', link, '-', url)
		uni.reLaunch({
			url: url,
			success: function(res) {
				Mta.myMta('entryStr', url)
			}
		});
	},
	switchTab: ({
		url
	}) => {
		// console.log(getCurrentPages().route);
		// var link = getCurrentPages()[getCurrentPages().length - 1].route;
		// Mta.myMta('leaveStr', url)
		// console.log('switchTab', link, '-', url)
		uni.switchTab({
			url: url,
			success: function(res) {
				Mta.myMta('entryStr', url)
			}
		});
	},
	navigateBack: ({
		num
	}) => {
		var link = getCurrentPages()[getCurrentPages().length - 1].route;
		Mta.myMta('leaveStr', link)
		console.log('navigateBack', link, '-', num)
		uni.navigateBack({
			delta: num
		});
	},
		
	share:()=>{
		Mta.myMta('share')
	}
}
export default {
	...nav
}