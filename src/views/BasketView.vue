<script setup lang="ts">
import { TheBasket } from '@/components'
</script>

<template>
  <main class="basket-view">
    <h1 class="hidden-visually">This is a basket page</h1>
    <TheBasket />
  </main>
</template>

<style scoped lang="scss">
.basket-view {
  min-height: calc(100vh - 130px);
  padding: 20px;
  background-color: var(--color-background-mute);

  @media screen and (min-width: 768px) {
    padding: 40px;
  }
}
</style>
