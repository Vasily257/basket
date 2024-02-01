<template>
  <main class="contacts-view">
    <h1>Страница контактов</h1>
  </main>
</template>

<style scoped lang="scss">
.contacts-view {
  min-height: calc(100vh - 110px);
  padding: 10px;
  background-color: var(--color-background-mute);

  @media screen and (min-width: 900px) {
    padding: 20px;
    min-height: calc(100vh - 130px);
  }
}
</style>
