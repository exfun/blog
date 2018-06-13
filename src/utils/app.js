const app = {
  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
}

module.exports = app