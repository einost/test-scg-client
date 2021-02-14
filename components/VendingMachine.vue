<template>
  <div class="vendingmachine-main jumbotron jumbotron-fluid mb-0">
    <div class="container">
      <div class="table-responsive bg-white">
        <!-- <b-table hover dark :items="vendingMachineList.docs"> -->
        <table class="table table-hover">
          <thead>
            <th scope="col">Machine ID</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Address</th>
            <th scope="col">Location</th>
          </thead>
          <tbody v-if="!isLoading">
            <tr
              v-for="vendingMachine in vendingMachineList.data"
              :key="vendingMachine.id"
            >
              <td scope="row">{{ vendingMachine.id }}</td>
              <td>{{ vendingMachine.machineType }}</td>
              <td>{{ getStatusDescription(vendingMachine.statusId) }}</td>
              <td>
                {{
                  `${vendingMachine.address} ${vendingMachine.subDistrict} ${vendingMachine.district} ${vendingMachine.province} ${vendingMachine.zipCode}`
                }}
              </td>
              <td>
                <a
                  :href="`https://maps.google.com/?q=${vendingMachine.lat},${vendingMachine.lng}`"
                  target="_blank"
                  >{{ vendingMachine.lat }}, {{ vendingMachine.lng }}</a
                >
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="5" class="text-center">Loading...</td>
            </tr>
          </tbody>
        </table>
        <!-- </b-table> -->
      </div>
      <div
        v-if="vendingMachineList.total > 10 && !isLoading"
        class="vendingmachine-pagination"
      >
        <b-pagination
          v-model="page"
          :total-rows="vendingMachineList.total"
          :per-page="limit"
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          @input="onPageChange()"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { Constants } from '../constants'

export default {
  data() {
    return {
      isLoading: false,
      page: 1,
      limit: 10,
      vendingMachineList: {
        data: [],
        total: 0
      }
    }
  },
  mounted() {
    this.getVendingMachineList()
  },
  methods: {
    getVendingMachineList() {
      this.visibleLoading()
      const queryString = `?page=${this.page}&limit=${this.limit}`
      this.$axios
        .$get(`${Constants.API.GET_VENDING_MACHINE_LIST}${queryString}`)
        .then((res) => {
          const { statusCode, data } = res
          if (statusCode === 200) {
            this.vendingMachineList.data = data.docs
            this.vendingMachineList.total = data.totalDocs
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'something wrong'
            })
          }
          this.hiddenLoading()
        })
        .catch((error) => {
          const { response: { data = {} } = {} } = error
          const title = data.error || 'Error'
          const text = data.message || 'unavailable'
          Swal.fire({
            icon: 'error',
            title,
            text
          })
          this.hiddenLoading()
        })
    },
    visibleLoading() {
      this.isLoading = true
      this.$nextTick(() => {
        this.$root.$loading.start()
      })
    },
    hiddenLoading() {
      this.isLoading = false
      this.$nextTick(() => {
        this.$root.$loading.finish()
      })
    },
    getStatusDescription(statusId) {
      switch (statusId) {
        case 0:
          return 'OFFLINE'
        case 1:
          return 'ONLINE'
        case 2:
          return 'NEAR_OFFLINE'
        default:
          return 'UNKNOWN'
      }
    },
    onPageChange() {
      console.log(this.page)
      // this.getVendingMachineList()
    }
  }
}
</script>

<style lang="scss">
.vendingmachine-main {
  height: 100vh;

  .table {
    th,
    td {
      white-space: nowrap;
    }
  }
}

.vendingmachine-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
