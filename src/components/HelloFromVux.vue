<template>
  <div>
    <!--<x-header :title="titlename"></x-header>-->
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1> </h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link></cell>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from 'vux'

export default {
  components: {
    XHeader,
    Group,
    Cell
  },
  props: {
    titlename: {
      type: String,
      default: '益课信息'
    }
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
