<template>
  <div class="summary">
    <h2 class="summary__title">Сводная информация</h2>
    <p class="summary__product">Всего товаров: {{ orderInfo.TotalProducts }} шт.</p>
    <p class="summary__pre-price">Стоимость: {{ orderInfo.Total }} руб.</p>
    <div class="summary__promo">
      <p class="summary__promo-text">
        Промокод
        <span v-if="!isPromoCode">не</span>
        добавлен
      </p>
      <p class="summary__promo-discount">Скидка: {{ orderInfo.Discount }} руб.</p>
      <TextButton class="summary__promo-button" @click="handleAddPromoCodeButtonClick(PROMO_CODE)"
        >Добавить промокод
      </TextButton>
      <TextButton class="summary__promo-button" @click="handleDeletePromoCodeButtonClick"
        >Удалить промокод
      </TextButton>
    </div>
    <p class="summary__final-price">Итого: {{ finalPrice }} руб.</p>
    <div class="summary__order">
      <TextButton class="summary__order-button">Оформить заказ</TextButton>
      <TextButton @click="handleDeleteProductsButtonClick" class="summary__order-button"
        >Очистить корзину
      </TextButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useHeaderStore } from '@/stores/header'
import { useProductsStore } from '@/stores/products'
import { TextButton } from '@/components'
import { PROMO_CODE } from '@/constants'
import type { SelectedDiscount } from '@/types/shopping-cart'

// Инициализировать хранилище шапки сайта
const headerStore = useHeaderStore()
const { userId } = storeToRefs(headerStore)

// Инициализировать хранилище товаров
const productStore = useProductsStore()
const { orderInfo, isPromoCode } = storeToRefs(productStore)
const { addDiscount, deleteProducts, deleteDiscount } = productStore

/** Итоговая стоимость корзины */
const finalPrice = computed(() => orderInfo.value.Total - orderInfo.value.Discount)

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
</script>

<style scoped lang="scss">
.summary {
  display: flex;
  row-gap: 15px;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--color-background);

  @media screen and (min-width: 900px) {
    width: 300px;
  }

  &__title {
    line-height: 1.2;
  }

  &__promo {
    line-height: 1.2;
    display: flex;
    row-gap: 5px;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  &__final-price {
    font-weight: 700;
  }

  &__order {
    display: flex;
    row-gap: 5px;
    flex-direction: column;
    flex-wrap: nowrap;
  }
}
</style>
