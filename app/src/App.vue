<template>
<div>
<TypeSearch></TypeSearch>
<router-view></router-view>
<FooterView v-show="$route.meta.show"></FooterView>
</div>
</template>

<script>

import FooterView from './components/footer/FooterView.vue'


export default {
  name: 'App',
  components: {
    FooterView,
  },
  mounted(){
    this.$store.dispatch("TypeNav");
  }
}
</script>

<style>

</style>
