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
              <img slot="label" style="padding-right:10px;display:block;" src="./username.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-input title="Email"  placeholder="邮箱" name="email" v-model="email" is-type="email">
              <img slot="label" style="padding-right:10px; display:block;" src="./mail.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-input title="name"  placeholder="电话" name="tel" v-model="telphone" keyboard="number" is-type="china-mobile" >
              <img slot="label" style="padding-right:10px;display:block;" src="./telephone.png" width="24" height="24">
            </x-input>
          </group>
          <group>
            <x-textarea :max="80" placeholder="请输入你的问题" v-model="question"  @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
          </group>
          <x-button type="warn" @click.native="sendMsg" style="margin-top:24px; margin-bottom:24px;">发送</x-button>
        </div>
      </div>
    </div>
    <toast v-model="toastshow" :time="1000">send seccess</toast>
    <toast v-model="inputwarn" :time="1000" type="warn">输入有误</toast>
  </div>
</template>

<script  type="text/ecmascript-6">
import { Divider, XInput, Group,  XTextarea, XButton, Toast } from 'vux'
import BScroll from 'better-scroll'

export default {
  components: {
    Toast,
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
      question: '',
      toastshow: false ,
      inputwarn: false
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

      if(this.username == null || !/[\u4e00-\u9fa5\w]{2,20}/.test(this.username)){
        console.log("用户名输入有误")
        this.inputwarn = true
        return
      }
      if( this.telphone == null || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.telphone))){
        console.log("手机号输入有误")
        this.inputwarn = true
        return
      }
      if(this.email == null || !(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.email) )){
        console.log("邮箱输入有误")
        this.inputwarn = true
        return
      }
      if(this.question == null || !(/[\u4e00-\u9fa5\w ]{4,120}/.test(this.question))){
        console.log("问题输入有误")
        this.inputwarn = true
        return
      }

      this.$http.get('/sendemail' , {
//      this.$http.post('/eeclassphone/sendemail.do', {
//      this.$http.get('sendemail.do', {
        params:{
          username: this.username ,
          email: this.email ,
          telphone: this.telphone ,
          question: this.question
        }
      }).then(( response ) => {
        console.log(response);
        var response = response.body ;
        response = JSON.parse( JSON.stringify(response) )
        if(response.error == 0){
          this.toastshow = true
        }
        console.log(response);
      })
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
  .l-header ;
}



</style>
