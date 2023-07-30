<template>
  <div>
    <div class="order-right">
      <div class="order-content">
        <div class="title">
          <h3>我的订单</h3>
        </div>
        <div class="chosetype">
          <table>
            <thead>
              <tr>
                <th width="29%">商品</th>
                <th width="31%">订单详情</th>
                <th width="13%">收货人</th>
                <th>金额</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="orders">
          <table class="order-item" v-for="item in records" :key="item.id">
            <thead>
              <tr>
                <th colspan="5">
                  <span class="ordertitle"
                    >{{ item.createTime }} 订单编号：{{ item.outTradeNo }}
                    <span class="pull-right delete"
                      ><img src="./images/delete.png" /></span
                  ></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ite, index) in item.orderDetailList" :key="index">
                <td width="60%">
                  <div class="typographic">
                    <img v-lazy="ite.imgUrl"  style="width: 100px;height: 100px;"/>
                    <a href="#" class="block-text"
                      >{{ite.skuName}}</a
                    >
                    <span>x{{ite.skuNum}}</span>
                    <a href="#" class="service">售后申请</a>
                  </div>
                </td>
                <td   :rowspan="item.orderDetailList.length" v-show="index==0" width="8%" class="center">{{ item.consignee }}</td>
                <td :rowspan="item.orderDetailList.length" v-show="index==0" width="13%" class="center">
                  <ul class="unstyled">
                    <li>总金额¥{{ item.totalAmount }}</li>
                    <li>在线支付</li>
                  </ul>
                </td>
                <td :rowspan="item.orderDetailList.length" v-show="index==0" width="8%" class="center">
                  <a href="#" class="btn">{{ item.orderStatusName }}</a>
                </td>
                <td :rowspan="item.orderDetailList.length" v-show="index==0" width="13%" class="center">
                  <ul class="unstyled">
                    <li>
                      <a href="mycomment.html" target="_blank">评价|晒单</a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="choose-order">
          <!-- pageNo是当前页，pageSize一页多少条，total是总数,自定义方法pushpage传来一个跳转的页码 -->
          <PagNation
            class="one"
            :pageNo="page"
            :pageSize="size"
            :total="total"
            @pushpage="PagiNation"
          ></PagNation>
        </div>
      </div>
      <!--猜你喜欢-->
      <div class="like">
        <h4 class="kt">猜你喜欢</h4>
        <ul class="like-list">
          <li class="likeItem">
            <div class="p-img">
              <img src="./images/itemlike01.png" />
            </div>
            <div class="attr">
              <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
            </div>
            <div class="price">
              <em>¥</em>
              <i>3699.00</i>
            </div>
            <div class="commit">已有6人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="./images/itemlike02.png" />
            </div>
            <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
            <div class="price">
              <em>¥</em>
              <i>4388.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="./images/itemlike03.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
          <li class="likeItem">
            <div class="p-img">
              <img src="./images/itemlike04.png" />
            </div>
            <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
            <div class="price">
              <em>¥</em>
              <i>4088.00</i>
            </div>
            <div class="commit">已有700人评价</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRoders",
  data() {
    return {
      page:1,
      size:2,
      pages:'',
      records:[],
      total:0,
      searchCount:true
    };
  },
  mounted() {
    this.getdata(this.page,this.size)
  },
  methods: {
    async getdata(page,size) {
      let i = await this.$api.getOrder(page,size);
      console.log(i);
      this.page = i.data.current
      this.pages = i.data.pages
      this.total = i.data.total
      this.searchCount = i.data.searchCount
      this.records = i.data.records
      this.size = i.data.size
    },

    async PagiNation(value){
       await this.getdata(value,2)
    }
  },
};
</script>

<style scope lang="less">
.one {
  text-align: center;
}
</style>