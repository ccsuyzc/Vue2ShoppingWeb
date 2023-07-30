<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartDate" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked == 1" @click="ischeckbox(item)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="sub(item.skuId,item)">-</a>
            <input autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" @change="change(item,$event)">
            <a href="javascript:void(0)" class="plus" @click="add(item.skuId)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click.prevent="deletecart(item)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="all" >
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="selectdelete">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrices }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn"  target="_blank" :to="{
            name:'trade'
          }">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    name: 'ShopCart',
    data() {
      return {
        all:true
      }
    },
    methods:{
     selectdelete(){
        this.$store.dispatch('deleteCartAll')
        this.getdata()
     },
     selectAll(){
      this.$store.dispatch('selectAll',this.all)
     },
     async ischeckbox(item){
      // this.cartDate.every( i =>{ i.isChecked == 1}) ? this.all = true : this.all = false
        const data = {
          id: item.skuId
        }
        data.isChecked = Number(!item.isChecked)
        console.log(data);
       await this.$store.dispatch('checkCart',data),
          this.getdata()
      },
      getdata(){
        console.log('重新获取购物车列表数据');
        this.$store.dispatch('getCart')
      },
    async add(id){
        const data = {
          id:id,
          val:1
        }
        try {
        await this.$store.dispatch('addCartDate',data)
        this.getdata();
      } catch (error) {
        alert("修改数量失败");
      }
 
      },
     async sub(id,item){
        const data = {
          id:id,
          val:-1
        }
        if(item.skuNum==1){
           data.val = 0
        }
        try {
        await this.$store.dispatch('addCartDate',data)
        this.getdata();
      } catch (error) {
        alert("修改数量失败");
      }
      },
     async change(item,e){
        const data = {
          id:item.skuId
        }
       let value = e.target.value*1
        if(isNaN(value)){
          data.val = 0
          await this.$store.dispatch('addCartDate',data)
          return
        }
        if(value >item.skuNum){
          data.val = value  -  item.skuNum
        }else{
          data.val = item.skuNum - value
        }
        await this.$store.dispatch('addCartDate',data)
      },

      async deletecart(item){
        console.log('删除数据');
             await this.$store.dispatch('deleteCartData',item.skuId)
            console.log('重新获取数据');
           await this.getdata();
      },
    },
    mounted(){
      this.getdata()
    },
    computed:{
      ...mapState({
        // 格式写错一次 ()=>()
        cartDate:(state)=>(state.cart.cartDate || [])}),
        totalPrices(){
            let sum = 0
             this.cartDate.forEach(item => {
                sum += item.skuPrice * item.skuNum
             });        
           return sum
        },
        // all(){
        //   let i = this.cartDate.every((item)=>{
        //     return item.isChecked == 1
        //   })
        //   return i
        // }
    },
    watch:{
      all:{
        // immediate:true, //先执行一次
        deep:true,
        handler(newval){
          this.$store.dispatch('selectAll',newval)
          this.getdata()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

  

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>