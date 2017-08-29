<template>
  <div class="main-container" ref="logisticDetailMainCon">
    <div class="l-header">
      <div @click="returnBack" class="return-box">
        <i class="iconfont icon-fanhui3"></i>
      </div>
      联系我们
    </div>
    <!--<div class="banner-box"></div>-->
    <div class="scroll-box" ref="scrollBox">
      <div class="content" ref="content">
        <div class="content-box">
          <h5 style="color:#b7bdc4;">
            亲爱的用户,请输入你要咨询的问题,我们会尽快回复你
          </h5>
          <group>
            <x-input title="name"  placeholder="姓名" name="username" v-model="username" is-type="china-name" >
              <img slot="label" style="padding-right:10px;display:block;" src="http://eeresource.eeclasscloud.com/logisticIcon/message_03.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-input title="Email"  placeholder="邮箱" name="email" v-model="email" is-type="email">
              <img slot="label" style="padding-right:10px; display:block;" src="http://eeresource.eeclasscloud.com/logisticIcon/message_07.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-input title="name"  placeholder="电话" name="tel" v-model="telphone" keyboard="number" is-type="china-mobile" >
              <img slot="label" style="padding-right:10px;display:block;" src="http://eeresource.eeclasscloud.com/logisticIcon/message_10.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-textarea :max="80" placeholder="请输入你的问题" v-model="question"  @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
          </group>
          <x-button type="warn" @click.native="sendMsg" style="margin-top:24px; margin-bottom:24px;">发送</x-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script  type="text/ecmascript-6">
import { Divider, XInput, Group,  XTextarea, XButton } from 'vux'
import BScroll from 'better-scroll'

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
      username: '' ,
      email: '' ,
      telphone: '' ,
      question: ''
    }
  },
  methods: {
    onEvent (event) {
      console.log('on', event)
    },
    returnBack( ){
      this.$router.back();
    },
    sendMsg() {
      console.log('进入方法')
      this.$http.get('/sendemail' , {
        params:{
          username: this.username ,
          email: this.email ,
          telphone: this.telphone ,
          question: this.question
        }
      }).then(( response ) => {
        var response = response.body ;

        console.log(response);
      })
    }

  },
  watch: {

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
  z-index:1200;
  background-color: #FFF;
}

.scroll-box{
  margin-top: 36px;
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

.content-box{
  width:96%;
  margin: 6px auto ;
  padding-top: 12px;
  text-align:center;
  margin-bottom: 12px;
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

.banner-box{
  background-image: url("./connect-header.jpg") ;
  width: 100%;
  height: 0 ;
  background-size: cover;
  position: relative;
  z-index:1;
  transform-origin: top;
  padding-top: 53%;
}

</style>
