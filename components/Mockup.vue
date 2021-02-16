<template>
  <div class="mockup-main">
    <div class="container">
      <h1 class="display-4 my-5">Buy Product Mockup</h1>
      <b-form @submit="onSubmit()">
        <label>Headers</label>
        <b-form-textarea
          v-model="rawHeaders"
          :state="isValid.headers"
          class="mb-3"
          rows="5"
          @blur="jsonFormatter('headers')"
        ></b-form-textarea>
        <label>Request Body</label>
        <b-form-textarea
          v-model="rawRequestBody"
          :state="isValid.payload"
          class="mb-3"
          rows="10"
          @blur="jsonFormatter('payload')"
        ></b-form-textarea>
        <label>Response Body</label>
        <b-form-textarea
          v-model="rawResponseBody"
          class="mockup-response mb-3"
          rows="10"
          plaintext
        ></b-form-textarea>
        <b-button
          block
          variant="primary"
          size="lg"
          class="my-5"
          :disabled="isLoading"
          @click="onSubmit()"
        >
          Submit
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { Auth } from '../auth'
import { Constants } from '../constants'

export default {
  data() {
    const headers = {
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZW5kaW5nTWFjaGluZUlkIjoiNjAyN2E5YzVlOTAzYmYyMjg4NmJjZmIyIiwiaWF0IjoxNjUzMjQ5NzQyLCJleHAiOjE2NTMyNTA2NDJ9.CQMYZZ7g1a6w4pBix3cWjDw58oQ9vA0by1gHQoMkago'
    }
    const payload = {
      productId: '6027a937b016aa04bcb21506'
    }
    return {
      isLoading: false,
      rawHeaders: JSON.stringify(headers, null, 4),
      rawRequestBody: JSON.stringify(payload, null, 4),
      rawResponseBody: '',
      isValid: {
        headers: true,
        payload: true
      }
    }
  },
  created() {
    Auth.removeToken()
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true
        const headers = JSON.parse(this.rawHeaders)
        const payload = JSON.parse(this.rawRequestBody)
        if (headers && headers.authorization) {
          Auth.setToken(headers.authorization, headers.authorization)
        }
        const result = await this.$axios
          .$post(Constants.API.BUY_PRODUCT, { ...payload })
          .then((res) => res)
        this.rawResponseBody = JSON.stringify(result, null, 4)
        this.isLoading = false
      } catch (error) {
        const { response: { data = {} } = {} } = error
        const result = data.statusCode ? data : error.response
        this.rawResponseBody = JSON.stringify(result, null, 4)
        this.isLoading = false
      }
    },
    jsonFormatter(type) {
      try {
        const headers = JSON.parse(this.rawHeaders)
        const payload = JSON.parse(this.rawRequestBody)
        this.rawHeaders = JSON.stringify(headers, null, 4)
        this.rawRequestBody = JSON.stringify(payload, null, 4)
        this.isValid[type] = true
      } catch (error) {
        this.isValid[type] = false
      }
    }
  }
}
</script>

<style lang="scss">
.mockup-main {
  .mockup-response {
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
}
</style>
