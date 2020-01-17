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
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="deep-purple accent-4" dark class="mb-2" v-on="on"
                >New category</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">New Category</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-lg>
                  <p
                    class="text-dark text-center bg-dark py-2 px-4"
                    v-if="validationMsg != ''"
                  >
                    {{ validationMsg }}
                  </p>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.name"
                        label=" Name"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="deep-purple accent-4" text @click="close"
                  >Cancel</v-btn
                >
                <v-btn color="deep-purple accent-4" text @click="save"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small @click="navigate(item, item.id)"
          >mdi-cursor-default-click</v-icon
        >
        <v-icon small class="mr-2" @click="editItem(item)"
          >mdi-pencil-outline</v-icon
        >
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
    file: '',
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
      { text: 'Created At', value: 'createdAt' },

      { text: 'Actions', value: 'action', sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      isTop: '',
      categories: [],
      image: ''
    },
    defaultItem: {
      name: '',
      username: '',
      phone: '',
      email: ''
    },
    validationMsg: ''
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New category' : 'Edit category'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get('/category').then(({ data }) => (this.users = data))
    },
    handleFileUpload() {
      this.file = this.$refs.file
      let formData = new FormData()
      formData.append('file', this.file)
      this.editedItem.image = formData
      console.log(this.$refs.file)
    },
    async editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      //we send the edited item in put request insted
      await this.$axios.put(`/category/${item.id}`, {}, { params: item })
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    navigate(item, id) {
      this.$router.push({ name: 'project', params: { id } })
    },
    deleteItem(item) {
      const index = this.users.indexOf(item)
      this.users.slice(index, 1)
      confirm('Are you sure you want to delete this category?') &&
        //we send the deleted item in delete request insted

        this.$axios.delete(`/category/delete/${item.id}`)
      this.close()
      ;(this.text = 'A category has been deleted'), (this.color = 'red')
      this.snackbar = true
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async save() {
      //we send the new iteam in post request
      if (!this.editedItem.name)
        return (this.validationMsg = 'Name is required !')
      await this.$axios.post('/category/store', {
        name: this.editedItem['name']
      })
      this.users.push(this.editedItem)
      this.close()
      ;(this.text = 'A category has been added'), (this.color = 'green')
      this.snackbar = true
    }
  }
}
</script>
