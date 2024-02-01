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
            class="product__quantity-button"
            @click="handleDecreaseButtonClick(product.Id)"
            >-</TextButton
          >
          <span class="product__quantity">{{ product.Quantity }}</span>

          <TextButton
            class="product__quantity-button"
            @click="handleIncreaseButtonClick(product.Id)"
            >+</TextButton
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
const { incrementQuantity, decrementQuantity, deleteProduct, deleteProducts } = productStore

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

  // Очистить корзину, если удаляется последний товар
  if (productsSortedByName.value.length === 1) {
    deleteProducts()
  }
}
</script>

<style scoped lang="scss">
.products {
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--color-background);

  &__title {
    margin-bottom: 20px;
  }

  &__list {
    display: flex;
    row-gap: 30px;
    flex-direction: column;
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
    list-style-type: none;

    @media screen and (min-width: 600px) {
      row-gap: 30px;
    }
  }
}

.product {
  display: grid;
  align-items: start;
  column-gap: 10px;
  row-gap: 5px;
  position: relative;

  grid-template-columns: 100px 1fr;
  grid-template-rows: repeat(3, auto);

  @media screen and (min-width: 450px) {
    grid-template-columns: 100px 1fr auto;
    grid-template-rows: 30px 1fr;
  }

  @media screen and (min-width: 600px) {
    grid-template-columns: 100px 1fr 100px auto;
    grid-template-rows: 1fr;
  }

  &::before {
    position: absolute;
    top: calc(100% + 14.5px);
    left: 0;
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
  }

  &:last-child {
    &::before {
      content: none;
    }
  }

  &__image {
    grid-column: 1 / 2;
    grid-row: 1 / 4;

    @media screen and (min-width: 450px) {
      grid-row: 1 / 3;
    }

    @media screen and (min-width: 600px) {
      grid-row: 1 / 2;
    }
  }

  &__info-box {
    display: flex;
    row-gap: 5px;
    flex-direction: column;
    flex-wrap: nowrap;
    grid-column: 2 / 3;
    grid-row: 1 / 2;

    @media screen and (min-width: 450px) {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }

    @media screen and (min-width: 600px) {
      grid-row: 1 / 2;
    }
  }

  &__quantity-box {
    justify-self: start;
    display: flex;
    column-gap: 5px;
    flex-direction: row;
    flex-wrap: nowrap;
    grid-column: 2 / 3;
    grid-row: 2 / 3;

    @media screen and (min-width: 450px) {
      grid-column: 3 / 4;
      grid-row: 1 / 3;
      justify-self: end;
    }

    @media screen and (min-width: 600px) {
      grid-row: 1 / 2;
    }
  }

  &__quantity {
    display: inline-block;
    width: 28px;
    line-height: 28px;
    text-align: center;
  }

  &__quantity-button {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__delete-button {
    grid-column: 2 / 3;
    grid-row: 3 / 4;

    @media screen and (min-width: 450px) {
      grid-column: 3 / 4;
      grid-row: 2 / 3;
    }

    @media screen and (min-width: 600px) {
      grid-column: 4 / 5;
      grid-row: 1 / 2;
    }
  }
}
</style>
