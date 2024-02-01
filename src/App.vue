<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import TheHeader from '@/components/TheHeader.vue'

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { createBasket } = productStore

onMounted(async () => {
  await createBasket()
})
</script>

<template>
  <TheHeader />
  <RouterView />
</template>
