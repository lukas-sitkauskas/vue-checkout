<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <p class="text-red-500 text-xs mt-1">{{ $props.message }}</p>
</template>
