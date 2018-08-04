const ora = require('ora')

function OraLoading(action = 'getting', repo = '') {
  const l = ora(`${action} ${repo}`)
  return l.start()
}

module.exports = OraLoading
