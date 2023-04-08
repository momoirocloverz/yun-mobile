//const baseUrl = 'http://127.0.0.1:8180/' //接口请求地址（测试）
const baseUrl = 'https://cultural-app.xiaoshan.gov.cn:8888/';
// const baseUrl = 'http://223.65.209.139:18180/';
// const baseUrl = 'http://192.168.2.29:8180/';
// const baseUrl = 'https://223.65.209.139:28181/';
// const baseUrl = 'http://169.254.139.3:8180/' //接口请求地址（测试）
// const baseUrl = 'http://127.0.0.1:8180/' //接口请求地址（测试）
// const baseUrl = 'http://192.168.1.175/' //接口请求地址（测试）
// const testUrl = 'http://192.168.0.191:8180/';
// const testUrl = 'http://192.168.2.29:8180/';
const testUrl = 'https://cultural-app.xiaoshan.gov.cn:8888/';
// const testUrl = 'https://223.65.209.139:28181/';
// const testUrl = 'http://223.65.209.139:18180/';
//上传
const uploadUrl = 'https://cultural-app.xiaoshan.gov.cn:8888/';
let num = 0;
const httpRequest = ({ method, url, params, header, isLoading = true }) => {
  return new Promise((resolve, reject) => {
    num++;
    // console.log(num);
    if (num > 0 && isLoading) {
      uni.showLoading({
        title: '加载中',
        mask: true,
      });
    }
    var header = {};
    //检查缓存中有没有token
    var token = uni.getStorageSync('token');
    if (token != '') {
      header = {
        Authorization: token,
      };
    } else {
      // header = {
      //     Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZGVlYjViNzAxZDgxZDNiZTI1OTQ0NzMyNmU0NzBhYiIsImp0aSI6ImVjMmE4ZmZjLTQ4MDYtNGM1OC1hMzI4LTQ5N2QzZjQ2ZjdmNCJ9.ztIk6x1YdK8rDZnOzZKylKuXdN4Ob67pp1cJetHzkTd9Nomv1XO0MRF1qEsYIRRHXhcMjXBNSQKnt5LL-3YSjg',
      // };
    }
    uni.request({
      url: baseUrl + url,
      data: params,
      method: method || 'POST',
      header: header,
      timeout: 30000,
      success(res) {
        num--;
        if (num == 0) {
          uni.hideLoading();
        }
        if (res.data.code === 200) {
          //与服务端链接成功
          resolve(res.data);
        }
        if (res.statusCode == 400 || res.statusCode == 401) {
          uni.removeStorageSync('role');
          uni.removeStorageSync('token');
          uni.removeStorageSync('name');
          uni.removeStorageSync('id');
          // uni.reLaunch({
          // 	url: '/pages/tourists/index'
          // })
        }
        if (res.statusCode > 499) {
          uni.showToast({
            title: '网络开小差了',
            icon: 'error',
          });
        } else {
          reject(res);
        }
      },
      fail(res) {
        // FN.Toast("网络开小差了");
        reject(res);
      },
    });
  });
};
const httpTestRequest = ({ method, url, params, header, isLoading = true }) => {
  return new Promise((resolve, reject) => {
    num++;
    // console.log(num);
    if (num > 0 && isLoading) {
      uni.showLoading({
        title: '加载中',
        mask: true,
      });
    }
    var header = {};
    //检查缓存中有没有token
    var token = uni.getStorageSync('token');
    if (token != '') {
      header = {
        Authorization: token,
      };
    } else {
      // header = {
      //     Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZGVlYjViNzAxZDgxZDNiZTI1OTQ0NzMyNmU0NzBhYiIsImp0aSI6ImVjMmE4ZmZjLTQ4MDYtNGM1OC1hMzI4LTQ5N2QzZjQ2ZjdmNCJ9.ztIk6x1YdK8rDZnOzZKylKuXdN4Ob67pp1cJetHzkTd9Nomv1XO0MRF1qEsYIRRHXhcMjXBNSQKnt5LL-3YSjg',
      // };
    }
    uni.request({
      url: testUrl + url,
      data: params,
      method: method || 'POST',
      header: header,
      timeout: 30000,
      success(res) {
        num--;
        if (num == 0) {
          uni.hideLoading();
        }
        if (res.data.code === 200) {
          //与服务端链接成功
          resolve(res.data);
        }
        if (res.statusCode == 400 || res.statusCode == 401) {
          uni.removeStorageSync('role');
          uni.removeStorageSync('token');
          uni.removeStorageSync('name');
          uni.removeStorageSync('id');
          // uni.reLaunch({
          // 	url: '/pages/tourists/index'
          // })
        }
        if (res.statusCode > 499) {
          uni.showToast({
            title: '网络开小差了',
            icon: 'error',
          });
        } else {
          reject(res);
        }
      },
      fail(res) {
        // FN.Toast("网络开小差了");
        reject(res);
      },
    });
  });
};

