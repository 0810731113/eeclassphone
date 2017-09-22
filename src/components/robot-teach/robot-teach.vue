<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="l-header">
      <div @click="returnBack" class="return-box">
        <i class="iconfont icon-fanhui3"></i>
      </div>
      机器人教学
    </div>
    <div class="logistic-banner" ref="logisticsBanner">
    </div>


    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div class="content-box">
          <divider>机器人教学简介</divider>
          <div class="text-box">
            <p style="line-height: 2.0rem;">
              益课智慧助教机器人作为AI校园，云端课堂的网关设备，可以实时监控实训设备的运行状态，自动发送设备的故障信息给供应商；同时机器人也能在线下载益课云端资源平台的教学课件，让机器人协助教师进行实训教学。
            </p>
          </div>
          <div class="image-box">
            <img src="./robotteach2.png" alt="">
          </div>
          <divider>Robot教学功能介绍</divider>

          <div class="text-box">
            <h4>4.1PAD登录</h4>
            <div class="image-box">
              <img src="./robot1112.jpg" alt="">
            </div>
            <p>
              每一个学校的每个实训室只有一台机器人，每台机器人配置一台安卓系统的pad。在用教师账号登录时读取pad的唯一标识信息，登录时采用pad标识+账号+密码 的方式，以达到教师只能在自己学校的实训室登录的目的           </p>
            </p>
            <h4>4.2课堂介绍</h4>
            <div class="image-box">
              <img src="./robotteach4.png" alt="">
            </div>
            <p>
              默认显示课堂介绍页面（按照后台选定的样式模板进行展示）
            </p>
            <h4>4.3查看页面</h4>
            <div class="image-box">
              <img src="./robotteach3.png" alt="">
            </div>
            <p>
              查看页面提供运行日志、维修日志、设备详情、控制指令等连接，点击链接跳转到设备列表页，选择指定的设备，从 而进入链接对应页面
            </p>
            <p class="small-font">
              ①	维修日志：发送短信同时，后台生成相应报修单，供应商对报修单进行填写，用户（教师）可以查看维修记录；
            </p>
            <p class="small-font">
              ②	运行日志：设备完成指令的每一个动作与时间
            </p>
            <p class="small-font">
              ③	设备详情：展示设备的基本属性
            </p>
            <p class="small-font">
              ④	控制指令：实现控制设备操作运行的指令
            </p>
            <h4>
              4.4视频页面
            </h4>
            <div class="image-box">
              <img src="./robotteach1.png" alt="">
            </div>
            <p>
              ①	查看时需体现资源的分类，每种分类需展示。按本地、查看、下载页签二级导航
            </p>
            <p>
              ②	支持在线播放,下载
            </p>
            <p>
              ③	可查看我的下载及可对其管理;如果教师后台、超级管理员将视频下架（本地下载视频也会被删除）
            </p>
            <p>
              ④	播放被选中的视频
            </p>
            <h4>
              4.5文档页面
            </h4>
            <div class="image-box">
              <img src="./robotteach5.png" alt="">
            </div>
            <p>
              ①	查看时需体现资源的分类，按本地、查看、下载页签二级导航；
            </p>
            <p>
              ②	支持在线预览，下载阅读
            </p>
            <p>
              ③	可查看我的下载及可对其管理;如果教师后台、超级管理员将视频下架（本地下载文档也会被删除）
            </p>
            <p>
              ④	阅读选中的文档
            </p>
          </div>
        </div>
        <div class="footer-box">
          沪ICP备15013079号
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Divider, XInput, Group,  XTextarea, XButton } from 'vux'
import BScroll from 'better-scroll'
import { prefixStyle } from 'common/js/dom'

const RESERVED_HEIGHT = 36
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')


