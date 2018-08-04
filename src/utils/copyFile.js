const { ncp } = require('ncp')
const mkdirp = require('mkdirp')
const {
  exists
} = require('mz/fs')

function copyFile(src, dest) {
  return new Promise(async (resolve, reject) => {
    if (!(await exists(src))) {
      mkdirp.sync(src)
    }
    ncp(src, dest, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = copyFile
