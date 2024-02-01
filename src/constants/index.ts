import { PagePath } from '@/types/page'

/** Навигационные ссылки */
export const NAV_LINKS = [
  { href: PagePath.Home, text: 'Home' },
  { href: PagePath.Basket, text: 'Basket' },
  { href: PagePath.Catalog, text: 'Catalog' },
  { href: PagePath.About, text: 'About' },
  { href: PagePath.Contacts, text: 'Contacts' }
]

/** Начальное количество товаров в корзине */
export const INITIAL_PRODUCT_COUNT = 10

/** Шаблон для изображения в формате base64 */
export const BASE64_IMAGE_TEMPLATE = 'data:image/jpeg;base64,'

/** Промокод на скидку */
export const PROMO_CODE = 'hawkingbros'

/** Ответ при успешном запросе */
export const SUCCESSFUL_RESPONSE = 'Success'
