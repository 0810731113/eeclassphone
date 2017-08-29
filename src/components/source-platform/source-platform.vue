<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="l-header">
      <div @click="returnBack" class="return-box">
        <i class="iconfont icon-fanhui3"></i>
      </div>
      资源平台
    </div>
    <div class="logistic-banner" ref="logisticsBanner"></div>

    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div class="content-box">
          <divider>资源平台简介</divider>
          <div class="text-box">
            <p>云端资源管理平台是益课AI校园的重要组成部分。 平台典型的操作用户包括：教师，游客，设备供应商，学校管理员和超级管理员等。所有用户都可以查看、搜索、共享平台资源。平台还可以为教师提供制作教学资源的工具，供未来课堂软件和助教机器人下载。</p>
          </div>
          <div class="two-clumn-box">
            <div class="image-box">
              <img src="./sourceplatform_01.png" alt="">
            </div>
            <div class="info-box">
              <h5>教学资源到云端管理平台</h5>
              <p>教师登录，修改名称，登录密码,头像,专业等基本信息,查看自己</p>
            </div>
          </div>
          <div class="two-clumn-box column-magin-bottom">
            <div class="info-box">
              <h5>教学资源到云端管理平台</h5>
              <p>教师登录，修改名称，登录密码,头像,专业等基本信息,查看自己</p>
            </div>
            <div class="image-box">
              <img src="./sourceplatform_04.png" alt="">
            </div>
          </div>
          <divider>资源平台功能介绍</divider>

          <div class="text-box">
            <h4>教师上传教学资源到云端管理平台</h4>
            <p>A.	教师登录，修改名称，登录密码,头像,专业等基本信息,查看自己收藏的资源（学校教师等初始信息由超级管理员录入数据库，以后由学校管理员进行增删改查的管理）</p>
            <p>B.	课程基本信息的添加</p>
            <p>C.	课程介绍信息的添加</p>
            <p>D.	课程视频资源的添加和上传</p>
            <p>E.	课程PDF文档资源的添加和上传</p>
            <h4>超级管理员的功能</h4>
            <p>A.	管理学校信息 (新增学校信息并为学校分配学校管理员账号)</p>
            <p>B.	管理教师信息</p>
            <p>C.	管理课程信息</p>
            <p>D.	管理视频资源</p>
            <p>E.	管理文档资源</p>
            <p>F.	权限管理</p>
            <p>G.	设备管理</p>
            <p>H.	设备运行日志管理</p>
            <p> I.	设备故障维修管理</p>
            <h4>学校管理员的功能</h4>
            <p>A.	管理老师信息并为其分配账号</p>
            <p>B.	管理实训室设备信息</p>
            <p>C.	修改登录密码</p>

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
import { ldd } from './logisticDetailData'

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
      ldd: ldd,
      mainListHei:300,
      ScrollY: 0 ,
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
        this.$refs.logisticsBanner.style.paddingTop = '56%'
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
  }
  .column-magin-bottom{
    margin-bottom: 1rem;
  }
  .two-clumn-box{
    width:100%;
    display:-webkit-box;
    display:flex;
    justify-content:center;
    .image-box{
      width:50%;
      flex-shrink:1;
      img{
        width:100%;

      }
    }
    .info-box{
      width:50%;
      border-left: 6px solid #FFF;
      border-right: 6px solid #FFF;
      box-sizing: border-box;
      flex-shrink:1;
      h5{
        line-height: 1.0rem;
        padding-bottom:6px;
      }
      p{
        color:#8f979a;
        font-size:12px;
        line-height: 1.4rem;
      }
    }

  }
}


.l-header{
  position:fixed;
  width:100%;
  top:0;
  z-index: 998;
  background-color: rgba(0,0,0,0.5);
  line-height: 36px;
  text-align: center;
  color: #ffb400;
  font-weight:200;
  .return-box{
    position:absolute;
    left:12px;
    top:0px;
    i{
      font-size: 18px;
      color: #ffb400;
    }
  }
}

.logistic-banner{
  background-image: url("./sourceplatform1.jpg");
  width:100%;
  height:0;
  background-size: cover;
  position:relative;
  z-index:1;
  transform-origin: top;
  padding-top:56%;
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