export default {
  components: {
    Divider,
    XInput,
    Group,
    XTextarea,
    XButton
  },
  data () {
    return {
      mainListHei: 300,
      scrollY: 0,
      listLen: 0
    }
  },
  created (){

  },
  mounted() {
    setTimeout(() => {
      this.winHei = Math.min(this.$refs.logisticDetailMainCon.clientHeight, window.innerHeight)

      this.bannerHei = this.$refs.logisticsBanner.clientHeight
      this.mainListHei = this.winHei - this.bannerHei
      this.minTranslateY = -this.bannerHei + RESERVED_HEIGHT

      this.listLen = this.$refs.content.clientHeight

      this.$refs.scrollBox.style.height = this.mainListHei + 'px'
      this.$refs.scrollBox.style.top = this.bannerHei + 'px'
      this._initMainScroll()

    }, 20)
  },
  filters: {
    cutText( value ){
      if(value.length <= 20){
        return value ;
      }else{
        return value.substr(0, 20) + "..." ;
      }
    }
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    returnBack( ){
      this.$router.back();
    },
    _initMainScroll(){
      this.mainScroll = new BScroll(this.$refs.scrollBox,{
//        click: true,
        probeType: 3
      })
      this.mainScroll.on('scroll',(pos) => {
        this.scrollY = pos.y ;
      })

      this.mainScroll.on('scrollEnd', () => {
        var ll = this.$refs.content.clientHeight ;
        if(ll == this.listLen){
          return
        }else{
          this.listLen = ll
          this.mainScroll.refresh()

        }
      })

    }

  },
  watch: {
    scrollY(newVal){
      console.log(newVal)
      let translateY = Math.max(this.minTranslateY,newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.bannerHei)
      if(newVal > 0){
        scale = 1 + percent
        zIndex = 10
      }else {
        blur = Math.min(20, percent * 20)
      }
      if(newVal < this.minTranslateY){
        zIndex = 10
        this.$refs.logisticsBanner.style.paddingTop = 0
        this.$refs.logisticsBanner.style.height = `${RESERVED_HEIGHT}px`
      }else{
        this.$refs.logisticsBanner.style.paddingTop = '62.5%'
        this.$refs.logisticsBanner.style.height = 0
      }
      this.$refs.logisticsBanner.style[transform] = `scale(${scale})`
      this.$refs.logisticsBanner.style.zIndex = zIndex

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../logistic-list/icon/iconfont.css' ;
@import '../../assets/styles/public' ;
.main-container{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
}

.footer-box{
  margin-top:12px;
  border-top:1px solid #e6e6e6;
  padding-top:12px;
  padding-bottom:12px;
  font-size: 12px;
  color:#ccc;
  line-height: 2.4rem;
  text-align: center;
}
.scroll-box{
  position:absolute;
  background-color: #f6f6f6;
  width:100%;
  z-index: 5 ;
  .content{
    background-color: #FFF;
  }
}
.content-box{
  width:96%;
  margin: 6px auto ;
  padding-top: 12px;
  /*text-align:center;*/
  .text-box{
    text-align: left;
    padding-left: 1rem;
    padding-right: 1rem;
    /*text-indent: 2rem;*/
    color:#8f979a;
    font-size:16px;
    line-height: 1.6rem;
    margin-bottom:1rem;
    h4{
      line-height: 2.4rem;
      text-align: left;
      /*text-indent: 1rem;*/

    }
    p{
      padding:0.6rem 0rem;
    }
    .small-font{
      font-size:14px;
    }
  }
  .image-box{
    margin-top: 1rem;
    width:100%;
    img{
      width: 100%;
    }
  }

}


.l-header{
  .l-header ;
}

.logistic-banner{
  background-image: url("./robotteach0.png");
  width:100%;
  height:0;
  background-size: cover;
  position:relative;
  z-index:1;
  transform-origin: top;
  padding-top:62.5%;
}

.footer-box{
  margin-top:12px;
  border-top:1px solid #e6e6e6;
  padding-top:12px;
  padding-bottom:12px;
  font-size: 12px;
  color:#ccc;
  line-height: 2.4rem;
  text-align: center;
}


</style>
