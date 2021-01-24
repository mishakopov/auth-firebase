<template>
  <div class="container">
    <div class="valign-wrapper" style="height:100vh; justify-content:center;">
      <form class="card auth-card" @submit.prevent="login">
        <div class="card-content">
          <span class="card-title center m-5">Login</span>
          <div class="input-field">
            <input
              id="email"
              type="text"
              v-model.trim="email"
              :class="{
                invalid:
                  ($v.email.$dirty && !$v.email.required) ||
                  ($v.email.$dirty && !$v.email.email)
              }"
            />
            <label for="email">Email</label>
            <small
              class="helper-text invalid"
              v-if="$v.email.$dirty && !$v.email.required"
              >Email doesn't be empty</small
            >
            <small
              class="helper-text invalid"
              v-else-if="$v.email.$dirty && !$v.email.email"
              >Please enter valid email</small
            >
          </div>
          <div class="input-field">
            <input
              id="password"
              type="password"
              v-model.trim="password"
              :class="{
                invalid:
                  ($v.password.$dirty && !$v.password.required) ||
                  ($v.password.$dirty && !$v.password.minLength)
              }"
            />
            <label for="password">Password</label>
            <small
              v-if="$v.password.$dirty && !$v.password.required"
              class="helper-text invalid"
              >Please enter password</small
            >
            <small
              v-else-if="$v.password.$dirty && !$v.password.minLength"
              class="helper-text invalid"
              >Password must be {{ $v.password.$params.minLength.min }}. Now is
              {{ password.length }}</small
            >
          </div>
        </div>
        <div class="card-action center">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit"
              type="submit"
            >
              Login
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            Don't have an account?
            <router-link to="/register">Register</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      // eslint-disable-next-line no-useless-catch
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/home')
      } catch (e) {
        throw e
      }
    }
  }
}
</script>
