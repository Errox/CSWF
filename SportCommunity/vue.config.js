module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    port: 8081,
    proxy: 'https://apicswf.herokuapp.com/'
  }
}
