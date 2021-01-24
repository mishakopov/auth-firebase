<template>
  <div>
    <Navbar />
    <h1 class="center my-5">Hello {{ name }}</h1>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  components: {
    Navbar
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.name
    }
  }
}
</script>
