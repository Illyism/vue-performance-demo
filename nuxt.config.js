module.exports = {
  head: {
    title: 'Performance demos',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Performance demos' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['~/assets/css/tailwind.css'],
  plugins: ['~/plugins/icons.js'],

  build: {
    vendor: [
      '~/vue.config.js', // loads before nuxt app
    ],
  }
}
