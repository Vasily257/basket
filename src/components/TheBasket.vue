<template>
  <section>
    <ul class="products">
      <li class="productHeading">
        <span class="productNameHeading">Название</span>
        <span class="productPriceHeading">Цена</span>
        <span class="productQuantityHeading">Количество</span>
        <span class="productImageHeading">Изображение</span>
      </li>
      <li v-for="product in productsSortedByName" :key="product.Id" class="product">
        <span class="productName">{{ product.Name }}</span>
        <span class="productPrice">{{ product.Price }}</span>
        <span class="productQuantity">{{ product.Quantity }}</span>
        <img
          :src="getImageFromBase64(product.Images[0].Image)"
          :alt="product.Name"
          width="100"
          height="100"
          class="productImage"
        />
        <BaseButton @click="handleIncreaseButtonClick(product.Id)">+</BaseButton>
        <BaseButton @click="handleDecreaseButtonClick(product.Id)">-</BaseButton>
        <BaseButton @click="handleDeleteButtonClick(product.Id)">Удалить товар</BaseButton>
      </li>
    </ul>
    <p>
      <span>Общая стоимость корзины: </span>
      <span>{{ orderInfo.Total }}</span>
    </p>
    <BaseButton @click="handleAddPromoCodeButtonClick(PROMO_CODE)">Добавить промокод</BaseButton>
    <BaseButton @click="handleDeletePromoCodeButtonClick">Удалить промокод</BaseButton>
    <BaseButton>Оформить заказ</BaseButton>
    <BaseButton @click="handleDeleteProductsButtonClick">Очистить корзину</BaseButton>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores/header'
import { useProductsStore } from '@/stores/products'
import { BaseButton } from '@/components'
import { getImageFromBase64 } from '@/utils'
import { PROMO_CODE } from '@/constants'
import type { Product, SelectedDiscount } from '@/types/shopping-cart'

// Инициализировать хранилище шапки сайта
const headerStore = useHeaderStore()
const { userId } = storeToRefs(headerStore)

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { productsSortedByName, orderInfo } = storeToRefs(productStore)
const {
  getProducts,
  getOrderInfo,
  addDiscount,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  deleteProducts,
  deleteDiscount
} = productStore

/** Обработать нажатие на кнопку увеличения товаров */
const handleIncreaseButtonClick = (productId: Product['Id']) => {
  incrementQuantity({ ProductId: productId, UserGuid: userId.value })
}

/** Обработать нажатие на кнопку уменьшения товаров */
const handleDecreaseButtonClick = (productId: Product['Id']) => {
  decrementQuantity({ ProductId: productId, UserGuid: userId.value })
}

/** Обработать нажатие на кнопку удаления товара */
const handleDeleteButtonClick = (productId: Product['Id']) => {
  deleteProduct({ ProductId: productId, UserGuid: userId.value })
}

/** Обработать нажатие на кнопку добавления промокода */
const handleAddPromoCodeButtonClick = (promocode: SelectedDiscount['DiscountName']) => {
  addDiscount({ DiscountName: promocode, UsedGuid: userId.value })
}

/** Обработать нажатие на кнопку удаления промокода */
const handleDeletePromoCodeButtonClick = () => {
  deleteDiscount()
}

/** Обработать нажатие на кнопку удаления всех товаров */
const handleDeleteProductsButtonClick = () => {
  deleteProducts()
}

onMounted(async () => {
  await getProducts()
  await getOrderInfo()
})
</script>
