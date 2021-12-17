<template>
  <v-card class="mx-auto my-3" max-width="800" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="mt-3 mb-4">Register complete!</div>
        <v-list-item-title class="text-tittle mb-1">
          ขอบคุณที่สมัครเป็นสมาชิกกับเรา
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-btn block text color="primary" class="my-2" :to="{ name: 'home' }">
        Back to Home Page
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  head() {
    return {
      title: 'Done',
    }
  },
}
</script>

<style lang="scss" scoped>
.text-tittle {
  font-size: 24px;
}
</style>
