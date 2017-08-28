// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import VueLazyload from 'vue-lazyload'
import ToolBarVux from './components/toolBarVux'
import MainContent from './components/MainContent'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import LogisticList from './components/logistic-list/logistic-list'
import LogisticDetail from './components/logistic-detail/logistic-detail'
import FutureClass from './components/future-calss/future-class'
import ConnectUs from './components/connect-us/connect-us'
import SourcePlatform from './components/source-platform/source-platform'
import RobotTeach from './components/robot-teach/robot-teach'
import EeclassIntro from './components/eeclass-intro/eeclass-intro'
import VideoPlayer from './components/video-player/video-player'
import RobotDetail from './components/robot-detail/robot-detail'
import RippleDemo from './components/ripple-demo/ripple-demo'

Vue.use(VueRouter)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  loading: require('assets/lazyload.jpg')
})
Vue.use(VueResource)

if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/ssr')
  Vue.use(VueAwesomeSwiper)
}

function getScreenInfo(){
  // var bodyHei = document.body.clientHeight ;
  var bodyHei = window.screen.availHeight ;
  // var bodyWid = document.body.clientWidth ;
  var bodyWid = window.screen.availWidth ;
  return {
    bodyWid ,
    bodyHei
  }
}
var contentHei = getScreenInfo().bodyHei - 54 + 'px'
console.log(document.body.clientWidth)
console.log(document.body.clientHeight)
const routes = [
  {
    path: '/',
    // redirect: '/rippledemo'
    // redirect: '/logisticdetail'
    // redirect: '/robotdetail'
    //redirect: '/sourceplatform'
    //redirect: '/robotteach'
    // redirect: '/eeclassintro'
    component: ToolBarVux,
    children: [
      { path: '', component: MainContent },
      { path: 'maincontent', component: MainContent, props:{height: contentHei} },
      { path: 'logisticlist', component: LogisticList},
      { path: '/futureclass', component: FutureClass } ,
      { path: '/sourceplatform', component: SourcePlatform } ,
      { path: '/robotteach', component: RobotTeach },
      { path: '/eeclassintro', component: EeclassIntro},
      { path: '/connectus', component: ConnectUs },
      { path: '/logisticdetail/:id', component: LogisticDetail},
      { path: '/robotdetail/:id', component: RobotDetail}
    ]
  },
  // { path: '/videoplayer', component: VideoPlayer}
  { path: '/rippledemo', component: RippleDemo}

]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
