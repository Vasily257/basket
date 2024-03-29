<template>
  <div class="dropdown">
    <!-- Главная кнопка -->
    <input
      :id="id"
      ref="principalMenu"
      :value="inputValue"
      type="button"
      :class="principalButtonClass"
      :aria-haspopup="true"
      :aria-expanded="isMenuOpened"
      @click="handlePrincipalButtonClick"
      @keyup.down="openMenu"
    />

    <!-- Скрытое выпадающее меню -->
    <Transition>
      <ul v-if="isMenuOpened" role="menu" :aria-labelledby="id" class="dropdown__menu">
        <li
          v-for="(option, index) in options"
          :key="index"
          ref="menuItems"
          class="dropdown__menu-item"
        >
          <BaseButton
            :class="getItemButtonClass(index, option)"
            tabindex="-1"
            role="menuitem"
            @click="handleMenuButtonClick(option)"
            @keyup.up="handleMenuButtonKeyInput"
            @keyup.down="handleMenuButtonKeyInput"
            @keyup.esc="handleMenuButtonKeyInput"
            @keydown.tab="handleMenuButtonKeyInput"
            @mouseenter="$event.target.focus()"
          >
            {{ option }}
          </BaseButton>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onBeforeUnmount } from 'vue'
import { BaseButton } from '@/components'

/** Типы пропсов */
interface Props {
  /** ID поля */
  id?: string
  /** Значения внутри выпадающего меню */
  options?: string[]
}

/** Пропсы со значениями по умолчанию */
const props = withDefaults(defineProps<Props>(), {
  id: '',
  options: () => ['Раз', 'Два', 'Три']
})

/** Значение внутри поля ввода */
const inputValue = ref(props.options[0])

/** Открыто ли выпадающее меню */
const isMenuOpened = ref(false)

/** Элемент главной кнопки */
const principalMenu = ref<HTMLButtonElement | null>(null)

/** Элементы выпадающего меню */
const menuItems = ref<HTMLUListElement[]>([])

/** Кнопки выпадающего меню */
const menuItemButtons = ref<HTMLButtonElement[]>([])

/** CSS-классы для главной кнопки */
const principalButtonClass = computed(() => {
  return {
    'dropdown__principal-button': true,
    'dropdown__principal-button--opened': isMenuOpened.value
  }
})

/**
 * Является ли опция выбранной
 * @param menuOption опция в меню
 */
const isSelectedOption = (menuOption: string) => {
  return menuOption === inputValue.value
}

/**
 * Получить класс кнопки меню
 * @param index индекс кнопки (элемента меню)
 */
const getItemButtonClass = (index: number, option: string) => {
  return {
    'dropdown__item-button': true,
    'dropdown__item-button--first': index === 0,
    'dropdown__item-button--last': index === props.options.length - 1,
    'dropdown__item-button--bold': isSelectedOption(option)
  }
}

/** Открыть выпадающее меню */
const openMenu = () => {
  isMenuOpened.value = true

  // При открытии меню фокус перемещается на первую кнопку меню (см. watchEffect)
}

/** Закрыть выпадающее меню */
const closeMenu = () => {
  isMenuOpened.value = false

  // Очистить глобальный слушатель клика вне меню
  document.removeEventListener('click', closeMenuOnOutsideClick)
}

/** Сфокусироваться на первой кнопке меню */
const focusFirstMenuButton = () => {
  menuItemButtons.value[0]?.focus()
}

/** Обработать нажатие по главной кнопке */
const handlePrincipalButtonClick = () => {
  if (isMenuOpened.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

/**
 * Обработать клик по кнопке меню
 * @param event событие мыши
 */
const handleMenuButtonClick = (currentOption: string) => {
  if (currentOption) {
    inputValue.value = currentOption
  }

  closeMenu()

  if (principalMenu.value) {
    principalMenu.value.focus()
  }
}

/**
 * Обработать нажатие клавиши на кнопке выпадающего меню
 * @param event событие клавиатуры
 */
const handleMenuButtonKeyInput = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLButtonElement) {
    const currentButton = event.target
    const currentButtonIndex = menuItemButtons.value.indexOf(currentButton)
    const lastIndex = menuItemButtons.value.length - 1

    // Если нажата стрелка «Вверх»
    if (event.key === 'ArrowUp') {
      // Отключить прокрутку страницы
      event.preventDefault()

      if (currentButtonIndex > 0 && currentButtonIndex <= lastIndex) {
        menuItemButtons.value[currentButtonIndex - 1].focus()
      }

      if (currentButtonIndex === 0) {
        menuItemButtons.value[lastIndex].focus()
      }
    }

    // Если нажата стрелка «Вниз»
    if (event.key === 'ArrowDown') {
      // Отключить прокрутку страницы
      event.preventDefault()

      if (currentButtonIndex >= 0 && currentButtonIndex < lastIndex) {
        menuItemButtons.value[currentButtonIndex + 1].focus()
      }

      if (currentButtonIndex === lastIndex) {
        menuItemButtons.value[0].focus()
      }
    }

    // Если нажата клавиша Escape
    if (event.key === 'Escape') {
      closeMenu()

      if (principalMenu.value) {
        principalMenu.value.focus()
      }
    }

    // Если нажата клавиша Tab
    if (event.key === 'Tab') {
      closeMenu()
    }
  }
}

// Переместить фокус на первую кнопку, когда откроется меню
watchEffect(() => {
  if (isMenuOpened.value) {
    // Очистить старый список кнопок
    menuItemButtons.value = []

    // Получить новый список кнопок
    menuItems.value.forEach((menuItem) => {
      const menuItemButton = menuItem.querySelector('button')

      if (menuItemButton) {
        menuItemButtons.value.push(menuItemButton)
      }
    })

    focusFirstMenuButton()

    // Добавить обработчик с нулевой задержкой, чтобы он не сразу сработал
    setTimeout(() => {
      document.addEventListener('click', closeMenuOnOutsideClick)
    })
  }
})

/** Закрыть меню при клике вне меню */
const closeMenuOnOutsideClick = (event: Event) => {
  const isMenuButton =
    event.target instanceof HTMLButtonElement && menuItemButtons.value.includes(event.target)

  if (!isMenuButton) {
    closeMenu()
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenuOnOutsideClick)
})
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  display: flex;
  align-items: center;
  text-transform: inherit;
  font-size: inherit;
  font-weight: inherit;

  &__principal-button {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: inherit;
    padding: 5px 10px;
    cursor: pointer;
    text-align: left;
    text-transform: inherit;
    color: var(--color-text);
    border-width: 1px;
    border-style: solid;
    border-color: var(--color-border);
    border-radius: 5px;
    background-color: var(--color-background);
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1;

    &:hover {
      border-color: var(--color-border-hover);
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      border-color: var(--color-border-hover);
    }

    &--opened {
      border-color: var(--color-border-hover);
    }
  }

  &__principal-button-icon {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate(0, -50%);
    transition: transform 0.25s;

    &--rotated-by-half {
      transform: translate(0, -50%) rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    z-index: 1;
    top: calc(100% + 8px);
    left: 0;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-radius: 4px;
    background-color: var(--color-background);
    box-shadow: 0 0 6px 0 rgba(148, 181, 225, 0.35);
    font-weight: 400;
  }

  &__menu-item {
    width: 100%;
  }

  &__item-button {
    padding: 5px 10px;
    width: 100%;
    border: none;
    border-radius: 0;

    &:focus {
      border-color: transparent;
      outline: none;
      background-color: var(--color-background-mute);
    }

    &--first {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &--last {
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }

    &--bold {
      font-weight: 700;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
