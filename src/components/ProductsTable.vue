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
          <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn color="dark accent-4" dark class="mb-2" v-on="on"
                >New Product</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">New Product</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-lg>
                  <p
                    class="text-dark text-center bg-dark py-2 px-4"
                    v-if="validateMsg != ''"
                  >
                    {{ validateMsg }}
                  </p>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                        required
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                        v-model="editedItem.price"
                        label=" Price"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <select v-model="editedItem.category">
                        <option
                          v-for="(item, index) in items"
                          :key="index"
                          :value="item.id"
                          >{{ item.name }}</option
                        >
                      </select>
                      <v-select
                        v-model="editedItem.category"
                        :items="itemsName"
                        menu-props="auto"
                        label="Select"
                        hide-details
                        prepend-icon="map"
                        single-line
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-file-input
                        show-size
                        label="File input"
                        v-model="file"
                      ></v-file-input>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary accent-4" text @click="close"
                  >Cancel</v-btn
                >
                <v-btn color="primary accent-4" text @click="save">Save</v-btn>
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
        <v-btn color="white--text primary accent-4" @click="initialize"
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
      { text: 'Name', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'CategoryId', value: 'category_id' },
      { text: 'Image', value: 'image' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      image: '',
      category: '',
      price: ''
    },
    defaultItem: {
      name: '',
      username: '',
      phone: '',
      email: ''
    },
    categories: ['Arduino', 'Alictro', 'fizz', 'buzz'],
    items: [],
    value: ['1', '2', '3', '4'],
    itemsName: [],
    validateMsg: ''
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Article' : 'Edit Article'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  async created() {
    console.log({ LOL: 1 })
    await this.getCategories()
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.get('/meal').then(response => (this.users = response.data))
    },
    getCategories() {
      this.$axios.get('/category').then(response => {
        for (let i of response.data) {
          this.itemsName.push(i.name)
          this.items.push(i.id)
        }
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file
      let formData = new FormData()
      formData.append('file', this.file)
      this.editedItem.image = formData
      console.log(this.$refs.file)
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item)
      //we send the edited item in put request insted
      this.$axios
        .put(`/meal/${item.id}`, {}, { params: item })
        .then(response => console.log(response))
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    navigate(item, id) {
      this.$router.push({ name: 'project', params: { id } })
    },
    deleteItem(item) {
      const index = this.users.indexOf(item)
      confirm('Are you sure you want to delete this Meal?') &&
        this.$axios.delete(`/meal/delete/${item.id}`)
      //we send the deleted item in delete request insted
      this.users.splice(index, 1)
      ;(this.text = 'A Meal has been added successfully'), (this.color = 'red')
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
      this.editedItem.category = this.items[
        this.itemsName.indexOf(this.editedItem.category)
      ]
      if (!this.editedItem.name)
        return (this.validateMsg = 'Name is required ✋')
      if (!this.editedItem.price)
        return (this.validateMsg = 'Price is required ✋')
      if (!this.editedItem.category)
        return (this.validateMsg = 'Category is required ✋')

      let fd = new FormData()
      fd.append('image', this.editedItem.image)
      fd.append('category', this.editedItem.category)
      fd.append('name', this.editedItem.name)
      fd.append('image', this.file)
      fd.append('price', this.editedItem.price)
      await this.$axios.post('/meal/store', fd).then(res => console.log(res))
      this.users.push(this.editedItem)
      this.close()
      ;(this.text = 'A Meal has been added'), (this.color = 'green')
      this.snackbar = true
    }
  }
}
</script>
