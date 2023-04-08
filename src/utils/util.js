class Util {

	getTime(){
	var date = new Date(),
	year = date.getFullYear(),
	month = date.getMonth() + 1,
	day = date.getDate(),
	hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
	minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
	second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	month >= 1 && month <= 9 ? (month = "0" + month) : "";
	day >= 0 && day <= 9 ? (day = "0" + day) : "";
	// var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	// console.log(timer);
	return timer;
	}
	
	toast(title) {
		wx.showToast({
			title,
			icon: 'none'
		})
	}

	showLoading(title = '') {
		wx.showLoading({
			title,
			mask: true
		})
	}

	hideLoading() {
		wx.hideLoading().catch(console.log)
	}
	modal({
		title = '',
		content = '',
		cancelText = '取消',
		cancelColor = '#AEAEAE',
		confirmText = '确定',
		confirmColor = '#496DF9',
		showCancel = true,
	}) {
		return new Promise((resolve, reject) => {
			wx.showModal({
				title,
				content,
				cancelText,
				cancelColor,
				confirmText,
				confirmColor,
				showCancel,
				success(res) {
					if (res.confirm) {
						resolve()
					}
				},
			})
		})
	}

}
export default new Util()
