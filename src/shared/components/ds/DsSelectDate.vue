<script setup lang="ts">
import { ref, watch } from 'vue'
import DsSelect from '@/shared/components/ds/DsSelect.vue'

const props = defineProps<{
  label?: string
  error?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map((label, i) => ({ label, value: String(i + 1).padStart(2, '0') }))

const days = Array.from({ length: 31 }, (_, i) => ({
  value: String(i + 1).padStart(2, '0'),
  label: String(i + 1),
}))

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => ({
  value: String(currentYear - i),
  label: String(currentYear - i),
}))

const month = ref('')
const day = ref('')
const year = ref('')

function parseExternal(value: string | undefined) {
  if (!value) return
  const parts = value.split('-')
  if (parts.length === 3) {
    year.value = parts[0]
    month.value = parts[1]
    day.value = parts[2]
  }
}

parseExternal(props.modelValue)

watch(
  () => props.modelValue,
  (val) => parseExternal(val),
)

watch([month, day, year], ([m, d, y]) => {
  if (m && d && y) {
    emit('update:modelValue', `${y}-${m}-${d}`)
  }
})
</script>

<template>
  <UFormField :label="label" :error="error" :ui="{ label: 'text-black' }">
    <div class="flex gap-2 w-full">
      <DsSelect v-model="month" :options="months" placeholder="Month" class="flex-1" />
      <DsSelect v-model="day" :options="days" placeholder="Day" class="flex-1" />
      <DsSelect v-model="year" :options="years" placeholder="Year" class="flex-1" />
    </div>
  </UFormField>
</template>
