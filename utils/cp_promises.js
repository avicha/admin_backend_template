const cp = require('child_process')
const { defaultLogger } = require('../loggers')

const exec = (command, options = {}) => {
  return new Promise((resolve, reject) => {
    cp.exec(command, options, (error, stdout, stderr) => {
      defaultLogger.debug(command, options)
      defaultLogger.debug('#'.repeat(100))
      defaultLogger.debug('error', error)
      defaultLogger.debug('stdout', stdout)
      defaultLogger.debug('stderr', stderr)
      defaultLogger.debug('#'.repeat(100))
      defaultLogger.debug('\n'.repeat(4))
      if (error) {
        reject(error)
      } else {
        resolve({
          stdout,
          stderr
        })
      }
    })
  })
}
module.exports = {
  exec
}