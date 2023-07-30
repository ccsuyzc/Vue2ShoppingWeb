<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div 
      @mouseleave="mouseleave()" 
      @click="RouterPush" 
      >
        <h2 class="all"  @mouseenter="enteractive"    >全部商品分类</h2>
        <transition name="sidebarNav">
          <div class="sort" v-show="show">
          <div class="all-sort-list2">
            <div
              class="item bo"
              v-for="(TypeNavData, index) in TypeNavDatas"
              :key="TypeNavData.categoryId"
              @mouseenter="mouseenter(index)"
              :class="index == active ? 'active' : ''"
            >
              <h3>
                <a
                  href=""
                  data-a="a"
                  data-a1="a1"
                  :data-id="TypeNavData.categoryId"
                  :data-name="TypeNavData.categoryName"
                  >{{ TypeNavData.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="ite in TypeNavData.categoryChild"
                  :key="ite.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        href=""
                        data-a="a"
                        data-a2="a2"
                        :data-id="ite.categoryId"
                        :data-name="ite.categoryName"
                        >{{ ite.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="it in ite.categoryChild" :key="it.categoryId">
                        <a
                          href=""
                          data-a="a"
                          data-a3="a3"
                          :data-id="it.categoryId"
                          :data-name="it.categoryName"
                          >{{ it.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 防抖和节流全部引入
// import _ from 'lodash'
// 按需引入
// throttle 是节流 最好别用箭头函数
import throttle from "lodash/throttle";

import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      active: -1,
      show:true
    };
  },
  methods: {
    // es6的写法，但是与防抖和节流搭配不了
    // mouseenter(index){
    //         this.active = index
    // },
    mouseleave() {
      this.active = -1;
      this.leaveactive()
    },

    // es5的写法
    mouseenter: throttle(function (index) {
      this.active = index;
    }, 50),

    //点击单个商品进行跳转 
    RouterPush(e) {
        // 阻止a链接的默认事件
        e.preventDefault()
      const msg = {
        name: "search",
      }
      if(this.$route.params){
        msg.params = this.$route.params
      }

      if (e.target.dataset.a) {
        if (e.target.dataset.a1) {
          msg.query =   {
              name: e.target.dataset.name,
              category1Id: e.target.dataset.id,
            }
          this.$router.push(msg);
        } else if (e.target.dataset.a2) {
          msg.query =   {
              name: e.target.dataset.name,
              category2Id: e.target.dataset.id,
            }
          this.$router.push(msg);
        } else {
          msg.query =   {
              name: e.target.dataset.name,
              category3Id: e.target.dataset.id,
            }
          this.$router.push(msg);
        }
      }
    },

    //移入 
    enteractive(){
      if(this.$route.name != 'home'){
        this.show = true
    }
    },
    // 移出
    leaveactive(){
      if(this.$route.name != 'home'){
        this.show = false        
    }
    }
  },
  mounted() {
    // 除主页默认隐藏
    if(this.$route.name != 'home'){
            this.show = false
    }
  },
  computed: {
    // ...mapState(['TypeNavData',])   如果存放在大仓库

    // 存放在小仓库要这样获取
    ...mapState({
      TypeNavDatas: (state) => state.home.TypeNavData,
    }),
  },
};
</script>

<style scoped lang="less">

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #020202;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          // &:hover{
          //   background:red;
          // }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        // .item:hover{
        //    background:red;
        // }
      }
    }

     /*过渡动画:商品分类 进入阶段*/
     .sidebarNav-enter {
      height: 0px;
    }

    .sidebarNav-enter-active {
      transition: all 0.3s;
    }
    .sidebarNav-enter-to {
      height: 461px;
    }
  }
}

.active {
  background: red;
}
</style>