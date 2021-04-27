function responseData(status, data, msg, paginator) {
  return {
    code: status === true ? 1 : -1,
    data,
    msg,
    paginator
  }
}

module.exports = responseData;