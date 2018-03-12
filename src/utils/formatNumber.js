
const formatNumber = n => n && (n + '').replace(/\B(?=(\d{3})+(?!\d))/g, " ")

export default formatNumber
