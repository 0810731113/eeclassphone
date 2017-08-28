<template>
  <div class="main-container">
    <transition :name="translateName">
      <!--<keep-alive>-->
        <router-view></router-view>
      <!--</keep-alive>-->
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      translateName: 'slide-page'
    }
  },
  watch:{
    '$route' (to , from){
      console.log(from.path + " => "+ to.path)
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if(from.path == '/' || from.path == '/maincontent'){
        console.log("***************")
        this.translateName = 'slide-page'
      }else{
        this.translateName = toDepth < fromDepth ? 'slide-page' : 'slide-left'
      }

    }
  }
}
</script>

<style scoped lang="less">
  .main-container{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
  }

  .slide-page-enter-active, .slide-page-leave-active {
    transition: all .5s;
    /*transform-origin: center bottom 0;*/
  }

  .slide-page-enter, .slide-page-leave-to {
    opacity: 1;
    /*transform: scale3d(0, 0, 0);*/
    /*transform: rotateY(90deg);*/
    transform: translate3d(100%, 0, 0)
  }
  .slide-left-enter-active, .slide-left-leave-active {
    transition: all .5s;
    /*transform-origin: center center 0;*/
  }

  .slide-left-enter, .slide-left-leave-to {
    opacity: 1;
    /*transform: scale3d(0, 0, 0);*/
    /*transform: rotateY(90deg);*/
    transform: translate3d(-100%, 0, 0)
  }

</style>
