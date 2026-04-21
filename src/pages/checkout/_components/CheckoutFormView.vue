<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import DsInput from '@/shared/components/ds/DsInput.vue'
import DsRadioGroup from '@/shared/components/ds/DsRadioGroup.vue'
import DsButton from '@/shared/components/ds/DsButton.vue'
import DsCleavedInput from '@/shared/components/ds/DsCleavedInput.vue'
import DsSelectDate from '@/shared/components/ds/DsSelectDate.vue'
import type { CheckoutPayload } from '@/shared/api/checkout'

defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [payload: CheckoutPayload]
}>()

const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
]

const schema = toTypedSchema(
  z.object({
    fullName: z
      .string()
      .min(1, 'Required')
      .max(512, 'Max 512 characters')
      .refine((val) => {
        const words = val.trim().split(/\s+/).filter(Boolean)
        return words.length >= 2
      }, 'Please enter your first and last name')
      .refine((val) => {
        const words = val.trim().split(/\s+/).filter(Boolean)
        return words.every((w) => w.length >= 2)
      }, 'Each name must be at least 2 characters'),
    email: z.string().min(1, 'Required').email('Invalid email'),
    zipCode: z
      .string()
      .min(1, 'Required')
      .regex(/^\d{4,10}$/, 'Invalid zip code'),
    dob: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Required')
      .refine((val) => {
        const dob = new Date(val)
        const today = new Date()
        const age = today.getFullYear() - dob.getFullYear()
        const notYetHadBirthday =
          today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
        return age - (notYetHadBirthday ? 1 : 0) >= 18
      }, 'You must be at least 18 years old'),
    gender: z.enum(['female', 'male'], { required_error: 'Required' }),
    cardHolderName: z.string().min(1, 'Required'),
    cardNumber: z.string().min(1, 'Required'),
    expiration: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format')
      .refine((val) => {
        const [month, year] = val.split('/')
        const expiry = new Date(2000 + Number(year), Number(month) - 1, 1)
        const now = new Date()
        const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1)
        return expiry >= currentMonth
      }, 'Card has expired'),
    cvv: z.string().regex(/^\d{3,4}$/, '3 or 4 digits'),
  }),
)

const { handleSubmit, defineField, errors } = useForm({ validationSchema: schema })

const [fullName, fullNameAttrs] = defineField('fullName')
const [email, emailAttrs] = defineField('email')
const [zipCode, zipCodeAttrs] = defineField('zipCode')
const [dob] = defineField('dob')
const [gender] = defineField('gender')
const [cardHolderName, cardHolderNameAttrs] = defineField('cardHolderName')
const [cardNumber] = defineField('cardNumber')
const [expiration] = defineField('expiration')
const [cvv, cvvAttrs] = defineField('cvv')

// ── Card Holder Name auto-fill ────────────────────────────────────────────────
// Tracks whether the user has manually interacted with the card holder field.
const cardHolderNameTouched = ref(false)

function onCardHolderNameInput() {
  cardHolderNameTouched.value = true
}

function onFullNameBlur() {
  if (
    !cardHolderNameTouched.value &&
    !cardHolderName.value &&
    !errors.value.fullName &&
    fullName.value
  ) {
    cardHolderName.value = fullName.value
  }
}

const onSubmit = handleSubmit((values) => {
  emit('submit', values as CheckoutPayload)
})
</script>

<template>
  <form class="flex flex-col gap-4 p-4" @submit.prevent="onSubmit">
    <!-- Full Name -->
    <DsInput
      v-model="fullName"
      v-bind="fullNameAttrs"
      label="Full Name"
      :error="errors.fullName"
      :maxlength="512"
      @blur="onFullNameBlur"
    />

    <!-- Email -->
    <DsInput v-model="email" v-bind="emailAttrs" label="Email" type="email" :error="errors.email" />

    <!-- Zip Code -->
    <DsInput
      v-model="zipCode"
      v-bind="zipCodeAttrs"
      label="Zip Code"
      placeholder="10001"
      :error="errors.zipCode"
    >
      <template #leading>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          />
        </svg>
      </template>
    </DsInput>

    <!-- Birth date -->
    <DsSelectDate v-model="dob" label="Birth date" :error="errors.dob" />

    <!-- Gender -->
    <DsRadioGroup v-model="gender" label="Gender" :options="genderOptions" :error="errors.gender" />

    <!-- Card section -->
    <div class="border border-gray-300 rounded p-4 flex flex-col gap-3">
      <DsInput
        v-model="cardHolderName"
        v-bind="cardHolderNameAttrs"
        label="Card Holder Name"
        :error="errors.cardHolderName"
        @input="onCardHolderNameInput"
      />

      <DsCleavedInput
        label="Card Number"
        :cleave-options="{ creditCard: true }"
        inputmode="numeric"
        :error="errors.cardNumber"
        @update:model-value="(val) => (cardNumber = val)"
      >
        <template #trailing>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </DsCleavedInput>

      <div class="flex gap-3">
        <DsCleavedInput
          label="Expiration date"
          :cleave-options="{ date: true, datePattern: ['m', 'y'] }"
          placeholder="MM/YY"
          :error="errors.expiration"
          class="flex-1"
          @update:model-value="(val) => (expiration = val)"
        />
        <DsInput
          v-model="cvv"
          v-bind="cvvAttrs"
          label="CVV"
          type="text"
          inputmode="numeric"
          :maxlength="4"
          :error="errors.cvv"
          class="flex-1"
        />
      </div>
    </div>

    <DsButton type="submit" :loading="loading" class="mt-1"> Continue </DsButton>
  </form>
</template>
