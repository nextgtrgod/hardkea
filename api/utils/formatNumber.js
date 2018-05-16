
const formatNumber = n => n && (n + '').replace(/\B(?=(\d{3})+(?!\d))/g, " ")

module.exports = formatNumber
