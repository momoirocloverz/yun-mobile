import request from './request';
const get = ({
  url,
  params,
  header = {
    'content-type': 'application/json',
  },
  isLoading = true,
}) => {
  return request.httpRequest({
    method: 'GET',
    url,
    params,
    header,
    isLoading,
  });
};
const post = ({
  url,
  params,
  header = {
    'content-type': 'application/json',
  },
  isLoading = true,
}) => {
  return request.httpRequest({
    method: 'POST',
    url,
    params,
    header,
    isLoading,
  });
};
const postTest = ({
  url,
  params,
  header = {
    'content-type': 'application/json',
  },
  isLoading = true,
}) => {
  return request.httpTestRequest({
    method: 'POST',
    url,
    params,
    header,
    isLoading,
  });
};
const getTest = ({
  url,
  params,
  header = {
    'content-type': 'application/json',
  },
  isLoading = true,
}) => {
  return request.httpTestRequest({
    method: 'GET',
    url,
    params,
    header,
    isLoading,
  });
};
const getForm = ({
  url,
  params,
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  },
  isLoading = true,
}) => {
  return request.httpRequest({
    method: 'GET',
    url,
    params,
    header,
    isLoading,
  });
};
const postForm = ({
  url,
  params,
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  },
  isLoading = true,
}) => {
  return request.httpRequest({
    method: 'POST',
    url,
    params,
    header,
    isLoading,
  });
};


const postUploadForm = ({
  url,
  params,
  header = {
    'content-type': 'application/x-www-form-urlencoded',
  },
  isLoading = true,
}) => {
  return request.uploadRequest({
    method: 'POST',
    url,
    params,
    header,
    isLoading,
  });
};

const put = ({
  url,
  params,
  header = {
    'content-type': 'application/json',
  },
  isLoading = true,
}) => {
  return request.httpRequest({
    method: 'PUT',
    url,
    params,
    header,
    isLoading,
  });
};

const upload = (path) => {
  return request.uploadFile(path);
};

const uploadNew = (path) => {
  return request.uploadNewFile(path);
};

export default {
  get,
  post,
  postTest,
  getTest,
  getForm,
  postForm,
  put,
  upload,
  uploadNew,
  postUploadForm
};
