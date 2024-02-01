<template>
  <header class="header">
    <img :src="logoImage" alt="Логотип сайта" width="450" height="450" class="header__logo" />
    <nav class="header__nav">
      <template v-for="link in NAV_LINKS" :key="link.href">
        <RouterLink :to="link.href" class="header__link">{{ link.text }}</RouterLink>
      </template>
    </nav>
    <BaseDropdown :options="DROPDOWN_MENU_ITEMS" class="header__dropdown" />
    <div class="header__user-box">
      <span class="header__user-photo">{{ firstLetterOfName }}</span>
      <span class="header__user-name">{{ userName }}</span>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores/header'
import { BaseDropdown } from '@/components'
import { NAV_LINKS, DROPDOWN_MENU_ITEMS } from '@/constants/index'

// Инициализировать хранилище шапки сайта
const headerStore = useHeaderStore()
const { logoImage, userName, firstLetterOfName } = storeToRefs(headerStore)
const { setHeader } = headerStore

onMounted(async () => {
  await setHeader()
})
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 40px;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 10px 20px;

  @media screen and (min-width: 900px) {
    padding: 20px 40px;
  }

  &__logo {
    display: block;
    width: 90px;
    height: 90px;
  }

  &__nav {
    display: none;

    @media screen and (min-width: 900px) {
      display: flex;
      column-gap: 10px;
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }

  &__dropdown.dropdown {
    display: none;

    @media screen and (min-width: 900px) {
      display: block;
      width: 200px;
    }
  }

  &__link {
    position: relative;
    text-decoration: none;
    color: var(--color-text);

    &:hover {
      text-decoration: underline;
    }
  }

  &__user-box {
    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  &__user-photo {
    display: block;
    width: 50px;
    height: 50px;
    text-align: center;
    color: var(--vt-c-white);
    border-radius: 50%;
    background-color: #dc145c;
    font-size: 20px;
    font-weight: 700;
    line-height: 50px;
  }

  &__user-name {
    text-align: center;
  }
}
</style>
