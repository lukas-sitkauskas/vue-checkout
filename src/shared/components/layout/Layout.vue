<script setup lang="ts">
import Header from '@/shared/components/layout/Header.vue'
import Footer from '@/shared/components/layout/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-12" style="background: #f0f2f5">
    <Header />
    <main class="flex-1 flex justify-center py-10 px-4">
      <div class="bg-white rounded-xl shadow w-full max-w-full md:max-w-lg">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>
