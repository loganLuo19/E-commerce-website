<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <!-- header -->
    <header class="container">
      <div class="jumbotron jumbotron-fluid banner-bg d-flex align-items-end">
        <div class="container">
          <div class="bg-lighter py-3 text-center d-none d-sm-block">
            <h2 class="display-3 text-primary font-weight-bold letter-spacing">
              小資族的裝潢術
            </h2>
            <p class="lead font-weight-bold text-info">
              <em>無論空間大小，都可以很有個性</em>
            </p>
          </div>
        </div>
      </div>
    </header>
    <!-- main -->
    <div class="container">
      <div class="row">
        <!-- 左側選單 -->
        <div class="col-md-3 my-3">
          <div class="list-group sticky-top" style="top: 10px">
            <a
              href="#pane-1"
              class="list-group-item list-group-item-action list-group-item-info active"
              data-toggle="list"
            >
              <i class="fas fa-meteor mr-2"></i>全部商品
            </a>
            <a
              href="#pane-2"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
              @click.prevent="sortByCategory('家飾')"
            >
              <i class="fas fa-air-freshener mr-2"></i>居家飾品
            </a>
            <a
              href="#pane-3"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
              @click.prevent="sortByCategory('家具')"
            >
              <i class="fas fa-couch mr-1"></i>嚴選家具
            </a>
            <a
              href="#pane-4"
              class="list-group-item list-group-item-action list-group-item-info"
              data-toggle="list"
              @click.prevent="sortByCategory('小物')"
            >
              <i class="fas fa-glass-martini-alt mr-2"></i>生活小物
            </a>
          </div>
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-5">
              <div class="input-group my-3">
                <input
                  type="search"
                  class="form-control"
                  placeholder="輸入關鍵字..."
                  v-model="searchItem"
                />
                <div class="input-group-append">
                  <button
                    @click="search(searchItem)"
                    class="btn btn-outline-info btn-sm"
                    type="button"
                    id="button-addon2"
                  >
                    搜尋
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content">
            <div class="tab-pane active" id="pane-1">
              <div class="row">
                <!--product card-->
                <div
                  class="col-lg-4 col-md-6 my-3"
                  v-for="item in products"
                  :key="item.id"
                >
                  <div class="card h-100 border-0 box-shadow">
                    <div
                      class="card-img-top card-section-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>

                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-primary font-weight-bold">{{
                          item.title
                        }}</a>
                      </h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5 text-info" v-if="!item.price">
                          原價 {{ item.origin_price | currency }}
                        </div>
                        <del class="h6 text-secondary" v-if="item.price"
                          >原價 {{ item.origin_price | currency }}</del
                        >
                        <div class="h4 text-right text-info" v-if="item.price">
                          現在只要 {{ item.price | currency }}
                        </div>
                      </div>
                    </div>
                    <a class="likeBtn text-soft">
                      <i
                        class="likeBtnAction fas fa-heart"
                        v-if="item.switchLikeBtn"
                        @click="switchLike(item)"
                      ></i>
                      <i class="far fa-heart" v-else @click="switchLike(item)"></i>
                    </a>
                    <div class="d-flex">
                      <button
                        class="btn btn-block btn-soft rounded-0 text-primary"
                        @click="toProductInof(item.id)"
                      >
                        商品資訊
                      </button>
                      <button
                        type="button"
                        class="btn btn-success rounded-0 text-primary"
                        @click="addToCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin d-none"></i>
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!--Pagination-->
              <Pagination :pages="pagination" @emit-page="getProducts"></Pagination>
            </div>

            <div class="tab-pane" id="pane-2">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 my-3"
                  v-for="item in featureProduct"
                  :key="item.id"
                >
                  <div class="card h-100 border-0 box-shadow">
                    <div
                      class="card-img-top card-section-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>

                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-primary font-weight-bold">{{
                          item.title
                        }}</a>
                      </h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5 text-info" v-if="!item.price">
                          原價 {{ item.origin_price | currency }}
                        </div>
                        <del class="h6 text-secondary" v-if="item.price"
                          >原價 {{ item.origin_price | currency }}</del
                        >
                        <div class="h4 text-right text-info" v-if="item.price">
                          現在只要 {{ item.price | currency }}
                        </div>
                      </div>
                    </div>
                    <a class="likeBtn text-soft">
                      <i
                        class="likeBtnAction fas fa-heart"
                        v-if="item.switchLikeBtn"
                        @click="switchLike(item)"
                      ></i>
                      <i class="far fa-heart" v-else @click="switchLike(item)"></i>
                    </a>
                    <div class="d-flex">
                      <button
                        class="btn btn-block btn-soft rounded-0 text-primary"
                        @click="toProductInof(item.id)"
                      >
                        商品資訊
                      </button>
                      <button
                        type="button"
                        class="btn btn-success rounded-0 text-primary"
                        @click="addToCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin d-none"></i>
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="pane-3">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 my-3"
                  v-for="item in featureProduct"
                  :key="item.id"
                >
                  <div class="card h-100 border-0 box-shadow">
                    <div
                      class="card-img-top card-section-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>

                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-primary font-weight-bold">{{
                          item.title
                        }}</a>
                      </h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5 text-info" v-if="!item.price">
                          原價 {{ item.origin_price | currency }}
                        </div>
                        <del class="h6 text-secondary" v-if="item.price"
                          >原價 {{ item.origin_price | currency }}</del
                        >
                        <div class="h4 text-right text-info" v-if="item.price">
                          現在只要 {{ item.price | currency }}
                        </div>
                      </div>
                    </div>
                    <a class="likeBtn text-soft">
                      <i
                        class="likeBtnAction fas fa-heart"
                        v-if="item.switchLikeBtn"
                        @click="switchLike(item)"
                      ></i>
                      <i class="far fa-heart" v-else @click="switchLike(item)"></i>
                    </a>
                    <div class="d-flex">
                      <button
                        class="btn btn-block btn-soft rounded-0 text-primary"
                        @click="toProductInof(item.id)"
                      >
                        商品資訊
                      </button>
                      <button
                        type="button"
                        class="btn btn-success rounded-0 text-primary"
                        @click="addToCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin d-none"></i>
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane" id="pane-4">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 my-3"
                  v-for="item in featureProduct"
                  :key="item.id"
                >
                  <div class="card h-100 border-0 box-shadow">
                    <div
                      class="card-img-top card-section-img"
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>

                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="text-primary font-weight-bold">{{
                          item.title
                        }}</a>
                      </h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5 text-info" v-if="!item.price">
                          原價 {{ item.origin_price | currency }}
                        </div>
                        <del class="h6 text-secondary" v-if="item.price"
                          >原價 {{ item.origin_price | currency }}</del
                        >
                        <div class="h4 text-right text-info" v-if="item.price">
                          現在只要 {{ item.price | currency }}
                        </div>
                      </div>
                    </div>
                    <a class="likeBtn text-soft">
                      <i
                        class="likeBtnAction fas fa-heart"
                        v-if="item.switchLikeBtn"
                        @click="switchLike(item)"
                      ></i>
                      <i class="far fa-heart" v-else @click="switchLike(item)"></i>
                    </a>
                    <div class="d-flex">
                      <button
                        class="btn btn-block btn-soft rounded-0 text-primary"
                        @click="toProductInof(item.id)"
                      >
                        商品資訊
                      </button>
                      <button
                        type="button"
                        class="btn btn-success rounded-0 text-primary"
                        @click="addToCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin d-none"></i>
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "../Pagination";
import Alert from "../AlertMessage";

