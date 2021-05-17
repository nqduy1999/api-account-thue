function responseData(status, data, msg, pagination) {
  return {
    code: status === true ? 1 : -1,
    data,
    msg,
    pagination,
  };
}
function responseDataNormal(status, data, msg) {
  return {
    code: status === true ? 1 : -1,
    data,
    msg,
  };
}
module.exports = { responseData, responseDataNormal };
