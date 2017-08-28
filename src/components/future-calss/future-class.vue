<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="l-header">
      <div @click="returnBack" class="return-box">
        <i class="iconfont icon-fanhui3"></i>
      </div>
      未来课堂
    </div>
    <div class="logistic-banner" ref="logisticsBanner">
    </div>


    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div class="content-box">
          <divider>未来课堂简介</divider>
          <div class="text-box">
            <p>未来课堂软件的核心是课堂教学，是对传统教学模式、教学内容、教学方法、教学技术、教学评价、教学环境的创新成果。软件通过移动互联网技术实现教师与学生在课堂上可以进行实时互动，移动教学。增加课堂教学的趣味性，增强和激发学生的课堂体验与学习积极性。打造高效课堂，推进教学课程改革，实现全面提高教育教学质量。</p>
          </div>
          <div class="image-box">
            <img src="./futureclass1.jpg" alt="">
          </div>
          <divider>未来课堂功能介绍</divider>
          <div class="text-box">
            <p>未来课堂软件有三个部分：教师端、后台管理、学生端。</p>
            <p>教师端：发起教学项目后，可以实时查看学生的完成情况和统计学生对教学内容的掌握情况，为教学目标提供实时准确的数据。</p>
            <p>学生端：实时接收教师下发的教学项目，把生动逼真的画面直接呈现在学生面前，学生给出答案后又会实时反馈到教师端。</p>
            <p>后台管理：为教师提供教学资源的编辑和上传。管理所有教学历史信息，便于进行大数据分析，为改进教学质量提供数据支撑。</p>
            <p>具体的教学功能包括：课堂讨论,课堂测验,课堂提问,课堂微博,课堂互动等功能。</p>
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
      mainListHei:300,
      ScrollY: 0,
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
      this.mainScroll.on('scrollEnd' , () => {
        var ll = this.$refs.content.clientHeight
        if( ll == this.listLen){
          return
        } else {
          this.listLen = ll ;
          this.mainScroll.refresh() ;
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
    text-indent: 2rem;
    color:#8f979a;
    font-size:16px;
    line-height: 1.6rem;
    p{
      padding:0.6rem 0rem;
    }
  }
  .image-box{
    width:86%;
    margin:1rem auto;
    img{
      width:100%;
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
  background-image: url("./weilaiketang1.jpg");
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
