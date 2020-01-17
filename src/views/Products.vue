<template>
  <div class="products">
    <h1 class="headline">Products</h1>
    <div class="products-table mt-6">
      <ProductsTable />
    </div>
  </div>
</template>

<script>
import ProductsTable from "@/components/ProductsTable";
export default {
  components: {
    ProductsTable
  }
};
</script>

