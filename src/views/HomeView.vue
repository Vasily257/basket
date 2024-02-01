<script setup lang="ts"></script>

<template>
  <main class="home-view">
    <h1>Домашняя страница</h1>
  </main>
</template>

<style scoped lang="scss">
.home-view {
  min-height: calc(100vh - 110px);
  padding: 10px;
  background-color: var(--color-background-mute);

  @media screen and (min-width: 900px) {
    padding: 20px;
    min-height: calc(100vh - 130px);
  }
}
</style>
