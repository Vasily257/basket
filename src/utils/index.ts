import { BASE64_IMAGE_TEMPLATE } from '@/constants/index'

/** Получить изображение из base64-строки */
export const getImageFromBase64 = (base64Image: string = '') => {
  return BASE64_IMAGE_TEMPLATE + base64Image
}
