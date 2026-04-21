# Vue Car Insurance Checkout

A Vue 3 checkout flow for a car insurance product, built with Vite, TypeScript, @nuxt/ui, vee-validate, and TanStack Query.

## Getting started

```bash
npm install
npm run dev
```

## Stack

| Layer | Library |
|---|---|
| Framework | Vue 3 + Vite |
| UI | @nuxt/ui v4 (TailwindCSS v4) |
| Forms | vee-validate + zod |
| Data fetching | @tanstack/vue-query |
| HTTP | axios |
| Input masking | cleave.js |

## Test card numbers

The backend is imitated locally (`src/shared/api/checkout.ts`). Use these card numbers to trigger specific scenarios:

| Card number | Scenario |
|---|---|
| Any valid number (e.g. `4242 4242 4242 4242`) | Success |
| `4000 0000 0000 9995` | Card declined |

> **Note:** card numbers are normalised (spaces stripped) before comparison, so formatting added by cleave.js does not affect the result.

## Project structure

```
src/
  pages/
    home/           # Home page with test card reference
    checkout/       # Checkout page + form component
  shared/
    api/            # Backend imitation (checkout.ts)
    components/
      ds/           # Design system primitives (DsInput, DsButton, …)
      layout/       # Layout shell
    directives/     # v-cleave directive
    libs/           # axios instance
```
