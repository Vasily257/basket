<template>
  <button :type="type" :class="classes.button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes, withDefaults, useCssModule } from 'vue'

/** Типы пропсов */
interface Props {
  /** Тип кнопки */
  type?: ButtonHTMLAttributes['type']
}

/** Пропсы со значениями по умолчанию */
withDefaults(defineProps<Props>(), {
  type: 'button'
})

/** CSS-классы */
const classes = useCssModule()
</script>

<style lang="scss" module>
.button {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  width: fit-content;
  padding: 0;
  cursor: pointer;
  text-align: center;
  text-transform: inherit;
  color: var(--neutral-dark, #1d1e25);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background-color: var(--neutral-white, #ffffff);
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  &:hover {
    background-color: var(--neutral-light, #f5f5f5);
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid var(--focus-outline, #2f80ed);
    outline-offset: 2px;
  }
}
</style>
