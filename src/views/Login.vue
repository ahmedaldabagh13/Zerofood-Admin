<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-toolbar class="pt-5 deep-purple accent-4">
          <v-toolbar-title class="white--text">
            <h4>Welcome to wakeels</h4>
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text class="pt-4">
            <div>
              <v-form ref="form">
                <v-text-field label="Enter your username" v-model="username" required></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  :type="password"
                  counter
                  required
                ></v-text-field>
                <v-layout>
                  <v-btn @click="login" class="white--text deep-purple accent-4">Login</v-btn>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: "07701234567",
      password: "123456"
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.username,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "dashboard" });
        });
    }
  }
};
</script>

<style>
</style>