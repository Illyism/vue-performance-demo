import Vue from 'vue'
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

const icons = [
  _interopRequireDefault(require('vue-material-design-icons/arrow-left.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/arrow-right.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/logout.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/settings.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/bell-outline.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/chevron-down.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/movie.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/shuffle.vue')).default,
  _interopRequireDefault(require('vue-material-design-icons/star.vue')).default,
]


for (const icon of icons) {
    Vue.component('icon-' + icon.name.replace('-icon', ''), icon)
}