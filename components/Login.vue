<template>
  <div class="container">
    <div class="login-main">
      <div class="col-12 col-lg-6">
        <ValidationObserver v-slot="{ invalid }">
          <b-form @submit="onSubmit()">
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
              block
              variant="primary"
              size="lg"
              class="mt-5"
              :disabled="invalid"
              @click="onSubmit()"
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Swal from 'sweetalert2'
import { Auth } from '../auth'
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
  created() {
    Auth.removeToken()
  },
  methods: {
    async onSubmit() {
      try {
        const result = await this.$axios
          .$post(Constants.API.LOGIN, {
            email: this.userName,
            password: this.password
          })
          .then((res) => res)
        const { statusCode, data } = result
        if (statusCode === 200) {
          Auth.setToken(data.testScgToken, data.testScgRefreshToken)
          this.$router.push('/admin/machine')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'something wrong'
          })
        }
      } catch (error) {
        console.log(error)
        const { response: { data = {} } = {} } = error
        const title = data.error || 'Error'
        const text = data.message || 'unavailable'
        Swal.fire({
          icon: 'error',
          title,
          text
        })
      }
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
