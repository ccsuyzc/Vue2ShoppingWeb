<template>
  <div>
     <TypeNav></TypeNav>
     <ListContainer></ListContainer>
     <TodayRecommend></TodayRecommend>
     <Rank></Rank>
     <Like></Like>
     <Floor v-for="item in FloorData" :key="item.id" :data="item"></Floor>
     <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './components/ListContainer.vue';
import TodayRecommend from './components/TodayRecommend'
import Rank from './components/Rank.vue'
import Like from './components/Like.vue'
import Floor from  './components/FloorVue.vue'
import Brand from "./components/Brand.vue"
import { mapState } from 'vuex';

export default {
      name:'HomeView',
      components:{
   
        ListContainer,
        TodayRecommend,
        Rank,
        Like,
        Floor,
        Brand
      },
      mounted(){
        this.$store.dispatch('Floor')
      },
      computed:{
        ...mapState({
          FloorData: (state) => state.home.FloorData,
        })
      }
}
</script>

<style>

</style>