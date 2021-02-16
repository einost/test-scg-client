<template>
  <div class="login-main">
    <div class="container">
      <div class="row">
        <div class="login-box col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <h1 class="display-3 text-center mb-5">Dashboard</h1>
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

<style lang="scss">
.login-main {
  width: 100%;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );

  .login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    padding-top: 3rem;
    padding-bottom: 3rem;

    @media (max-width: 575px) {
      h1 {
        font-size: 3rem;
      }
    }
  }
}

.invalid-message {
  color: #dc3545;
}
</style>
