<template>
  <div>
    <div class="logistic-box">
      <ul>
        <li v-for="(item, index) in logisticInfo" key="index">
          <div @click="toAnotherPage(item)" class="img-box"><img :src="item.icon" alt=""></div>
          <div class="text-box">{{item.text}}</div>
        </li>
      </ul>
    </div>
    <div class="logistic-box" style="margin-top:12px;">
      <ul>
        <li v-for="(item, index) in logisticInfo1" key="index">
          <div @click="toAnotherPage(item)" class="img-box"><img :src="item.icon" alt=""></div>
          <div class="text-box">{{item.text}}</div>
        </li>
      </ul>
    </div>
    <!--<div class="industry-box">-->
      <!--<div class="ul">-->
        <!--<div class="li" v-for="(item , index) in industryInfo" key="item.id" >-->
          <!--<div class="icon-box" @click="toAnotherPage(item,$event)" ><i :class="item.iconclass"></i></div>-->
          <!--<div class="text-box">{{item.text}}</div>-->
          <!--<span v-if=""></span>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="teach-software-box">
      <div class="left-box" @click="toSoftwarePage('futureclass')" >
        <img src="../../assets/icons/futureClass.png" alt="">
      </div>
      <div class="right-box">
        <div class="right-up-box" @click="toSoftwarePage('sourceplatform')">
          <img src="../../assets/icons/sourcePlatform.png" alt="">
        </div>
        <div class="right-down-box" @click="toSoftwarePage('robotteach')">
          <img src="../../assets/icons/robotTeach.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Tabbar, TabbarItem, Group, Cell} from 'vux'
  import RippleDemo from '../ripple-demo/ripple-demo'
  export default {
    directives: {
      TransferDom
    },
//    props: {
//      id: {
//        type: Number,
//        default: -1
//      }
//    },
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
        showMenus: false,
        currNavIndex: 0,
        industryInfo: [
          {
            id: 'industry01',
            text: '仓储Robot',
            iconclass:'iconfont icon-robot' ,
            url: '/robotdetail/cc-robot'

          },
          {
            id: 'industry02',
            text: '多层穿梭车',
            iconclass:'iconfont icon-car' ,
            url: '/robotdetail/dccs-car'
          },
          {
            id: 'industry03',
            text: '无人激光叉车',
            iconclass:'iconfont icon-chache1' ,
            url: '/robotdetail/jgdh-agv'
          },
          {
            id: 'industry04',
            text: '助教Robot',
            iconclass:'iconfont icon-yun2' ,
            url: '/robotdetail/zj-robot'
          },
          {
            id: 'industry05',
            text: '立体货架',
            iconclass:'iconfont icon-gelou' ,
            url: '/logisticdetail/lthj'
          }
        ],
        logisticInfo: [
          {
            id: 'lo001' ,
            text: '仓储机器人',
            icon:require('../../assets/icons/ccjqr.png'),
            url: '/robotdetail/cc-robot'
          },
          {
            id: 'lo002' ,
            text: '多层穿梭车',
            icon:require('../../assets/icons/dccsc.png'),
            url: '/robotdetail/dccs-car'
          },
          {
            id: 'lo003' ,
            text: '激光叉车',
            icon:require('../../assets/icons/jgcc.png'),
            url: '/robotdetail/jgdh-agv'
          },
          {
            id: 'lo004' ,
            text: '助教机器人',
            icon:require('../../assets/icons/zjjqr.png'),
            url: '/robotdetail/zj-robot'
          },
          {
            id: 'lo005' ,
            text: '仓储设备',
            icon:require('../../assets/icons/ccsb.png'),
            url: '/logisticlist/0'
          }
        ],
        logisticInfo1: [
          {
            id: 'lo001' ,
            text: '搬运设备',
            icon:require('../../assets/icons/zdbysb.png'),
            url: '/logisticlist/1'
          },
          {
            id: 'lo002' ,
            text: '输送设备',
            icon:require('../../assets/icons/ssxsb.png'),
            url: '/logisticlist/2'
          },
          {
            id: 'lo003' ,
            text: '分流设备',
            icon:require('../../assets/icons/flzx.png'),
            url: '/logisticlist/3'
          },
          {
            id: 'lo004' ,
            text: '拣选系统',
            icon:require('../../assets/icons/fzjxxt.png'),
            url: '/logisticlist/4'
          },
          {
            id: 'lo005' ,
            text: '港口实训',
            icon:require('../../assets/icons/gksxsb.png'),
            url: '/logisticlist/6'
          }
        ]
      }
    },
    methods: {
      toAnotherPage(item , e){
        this.$router.push({
          path: item.url
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
  @import './icon/iconfont.css';

  .teach-software-box{
    width:98%;
    margin: 18px auto;
    display: flex;
    display:-webkit-box;
    height:250px;
    align-items:strecth;
    .left-box{
      width:38.2%;
      background-color: #f3f3f3;
      border: 6px solid #FFF;
      box-sizing: border-box;
      text-align: center;
      overflow: hidden;
    }
    .right-box{
      width:61.3%;
      height:100%;
      display:-webkit-box;
      display:flex;
      flex-direction:column ;
      .right-up-box{
        width:100%;
        height:50%;
        flex-grow:1;
        background-color: #f3f3f3;
        border: 6px solid #FFF;
        box-sizing: border-box;
        text-align: center;
      }
      .right-down-box{
        width:100%;
        height:50%;
        flex-grow:1;
        background-color: #f3f3f3;
        border: 6px solid #FFF;
        box-sizing: border-box;
        text-align: center;
      }
    }
    img{
      width:100%;
      height:100%;
    }
  }


  .nav-icon-btn {
    i {
      font-size: 24px;
      line-height: 1.0;
    }
  }
  .industry-box{
    .ul{
      display:flex;
      margin-top:24px;
      width:100%;
      justify-content: space-around;
      .li{
        list-style-type: none;
        width:20%;
        .icon-box{
          text-align: center;
          line-height:1.6rem;
          i{
            font-size: 46px;
            color:#2eb2e8;
          }
        }
        .text-box{
          margin-top: 8px;
          text-align:center;
          font-size: 8px;
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
          font-size: 8px;
          padding-top: 6px;
        }
      }
    }
  }



</style>
