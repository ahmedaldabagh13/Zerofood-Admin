<template>
  <div>
    <v-flex xs12 md8 sm8 offset-sm3>
      <v-card>
        <v-list>
          <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.id"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title
                  >Order - #{{ item.order.id }} Paid - ${{
                    item.order.total_price
                  }}
                  - Status : {{ orderStatus[item.order.stage] }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="py-2 px-4">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <th v-for="head in headers" :key="head" class="text-left">
                        {{ head }}
                      </th>
                    </thead>
                    <tbody class="py-4 my-3">
                      <tr
                        class="py-4 my-3"
                        v-for="subItem in item.details"
                        :key="subItem.title"
                      >
                        <td class="text-left">{{ subItem.meal }}</td>
                        <td>{{ subItem.price }}</td>
                        <td>QTY : {{ subItem.quantity }}</td>
                      </tr>
                      <v-row justify="center" class="w-100">
                        <v-col cols="auto">
                          <b class="text-center w-50"
                            >Total Price :
                            {{ item.order.total_price }}
                            💸</b
                          >
                        </v-col>
                        <v-col>
                          <v-btn
                            color="white--text mx-2 primary accent-4"
                            @click="changeOrderStatus(item, 'accept')"
                            >Accept</v-btn
                          >
                          <v-btn
                            color="white--text mx-2 success accent-4"
                            @click="changeOrderStatus(item, 'complete')"
                            >Complete</v-btn
                          >
                          <v-btn
                            color="white--text mx-2 blue-grey"
                            @click="changeOrderStatus(item, 'cancle')"
                            >Cancle</v-btn
                          >
                        </v-col>
                      </v-row>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-card>
    </v-flex>
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
    headers: ['Meal Name', 'Price', 'QTY'],
    items: [],
    orderStatus: {
      null: 'Pendding',
      1: 'Accepted',
      2: 'Completed',
      3: 'Refused'
    }
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$axios
        .get('/order')
        .then(response => (this.items = response.data.orders))
    },
    changeOrderStatus({ order }, url) {
      this.$axios.post(`/order/${url}/${order.id}`)
    }
  }
}
</script>
