<template>
  <div class="container">
    <div class="login-main">
      <div class="col-12 col-lg-6">
        <ValidationObserver v-slot="{ invalid }">
          <b-form @submit="onSubmit">
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <b-form-input
                v-model="userName"
                type="email"
                class="form-control-lg"
                placeholder="Email"
              />
              <div class="invalid-message">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <b-form-input
                v-model="password"
                type="password"
                class="form-control-lg mt-3"
                placeholder="Password"
              />
              <div class="invalid-message">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <b-button
              variant="primary"
              type="submit"
              class="btn-lg btn-block mt-5"
              :disabled="invalid"
              @click="onSubmit"
            >
              Login
            </b-button>
          </b-form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Swal from 'sweetalert2'
import { Constants } from '../constants'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$axios
        .$post(Constants.API.LOGIN, {
          email: this.userName,
          password: this.password
        })
        .then((res) => {
          const { statusCode, data } = res
          if (statusCode === 200) {
            Cookies.set('testScgToken', data.testScgToken, { path: '/' })
            Cookies.set('testScgRefreshToken', data.testScgRefreshToken, {
              path: '/'
            })
            this.$router.push('/admin/vendingmachine')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'something wrong'
            })
          }
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
        })
    }
  }
}
</script>

<style>
.login-main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invalid-message {
  color: #dc3545;
}
</style>
