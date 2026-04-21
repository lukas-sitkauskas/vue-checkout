<script setup lang="ts">
import Layout from '@/shared/components/layout/Layout.vue'
</script>

<template>
  <Layout>
    <div class="flex flex-col justify-center items-center py-12 gap-6">
      <h1 class="text-center text-3xl">Home</h1>
      <RouterLink to="/checkout">Checkout</RouterLink>

      <div class="max-w-sm w-full rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <p class="font-semibold mb-1">Test card numbers</p>
        <ul class="list-disc list-inside space-y-1">
          <li>Any valid card number → <strong>success</strong></li>
          <li><code class="font-mono">4000 0000 0000 9995</code> → <strong>card declined</strong></li>
        </ul>
      </div>
    </div>
  </Layout>
</template>
