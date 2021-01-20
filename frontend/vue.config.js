var path = require('path')

module.exports = {
  outputDir: path.resolve(__dirname, '../src/public'),
  devServer: {
    // 린트 에러 시 브라우저의 오버레이 해제
    overlay: false,
    proxy: {
      // proxyTable 설정
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
}
