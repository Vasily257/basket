<template>
  <button :type="type" class="button">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes, withDefaults } from 'vue'

/** Типы пропсов */
interface Props {
  /** Тип кнопки */
  type?: ButtonHTMLAttributes['type']
}

/** Пропсы со значениями по умолчанию */
withDefaults(defineProps<Props>(), {
  type: 'button'
})
</script>

<style lang="scss" scoped>
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
  color: var(--color-text);
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  background-color: var(--color-background);
  font: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 2px solid #2f80ed;
    outline-offset: 2px;
  }
}
</style>
