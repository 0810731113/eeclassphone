<template>
  <div>
    <div class="logistic-box">
      <ul>
        <li v-for="(item, index) in logisticInfo" key="index">
          <div @click="toAnotherPage" class="img-box"><img :src="item.icon" alt=""></div>
          <div class="text-box">{{item.text}}</div>
        </li>
      </ul>
    </div>
    <div class="industry-box">
      <div class="ul">
        <div class="li" v-for="(item , index) in industryInfo" key="item.id" >
          <div class="icon-box" @click="toAnotherPage(index,$event)" ><i :class="item.iconclass"></i></div>
          <div class="text-box">{{item.text}}</div>
          <span v-if=""></span>
        </div>
      </div>
    </div>
    <!--<div class="industry-box">-->
      <!--<div class="ul">-->
        <!--<ripple-demo v-for="(item, index) in industryInfo" key="index"></ripple-demo>-->
      <!--</div>-->
    <!--</div>-->
    <div class="teach-software-box">
      <div class="left-box" @click="toSoftwarePage('futureclass')">
        未来课堂
      </div>
      <div class="right-box">
        <div class="right-up-box" @click="toSoftwarePage('sourceplatform')">资源平台</div>
        <div class="right-down-box" @click="toSoftwarePage('robotteach')">Robot教学</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Group, Cell} from 'vux'
  import RippleDemo from '../ripple-demo/ripple-demo'
  export default {
    directives: {
      TransferDom
    },
    props: {
      name: {
        type: String,
        default: 'Vue!'
      }
    },
    components: {
      XHeader,
      Actionsheet,
      ButtonTab,
      ButtonTabItem,
      Tabbar,
      TabbarItem,
      Group,
      Cell,
      RippleDemo
    },
    data () {
      return {
        menus: {
          menu1: 'Take Photo',
          menu2: 'Choose from photos'
        },
        showMenus: false,
        currNavIndex: 0,
        industryInfo: [
          {
            id: 'industry01',
            text: '多层穿梭车',
            iconclass:'iconfont icon-xiaoqiche'
          },
          {
            id: 'industry02',
            text: '激光叉车AGV',
            iconclass:'iconfont icon-jiguangqiegeji'
          },
          {
            id: 'industry03',
            text: '助教Robot',
            iconclass:'iconfont icon-jiqiren'
          },
          {
            id: 'industry04',
            text: '综合云平台',
            iconclass:'iconfont icon-yun2'
          }
        ],
        logisticInfo: [
          {
            id: 'lo001' ,
            text: '普通仓储',
            icon:'http://pic.eeclasscloud.com/eeclass-offfice/logisticIcon_03.png'
          },
          {
            id: 'lo002' ,
            text: '自动搬运',
            icon:'http://pic.eeclasscloud.com/eeclass-offfice/logisticIcon_05.png'
          },
          {
            id: 'lo003' ,
            text: '输送线',
            icon:'http://pic.eeclasscloud.com/eeclass-offfice/logisticIcon_07.png'
          },
          {
            id: 'lo004' ,
            text: '分流转向',
            icon:'http://pic.eeclasscloud.com/eeclass-offfice/logisticIcon_09.png'
          },
          {
            id: 'lo005' ,
            text: '智能超市',
            icon:'http://pic.eeclasscloud.com/eeclass-offfice/logisticIcon_11.png'
          }
        ]
      }
    },
    methods: {
      toAnotherPage(index , e){
        this.$router.push({
          path: '/logisticdetail'
        })
      },
      toSoftwarePage(url){
        this.$router.push({
          path: '/' + url
        })
      }

    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/iconfonts/iconfont.css';

  .teach-software-box{
    width:98%;
    margin: 18px auto;
    display: flex;
    display:-webkit-flex;
    height:250px;
    .left-box{
      width:38.2%;
      background-color: #f3f3f3;
      border: 6px solid #FFF;
      box-sizing: border-box;
      text-align: center;
      padding-top: 28%;

    }
    .right-box{
      width:61.3%;
      display:flex;
      height:100%;
      display:-webkit-flex;
      display:flex;
      flex-direction:column ;
      .right-up-box{
        width:100%;
        flex-grow:1;
        background-color: #f3f3f3;
        border: 6px solid #FFF;
        box-sizing: border-box;
        text-align: center;
        padding-top: 32px;
      }
      .right-down-box{
        width:100%;
        flex-grow:1;
        background-color: #f3f3f3;
        border: 6px solid #FFF;
        box-sizing: border-box;
        text-align: center;
        padding-top: 32px;
      }
    }
  }


  .nav-icon-btn {
    i {
      font-size: 24px;
      line-height: 1.0;
    }
  }
  .main-container {
    /*position:relative;*/
  }
  .industry-box{
    .ul{
      display:flex;
      margin-top:36px;
      width:100%;
      justify-content: space-around;
      .li{
        list-style-type: none;
        width:20%;
        .icon-box{
          text-align: center;
          line-height:1.6rem;
          i{
            font-size: 48px;
            color:#2eb2e8;
          }
        }
        .text-box{
          margin-top: 8px;
          text-align:center;
          font-size: 14px;
        }
      }
    }
  }
  .logistic-box{
  /*margin-top: 6px;*/
    ul{
      width:100;
      display: flex;
      justify-content:space-around;
      li{
        list-style-type:none;
        width:16%;
        .img-box{
            text-align:center;
            img{
              width:84%;
            }
        }
        .text-box{
          text-align: center;
          font-family: "Microsoft YaHei";
          font-size: 14px;
          padding-top: 6px;
        }
      }
    }
  }



</style>
