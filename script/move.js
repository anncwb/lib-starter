const fs = require('fs')
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, '..', dir)
function move(origin, target) {
  fs.rename(resolve(origin), resolve(target), function(err) {
    if (err) {
      throw err
    }
  })
}

module.exports = move
