<template>
  <v-overlay :opacity="0.4" :value="getOverlay">
    <v-progress-circular indeterminate size="64">
      Loading...
    </v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    getOverlay() {
      return this.$store.getters.getOverlay
    },
  },
}
</script>
