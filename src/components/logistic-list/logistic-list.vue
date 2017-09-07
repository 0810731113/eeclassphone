<template>
  <div class="main-container" ref="logisticMainCon">
    <div class="parent-box">
      <div class="l-header">
        <div @click="returnBack" class="return-box">
          <i class="iconfont icon-fanhui3"></i>
        </div>
        <div @click="sidebarList" class="show-sidebar-box">
          <i class="iconfont icon-caidan2"></i>
        </div>
        物流实训
      </div>
      <div class="logistic-banner" ref="logisticsBanner">
        <!--<img src="./logistic-pic.jpg" alt="">-->
      </div>
      <div class="logistic-list" ref="logisticsList">
        <div class="content" ref="content">
          <!--<div class="list-type-grp" v-for="(item, index) in logisticsLists" key="index">-->
          <div class="list-type-grp" v-for="(item, index) in listData" key="index">
            <div class="type-title">{{item.name}}</div>
            <ul>
              <li v-for="(every, index1) in item.prod" key="index1" @click="gotourl(every.id)">
                <div class="img-box">
                  <!--<img :src="every.preview" alt="">-->
                  <img v-lazy="every.preview" alt="">
                </div>
                <div class="right-box">
                  <h5 class="title-text">{{every.title}}</h5>
                  <div class="content-text">{{every.summary | cutText }}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <transition name="blackBG">
        <div class="blackBG" @click="hideSidebar" v-if="sideShow"></div>
      </transition>
      <transition name="sidebar-slide">
        <div class="sidebar-list-box" v-if="sideShow">
          <div class="logo-box">
            <img src="./eeclass.png" alt="">
          </div>
          <div class="sidebarWrapper" ref="sidebarWrapper">
            <div class="content">
              <div class="s-list-box" v-for="(item, index) in listData" key="index">
                <h5>{{item.name}}</h5>
                <ul>
                  <li class="sidebar-list-text" v-for="(topic, no) in item.prod" @click="gotourl(topic.id)" key="no">{{topic.title}}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </transition>
    </div>
    <div class="loading-container" v-if="listData.length == 0">
      <loading></loading>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Search } from 'vux'
//import { logisticlist } from './logisticslist'
import BScroll from 'better-scroll'
import { prefixStyle } from 'common/js/dom'
import Loading from '../loading/loading'

