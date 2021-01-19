/**
 * Hang-ari 서버 진입점
 * ES6 형식의 import/export를 사용하기 위해
 * esm 모듈을 사용하여 main.js 파일을 require로 감싸 export
 *
 * @author Sckroll
 */

// eslint-disable-next-line no-global-assign
require = require('esm')(module /*, options*/)
module.exports = require('./app')
