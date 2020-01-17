<template>
  <div class="employees">
    <h1 class="headline">Users</h1>
    <div class="employees-table mt-6">
      <UsersTable />
    </div>
  </div>
</template>

<script>
import UsersTable from "@/components/UsersTable";
export default {
  components: {
    UsersTable
  }
};
</script>

