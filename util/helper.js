// 分页
const generatePagination = (count, page, range) => {
  const pageSum = Math.ceil(count / 2)
  const RANGE = range || 4

  if (pageSum < 10) {
    return [...Array(pageSum)].map((item, index) => index + 1)
  }

  let start = page - RANGE
  let end = page + RANGE
  if (start < 1) {
    start = 1
    end = (page + RANGE) + (RANGE - page + 1)
  } else if (end > pageSum) {
    start = (page - RANGE) - (RANGE + page - pageSum)
    end = pageSum
  }
  return [...Array(end - start + 1)].map((item, index) => start + index)
}
module.exports = {
  generatePagination
}
