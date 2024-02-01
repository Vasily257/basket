<template>
  <BaseButton :type="type" class="text-button">
    <slot></slot>
  </BaseButton>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes, withDefaults } from 'vue'
import { BaseButton } from '@/components'

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
.text-button {
  border-radius: 5px;
  background-color: var(--color-background-soft);
  cursor: pointer;
  border: 1px solid var(--color-border);
  padding: 5px 10px;
  box-sizing: border-box;

  &:hover {
    background-color: var(--color-background-mute);
  }
}
</style>
