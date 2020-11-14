<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div class="container">
            <button class="navbar-toggler border-0 mr-auto" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <router-link class="navbar-brand" to="/st.19_shop">
                <img src="@/img/shopLogo.png" class="d-none d-sm-inline-block" style="height: 35px;" alt="">
                <img src="@/img/shopLogo-s.png" class="d-sm-none" style="height: 25px;" alt="">
            </router-link>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto font-weight-bold">
                    <router-link class="nav-link" to="/st.19_shop">首頁 <span class="sr-only">(current)</span></router-link>
                    <a class="nav-link" href="product-page.html">商品目錄</a>
                    <router-link class="nav-link" to="/login" v-if="!status">登入</router-link>
                    <a class="nav-link" href="#" @click.prevent="signout" v-else>登出</a>
                </div>
            </div>
            <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
            <div class="dropdown ml-auto">
                <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
                    <i class="fas fa-shopping-cart text-primary fa-2x d-none d-sm-inline-block"></i>
                    <i class="fas fa-shopping-cart text-primary d-sm-none"></i>
                    <span class="badge badge-pill badge-danger">2</span>
                </button>
                <div class="dropdown-menu dropdown-menu-right" style="min-width:300px">
                    <div class="px-4 py-3">
                        <h6>已選擇商品</h6>
                        <table class="table table-sm">
                            <tbody>
                                <tr>
                                    <td class="align-middle text-center">
                                        <a href="#removeModal" class="text-muted d-block btn-icon" data-toggle="modal">
                                            <i class="far fa-trash-alt"></i>
                                        </a>
                                    </td>
                                    <td class="align-middle">北歐城市掛畫</td>
                                    <td class="align-middle">2</td>
                                    <td class="align-middle text-right">$890</td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="shoppingCart.html" class="btn btn-primary btn-block btn-sm">查看購物車</a>
                    </div>
                </div>
            </div>
        </div>

    </nav>
    <!-- Modal -->
    <div class="modal fade" id="removeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">刪除訂單</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否確認刪除訂單?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-outline-danger">確定</button>
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
            status: false
        }
    },
    methods: {
        signout() {
            const api = `${process.env.APIPATH}logout`;
            const vm = this;
            this.$http.post(api).then((response) => {
                console.log(response.data.message);
                if (response.data.success) {
                    vm.$router.push('/login')
                }
            })
        },
        loginCheck() {
            console.log('look')
            const vm = this;
            const api = `${process.env.APIPATH}api/user/check`;
            vm.$http.post(api).then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    vm.status = true;
                } else {
                    vm.status = false;
                }
            })
        }
    },
    created() {
        this.loginCheck()
    }
}
</script>
