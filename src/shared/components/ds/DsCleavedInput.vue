<script setup lang="ts">
import { vCleave } from '@/shared/directives/cleave'
import { computed, useSlots } from 'vue'

const props = defineProps<{
  label?: string
  error?: string
  class?: string
  cleaveOptions: object
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const slots = useSlots()

const mergedInputUi = computed(() => {
  const base =
    'w-full rounded-md border border-gray-300 bg-white text-black px-3 py-1.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
  const dynamic = [slots.trailing ? 'pr-9' : '', props.class].filter(Boolean).join(' ')

  return base + ' ' + dynamic
})

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <UFormField :label="label" :error="error" :ui="{ label: 'text-black' }">
    <div class="relative w-full">
      <input v-cleave="cleaveOptions" :class="mergedInputUi" @input="onInput" />
      <span
        v-if="$slots.trailing"
        class="absolute inset-y-0 right-3 flex items-center pointer-events-none"
      >
        <slot name="trailing" />
      </span>
    </div>
  </UFormField>
</template>