const uploadRequest = ({ method, url, params, header, isLoading = true }) => {
  return new Promise((resolve, reject) => {
    num++;
    // console.log(num);
    if (num > 0 && isLoading) {
      uni.showLoading({
        title: '加载中',
        mask: true,
      });
    }
    var header = {};
    //检查缓存中有没有token
    var token = uni.getStorageSync('token');
    if (token != '') {
      header = {
        Authorization: token,
      };
    } else {
      // header = {
      //     Authorization: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1ZGVlYjViNzAxZDgxZDNiZTI1OTQ0NzMyNmU0NzBhYiIsImp0aSI6ImVjMmE4ZmZjLTQ4MDYtNGM1OC1hMzI4LTQ5N2QzZjQ2ZjdmNCJ9.ztIk6x1YdK8rDZnOzZKylKuXdN4Ob67pp1cJetHzkTd9Nomv1XO0MRF1qEsYIRRHXhcMjXBNSQKnt5LL-3YSjg',
      // };
    }
    uni.request({
      url: uploadUrl + url,
      data: params,
      method: method || 'POST',
      header: header,
      timeout: 30000,
      success(res) {
        num--;
        if (num == 0) {
          uni.hideLoading();
        }
        if (res.data.code === 200) {
          //与服务端链接成功
          resolve(res.data);
        }
        if (res.statusCode == 400 || res.statusCode == 401) {
          uni.removeStorageSync('role');
          uni.removeStorageSync('token');
          uni.removeStorageSync('name');
          uni.removeStorageSync('id');
          // uni.reLaunch({
          // 	url: '/pages/tourists/index'
          // })
        }
        if (res.statusCode > 499) {
          uni.showToast({
            title: '网络开小差了',
            icon: 'error',
          });
        } else {
          reject(res);
        }
      },
      fail(res) {
        // FN.Toast("网络开小差了");
        reject(res);
      },
    });
  });
};

const uploadFile = (path) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '正在上传',
    });
    let token = uni.getStorageSync('token');
    uni.uploadFile({
      url: baseUrl + 'admin/cmd/v1/storage/app_upload',
      filePath: path,
      name: 'files',
      header: {
        Authorization: token,
      },
      success: (uploadFileRes) => {
        if (uploadFileRes.statusCode == 401) {
          uni.hideLoading();
          uni.reLaunch({
            url: '/pages/login/index',
          });
        } else {
          uni.hideLoading();
          resolve(uploadFileRes.data);
        }
      },
      fail(res) {
        console.log('网络开小差了...');
        reject(res);
      },
    });
  });
};

const uploadNewFile = (path) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '正在上传',
      mask: true,
    });
    let token = uni.getStorageSync('token');
    uni.uploadFile({
      url: uploadUrl + 'admin/cmd/v1/storage/app_upload',
      filePath: path,
      name: 'files',
      header: {
        Authorization: token,
      },
      success: (uploadFileRes) => {
        console.log(uploadFileRes);
        if (uploadFileRes.statusCode == 401) {
          uni.hideLoading();
          uni.reLaunch({
            url: '/pages/login/index',
          });
        } else {
          uni.hideLoading();
          resolve(uploadFileRes.data);
        }
      },
      fail(res) {
        console.log('网络开小差了...');
        reject(res);
      },
    });
  });
};

export default {
  baseUrl,
  testUrl,
  uploadUrl,
  httpRequest,
  httpTestRequest,
  uploadFile: uploadFile,
  uploadNewFile,
  uploadRequest,
  imgCommon: 'admin/cmd/v1/storage/view1/',
};