export default {
  data() {
    return {
      products: [],
      product: {}, //單一商品資料
      isLoading: false, //網頁loading效果
      pagination: {}, //分頁設定
      status: {
        //判斷正在讀取中的元素
        loadingInfo: "",
        loadingCart: "",
      },

      featureProduct: [],
      searchItem: "", //存取搜尋文字內容
      result: [], //存取搜尋結果
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        const data = response.data.products;
        vm.products = data;
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
      });
    },
    toProductInof(id) {
      this.$router.push(`/product_info/${id}`);
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.status.loadingCart = id;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http
        .post(api, {
          data: cart,
        })
        .then((response) => {
          // console.log(response.data);
          vm.status.loadingCart = "";
          vm.getCart();
          $("#productModal").modal("hide");
          vm.isLoading = false;
          vm.$bus.$emit("message:push", response.data.message, "info");
        });
    },
    sortByCategory(categroy) {
      const vm = this;
      vm.featureProduct = [];
      vm.products.forEach((item) => {
        if (item.category == categroy) {
          vm.featureProduct.push(item);
        }
      });
      // console.log(this.featureProduct);
    },
    getCart() {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.itemInCart = response.data.data;
        vm.isLoading = false;
      });
    },
    search(content) {
      const vm = this;
      vm.products.forEach((item) => {
        if (item.title.indexOf(content) !== -1) {
          vm.result.push(item);
          vm.products = vm.result;
        }
      });
      if (vm.result.length == 0) {
        vm.$bus.$emit("message:push", "找不到該商品", "danger");
      }
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    searchItem: function () {
      this.products.length = 0;
      this.getProducts();
    },
  },
  components: {
    Pagination,
    Alert,
  },
};
</script>
