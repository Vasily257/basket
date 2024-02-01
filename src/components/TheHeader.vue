<template>
  <header>
    <img :src="logoImage" alt="Логотип сайта" width="90" height="90" />
    <span>{{ userName }}</span>

    <nav>
      <template v-for="link in NAV_LINKS" :key="link.href">
        <RouterLink :to="link.href">{{ link.text }}</RouterLink>
      </template>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores/header'
import { NAV_LINKS } from '@/constants/index'

// Инициализировать хранилище шапки сайта
const headerStore = useHeaderStore()
const { logoImage, userName } = storeToRefs(headerStore)
const { setHeader } = headerStore

onMounted(async () => {
  await setHeader()
})
</script>
