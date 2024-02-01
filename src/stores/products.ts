import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiCreateBasket } from '@/api/admin'
import {
  apiGetProducts,
  apiGetBasketSummary,
  apiGetViewedProducts,
  apiIncrementQuantity,
  apiDecrementQuantity,
  apiChangeQuantity,
  apiAddDiscount,
  apiDeleteProducts,
  apiDeleteProduct,
  apiDeleteDiscount
} from '@/api/shopping-cart'
import { SUCCESSFUL_RESPONSE, INITIAL_PRODUCT_COUNT } from '@/constants/index'
import type {
  Product,
  OrderInfo,
  SelectedProduct,
  SelectedProductWitNewValue,
  SelectedDiscount
} from '@/types/shopping-cart'

/** Хранилище товаров */
export const useProductsStore = defineStore('products', () => {
  /** Товары */
  const products = ref<Product[]>([])

  /** Просмотренные товары */
  const viewedProducts = ref<Product[]>([])

  /** Сводная информация о заказе */
  const orderInfo = ref<OrderInfo>({
    TotalProducts: 0,
    Discount: 0,
    Total: 0
  })

  /** Продукты, сортированные по имени */
  const productsSortedByName = computed(() => {
    const sortedProducts = products.value

    sortedProducts.sort((productA, productB) => {
      let result = 0

      if (productA.Name > productB.Name) {
        result = 1
      }

      if (productA.Name < productB.Name) {
        result = -1
      }

      return result
    })

    return sortedProducts
  })

  /** Получить список товаров */
  const getProducts = async () => {
    try {
      const { data } = await apiGetProducts()

      products.value = data || []
    } catch (error) {
      console.log(error)
    }
  }

  /** Получить информацию о заказе */
  const getOrderInfo = async () => {
    try {
      const { data } = await apiGetBasketSummary()

      orderInfo.value = {
        TotalProducts: data?.TotalProducts ?? 0,
        Discount: data?.Discount ?? 0,
        Total: data?.Total ?? 0
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Создать новую корзину с товарами */
  const createBasket = async () => {
    try {
      const { data } = await apiCreateBasket(INITIAL_PRODUCT_COUNT)

      if (data) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Получить список просмотренных товаров */
  const getViewedProducts = async () => {
    try {
      const { data } = await apiGetViewedProducts()

      viewedProducts.value = data || []
    } catch (error) {
      console.log(error)
    }
  }

  /** Увеличить количество товаров на 1 */
  const incrementQuantity = async (product: SelectedProduct) => {
    try {
      const { data } = await apiIncrementQuantity(product)

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Уменьшить количество товаров на 1 */
  const decrementQuantity = async (product: SelectedProduct) => {
    try {
      const { data } = await apiDecrementQuantity(product)

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Задать количество товаров */
  const changeQuantity = async (product: SelectedProductWitNewValue) => {
    try {
      const { data } = await apiChangeQuantity(product)

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Добавить промокод для скидки */
  const addDiscount = async (dicsount: SelectedDiscount) => {
    try {
      const { data } = await apiAddDiscount(dicsount)

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Удалить все товары */
  const deleteProducts = async () => {
    try {
      const { data } = await apiDeleteProducts()

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Удалить товар */
  const deleteProduct = async (product: SelectedProduct) => {
    try {
      const { data } = await apiDeleteProduct(product)

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getProducts()
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  /** Удалить промокод */
  const deleteDiscount = async () => {
    try {
      const { data } = await apiDeleteDiscount()

      if (data.Name === SUCCESSFUL_RESPONSE) {
        await getOrderInfo()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    products,
    productsSortedByName,
    viewedProducts,
    orderInfo,
    createBasket,
    getProducts,
    getOrderInfo,
    getViewedProducts,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    addDiscount,
    deleteProducts,
    deleteProduct,
    deleteDiscount
  }
})
