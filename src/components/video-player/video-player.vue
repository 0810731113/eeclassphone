<template>
  <div id="app">
    <d-player :video="video"
              :autoplay="autoplay"
              :contextmenu="contextmenu"
              :screenshot="screenshot"
              @play="play"
              ref="player">
    </d-player>
  </div>
</template>

<script>
  import VueDPlayer from './VueDPlayer.vue'

  export default {
    props: {
      video: {
        type: Object ,
        default: function(){
          return {
//            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            url: 'http://eeresource.eeclasscloud.com/video/robotAGV_2.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          }
        }
      }
    },
    data() {
      return {
//        video: {
//          url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
//          pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
//        },
        videoUrl: 'http://static.smartisanos.cn/common/video/video-jgpro.mp4',
        autoplay: false,
        player: null,
        contextmenu: [
          {
            text: 'GitHub',
            link: 'https://github.com/MoePlayer/vue-dplayer'
          }
        ],
        screenshot: true
      }
    },
    mounted() {
      this.player = this.$refs.player.dp
    },
    methods: {
      play() {
        console.log('play callback')
      }
//      switchHandle() {
//        this.player.switchVideo({
//          url: 'http://static.smartisanos.cn/common/video/video-jgpro.mp4'
//        })
//      }
    },
    components: {
      'd-player': VueDPlayer,
    }
  }
</script>

<style scoped>
  body {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }

  .dplayer {
    width: 800px;
    margin: 0px auto;
  }

  @media (max-width: 768px) {
    .dplayer {
      width: 96%;
    }

    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 16px;
    }
  }
</style>
