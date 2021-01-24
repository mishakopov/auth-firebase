<template>
  <div class="container">
    <div class="valign-wrapper" style="height:100vh; justify-content:center;">
      <form class="card auth-card" @submit.prevent="register">
        <div class="card-content">
          <span class="card-title center m-5">Register</span>
          <div class="input-field">
            <input
              id="name"
              type="text"
              v-model.trim="name"
              :class="{ invalid: $v.name.$dirty && !$v.name.required }"
            />
            <label for="name">Name</label>
            <small
              class="helper-text invalid"
              v-if="$v.name.$dirty && !$v.name.required"
              >Name doesn't be empty</small
            >
          </div>
          <div class="input-field">
            <input
              id="phone"
              type="text"
              v-model.trim="phone"
              :class="{ invalid: $v.phone.$dirty && !$v.phone.required }"
            />
            <label for="phone">Phone</label>
            <small
              class="helper-text invalid"
              v-if="$v.phone.$dirty && !$v.phone.required"
              >Phone doesn't be empty</small
            >
          </div>
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
              >Password must be {{ $v.password.$params.minLength.min }} now it's
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
              Register
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            Already have an account?
            <router-link to="/">Login</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    name: '',
    phone: '',
    email: '',
    password: ''
  }),
  validations: {
    name: { required },
    phone: { required },
    email: { email, required },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/home')
      } catch (e) { }
    }
  }
}
</script>
