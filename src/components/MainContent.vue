<template>
  <div class="main-container">
    <div class="pageHeader">
      <span class="logo-box"><img src="../assets/logo.png" /></span>
      <span class="logo-text">益课信息</span>
    </div>
    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div>
          <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
            <swiper-slide><img src="../assets/banner/banner4.jpg" style="width: 100%;" /></swiper-slide>
            <swiper-slide><img src="../assets/banner/bannerfutureeeclass.jpg" style="width: 100%;" /></swiper-slide>
            <swiper-slide><img src="../assets/banner/banner2.png" style="width: 100%;" /></swiper-slide>
            <swiper-slide><img src="../assets/banner/bannerJ3.jpg" style="width: 100%;" /></swiper-slide>
            <swiper-slide><img src="../assets/banner/bannerJ1.jpg" style="width: 100%;" /></swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div style="margin-top: 12px;">
          <logistic-btngrp></logistic-btngrp>
        </div>
      </div>
    </div>

    <tabbar @on-index-change="getNavIndex" v-model="selectItem" style="background-color: #FFF;">
      <tabbar-item link="/maincontent">
        <div slot="icon" class="nav-icon-btn">
          <i class="iconfont icon-home"></i>
        </div>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <div slot="icon" class="nav-icon-btn">
          <i class="iconfont icon-jiaoxue"></i>
        </div>
        <span slot="label">教学</span>
      </tabbar-item>
      <tabbar-item link="/logisticlist" >
        <div slot="icon" class="nav-icon-btn">
          <i class="iconfont icon-cangku"></i>
        </div>
        <span slot="label">物流</span>
      </tabbar-item>
      <tabbar-item >
        <div slot="icon" class="nav-icon-btn">
          <i class="iconfont icon-jiqiren"></i>
        </div>
        <span slot="label">工业</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/eeclassintro">
        <div slot="icon" class="nav-icon-btn">
          <i class="iconfont icon-zhuye"></i>
        </div>
        <span slot="label">益课</span>
      </tabbar-item>
    </tabbar>
    <transition name="navfade">
      <div class="select-soft-list" v-if="currNavIndex===1">
        <ul>
          <li v-for="(item, index) in softwareLink" @click="gotoUrl(item.link)">{{item.text}}</li>
        </ul>
        <div class="point-triggle" >
          <img src="../assets/icons/point-triggle.png" alt="">
        </div>
      </div>
    </transition>

    <transition name="navfade">
      <div class="select-soft-list select-robot-list" v-if="currNavIndex===3">
        <ul>
          <li v-for="(item, index) in robotLink" @click="gotoUrl(item.link)">{{item.text}}</li>
        </ul>
        <div class="point-triggle" >
          <img src="../assets/icons/point-triggle.png" alt="">
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import { Grid, GridItem, GroupTitle, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Group, Cell } from 'vux'
  import LogisticBtngrp from './logistic-btngrp/logistic-btngrp'
  import BScroll from 'better-scroll'
  import { prefixStyle } from 'common/js/dom'
  const transform = prefixStyle('transform')

  export default {
    directives: {
      TransferDom
    },
    components : {
      Grid,
      GridItem,
      GroupTitle,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      LogisticBtngrp
    },
    data() {
      return {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        swiperOption: {
          // swiper optionss 所有的配置同swiper官方api配置
          autoplay: 3000,
//          direction : 'vertical',
          height: 160,
          grabCursor : true,
          setWrapperSize :true,
//          autoHeight: true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next',
//          scrollbar:'.swiper-scrollbar',
          mousewheelControl : true,
          observeParents:true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
//          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
          onTransitionStart(swiper){
//            console.log(swiper)
          },
          // more Swiper configs and callbacks...
          // ...
        },
        bottomCount: 20,
//        conHei : document.body.clientHeight - 54 + 'px'
        currNavIndex: 0,
        softwareLink:[
          {
            link:'/futureclass',
            text:'未来课堂'
          },
          {
            link:'/sourceplatform',
            text:'资源平台'
          },
          {
            link:'/robotteach',
            text:'Robot教学'
          }
        ],
        robotLink:[
          {
            link:'/robotdetail/cc-robot',
            text:'仓储Robot'
          },
          {
            link:'/robotdetail/dccs-car',
            text:'多层穿梭车'
          },
          {
            link:'/robotdetail/jgdh-agv',
            text:'激光叉车'
          },
          {
            link:'/robotdetail/zj-robot',
            text:'助教Robot'
          }
        ],
        showMenus: false,
        selectItem: 2,
        listLen: 0
      }
    },
    created(){
      this.selectItem = 0
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    mounted() {
      setTimeout(() => {
        this.listLen = this.$refs.content.clientHeight
        this._initMainScroll()
      },20)
    },
    methods: {
      _initMainScroll (){
        this.mainScroll = new BScroll(this.$refs.scrollBox,{
          probeType: 3,
          click: true,
          tab: true
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
      getNavIndex(index){
        console.log(index)
        this.currNavIndex = index
      },
      gotoUrl( url ){

        this.$router.push(url)

      }
    }
  }
</script>

<style scoped lang="less">
  @import '../assets/iconfonts/iconfont.css';

  .main-container{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    background-color: #FFF;
  }
  .scroll-box{
    position:absolute;
    width:100%;
    top:36px;
    bottom: 54px;
    z-index: 1;
  }
  h1{
    color:red;
  }
  .flexCircle{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .circleItem{
    width: 16%;
  }
  .productIcon{
    width:100%;
  }
  .nav-button{
    i{
      color:red ;
    }
  }

  .swiper-pagination-bullet-active{
    background-color: #2eb2e8;
  }
  .pageHeader{
    background-color: #f6f6f6;
    height:36px;
    display: flex;
    align-items:center ;
    vertical-align: bottom;
    text-align: center;
    position: relative;
    z-index:5;
  }
  .pageHeader span{
    line-height: 36px;
    /*height:24px;*/
    color:#4e4e4e;
    font-size:18px;
    display:block;

  }
  .pageHeader .logo-box{
    margin-left: 0.6rem;
    position:absolute;
    left:8px;
    top:6px;
  }
  .pageHeader .logo-text{
    width:100%;
    text-align: center;
    line-height:36px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .pageHeader img{
    display: flex;
    height:24px;
  }

  .nav-icon-btn{
    i{
      font-size: 24px;
      line-height: 1.0;
    }
  }
  .select-soft-list {
    position: absolute;
    z-index:10;
    bottom: 68px;
    width: 30%;
    left: 15%;

    ul {
      display: block;
      border-radius: 2px;
      background-color: #FFF;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, .5);
      padding: 6px 6px;

    li {
      line-height: 42px;
      border-bottom: 1px solid #dddddd;
      text-align: center;
      list-style-type: none;
      font-size: 14px;
      &:last-child {
         border-bottom: none;
      }

    }
  }
  .point-triggle {
    text-align: center;
    position: absolute;
    bottom: -16px;
    width: 100%;

  img {
    width: 18px;
  }

  }
  }
  .logistic-box {

  /*margin-top: 6px;*/
    ul {
      width: 100;
      display: flex;
      justify-content: space-around;

    li {
      list-style-type: none;
      width: 16%;

    .img-box {
      text-align: center;

    img {
      width: 92%;
    }

  }
    .text-box {
      text-align: center;
      font-family: "Microsoft YaHei";
      font-size: 14px;
      padding-top: 6px;
    }

  }
  }
  }

  .select-robot-list{
    left: 55%;
  }

  .navfade-enter-active, .navfade-leave-active {
    transition: all 0.3s;
    transform-origin: center bottom 0;
  }

  .navfade-enter, .navfade-leave-to {
    opacity: 0;
    transform: scale3d(0, 0, 0);
    /*transform: translate3d(0, -100px, 0)*/
  }

</style>
