<template>
  <nav>
    <div class="nav-wrapper">
      <div class="container">
        <router-link to="/home">Home</router-link>
        <a href="" class="right" @click.prevent="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
