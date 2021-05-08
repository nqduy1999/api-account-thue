function responseData(status, data, msg, pagination) {
  return {
    code: status === true ? 1 : -1,
    data,
    msg,
    pagination,
  };
}

module.exports = responseData;
