<template>
  <section class="basket">
    <BasketProducts />
    <BasketSummary />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { BasketProducts, BasketSummary } from '@/components'

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { getProducts, getOrderInfo } = productStore

onMounted(async () => {
  await getProducts()
  await getOrderInfo()
})
</script>

<style scoped lang="scss">
.basket {
  position: relative;
  display: flex;
  column-gap: 20px;
  flex-direction: row;
  flex-wrap: nowrap;
  max-width: 1024px;
  margin: 0 auto;
}
</style>
