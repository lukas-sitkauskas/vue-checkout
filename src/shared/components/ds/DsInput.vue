<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps, FormFieldProps } from '@nuxt/ui'

defineOptions({ inheritAttrs: true })

const props = defineProps<{
  input?: InputProps<string>
  field?: FormFieldProps
  label?: string
  error?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()

const mergedInputUi = computed((): InputProps<string>['ui'] => ({
  base: 'bg-white text-black ring-gray-300',
  ...props.input?.ui,
}))

const mergedFieldUi = computed((): FormFieldProps['ui'] => ({
  label: 'text-black',
  ...props.field?.ui,
}))
</script>

<template>
  <UFormField v-bind="props.field" :error="props.error" :label="props.label" :ui="mergedFieldUi">
    <UInput
      v-bind="{ ...props.input, ...$attrs }"
      :ui="mergedInputUi"
      class="w-full"
      @update:model-value="$emit('update:modelValue', $event as string)"
    >
      <template v-if="$slots.leading" #leading>
        <slot name="leading" />
      </template>
      <template v-if="$slots.trailing" #trailing>
        <slot name="trailing" />
      </template>
    </UInput>
  </UFormField>
</template>
