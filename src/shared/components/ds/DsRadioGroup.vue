<script setup lang="ts">
defineOptions({ inheritAttrs: false })

export interface RadioOption {
  value: string
  label: string
}

defineProps<{
  label?: string
  error?: string
  modelValue?: string
  options: RadioOption[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <UFormField :label="label" :error="error" :ui="{ label: 'text-black' }">
    <!-- $attrs carries any class/style passed from the parent -->
    <div v-bind="$attrs" class="flex gap-2">
      <UButton
        v-for="opt in options"
        :key="opt.value"
        type="button"
        :variant="modelValue === opt.value ? 'solid' : 'outline'"
        :color="modelValue === opt.value ? 'primary' : 'neutral'"
        :class="modelValue === opt.value ? '' : 'bg-white text-black border-gray-500 hover:bg-gray-300 hover:text-black'"
        class="flex items-center gap-2"
        @click="$emit('update:modelValue', opt.value)"
      >
        <span
          class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
          :class="modelValue === opt.value ? 'border-white' : 'border-gray-500'"
        >
          <span v-if="modelValue === opt.value" class="w-2 h-2 rounded-full bg-white" />
        </span>
        {{ opt.label }}
      </UButton>
    </div>
  </UFormField>
</template>
