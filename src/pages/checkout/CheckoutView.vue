<script setup lang="ts">
import { computed } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import CheckoutFormView from './_components/CheckoutFormView.vue'
import Layout from '@/shared/components/layout/Layout.vue'
import DsButton from '@/shared/components/ds/DsButton.vue'
import { submitCheckout, CheckoutError, type CheckoutPayload } from '@/shared/api/checkout'

const router = useRouter()

const { mutate, isPending, isSuccess, error } = useMutation({
  mutationFn: (payload: CheckoutPayload) => submitCheckout(payload),
})

const errorMessage = computed(() =>
  error.value instanceof CheckoutError ? error.value.message : null,
)
</script>

<template>
  <Layout>
    <!-- Success state -->
    <div v-if="isSuccess" class="flex flex-col items-center gap-6 p-10 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Successfully purchased!</h2>
        <p class="text-gray-500 mt-1 text-sm">Your car insurance is now active.</p>
      </div>
      <DsButton class="max-w-xs" @click="router.push('/')"> Go back to home </DsButton>
    </div>

    <!-- Form state -->
    <div v-else class="p-6">
      <h1 class="text-lg font-bold text-center text-gray-800 mb-6">
        Get your Car Insurance for $9.99
      </h1>
      <div
        v-if="errorMessage"
        class="mb-4 rounded-md bg-red-50 border border-red-300 px-4 py-3 text-sm text-red-700"
      >
        {{ errorMessage }}
      </div>
      <CheckoutFormView :loading="isPending" @submit="mutate" />
    </div>
  </Layout>
</template>
