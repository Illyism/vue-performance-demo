<template>
    <img class="flag" v-if="!hasError && country && country != -1" :src="`/flags/${country.toLowerCase()}.png`" @error="imgError" :title="country | country" />
    <span class="flag" v-else-if="!hasError"></span>
</template>

<script>
const errorsList = []

export default {
  name: 'flag',
  props: ['country'],
  data () {
    return {
      hasError: false
    }
  },
  watch: {
    country () {
      this.checkErrorList()
    }
  },
  mounted () {
    this.checkErrorList()
  },
  methods: {
    checkErrorList () {
      this.hasError = errorsList.indexOf(this.country) > -1
    },
    imgError (e) {
      e.preventDefault()
      e.stopPropagation()
      this.hasError = true
      if (errorsList.indexOf(this.country) === -1) errorsList.push(this.country)
    }
  }
}
</script>