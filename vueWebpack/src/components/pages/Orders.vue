<template>
<div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-5">
        <thead>
            <tr>
                <th width="120">購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th width="120">應付金額</th>
                <th width="80">是否付款</th>
                <th width="80">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in orders" :key="item.id">
                <td>{{item.paid_date}}</td>
                <td>{{item.user.email}}</td>
                <td>{{item.products}}</td>
                <td class="text-right">{{item.total | currency}}</td>
                <td class="text-right">{{item.is_paid}}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-info btn-sm" @click="openModal()">編輯</button>
                    </div>

                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import $ from 'jquery';
export default {
    data() {
        return {
            orders: [], //存取訂單資料
            isLoading: false, //網頁loading效果
        }
    },
    methods: {
        getOrders() {
            const api = `${process.env.APIPATH}api/${process.env.CUSTOMPATH}/admin/orders?page=1`;
            const vm = this;
            vm.isLoading = true;
            vm.$http.get(api).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.orders = response.data.orders;
            })
        }
    },
    created() {
        this.getOrders();
    }
}
</script>
