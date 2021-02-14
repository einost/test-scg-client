<template>
  <div class="container">
    <div class="login-main">
      <div class="col-12 col-lg-6">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit="onSubmit">
            <ValidationProvider v-slot="{ errors }" rules="required|email">
              <input
                v-model="userName"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
              />
              <div class="invalid-message">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <input
                v-model="password"
                type="password"
                class="form-control form-control-lg mt-3"
                placeholder="Password"
              />
              <div class="invalid-message">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <button
              type="submit"
              class="btn btn-primary btn-lg btn-block mt-5"
              :disabled="invalid"
              @click="onSubmit"
            >
              Login
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import { Constants } from '../constants'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('email', {
  ...email,
  message: 'Invalid email',
})

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const auth = await this.$axios.$post(Constants.API.LOGIN, {
        email: this.userName,
        password: this.password,
      })
      console.log(auth)
    },
  },
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
