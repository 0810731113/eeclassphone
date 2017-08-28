<template>
    <div class="li" @click="toripple($event,$el)" >
      <div class="icon-box" ><i class="iconfont icon-xiaoqiche"></i></div>
      <div class="text-box">hshshsaj</div>
      <span ref="rippleEle" :class="{animate: isActive}"></span>
    </div>
</template>

<script>

import { prefixStyle } from 'common/js/dom'

const transform = prefixStyle('transform')

export default {
  components: {

  },
  data () {
    return {
      isActive: false
    }
  },
  created (){

  },
  mounted() {

  },

  methods: {
    toripple (e , self) {
      console.log(e)
      console.log(self.offsetLeft)
      console.log(self.offsetTop)
//      self.style.backgroundColor = "red"
      let ex = e.clientX
      let ey = e.clientY
      let selfX = self.offsetLeft
      let selfY = self.offsetTop
      var rippleRadius = Math.min(self.clientWidth,self.clientHeight) / 2

      let rippleL = (ex - selfX) - ( rippleRadius / 2  )
      let rippleT = (ey - selfY) - ( rippleRadius / 2  )

      this.$refs.rippleEle.style.width = rippleRadius + 'px'
      this.$refs.rippleEle.style.height = rippleRadius + 'px'
      this.$refs.rippleEle.style.left = rippleL + 'px'
      this.$refs.rippleEle.style.top = rippleT + 'px'
      this.$refs.rippleEle.style[transform] = `scale(0)` ;
      this.isActive = true

    },
    returnBack( ){
      this.$router.back();
    }

  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../../assets/iconfonts/iconfont.css';

  .li{

    position:relative;
    overflow: hidden;
    width:20%;
    .icon-box{
      text-align: center;
      line-height:1.6rem;
      padding-top:20px;
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
    span{
      position:absolute;
      top:0 ;
      left:0 ;
      width:0px;
      height:0px;
      background-color: red ;
      /*background-color: #f2f2f2 ;*/
      border-radius: 50%;
    }
  }
  .animate{
    animation: ripple 0.45s cubic-bezier(0.4, 0.1, 0.96, 0.43);
  }
  @keyframes ripple {
    80% {
      opacity: 0.8;
      transform: scale(2.5);
    }
    100% {
      opacity: 0;
      transform: scale(2.5);
    }
  }

</style>
