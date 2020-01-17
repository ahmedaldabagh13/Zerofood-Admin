<template>
  <div class="orders">
    <h1 class="headline">Orders</h1>
    <div class="orders-table mt-6">
      <OrdersTable />
    </div>
  </div>
</template>

<script>
import OrdersTable from "@/components/OrdersTable";
export default {
  components: {
    OrdersTable
  }
};
</script>

