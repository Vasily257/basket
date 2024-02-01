<template>
  <div class="products">
    <h2 class="products__title">Корзина ({{ orderInfo.TotalProducts }})</h2>
    <ul class="products__list">
      <li v-for="product in productsSortedByName" :key="product.Id" class="product">
        <img
          :src="getImageFromBase64(product.Images[0].Image)"
          :alt="product.Name"
          width="100"
          height="100"
          class="product__image"
        />
        <div class="product__info-box">
          <span class="product__name">{{ product.Name }}</span>
          <span class="product__price">Цена: {{ product.Price }} руб.</span>
        </div>
        <div class="product__quantity-box">
          <TextButton
            class="product__quantity-button product__quantity-button--plus"
            @click="handleIncreaseButtonClick(product.Id)"
            >+</TextButton
          >
          <span class="product__quantity">{{ product.Quantity }}</span>
          <TextButton
            class="product__quantity-button product__quantity-button--minus"
            @click="handleDecreaseButtonClick(product.Id)"
            >-</TextButton
          >
        </div>

        <TextButton class="product__delete-button" @click="handleDeleteButtonClick(product.Id)"
          >Удалить товар
        </TextButton>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores/header'
import { useProductsStore } from '@/stores/products'
import { TextButton } from '@/components'
import { getImageFromBase64 } from '@/utils'
import type { Product } from '@/types/shopping-cart'

// Инициализировать хранилище шапки сайта
const headerStore = useHeaderStore()
const { userId } = storeToRefs(headerStore)

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { productsSortedByName, orderInfo } = storeToRefs(productStore)
const { incrementQuantity, decrementQuantity, deleteProduct } = productStore

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
</script>

<style scoped lang="scss">
.products {
  height: fit-content;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--color-background);

  &__title {
    margin-bottom: 20px;
  }

  &__list {
    display: flex;
    row-gap: 10px;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
}

.product {
  display: flex;
  column-gap: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;

  &__info-box {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    row-gap: 5px;
    max-width: calc(100% - 400px);
  }

  &__quantity-box {
    display: flex;
    column-gap: 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100px;
    margin-left: auto;
  }

  &__quantity {
    display: inline-block;
    width: 20px;
    text-align: center;
  }

  &__quantity-button {
    width: 30px;
    height: 30px;
  }

  &__delete-button {
    margin-left: 10px;
  }
}
</style>
