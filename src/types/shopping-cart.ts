/** Стандартный ответ от сервера */
export interface BaseResponse {
  Name: string
  Description: string
}

/** Ответ от сервера для шапки сайта */
export interface HeaderResponse {
  LogoImg: string
  UsedGuid: string
  UserName: string
}

/** Товар */
export interface Product {
  Id: number
  Name: string
  Description: string
  Quantity: number
  Unit: string
  Currency: string
  Price: number
  DiscountedPrice: number
  Images: [
    {
      FileName: string
      FileExtension: string
      Image: string
    }
  ]
}

/** Выбранный товар */
export interface SelectedProduct {
  ProductId: Product['Id']
  UserGuid: HeaderResponse['UsedGuid']
}

/** Выбранный товар с указанным новым количеством */
export interface SelectedProductWitNewValue extends SelectedProduct {
  Value: number
}

/** Выбранная скидка */
export interface SelectedDiscount {
  DiscountName: string
  UsedGuid: HeaderResponse['UsedGuid']
}

/** Сводная информация о заказе */
export interface OrderInfo {
  TotalProducts: number
  Discount: number
  Total: number
}
