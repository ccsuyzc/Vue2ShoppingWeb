<template>
  <div class="pagination">
    <button
    @click="jian"
    >上一页</button>
    <button v-show="newpag>4" @click="pushfrom">1</button>
    <button v-show="newpag>4">···</button>

    <button v-for="(item, index) in to" :key="index" 
    v-show="item >= from" 
    :class="{'actv' : newpag == (index+1)}"
    @click="pushpage(index)"
    >
      {{ item }}
    </button>

    <button v-show="newpag<pageneb-4">···</button>
    <button v-show="newpag<pageneb-4" @click="pushto">{{ pageneb }}</button>
    <button @click="add">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
 
  </div>
</template>
  
  <script>
export default {
  name: "PagiNation",
  props: ["pageNo", "pageSize", "total"],
  data() {
    return {
      newpag:this.pageNo,
    };
  },
  computed: {
    pageneb() {
      return parseInt(this.total / this.pageSize);
    },
    from() {
      if (this.newpag - 2 > 1) {
        if(this.newpag > this.pageneb-4){
        return this.pageneb-4
      }
      else {
        return this.newpag - 2;
      } 
      }
      return 1;
    },
    to() {
     if (this.newpag + 2 < this.pageneb) {
      if(this.newpag < 3){
        return 5
      }
      else {
        return this.newpag + 2;
      } 
      }
      return this.pageneb;
    },
  },
  methods:{
    add(){
        if(this.newpag<this.pageneb)
        {
          this.newpag++
          this.$emit('pushpage',this.newpag)
        }
    },
    jian(){
        if(this.newpag>1)
        {
          this.newpag--
          this.$emit('pushpage',this.newpag)
        }
    },
    pushpage(e){
      console.log(e);
      this.newpag = e+1
       this.$emit('pushpage',this.newpag)
    },
    pushfrom(){
     this.pushpage(0)
    },
    pushto(){
      this.pushpage(this.pageneb-1)
    }
  }
};
</script>
  
  <style lang="less" scoped>
.pagination {
  .actv{
      background: #409eff;
  }

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>