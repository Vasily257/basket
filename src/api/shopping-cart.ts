import axios, { type AxiosPromise } from 'axios'
import type {
  BaseResponse,
  HeaderResponse,
  Product,
  SelectedProduct,
  SelectedProductWitNewValue,
  SelectedDiscount,
  OrderInfo
} from '@/types/shopping-cart'

const baseApi = axios.create({
  baseURL: 'http://localhost:8080/api/ShoppingCart',
  headers: {
    Accept: 'text/plain'
  }
})

// GET
export const apiGetHeader = async (): ShoppingCartAPI.GET.GetHeader.Response => {
  return await baseApi.get(`/header`)
}

export const apiGetProducts = async (): ShoppingCartAPI.GET.GetProducts.Response => {
  return await baseApi.get(`/products`)
}

export const apiGetBasketSummary = async (): ShoppingCartAPI.GET.GetBasketSummary.Response => {
  return await baseApi.get(`/baskedsummary`)
}

export const apiGetViewedProducts = async (): ShoppingCartAPI.GET.GetViewedProducts.Response => {
  return await baseApi.get(`/viewedList`)
}

// POST
export const apiIncrementQuantity = async (
  data: ShoppingCartAPI.POST.IncrementQuantity.Params
): ShoppingCartAPI.POST.IncrementQuantity.Response => {
  return await baseApi.post(`/quantityinc`, data)
}

export const apiDecrementQuantity = async (
  data: ShoppingCartAPI.POST.DecrementQuantity.Params
): ShoppingCartAPI.POST.DecrementQuantity.Response => {
  return await baseApi.post(`/quantitydec`, data)
}

export const apiChangeQuantity = async (
  data: ShoppingCartAPI.POST.ChangeQuantity.Params
): ShoppingCartAPI.POST.ChangeQuantity.Response => {
  return await baseApi.post(`/changequantity`, data)
}

export const apiAddDiscount = async (
  data: ShoppingCartAPI.POST.AddDiscount.Params
): ShoppingCartAPI.POST.AddDiscount.Response => {
  return await baseApi.post(`/discount `, data)
}

// DELETE
export const apiDeleteProducts = async (): ShoppingCartAPI.DELETE.DeleteProducts.Response => {
  return await baseApi.delete(`/products`)
}

export const apiDeleteProduct = async (
  data: ShoppingCartAPI.DELETE.DeleteProduct.Params
): ShoppingCartAPI.DELETE.DeleteProduct.Response => {
  return await baseApi.delete(`/product`, { data })
}

export const apiDeleteDiscount = async (): ShoppingCartAPI.DELETE.DeleteDiscount.Response => {
  return await baseApi.delete(`/discount`)
}

export namespace ShoppingCartAPI {
  export namespace GET {
    export namespace GetHeader {
      export type Response = AxiosPromise<HeaderResponse>
    }

    export namespace GetProducts {
      export type Response = AxiosPromise<Product[]>
    }

    export namespace GetBasketSummary {
      export type Response = AxiosPromise<OrderInfo>
    }

    export namespace GetViewedProducts {
      export type Response = AxiosPromise<Product[]>
    }
  }

  export namespace POST {
    export namespace IncrementQuantity {
      export type Params = SelectedProduct

      export type Response = AxiosPromise<BaseResponse>
    }

    export namespace DecrementQuantity {
      export type Params = SelectedProduct

      export type Response = AxiosPromise<BaseResponse>
    }

    export namespace ChangeQuantity {
      export type Params = SelectedProductWitNewValue

      export type Response = AxiosPromise<BaseResponse>
    }

    export namespace AddDiscount {
      export type Params = SelectedDiscount

      export type Response = AxiosPromise<BaseResponse>
    }
  }

  export namespace DELETE {
    export namespace DeleteProducts {
      export type Response = AxiosPromise<BaseResponse>
    }

    export namespace DeleteProduct {
      export type Params = SelectedProduct

      export type Response = AxiosPromise<BaseResponse>
    }

    export namespace DeleteDiscount {
      export type Response = AxiosPromise<BaseResponse>
    }
  }
}
