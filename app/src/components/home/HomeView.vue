<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-show="!show">
              <span>请</span>
              <router-link :to="{name:'login'}">登录</router-link>
              <router-link :to="{name:'register'}" class="register">免费注册</router-link>
            </p>
            <p v-show="show">
              <!-- <router-link to="{name:login}"></router-link> -->
              <a href="#">admin</a>
              <a  @click.prevent="nologin" class="register">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link :to="{
              path:'/center/myroders'
            }">我的订单</router-link>
            <router-link :to="{
              name:'ShopCart'
            }">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <img src="../../../public/images/logo.png" alt="" />
          </a>
        </h1>
        <div class="searchArea">
          <form action="###" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model.trim="searchVal"
              @keydown.enter="search"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="search"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      searchVal: "",
      show:true
    };
  },
  mounted(){

  }
  ,
  methods: {
   async nologin(){
    console.log('点了');
    let i = await this.$store.dispatch("nologin")
    if(i){
      console.log('退出登录成功');
    }
    },
    search() {
      const msg = {
        name: "search",
        params:{
          value:this.searchVal
        }
      };

      if(this.$route.query) {
        msg.query = this.$route.query;
      }
      this.$router.push(msg);
      this.searchVal = ''
    },
  },
  computed:{
    // show(){
    //   let a = true
    //   let token = localStorage.getItem('token')
    //   if(token){
    //       a = true                   
    //   }else{
    //     a = false
    //   }
    //   return a
    //  }
    token() {
    return localStorage.getItem('token')
  }
  },
  watch:{
    token:{
      immediate:true,
      handler(){
        let token = localStorage.getItem('token')
      if(token){
          this.show = true                   
      }else{
        this.show = false
      }
     }
      }
    }
  }
</script>

<style  lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>