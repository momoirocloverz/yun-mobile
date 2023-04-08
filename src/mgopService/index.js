/* md5: 7b8db1328bf32c1df0221791d65fdf53 */
/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

/**
 * 本文件由 mgop-generator 自动生成， 建议请勿修改
 */

import { mgop } from '@aligov/jssdk-mgop';
import createFetch from './systems';

const defaultFetch = ({ api, data, header = {} }) => {
  return new Promise((resolve, reject) => {
    mgop({
      api,
      appKey: 'ymxowe7h+2002282040+evrycy',
      host: 'https://gov-bus.zjzwfw.gov.cn',
      header:{
		  "isTestUrl":"1"
	  },
      data,
      onFail: (error) => {
		console.log(error);
        const message = (error && error.ret && error.ret.join(',')) || '服务调用异常，请稍后再试';
        reject({ message });
      },
      onSuccess: (res) => {
        resolve(res.data);
      },
    });
  });
};

let fetch = createFetch(defaultFetch);

const overrideFetch = (baseFetch) => {
  fetch = createFetch(baseFetch);
};

export { overrideFetch, fetch as default };
