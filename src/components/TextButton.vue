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

<style lang="scss" module>
.text-button {
  border-radius: 5px;
  background-color: var(--color-background-mute);
}
</style>
