<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="l-header">
      <div @click="returnBack" class="return-box">
        <i class="iconfont icon-fanhui3"></i>
      </div>
      <!--<div @click="sidebarList" class="show-sidebar-box">-->
        <!--<i class="iconfont icon-caidan2"></i>-->
      <!--</div>-->
      {{listData.name}}
    </div>
    <div class="logistic-banner" ref="logisticsBanner"></div>

    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div class="content-box">
          <!--<div class="mark-label">-->
            <!--<h4>产品简介</h4>-->
            <!--<span>Made In China</span>-->
          <!--</div>-->
          <h3>{{listData.title}}</h3>
          <span style="color:#b7bdc4; line-height:2rem;">Made In China</span>
          <div class="summery-text">
            <p v-for="(item, index) in listData.text">{{item}}</p>
          </div>
          <divider>图片展示</divider>
          <div class="pic-box" v-for="(item, index) in listData.pic">
            <img :src="item" alt="">
          </div>
          <!--<divider>参数列表</divider>-->
          <!--<div class="table-box">-->
            <!--<x-table :cell-bordered="false" style="background-color: #fff" class="arg-table">-->
              <!--<thead v-if="ldd.table.thead">-->
                <!--<tr>-->
                  <!--<th v-for="(item, index) in ldd.table.data[0]">{{item}}</th>-->
                <!--</tr>-->
              <!--</thead>-->
              <!--<tbody>-->
                <!--<tr v-for="(item, index) in ldd.table.data">-->
                  <!--<td v-for="sitem in item">{{sitem}}</td>-->
                <!--</tr>-->
              <!--</tbody>-->

            <!--</x-table>-->

          <!--</div>-->

          <!--<divider>视频展示</divider>-->

          <!--<div class="video-box">-->
            <!--<video controls="controls" v-for="(item, index) in ldd.video ">-->
              <!--<source :src="item" type="video/mp4" />-->
              <!--&lt;!&ndash;<source src="movie.ogg" type="video/ogg" />&ndash;&gt;-->
              <!--&lt;!&ndash;<source src="movie.webm" type="video/webm" />&ndash;&gt;-->
              <!--Your browser does not support the video tag.-->
            <!--</video>-->
          <!--</div>-->
          <div class="footer-box">
            沪ICP备15013079号
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Search, Divider, XTable } from 'vux'
//import VideoPlayer from '../video-player/video-player'
import BScroll from 'better-scroll'
import { prefixStyle } from 'common/js/dom'
import { ldd } from './logisticDetailData'

const RESERVED_HEIGHT = 36
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')


export default {
  components: {
    Search,
    Divider,
    XTable,
  },
  data () {
    return {
      scrollY: 0,
      ldd: ldd,
      mainListHei:300,
      ScrollY: 0,
      videoInfo1: {
        url: '',
        pic: ''
      },
      listLen: 0,
      listData: {
        id: '' ,
        text: '',
        cover: '',
        pic: [],
        video: []
      }
    }
  },
  created (){
    var id = this.$route.params.id ;
    this.$http.get('/ldd', {
//    this.$http.get('/eeclassphone/getlogisticdetail.do', {
//    this.$http.get('getlogisticdetail.do', {
      params: {
        id: id
      }
    }).then(( response ) => {
      response = response.body ;
      this.listData = response.data
      //console.log( this.listData )
    })
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
    returnBack( ){
      this.$router.back();
    },
    _initMainScroll(){
      this.mainScroll = new BScroll(this.$refs.scrollBox,{
        click: true,
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
        this.$refs.logisticsBanner.style.paddingTop = '63%'
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
  background-color: #FFF;
  z-index: 1010;
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
  text-align:center;
  .mark-label{
    color:#b7bdc4;
    text-align: center ;
    span{
      background-color: #74d1f7;
      color:#fff ;
      padding:4px 8px;
      margin-left: 6px;
    }
  }
  h3{
    text-align: center;
    line-height: 3rem;
    margin-top: 1rem;
    color:#3e3e3e;
  }
  .summery-text{
    text-align: left;
    text-indent:2rem;
    p{
      color:#b7bdc4;
      font-size: 16px;
      line-height: 2.0rem;
      padding-bottom:1rem;
    }
  }
  .pic-box{
    width:100%;
    text-align:center ;
    margin: 1rem auto;
    img{
      max-width:100%;
    }

  }
  .table-box{
    width:100%;
    text-align: center;
    .arg-table{
      margin: 1rem auto ;
    }
  }
  .video-box{
    /*height: 200px;*/
/*overflow: hidden;*/
    video{
      width:100%;
      height:200px;
      margin:1rem auto;
    }
  }


}

.l-header{
  .l-header
}

.logistic-banner{
  background-image: url("./gangkouBanner.png");
  width:100%;
  height:0;
  background-size: cover;
  position:relative;
  z-index:1;
  transform-origin: top;
  padding-top:63%;
}

</style>
