import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiGetHeader } from '@/api/shopping-cart'
import { getImageFromBase64 } from '@/utils'

/** Хранилище товаров */
export const useHeaderStore = defineStore('header', () => {
  /** Логотип сайта */
  const logoImage = ref('')

  /** ID пользователя */
  const userId = ref('')

  /** Имя пользователя */
  const userName = ref('')

  /** Первая буква имени */
  const firstLetterOfName = computed(() => {
    let letter = ''

    if (userName.value[0]) {
      letter = userName.value[0]
    }

    return letter
  })

  /** Задать значения для шапки сайта */
  const setHeader = async () => {
    try {
      const { data } = await apiGetHeader()

      logoImage.value = getImageFromBase64(data?.LogoImg)

      userId.value = data?.UsedGuid ?? ''

      userName.value = data?.UserName ?? ''
    } catch (error) {
      console.log(error)
    }
  }

  return { logoImage, userId, userName, firstLetterOfName, setHeader }
})
