<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="intro-main">
      <div class="l-header">
        <div @click="returnBack" class="return-box">
          <i class="iconfont icon-fanhui3"></i>
        </div>
        益课信息
      </div>
      <div class="logistic-banner" ref="logisticsBanner">
      </div>

      <scroll @scroll = "scroll"  :listen-scroll="listenScroll" class="scroll-box" ref="scrollBox">
        <div class="content" ref="content">
          <div class="content-box">
            <divider>益课信息简介</divider>
            <div class="text-box">
              <p>
                益课信息位于上海市浦东新区陆家嘴软件园，是华东最大的信息产业基地，是一家专业从事高等教育、职业教育服务的高科技公司。公司拥有丰富的人才资源，多位员工拥有国内一流大学从教背景，可为学校提供一流的实验实训室解决方案设计，自创立以来一直专门从事智能制造实训室、物流实训室、轨道交通实训室、未来课堂产品的研发、生产、销售和服务于自主品牌的企业。
              </p>
            </div>
            <div class="connect-button">
              <x-button mini type="primary" @click.native="scrollToBottom" style="border-radius: 99px;">联系我们</x-button>
            </div>
            <div class="connect-button">
              <x-button mini type="primary" @click.native="pathToConnect" style="border-radius: 99px;">留言咨询</x-button>
            </div>
            <div class="image-box">
              <img src="./yikeInfo1.png" alt="">
            </div>
            <div class="text-box">
              <p>
                公司在广州、武汉、长沙、无锡、苏州、北京、西安等地设有分公司，并在全国范围内设有代理服务机构，公司销售及服务网络遍及全国三十余个省市。在市场开拓、产品开发、工程设计和售后服务等方面与分公司和代理机构进行了紧密的合作，并始终以客户至上的宗旨来为客户服务，公司有一支快速服务队伍并建立了24小时服务热线，同时建立了客户定期回访制度。
              </p>
            </div>
            <div class="three-img-mix">
              <div class="left-box">
                <div class="left-up-box">
                  <img src="./yikeInfo4.png" alt="">
                </div>
                <div class="left-down-box">
                  <img src="./yikeInfo6.png" alt="">
                </div>
              </div>
              <div class="right-box">
                <img src="./yikeInfo5.png" alt="">
              </div>
            </div>
            <div class="image-box">
              <img src="./yikeInfo2.png" alt="">
            </div>
            <div class="text-box">
              <p>
                公司创始团队很早就涉足到高等院校、职业学校、技工学院及政府筹建职教中心的各专业技能实验室建设，已经为国内上千家院校提供过实验室设备。
              </p>
            </div>

            <divider>成功案例</divider>
            <div class="text-box">
              <p>
                益课信息隶属于无锡优为物流智控有限公司旗下子公司，很早就和全国两千余所高效建立广泛的战略合作伙伴关系，拥有丰富的客户资源，益课为国内外各高校提供物流实训室的全套方案，以及信息化，智能化的教学方案，推出未来课堂,机器人教学,资源平台等一揽子教育解决方案，率先掀起国内的教育改革的技术浪潮,我们拥有成熟的产品体系以及教育解决方案
              </p>
            </div>
            <div class="image-box-logo">
              <div><img src="./pic8.png" alt=""></div>
              <div><img src="./pic9.png" alt=""></div>
              <div><img src="./pic10.png" alt=""></div>
              <div><img src="./pic11.png" alt=""></div>
              <div><img src="./pic12.png" alt=""></div>
              <div><img src="./pic13.png" alt=""></div>
              <div><img src="./pic14.png" alt=""></div>
              <div><img src="./pic15.png" alt=""></div>

            </div>

          </div>
          <div class="connect-box">
            <div class="logo-box">
              <img src="../../assets/logo1.png" alt="">
            </div>
            <div class="three-item">
              <div class="every">
                <div class="icon-box">
                  <i class="iconfont icon-dianhua"></i>
                </div>
                <div class="info-box">
                  13585652384
                </div>
              </div>
              <div class="every">
                <div class="icon-box">
                  <i class="iconfont icon-03"></i>
                </div>
                <div class="info-box">
                  021-50598669
                </div>
              </div>
              <div class="every">
                <div class="icon-box">
                  <i class="iconfont icon-youxiang"></i>
                </div>
                <div class="info-box">
                  lq@ouruv.cn
                </div>
              </div>
            </div>
            <div class="footer-box" ref="footer">
              <div>
                沪ICP备15013079号div
              </div>
              <div>
                地址：上海市浦东新区牡丹路60号东辰大厦14楼1408-1410室
              </div>
            </div>
          </div>

        </div>
      </scroll>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Divider, XButton, Flexbox, FlexboxItem} from 'vux'