const RESERVED_HEIGHT = 36
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  components: {
    Search,
    Loading
  },
  data () {
    return {
      sideShow: false,
      showSearch: false,
      mainListHei: 300,
      scrollY: 0,
      loadingEnd: true,
      listLen: 0,
      listData: []
    }
  },
  created (){

//    this.$http.get('/logisticlistdata').then(( response ) => {
//      response = response.body ;
//      this.listData = response.data ;
//      console.log(this.listData)
//    })

    //this.$http.post('http://localhost:8080/eeclassphone/getlogisticlist.do',{ credentials: true }).then(( response ) => {
    this.$http.get('/eeclassphone/getlogisticlist.do').then(( response ) => {
      console.log(response)
      //response = response.body ;
      this.listData = response.data.ldd ;
      console.log(this.listData)
    })
  },
  mounted() {
    setTimeout(() => {

      this.winHei = this.$refs.logisticMainCon.clientHeight ;
      this.bannerHei = this.$refs.logisticsBanner.clientHeight ;
      this.mainListHei = this.winHei - this.bannerHei ;
      this.minTranslateY = -this.bannerHei + RESERVED_HEIGHT ;

      this.listLen = this.$refs.content.clientHeight

      this.$refs.logisticsList.style.height = this.mainListHei + 'px' ;
      this.$refs.logisticsList.style.top = this.bannerHei + 'px' ;
      this._initMainScroll()

    }, 20)

    setTimeout(() => {
      this.loadingEnd = false
    },800)

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
//      this.showDrawer = true
//      this.drawerVisibility = true
    },
    sidebarList(){
      this.sideShow = true ;
      this.refresh()
    },
    gotourl(id){
      this.$router.push('/logisticdetail/' + id)
    },
    refresh() {
      setTimeout(() => {
        this._initScroll()
    }, 300)
//      this.sidebarScroll && this.sidebarScroll.refresh()
    },
    _initScroll(){
      if(!this.$refs.sidebarWrapper){
        return
      }
      this.sidebarScroll = new BScroll(this.$refs.sidebarWrapper,{
        click: true ,
        probeType: 3
      })
    },
    _initMainScroll(){
      this.mainScroll = new BScroll(this.$refs.logisticsList,{
        click: true ,
        probeType: 3
      })
      this.mainScroll.on('scroll',(pos) => {
        this.scrollY =  pos.y ;
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

    },
    hideSidebar(){
      this.sideShow = false;
    }

  },
  watch: {
    scrollY (newVal) {
      //console.log(newVal)
      let translateY = Math.max(this.minTranslateY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.bannerHei)
      if(newVal > 0){
        scale = 1 + percent
        zIndex = 10
      }else{
        blur = Math.min(20, percent * 20)
      }
      if(newVal < this.minTranslateY){
        zIndex = 10
        this.$refs.logisticsBanner.style.paddingTop = 0
        this.$refs.logisticsBanner.style.height = `${RESERVED_HEIGHT}px`
        //this.$refs.logisticsBanner.style.display = 'none'
      } else {
        this.$refs.logisticsBanner.style.paddingTop = '49%'
        this.$refs.logisticsBanner.style.height = 0
//        this.$refs.
      }

      this.$refs.logisticsBanner.style[transform]= `scale(${scale})` ;
      this.$refs.logisticsBanner.style.zIndex = zIndex

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import './icon/iconfont.css' ;

.loading-container{
  position:absolute;
  width: 100%;
  top:50%;
  z-index: 9999;
  transform: translateY(-50%);
}
.main-container{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
}
.parent-box{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
  background-color: #FFF;
}
.blackBG{
  position:fixed;
  z-index: 1000;
  left:0;
  top: 0 ;
  right: 0 ;
  bottom: 0 ;
  background-color: rgba(0,0,0,0.5);
}
.sidebarWrapper{
  position:absolute;
  left: 0;
  right: 0;
  top: 86px;
  bottom: 0;
  overflow: hidden;
}
.sidebar-list-box{
  width:64%;
  position:fixed;
  z-index: 1001 ;
  right:0;
  top:0;
  bottom:0;
  background-color: #FFF;
  .logo-box{
    width: 100%;
    box-sizing: border-box;
    border-bottom: 2px solid #ebebeb;
    height:86px;
    img{
      width:56%;
      margin:18px;
    }
  }
  .s-list-box{
    padding-left:12px;
    padding-top:6px;
    h5{
      line-height: 1.8rem;
      border-bottom: 1px solid #ebebeb;
    }
    ul{
      padding-top:6px;
      padding-left:12px;
      padding-right:12px;
      display:block;
      li{
        line-height: 2.4rem;
        list-style-type: none;
        border-bottom: 1px solid #ebebeb ;
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
  .show-sidebar-box{
    position:absolute;
    right:12px;
    top:0px;
    i{
      font-size: 18px;
      color: #ffb400;
    }
  }
}

.logistic-list{
  /*margin-top:12px;*/
  /*position:relative;*/
  height: 300px;
  position:absolute;
  z-index:5;
  width: 100%;
  background-color: #f2f2f2;
  .content{
    background-color: #FFF;
  }
  .list-type-grp{
    .type-title{
      background-color: #f6f6f6;
      padding-left:12px;
      line-height: 1.8rem;
    }
  }
  ul{
    display:block;

    li{
      display:-webkit-box;
      display:flex;
      justify-content:center;
      border-bottom:1px solid #ededed;
      padding:0.8rem;
      .img-box{
        width:36%;
        img{
          width:100%;
        }
      }
      .right-box{
        width:58%;
        padding-left:0.8rem;
        /*display:flex;*/
        /*flex-direction:column;*/
        .title-text{
          background-color: #2eb2e8;
          padding:4px;
          color:#FFF;
          display:inline;
        }
        .content-text{
          margin-top: 0.4rem;
          line-height: 1.4rem;
          font-size: 14px;
          color:#6c6c6c;
        }
      }

    }
  }
}

.logistic-banner{
  background-image: url("./logistic-pic.jpg");
  width:100%;
  height:0;
  background-size: cover;
  position:relative;
  z-index:1;
  transform-origin: top;
  padding-top:49%;
}
.sidebar-list-text{
  color: #595959 ;
}

.weui-search-bar__cancel-btn{
  color: #2eb2e8;
}

.sidebar-slide-enter-active, .sidebar-slide-leave-active{
  transition: all .25s;
}
.sidebar-slide-enter, .sidebar-slide-leave-to{
  transform: translate3d(100%,0,0)
}
.blackBG-enter-active, .blackBG-leave-active{
  transition: all .25s;
}
.blackBG-enter, .blackBG-leave-to{
  opacity:0 ;
}

</style>
