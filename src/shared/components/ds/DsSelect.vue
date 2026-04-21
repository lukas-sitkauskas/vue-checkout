<script setup lang="ts">
import { computed } from 'vue'

export interface SelectOption {
  value: string
  label: string
}

const props = defineProps<{
  label?: string
  error?: string
  modelValue?: string
  options: SelectOption[]
  placeholder?: string
  ui?: Record<string, string>
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()

const mergedUi = computed(() => ({
  base: 'bg-white text-black ring-gray-300',
  ...props.ui,
}))
</script>

<template>
  <UFormField :label="label" :error="error" :ui="{ label: 'text-black', root: 'w-full' }">
    <USelect
      :model-value="modelValue"
      :items="options"
      :placeholder="placeholder"
      :ui="mergedUi"
      value-key="value"
      label-key="label"
      class="w-full"
      @update:model-value="$emit('update:modelValue', $event as string)"
    />
  </UFormField>
</template>
