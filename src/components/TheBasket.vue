<template>
  <section class="basket">
    <BasketProducts />
    <BasketSummary />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { BasketProducts, BasketSummary } from '@/components'

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { productsSortedByName, orderInfo } = storeToRefs(productStore)
const { createBasket, getProducts, getOrderInfo, setPromoCodeStatus } = productStore

onMounted(async () => {
  // Создать корзину, если товары отсутствуют
  if (productsSortedByName.value.length === 0) {
    await createBasket()
  }

  // Обновить данные по товарам
  await getProducts()
  await getOrderInfo()

  // Указать, что промокод применен, если есть скидка
  if (orderInfo.value.Discount > 0) {
    setPromoCodeStatus(true)
  }
})
</script>

<style scoped lang="scss">
.basket {
  position: relative;
  display: flex;
  column-gap: 0;
  row-gap: 10px;
  flex-direction: column;
  flex-wrap: nowrap;
  max-width: 1024px;
  margin: 0 auto;

  @media screen and (min-width: 900px) {
    column-gap: 20px;
    row-gap: 0;
    flex-direction: row;
  }
}
</style>
