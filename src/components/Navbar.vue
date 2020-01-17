<template>
  <nav>
    <v-app-bar color="white" dense light app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer">
        <v-icon v-if="drawer">mdi-close</v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :src="bg"
      relative
      dark
      app
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              src="http://www.hostdcenter.com/core/wp-content/uploads/2019/05/dclogonew.png"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>ZEROFOOD Admin</v-list-item-title>
            <v-list-item-subtitle>Ahmed Aldabagh</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          active-class="primary accent-3 white--text"
          link
          :to="link.to"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      right: false,
      color: 'primary',
      miniVariant: false,
      expandOnHover: false,
      background: false,
      dark: true,
      links: [
        {
          title: 'Dashboard',
          to: '/',
          icon: 'mdi-view-dashboard'
        },
        {
          title: 'Products',
          to: '/products',
          icon: 'mdi-package-variant'
        },
        {
          title: 'Categories',
          to: '/categories',
          icon: 'mdi-format-list-bulleted'
        },
        {
          title: 'Orders',
          to: '/orders',
          icon: 'mdi-package-variant-closed'
        }
      ]
    }
  },
  computed: {
    bg() {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('destroyToken').then(response => {
        this.$router.push({ name: 'login' })
      })
    }
  }
}
</script>

<style scoped></style>
