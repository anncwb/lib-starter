const fs = require('fs')
const path = require('path')

function copy(origin, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target)
  }

  fs.readdirSync(origin).forEach((file) => {
    let originFile = path.join(origin, file)
    let targetFile = path.join(target, file)
    let stat = fs.statSync(originFile)
    if (stat.isDirectory()) {
      copy(originFile, targetFile)
    } else if (!fs.existsSync(targetFile)) {
      fs.writeFileSync(targetFile, fs.readFileSync(originFile), { encoding: 'utf8' })
    }
  })
}

module.exports = copy