import { prefixStyle } from 'common/js/dom'
import Scroll from '../scroll/scroll'

const RESERVED_HEIGHT = 36
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  components: {
    Divider,
    XButton,
    Flexbox,
    FlexboxItem,
    Scroll
  },
  data () {
    return {
      mainListHei: 300,
      scrollY: 0,
      mainListHei:300,
      ScrollY: 0,
      pics: {
        a : require("./eeclass1.jpg"),
        b : require("./eeclass2.jpg"),
        c : require("./eeclass12.png"),
        d : require("./eeclass13.png")
      },
      listLen: 0,
      listenScroll: true,
      isBottom: false
    }
  },
  created (){
    this.probeType = 3
    this.listenScroll = true
  },
  mounted() {

      this.winHei = Math.min(this.$refs.logisticDetailMainCon.clientHeight, window.innerHeight)

      this.bannerHei = this.$refs.logisticsBanner.clientHeight
      this.mainListHei = this.winHei - this.bannerHei
      this.minTranslateY = -this.bannerHei + RESERVED_HEIGHT
      this.listLen = this.$refs.content.clientHeight

      this.$refs.scrollBox.$el.style.top = this.bannerHei + 'px'
      console.log(this.$refs.scrollBox.$el.style.top)
//      this._initMainScroll()

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
//      console.log('on', event)
    },
    returnBack( ){
      this.$router.back();
    },
    _initMainScroll(){

    },
    scroll(pos){
      this.scrollY = pos.y
      var ll = this.$refs.content.clientHeight
      if(ll !== this.listLen){
        this.$refs.scrollBox.scroll.refresh()
        this.listLen = ll
      }

    },
    scrollToBottom(){
      this.$refs.scrollBox.scroll.scrollToElement(this.$refs.footer, 300)

    },
    pathToConnect(){
      this.$router.push('/connectus')
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

@import './icons/iconfont.css' ;
@import '../../assets/styles/public' ;
div{
  margin-bottom: 0;
}
.main-container{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
}
.intro-main{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background-color:#FFF ;
}
.connect-button{
  text-align: center;
  margin:12px auto;
  font-size: 16px;
}
.connect-box{
  width: 100%;
  background-image: url('./bga.jpg');
  background-size: contain ;
  background-repeat: no-repeat;
  background-position: center center;
  padding-top:24px;
  padding-bottom:24px;
  background-color:block;
  .logo-box{
    width:25%;
    margin: 0px auto;
    img{
      width: 100%;
    }
  }
  .three-item{
    display: -webkit-box;
    display:flex;
    flex-direction: row;
    flex-wrap:nowrap ;
    justify-content:space-around;
    margin:12px auto;
    border-bottom:1px solid #636363 ;
    border-top:1px solid #636363 ;
    padding-top:12px;
    padding-bottom:12px;
    .every{
      color:#f2f2f2;
      text-align: center;
      .icon-box{
        i{
          font-size: 24px;
          color:#e0e0e0;
        }
      }
      .info-box{
        font-size: 14px;
        color:#e0e0e0;
      }
    }
  }
}

.footer-box{
  font-size: 12px;
  color:#ccc;
  line-height: 1.8rem;
  text-align: center;
}
.scroll-box{
  position:absolute;
  bottom:0 ;
  /*top:0;*/
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
    width:100%;
    margin:0 auto;
    img{
      width:100%;
    }
  }
}


.l-header{
  .l-header ;
}

.logistic-banner{
  background-image: url("./yikeInfo0.png");
  width:100%;
  height:0;
  background-size: cover;
  position:absolute;
  top:0 ;
  z-index:1;
  transform-origin: top;
  padding-top:62.5%;
}
.image-box-logo{
  display:-webkit-box;
  display:flex;
  flex-direction:row;
  flex-wrap:wrap ;
  div{
    width:50%;
    text-align:center;
    display:inline-block;
    img{
      width:100%;
      padding: 2px 4px;
      box-sizing: border-box;
    }
  }
}

.three-img-mix{
  display:flex;
  display:-webkit-box;
  flex-direction: row;
  align-items:strecth;
  .left-box{
    width:50%;
    height:50%;
    .left-up-box{
      height:50%;
      padding:0px 2px 1px 0px;
      box-sizing: border-box;
    }
    .left-down-box{
      height:50%;
      padding:1px 2px 0px 0px;
      box-sizing: border-box;
    }
    img{
      width:100%;
    }
  }
  .right-box{
    width:50%;
    height:100%;
    padding:0px 0px 4px 5px;
    box-sizing: border-box;
    img{
      width:100% ;
      height:100% ;
    }
  }
}
</style>
