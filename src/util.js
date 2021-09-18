function getMySqlDateTime(epochTimestamp = Date.now()) {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
  getMySqlDateTime
};