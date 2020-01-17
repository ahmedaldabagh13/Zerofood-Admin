<template>
  <div class="categories">
    <h1 class="headline">Categories</h1>
    <div class="categories-table mt-6">
      <CateTable />
    </div>
  </div>
</template>

<script>
import CateTable from "@/components/CateTable";

export default {
  components: {
    CateTable
  }
};
</script>

<style>
</style>