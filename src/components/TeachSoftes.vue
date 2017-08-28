<template>
  <div>
    <!--<x-header :title="titlename"></x-header>-->
    <group>
      <x-switch title="transparent background" v-model="show7"></x-switch>
    </group>
    <div v-transfer-dom>
      <popup v-model="show7" height="270px" is-transparent>
        <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
          <group>
            <cell title="Product" value="Donate"></cell>
            <cell title="Total" value="$10.24"></cell>
          </group>
          <div style="padding:20px 15px;">
            <x-button type="primary">Pay</x-button>
            <x-button @click.native="show7 = false">Cancel</x-button>
          </div>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { TransferDom, XHeader, Popup, Group, Cell, XButton, XSwitch, Scroller } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Popup,
    Group,
    Cell,
    XButton,
    XSwitch,
    Scroller
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
      show7: false
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
