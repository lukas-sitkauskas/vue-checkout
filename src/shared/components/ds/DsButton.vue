<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  color: 'primary',
  variant: 'solid',
  activeColor: 'primary',
  size: 'lg',
})

const mergedUi = computed((): ButtonProps['ui'] => ({
  base: 'w-full justify-center uppercase tracking-widest font-bold text-black',
  ...props.ui,
}))
</script>

<template>
  <UButton v-bind="$props" :ui="mergedUi">
    <slot />
  </UButton>
</template>
