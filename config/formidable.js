const env = require('../env')
const path = require('path')
module.exports = {
  uploadDir: env.FORMIDABLE_UPLOAD_DIR || path.resolve('uploads'),
  maxFileSize: env.FORMIDABLE_MAX_FILE_SIZE ? parseInt(env.FORMIDABLE_MAX_FILE_SIZE) : 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
  keepExtensions: true,
  hash: 'sha1'
}