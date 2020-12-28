<template>
  <div>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent">
          <li class="breadcrumb-item">
            <router-link to="/st.19_shop">首頁</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/product_page">{{ product.category }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-4 mt-3">
          <div class="sticky-top" style="top: 10px">
            <h2 class="h3">{{ product.title }}</h2>
            <div class="d-flex justify-content-end align-items-end">
              <span class="text-muted"
                ><s>售價: {{ product.origin_price | currency }} 元</s></span
              >
              <span class="h3 ml-auto mb-0 text-danger"
                ><small>特價:</small
                ><strong> {{ product.price | currency }} 元</strong></span
              >
            </div>
            <hr />
            <br />
            <form class="">
              <div class="form-group d-flex">
                <label for="type" style="min-width: 35.69px">樣式: </label>
                <select
                  class="form-control border-primary form-control-sm ml-2"
                  style="max-width: 200px"
                  id="type"
                  disabled
                >
                  <option selected disabled>--請選擇樣式--</option>
                  <option>赫爾辛基款</option>
                  <option>約恩蘇款</option>
                  <option>赫爾辛基-教堂款</option>
                </select>
              </div>
            </form>
            <div class="input-group my-4">
              <select
                name=""
                id=""
                class="form-control mr-1 border-primary form-control-sm rounded"
                v-model="product.num"
              >
                <option :value="num" v-for="num in 10" :key="num">
                  {{ num }} {{ product.unit }}
                </option>
              </select>
              <a
                href="#"
                class="btn btn-primary btn-sm"
                @click.prevent="addToCart(product.id, product.num)"
              >
                <i class="fas fa-cart-plus"></i>
                加入購物車
              </a>
            </div>
            <hr />
          </div>
        </div>
        <div class="col-md-8 mt-3">
          <h2 class="font-weight-bold">{{ product.title }}</h2>
          <p>
            {{ product.description }}
          </p>
          <div class="text-center mt-4">
            <img :src="product.imageUrl" class="img-fluid" alt="Responsive image" />
            <div class="card bg-light my-4">
              <div class="card-header h4">商品內容</div>
              <div class="card-body">
                <p class="card-text text-left">
                 {{product.content}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      productId: "", //存取網址上productId
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const id = vm.productId;

      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.product = response.data.product;
        console.log(vm.product);
        response.data.product.num = 1;
      });
    },
    addToCart(id, qty = 1) {
      const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      //   vm.status.loadingCart = id;
      //   vm.isLoading = true;
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
          //   vm.status.loadingCart = "";
          //   vm.getCart();
          //   vm.isLoading = false;
          vm.$bus.$emit("message:push", response.data.message, "info");
        });
    },
  },
  created() {
    this.productId= this.$route.params.productId;
    console.log(this.productId);
    this.getProduct();
    

  },
};
</script>
