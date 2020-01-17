<template>
  <v-app>
    <Navbar v-if="$route.meta.requiresAuth" />
    <v-content class="mx-4 mb-4 mt-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  },
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style>
*::-webkit-scrollbar-thumb {
  background-color: blueviolet;
  outline: 1px solid blueviolet;
}

*::-webkit-scrollbar {
  width: 0.4rem;
}

*::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
