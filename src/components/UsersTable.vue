<template>
  <div>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-text-field
            v-model="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <v-btn color="white--text deep-purple accent-4" @click="initialize"
          >Reset</v-btn
        >
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" :multi-line="multiLine">
      {{ text }}
      <v-btn :color="color" text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    multiLine: true,
    snackbar: false,
    text: '',
    color: '',
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Phone', value: 'phone' },
      { text: 'Created At', value: 'createdAt' },
      { text: 'Last Login', value: 'lastLogin' }
    ],
    users: []
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      axios.get('/v1/users').then(response => (this.users = response.data.data))
    }
  }
}
</script>
